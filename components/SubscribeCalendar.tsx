'use client'
import { useEffect, useRef, useState } from 'react'
import { HiOutlineCalendar } from 'react-icons/hi'

const T = {
  ro: { add: 'Adaugă tot calendarul', apple: 'iPhone / Apple Calendar', google: 'Google Calendar', outlook: 'Outlook', copy: 'Copiază linkul', copied: 'Link copiat ✓',
        hint: 'Evenimentele noi apar singure în calendarul tău.' },
  en: { add: 'Add the whole calendar', apple: 'iPhone / Apple Calendar', google: 'Google Calendar', outlook: 'Outlook', copy: 'Copy link', copied: 'Link copied ✓',
        hint: 'New events show up in your calendar automatically.' },
} as const

/* „Adaugă tot calendarul”: abonament la toate evenimentele bisericii (app/calendar.ics/route.ts), nu doar la unul.
   Apple deschide webcal:// direct în Calendar; Google adaugă calendarul public după ID; Outlook primește linkul .ics. */
export default function SubscribeCalendar({ lang, calendarId }: { lang: 'ro' | 'en'; calendarId: string }) {
  const t = T[lang]
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Se închide la un clic în afara meniului sau cu Escape.
  useEffect(() => {
    if (!open) return
    const click = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('click', click)
    document.addEventListener('keydown', key)
    return () => { document.removeEventListener('click', click); document.removeEventListener('keydown', key) }
  }, [open])

  const feed = () => `${window.location.origin}/calendar.ics`
  const webcal = () => feed().replace(/^https?:/, 'webcal:')

  async function copy() {
    try {
      await navigator.clipboard.writeText(feed())
      setCopied(true)
      setTimeout(() => { setCopied(false); setOpen(false) }, 1500)
    } catch {
      window.prompt(t.copy, feed())
    }
  }

  return (
    <div className="em-add cal-sub" ref={ref}>
      <button type="button" className="btn btn-outline-blue em-add-btn" aria-expanded={open} aria-controls="cal-sub-menu" onClick={() => setOpen(o => !o)}>
        <HiOutlineCalendar aria-hidden /> {t.add}
      </button>
      {open && (
        <div id="cal-sub-menu" className="em-add-menu cal-sub-menu">
          <a href="#" onClick={e => { e.preventDefault(); window.location.href = webcal(); setOpen(false) }}>{t.apple}</a>
          <a href={`https://calendar.google.com/calendar/r?cid=${encodeURIComponent(calendarId)}`} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>{t.google}</a>
          <a href="#" onClick={e => {
            e.preventDefault()
            window.open(`https://outlook.live.com/calendar/0/addfromweb?url=${encodeURIComponent(feed())}&name=${encodeURIComponent('Biserica Momentum')}`, '_blank', 'noopener')
            setOpen(false)
          }}>{t.outlook}</a>
          <button type="button" onClick={copy}>{copied ? t.copied : t.copy}</button>
          <small className="cal-sub-hint">{t.hint}</small>
        </div>
      )}
    </div>
  )
}
