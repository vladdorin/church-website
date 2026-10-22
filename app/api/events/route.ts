export const runtime = 'edge'

// Evenimentele viitoare din Google Calendar-ul bisericii.
// Necesită variabilele GOOGLE_CALENDAR_ID și GOOGLE_CALENDAR_API_KEY (calendarul trebuie să fie public).
// Răspunsul e păstrat în cache 5 minute, deci schimbările din calendar apar pe site în maxim 5 minute.

import { photoUrl } from '@/lib/photoSign'

export type Recurrence = 'weekly' | 'monthly' | 'repeat' | null

export type CalendarEvent = {
  id: string
  title: string
  start: string      // ISO (dateTime) sau YYYY-MM-DD (eveniment pe toată ziua)
  end: string
  allDay: boolean
  location: string | null
  description: string | null   // text simplu (descrierea din calendar e HTML)
  image: string | null         // prima poză atașată evenimentului (fișier Drive public)
  link: string | null
  recurrence: Recurrence
  rrule: string | null         // ex. „RRULE:FREQ=WEEKLY;BYDAY=SU”, pentru „Adaugă în calendar”
}

type GoogleEvent = {
  id: string
  recurringEventId?: string
  summary?: string
  description?: string
  location?: string
  htmlLink?: string
  attachments?: { fileId?: string; mimeType?: string }[]
  recurrence?: string[]
  start: { dateTime?: string; date?: string }
  end: { dateTime?: string; date?: string }
}

const CACHE_SECONDS = 300
const MAX_EVENTS = 6
const DAY = 86_400_000

const startOf = (e: GoogleEvent) => new Date(e.start.dateTime ?? `${e.start.date}T12:00:00Z`).getTime()

// Din distanța dintre primele două apariții deducem cât de des se repetă un eveniment.
function recurrenceOf(occurrences: GoogleEvent[]): Recurrence {
  if (occurrences.length < 2) return 'repeat'
  const days = Math.round((startOf(occurrences[1]) - startOf(occurrences[0])) / DAY)
  if (days === 7) return 'weekly'
  if (days >= 28 && days <= 31) return 'monthly'
  return 'repeat'
}

const ENTITIES: Record<string, string> = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" }

// Descrierea din Google Calendar e HTML (<p>, <br>, <a>, <b>…) → text simplu cu rânduri noi.
function htmlToText(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h\d)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<[^>]+>/g, '')
    .replace(/&(nbsp|amp|lt|gt|quot|#39);/g, (_, k) => ENTITIES[k])
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// Poza se adaugă în Google Calendar ca atașament (din Drive) și trebuie partajată „Oricine are linkul”.
// Se încarcă prin app/api/photo/route.ts, nu direct de pe Drive.
function imageOf(e: GoogleEvent) {
  const img = e.attachments?.find(a => a.fileId && a.mimeType?.startsWith('image/'))
  return img ? photoUrl(img.fileId!, 1200) : null
}

export async function GET() {
  const calendarId = process.env.GOOGLE_CALENDAR_ID
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY

  if (!calendarId || !apiKey) {
    return Response.json({ configured: false, events: [] })
  }

  try {
    const params = new URLSearchParams({
      key: apiKey,
      timeMin: new Date().toISOString(),
      singleEvents: 'true',   // evenimentele recurente vin ca date separate
      orderBy: 'startTime',
      maxResults: '100',
    })
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`
    const res = await fetch(url, { next: { revalidate: CACHE_SECONDS } })

    if (!res.ok) {
      console.error('[events] Google Calendar', res.status, await res.text())
      return Response.json({ configured: true, error: true, events: [] }, { status: 502 })
    }

    const items: GoogleEvent[] = (await res.json()).items ?? []

    // Un eveniment recurent apare o singură dată (următoarea apariție), cu eticheta de frecvență.
    const series = new Map<string, GoogleEvent[]>()
    for (const e of items) {
      if (!e.recurringEventId) continue
      const list = series.get(e.recurringEventId) ?? []
      list.push(e)
      series.set(e.recurringEventId, list)
    }

    const seen = new Set<string>()
    const picked: GoogleEvent[] = []
    for (const e of items) {
      if (e.recurringEventId) {
        if (seen.has(e.recurringEventId)) continue
        seen.add(e.recurringEventId)
      }
      picked.push(e)
      if (picked.length === MAX_EVENTS) break
    }

    // Regula de repetare (RRULE) e doar pe evenimentul „părinte” al seriei, așa că o cerem separat.
    const rrules = new Map(await Promise.all(Array.from(seen, async id => {
      try {
        const r = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(id)}?key=${apiKey}`,
          { next: { revalidate: CACHE_SECONDS } },
        )
        const parent: GoogleEvent | null = r.ok ? await r.json() : null
        return [id, parent?.recurrence?.find(l => l.startsWith('RRULE:')) ?? null] as const
      } catch {
        return [id, null] as const
      }
    })))

    const events: CalendarEvent[] = await Promise.all(picked.map(async e => ({
      id: e.id,
      title: e.summary?.trim() || 'Eveniment',
      start: e.start.dateTime ?? e.start.date ?? '',
      end: e.end.dateTime ?? e.end.date ?? '',
      allDay: !e.start.dateTime,
      location: e.location?.trim() || null,
      description: e.description ? htmlToText(e.description) || null : null,
      image: await imageOf(e),
      link: e.htmlLink ?? null,
      recurrence: e.recurringEventId ? recurrenceOf(series.get(e.recurringEventId)!) : null,
      rrule: e.recurringEventId ? rrules.get(e.recurringEventId) ?? null : null,
    })))

    return Response.json(
      { configured: true, calendarId, events },
      { headers: { 'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=60` } },
    )
  } catch (err) {
    console.error('[events]', err)
    return Response.json({ configured: true, error: true, events: [] }, { status: 502 })
  }
}
