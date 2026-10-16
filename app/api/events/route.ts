export const runtime = 'edge'

// Evenimentele viitoare din Google Calendar-ul bisericii.
// Necesită variabilele GOOGLE_CALENDAR_ID și GOOGLE_CALENDAR_API_KEY (calendarul trebuie să fie public).
// Răspunsul e păstrat în cache 5 minute, deci schimbările din calendar apar pe site în maxim 5 minute.

export type Recurrence = 'weekly' | 'monthly' | 'repeat' | null

export type CalendarEvent = {
  id: string
  title: string
  start: string      // ISO (dateTime) sau YYYY-MM-DD (eveniment pe toată ziua)
  end: string
  allDay: boolean
  location: string | null
  link: string | null
  recurrence: Recurrence
}

type GoogleEvent = {
  id: string
  recurringEventId?: string
  summary?: string
  location?: string
  htmlLink?: string
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
    const events: CalendarEvent[] = []
    for (const e of items) {
      if (e.recurringEventId) {
        if (seen.has(e.recurringEventId)) continue
        seen.add(e.recurringEventId)
      }
      events.push({
        id: e.id,
        title: e.summary?.trim() || 'Eveniment',
        start: e.start.dateTime ?? e.start.date ?? '',
        end: e.end.dateTime ?? e.end.date ?? '',
        allDay: !e.start.dateTime,
        location: e.location?.trim() || null,
        link: e.htmlLink ?? null,
        recurrence: e.recurringEventId ? recurrenceOf(series.get(e.recurringEventId)!) : null,
      })
      if (events.length === MAX_EVENTS) break
    }

    return Response.json(
      { configured: true, calendarId, events },
      { headers: { 'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=60` } },
    )
  } catch (err) {
    console.error('[events]', err)
    return Response.json({ configured: true, error: true, events: [] }, { status: 502 })
  }
}
