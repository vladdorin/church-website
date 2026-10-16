'use client'
import { useEffect, useState } from 'react'
import type { CalendarEvent } from '@/app/api/events/route'

// Notă: textul evenimentelor (titlu, locație) vine din calendar, în limba în care e scris acolo.

type State =
  | { status: 'loading' }
  | { status: 'hidden' }                                   // neconfigurat sau eroare: secțiunea nu apare
  | { status: 'ready'; events: CalendarEvent[]; calendarId: string }

const TZ = 'Europe/Bucharest'

const RECURRENCE = {
  ro: { weekly: 'În fiecare săptămână', monthly: 'Lunar', repeat: 'Recurent' },
  en: { weekly: 'Every week', monthly: 'Monthly', repeat: 'Recurring' },
} as const

// Evenimentele pe toată ziua vin ca YYYY-MM-DD; le tratăm ca dată fixă (fără fus orar).
function toDate(e: CalendarEvent) {
  return e.allDay ? new Date(`${e.start}T12:00:00Z`) : new Date(e.start)
}

// „Biserica Momentum, Calea Moților 258, 510001 Alba Iulia, Romania” → primele două părți
function shortLocation(loc: string) {
  return loc.split(',').slice(0, 2).map(s => s.trim()).join(', ')
}

function fmt(d: Date, locale: string, opts: Intl.DateTimeFormatOptions, allDay: boolean) {
  return new Intl.DateTimeFormat(locale, { ...opts, timeZone: allDay ? 'UTC' : TZ }).format(d)
}

/* Secțiunea „Evenimente” de pe prima pagină — evenimentele viitoare din Google Calendar,
   actualizate automat (vezi app/api/events/route.ts). */
export default function EventsSection({ lang, num }: { lang: 'ro' | 'en'; num: string }) {
  const en = lang === 'en'
  const locale = en ? 'en-GB' : 'ro-RO'
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    fetch('/api/events')
      .then(r => r.json())
      .then(d => {
        if (cancelled) return
        if (!d.configured || d.error) setState({ status: 'hidden' })
        else setState({ status: 'ready', events: d.events, calendarId: d.calendarId })
      })
      .catch(() => { if (!cancelled) setState({ status: 'hidden' }) })
    return () => { cancelled = true }
  }, [])

  if (state.status === 'hidden') return null

  const calendarUrl = state.status === 'ready'
    ? `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(state.calendarId)}&ctz=${TZ}`
    : null

  return (
    <section className="page-section events-section">
      <div className="ghost-num events-ghost">{num}</div>
      <div className="wrap-wide events-layout">
        <div className="events-intro">
          <h2 className="events-title">{en ? <>WHAT&apos;S<br />COMING UP.</> : <>CE<br />URMEAZĂ.</>}</h2>
          <p className="events-sub">
            {en
              ? 'Upcoming events at Momentum. Come along and bring a friend.'
              : 'Evenimentele care urmează la Momentum. Vino și adu un prieten.'}
          </p>
          {calendarUrl && (
            <a href={calendarUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              {en ? 'Full calendar' : 'Vezi tot calendarul'}
            </a>
          )}
        </div>

        <div className="events-list-wrap">
          {state.status === 'loading' && (
            <ul className="events-list" aria-busy="true">
              {[0, 1, 2].map(i => <li key={i} className="event-row event-row--skeleton" />)}
            </ul>
          )}

          {state.status === 'ready' && state.events.length === 0 && (
            <p className="events-empty">
              {en
                ? 'No events scheduled right now. We meet every Sunday at 10:30.'
                : 'Momentan nu sunt evenimente programate. Ne vedem în fiecare duminică la 10:30.'}
            </p>
          )}

          {state.status === 'ready' && state.events.length > 0 && (
            <ul className="events-list">
              {state.events.map(e => {
                const d = toDate(e)
                const end = e.allDay ? null : new Date(e.end)
                const time = e.allDay
                  ? (en ? 'All day' : 'Toată ziua')
                  : `${fmt(d, locale, { hour: '2-digit', minute: '2-digit' }, false)}${end ? ` – ${fmt(end, locale, { hour: '2-digit', minute: '2-digit' }, false)}` : ''}`
                const Row = e.link ? 'a' : 'div'
                return (
                  <li key={e.id}>
                    <Row
                      className="event-row"
                      {...(e.link ? { href: e.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <div className="event-date">
                        <span className="event-day">{fmt(d, locale, { day: '2-digit' }, e.allDay)}</span>
                        <span className="event-month">{fmt(d, locale, { month: 'short' }, e.allDay).replace('.', '')}</span>
                      </div>
                      <div className="event-info">
                        <span className="event-meta">
                          {fmt(d, locale, { weekday: 'long' }, e.allDay)} · {time}
                        </span>
                        <h3 className="event-name">
                          {e.title}
                          {e.recurrence && <span className="event-badge">{RECURRENCE[lang][e.recurrence]}</span>}
                        </h3>
                        {e.location && <span className="event-location">{shortLocation(e.location)}</span>}
                      </div>
                      {e.link && <span className="event-arrow" aria-hidden>→</span>}
                    </Row>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
