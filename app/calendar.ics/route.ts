export const runtime = 'edge'

// Tot calendarul bisericii, ca abonament (webcal://bisericamomentum.ro/calendar.ics): iPhone, Google, Outlook îl
// reîncarcă singure, deci evenimentele noi din Google Calendar apar și la cei abonați. E feed-ul public .ics al
// Google Calendar-ului (GOOGLE_CALENDAR_ID, calendarul e public), cu numele bisericii și o oră între actualizări.

const CACHE_SECONDS = 900
const NAME = 'Biserica Momentum'

export async function GET() {
  const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim()
  if (!calendarId) return new Response('Calendarul nu e configurat.', { status: 404 })

  const res = await fetch(`https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`, {
    next: { revalidate: CACHE_SECONDS },
  })
  if (!res.ok) {
    console.error('[calendar.ics] Google Calendar', res.status)
    return new Response('Calendarul nu se poate încărca acum.', { status: 502 })
  }

  // Numele din aplicația de calendar și cât de des se reîncarcă (Apple: REFRESH-INTERVAL, Outlook: X-PUBLISHED-TTL).
  const ics = (await res.text())
    .replace(/^X-WR-CALNAME:.*\r?\n/m, '')
    .replace(/^(VERSION:.*\r?\n)/m, `$1X-WR-CALNAME:${NAME}\r\nREFRESH-INTERVAL;VALUE=DURATION:PT1H\r\nX-PUBLISHED-TTL:PT1H\r\n`)

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="biserica-momentum.ics"',
      'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=300`,
    },
  })
}
