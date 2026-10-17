import type { CalendarEvent } from '@/app/api/events/route'

// Funcții comune pentru lista de evenimente și fereastra cu detalii (components/EventsSection.tsx, EventModal.tsx).

export const TZ = 'Europe/Bucharest'

// Evenimentele pe toată ziua vin ca YYYY-MM-DD; le tratăm ca dată fixă (fără fus orar).
export function toDate(e: CalendarEvent) {
  return e.allDay ? new Date(`${e.start}T12:00:00Z`) : new Date(e.start)
}

export function fmt(d: Date, locale: string, opts: Intl.DateTimeFormatOptions, allDay: boolean) {
  return new Intl.DateTimeFormat(locale, { ...opts, timeZone: allDay ? 'UTC' : TZ }).format(d)
}

// „Biserica Momentum, Calea Moților 258, 510001 Alba Iulia, Romania” → primele două părți
export function shortLocation(loc: string) {
  return loc.split(',').slice(0, 2).map(s => s.trim()).join(', ')
}

export function mapsUrl(loc: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}`
}

// ── „Adaugă în calendar” ──

// ISO → 20261018T093000, ora locală din România
function localStamp(iso: string) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
    }).formatToParts(new Date(iso)).map(x => [x.type, x.value]),
  )
  return `${p.year}${p.month}${p.day}T${p.hour}${p.minute}${p.second}`
}

const dateStamp = (ymd: string) => ymd.replace(/-/g, '')

export function googleCalendarUrl(e: CalendarEvent) {
  const dates = e.allDay
    ? `${dateStamp(e.start)}/${dateStamp(e.end)}`
    : `${localStamp(e.start)}/${localStamp(e.end)}`
  const p = new URLSearchParams({ action: 'TEMPLATE', text: e.title, dates })
  if (!e.allDay) p.set('ctz', TZ)
  if (e.description) p.set('details', e.description)
  if (e.location) p.set('location', e.location)
  if (e.rrule) p.set('recur', e.rrule)
  return `https://calendar.google.com/calendar/render?${p}`
}

const icsText = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/[,;]/g, m => `\\${m}`)

// Rândurile .ics mai lungi de 75 de caractere se continuă pe rândul următor, cu un spațiu în față.
function fold(line: string) {
  const chars = Array.from(line)
  const parts: string[] = []
  for (let i = 0; i < chars.length; i += 70) parts.push(chars.slice(i, i + 70).join(''))
  return parts.join('\r\n ')
}

// Fișier .ics pentru Apple Calendar, Outlook etc. Ora e în fusul orar al României,
// ca evenimentele recurente să rămână la aceeași oră și după schimbarea orei de vară/iarnă.
export function icsFile(e: CalendarEvent) {
  const when = (v: string) => (e.allDay ? `;VALUE=DATE:${dateStamp(v)}` : `;TZID=${TZ}:${localStamp(v)}`)
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Biserica Momentum//Website//RO',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${e.id}@bisericamomentum`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d{3}/g, '')}`,
    `DTSTART${when(e.start)}`,
    `DTEND${when(e.end)}`,
    ...(e.rrule ? [e.rrule] : []),
    `SUMMARY:${icsText(e.title)}`,
    ...(e.location ? [`LOCATION:${icsText(e.location)}`] : []),
    ...(e.description ? [`DESCRIPTION:${icsText(e.description)}`] : []),
    'END:VEVENT',
    'END:VCALENDAR',
  ].map(fold).join('\r\n')
}

export function downloadIcs(e: CalendarEvent) {
  const url = URL.createObjectURL(new Blob([icsFile(e)], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `${e.title.normalize('NFD').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').toLowerCase() || 'eveniment'}.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
