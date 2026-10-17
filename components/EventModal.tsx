'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { HiOutlineCalendar, HiOutlineClock, HiOutlineLocationMarker, HiOutlineX } from 'react-icons/hi'
import type { CalendarEvent } from '@/app/api/events/route'
import { downloadIcs, fmt, googleCalendarUrl, mapsUrl, shortLocation, toDate } from '@/lib/events'

const T = {
  ro: {
    event: 'Eveniment', date: 'Data', time: 'Ora', place: 'Locul', allDay: 'Toată ziua',
    add: 'Adaugă în calendar', google: 'Google Calendar', ics: 'Apple / Outlook (.ics)', close: 'Închide',
    recurrence: { weekly: 'În fiecare săptămână', monthly: 'Lunar', repeat: 'Recurent' },
  },
  en: {
    event: 'Event', date: 'Date', time: 'Time', place: 'Location', allDay: 'All day',
    add: 'Add to calendar', google: 'Google Calendar', ics: 'Apple / Outlook (.ics)', close: 'Close',
    recurrence: { weekly: 'Every week', monthly: 'Monthly', repeat: 'Recurring' },
  },
} as const

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// Adresele web din descriere devin linkuri.
function linkify(text: string): ReactNode[] {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
    i % 2 ? <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part.replace(/^https?:\/\/(www\.)?/, '')}</a> : part,
  )
}

/* Fereastra cu detaliile unui eveniment (se deschide din lista de pe prima pagină).
   Folosește <dialog>: Esc închide, focusul rămâne în fereastră și revine apoi pe rândul apăsat. */
export default function EventModal({ event: e, lang, onClose }: { event: CalendarEvent; lang: 'ro' | 'en'; onClose: () => void }) {
  const t = T[lang]
  const locale = lang === 'en' ? 'en-GB' : 'ro-RO'
  const ref = useRef<HTMLDialogElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)   // poza nu e publică / nu se încarcă → antet fără poză
  const image = imageFailed ? null : e.image

  useEffect(() => {
    const dialog = ref.current!
    dialog.showModal()
    document.documentElement.classList.add('modal-open')
    return () => document.documentElement.classList.remove('modal-open')
  }, [])

  const d = toDate(e)
  const hm = (x: Date) => fmt(x, locale, { hour: '2-digit', minute: '2-digit' }, false)
  const time = e.allDay ? t.allDay : `${hm(d)} – ${hm(new Date(e.end))}`

  return (
    <dialog
      ref={ref}
      className="event-modal"
      aria-labelledby="event-modal-title"
      onClose={onClose}
      onClick={ev => { if (ev.target === ref.current) ref.current.close() }}   // clic pe fundal
    >
      <div className="em-card">
        <button type="button" className="em-close" aria-label={t.close} onClick={() => ref.current?.close()}>
          <HiOutlineX aria-hidden />
        </button>

        <header className={`em-head${image ? ' em-head--photo' : ''}`}>
          {image && <img className="em-photo" src={image} alt="" onError={() => setImageFailed(true)} />}
          <div className="em-head-bar">
            <div className="em-date" aria-hidden>
              <span className="em-day">{fmt(d, locale, { day: '2-digit' }, e.allDay)}</span>
              <span className="em-month">{fmt(d, locale, { month: 'short' }, e.allDay).replace('.', '')}</span>
            </div>
            <div className="em-heading">
              <span className="em-kicker">{e.recurrence ? t.recurrence[e.recurrence] : t.event}</span>
              <h2 id="event-modal-title" className="em-title">{e.title}</h2>
            </div>
          </div>
        </header>

        <div className="em-body">
          <dl className="em-facts">
            <div className="em-fact">
              <span className="em-icon"><HiOutlineCalendar aria-hidden /></span>
              <div>
                <dt>{t.date}</dt>
                <dd>{capitalize(fmt(d, locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }, e.allDay))}</dd>
              </div>
            </div>
            <div className="em-fact">
              <span className="em-icon"><HiOutlineClock aria-hidden /></span>
              <div>
                <dt>{t.time}</dt>
                <dd>{time}</dd>
              </div>
            </div>
            {e.location && (
              <div className="em-fact">
                <span className="em-icon"><HiOutlineLocationMarker aria-hidden /></span>
                <div>
                  <dt>{t.place}</dt>
                  <dd><a href={mapsUrl(e.location)} target="_blank" rel="noopener noreferrer">{shortLocation(e.location)}</a></dd>
                </div>
              </div>
            )}
          </dl>

          {e.description && <p className="em-desc">{linkify(e.description)}</p>}

          <div className="em-actions">
            <div className="em-add">
              <button
                type="button"
                className="btn btn-dark em-add-btn"
                aria-expanded={menuOpen}
                aria-controls="em-add-menu"
                onClick={() => setMenuOpen(o => !o)}
              >
                <HiOutlineCalendar aria-hidden /> {t.add}
              </button>
              {menuOpen && (
                <div id="em-add-menu" className="em-add-menu">
                  <a href={googleCalendarUrl(e)} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
                    {t.google}
                  </a>
                  <button type="button" onClick={() => { downloadIcs(e); setMenuOpen(false) }}>
                    {t.ics}
                  </button>
                </div>
              )}
            </div>
            <button type="button" className="em-secondary" onClick={() => ref.current?.close()}>{t.close}</button>
          </div>
        </div>
      </div>
    </dialog>
  )
}
