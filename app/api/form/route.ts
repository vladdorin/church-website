import { Resend } from 'resend'

export const runtime = 'edge'

// Valorile din Cloudflare, fără spații sau rând nou la final (o cheie salvată cu „Enter” e respinsă ca invalidă).
const env = (name: string) => process.env[name]?.trim() || undefined

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const resend = new Resend(env('RESEND_API_KEY'))

    await Promise.all([
      fetch(env('GOOGLE_SCRIPT_URL')!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),

      resend.emails.send({
        // EMAIL_FROM: ex. „Momentum Website <site@bisericamomentum.ro>” (domeniul e verificat în Resend).
        from: env('EMAIL_FROM') ?? 'Momentum Website <onboarding@resend.dev>',
        to: env('EMAIL_TO')!,
        subject: `Formular nou: ${data.formType || 'Site'}`,
        text: `
Ai primit un formular nou.

Nume: ${data.name || '-'}
Email: ${data.email || '-'}
Telefon: ${data.phone || '-'}
Mesaj: ${data.message || '-'}
        `,
      }),
    ])

    // Trimite persoana și în Momentum Admin (lista „De contactat”).
    // Dacă adminul nu e configurat sau nu răspunde, formularul merge în continuare normal.
    const ingestUrl = env('ADMIN_INGEST_URL')
    const ingestSecret = env('ADMIN_INGEST_SECRET')
    if (ingestUrl && ingestSecret) {
      await fetch(ingestUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-ingest-secret': ingestSecret },
        body: JSON.stringify(data),
      }).catch(err => console.error('[form → admin]', err))
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)

    return Response.json(
      { success: false, error: 'Form submit failed' },
      { status: 500 }
    )
  }
}