import { Resend } from 'resend'

export const runtime = 'edge'

// Formularele de pe site (Contact, Join, Alătură-te) → email (Resend), Google Sheet și Momentum Admin.
// Endpoint-ul e public, așa că totul se verifică aici, pe server, nu doar în browser:
//  - doar câmpurile cunoscute, cu lungimi maxime, email valid, corp de maxim 10 KB;
//  - câmpul-capcană „website” (ascuns pentru oameni): boții care îl completează sunt ignorați;
//  - Cloudflare Turnstile, dacă sunt setate TURNSTILE_SECRET_KEY (aici) și NEXT_PUBLIC_TURNSTILE_SITE_KEY (în pagină).

// Valorile din Cloudflare, fără spații sau rând nou la final (o cheie salvată cu „Enter” e respinsă ca invalidă).
const env = (name: string) => process.env[name]?.trim() || undefined

const MAX_BODY = 10_000
const FORM_TYPES = ['Contact', 'Join', 'Alătură-te']
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/

type Submission = {
  formType: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  extra: { privacy: boolean; sursa?: string }
}

const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

function parse(raw: unknown): Submission | string {
  if (!raw || typeof raw !== 'object') return 'invalid'
  const d = raw as Record<string, unknown>
  const extra = (d.extra && typeof d.extra === 'object' ? d.extra : {}) as Record<string, unknown>
  const s: Submission = {
    formType: text(d.formType, 40),
    name: text(d.name, 120),
    email: text(d.email, 200),
    phone: text(d.phone, 30),
    subject: text(d.subject, 200),
    message: text(d.message, 3000),
    extra: { privacy: extra.privacy === true, ...(extra.sursa ? { sursa: text(extra.sursa, 200) } : {}) },
  }
  if (!FORM_TYPES.includes(s.formType)) return 'formType'
  if (!s.name) return 'name'
  if (!EMAIL.test(s.email)) return 'email'
  if (!s.extra.privacy) return 'privacy'
  return s
}

async function turnstileOk(token: unknown, ip: string | null) {
  const secret = env('TURNSTILE_SECRET_KEY')
  if (!secret) return true // încă neconfigurat
  if (typeof token !== 'string' || !token) return false
  const body = new FormData()
  body.append('secret', secret)
  body.append('response', token)
  if (ip) body.append('remoteip', ip)
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
  return ((await res.json().catch(() => ({}))) as { success?: boolean }).success === true
}

// În Google Sheets, o valoare care începe cu = + - @ e interpretată ca formulă.
const sheetSafe = (v: string) => (/^[=+\-@]/.test(v) ? `'${v}` : v)

export async function POST(req: Request) {
  const bad = (reason: string, status = 400) => Response.json({ success: false, error: reason }, { status })
  try {
    if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY) return bad('too large', 413)
    const raw = await req.text()
    if (raw.length > MAX_BODY) return bad('too large', 413)
    let body: Record<string, unknown>
    try {
      body = JSON.parse(raw)
    } catch {
      return bad('invalid')
    }

    // Capcana pentru boți: răspundem „ok”, dar nu trimitem nimic mai departe.
    if (text(body.website, 200)) return Response.json({ success: true })

    if (!(await turnstileOk(body.turnstile, req.headers.get('cf-connecting-ip')))) return bad('verification', 403)

    const data = parse(body)
    if (typeof data === 'string') return bad(data)

    const resend = new Resend(env('RESEND_API_KEY'))
    const sheetData = {
      ...data,
      name: sheetSafe(data.name),
      email: sheetSafe(data.email),
      phone: sheetSafe(data.phone),
      subject: sheetSafe(data.subject),
      message: sheetSafe(data.message),
      extra: { ...data.extra, ...(data.extra.sursa ? { sursa: sheetSafe(data.extra.sursa) } : {}) },
    }

    const [sheet, mail] = await Promise.allSettled([
      fetch(env('GOOGLE_SCRIPT_URL')!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetData),
      }).then(r => {
        if (!r.ok) throw new Error(`Google Script ${r.status}`)
      }),

      resend.emails
        .send({
          // EMAIL_FROM: ex. „Momentum Website <site@bisericamomentum.ro>” (domeniul e verificat în Resend).
          from: env('EMAIL_FROM') ?? 'Momentum Website <onboarding@resend.dev>',
          to: env('EMAIL_TO')!,
          subject: `Formular nou: ${data.formType}`,
          text: `
Ai primit un formular nou.

Nume: ${data.name || '-'}
Email: ${data.email || '-'}
Telefon: ${data.phone || '-'}
Mesaj: ${data.message || '-'}
        `,
        })
        .then(r => {
          // Resend nu aruncă eroare, o întoarce în rezultat.
          if (r.error) throw new Error(`Resend: ${r.error.message}`)
        }),
    ])
    if (sheet.status === 'rejected') console.error('[form → sheet]', sheet.reason)
    if (mail.status === 'rejected') console.error('[form → email]', mail.reason)

    // Trimite persoana și în Momentum Admin (lista „De contactat”).
    // Dacă adminul nu e configurat sau nu răspunde, formularul merge în continuare normal.
    const ingestUrl = env('ADMIN_INGEST_URL')
    const ingestSecret = env('ADMIN_INGEST_SECRET')
    let admin = false
    if (ingestUrl && ingestSecret) {
      admin = await fetch(ingestUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-ingest-secret': ingestSecret },
        body: JSON.stringify(data),
      })
        .then(r => r.ok)
        .catch(err => {
          console.error('[form → admin]', err)
          return false
        })
    }

    // Succes dacă formularul a ajuns măcar într-un loc; altfel omul trebuie să afle că nu s-a trimis.
    if (sheet.status === 'rejected' && mail.status === 'rejected' && !admin) return bad('Form submit failed', 502)
    return Response.json({ success: true })
  } catch (error) {
    console.error(error)

    return Response.json(
      { success: false, error: 'Form submit failed' },
      { status: 500 }
    )
  }
}
