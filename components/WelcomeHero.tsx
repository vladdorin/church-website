'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { isEnglishPath, routeFor } from '@/lib/routes'

const FULL_TEXT_RO = 'Construim o comunitate vie, autentică și plină de dragoste în inima orașului Alba Iulia. Pentru gloria lui Dumnezeu.'
const FULL_TEXT_EN = `We are building a living, authentic, and loving community in the heart of Alba Iulia.
For the glory of God.`

const ADDRESS = 'Calea Moților nr. 258, Alba Iulia'
const MAPS_HREF = 'https://www.google.com/maps/search/?api=1&query=Biserica+Momentum+Alba+Iulia'

function useTypewriter(text: string, speed = 38) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const idx = useRef(0)
  useEffect(() => {
    idx.current = 0
    setDisplayed('')
    setDone(false)
    const id = setInterval(() => {
      idx.current += 1
      setDisplayed(text.slice(0, idx.current))
      if (idx.current >= text.length) { clearInterval(id); setDone(true) }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return { displayed, done }
}

export default function WelcomeHero() {
  const pathname = usePathname()
  const isEnglish = isEnglishPath(pathname)

  const fullText = isEnglish ? FULL_TEXT_EN : FULL_TEXT_RO
  const newHref = routeFor('new', isEnglish)

  const { displayed, done } = useTypewriter(fullText, 38)

  const schedule = isEnglish
    ? [{ time: '9:30', label: 'Fellowship' }, { time: '10:30', label: 'Service' }]
    : [{ time: '9:30', label: 'Socializare' }, { time: '10:30', label: 'Program' }]

  return (
    <section style={{
      background: '#080c1e',
      minHeight: 'calc(100vh - 88px)',   /* înălțime = viewport minus nav */
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/hero-cetate.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        backgroundRepeat: 'no-repeat',
        opacity: 0.22,
        pointerEvents: 'none',
      }} />
      {/* Overlay gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(8,12,30,0.45) 0%, rgba(8,12,30,0.15) 50%, rgba(8,12,30,0.75) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── CENTRU ── */}
      <div className="hero-welcome">
        <h1 className="hero-welcome-title">
          <span>{isEnglish ? 'Welcome' : 'Bine ai venit'}</span>
          <span>{isEnglish ? 'to church' : 'la biserică'}</span>
        </h1>

        <p className="hero-welcome-sub">
          <span>
            {isEnglish
              ? 'We gather every Sunday and we’d love for you to join us.'
              : 'Ne întâlnim în fiecare duminică și ne-am bucura să fii alături de noi.'}
          </span>
          <span className="hero-welcome-sub-accent">
            {isEnglish ? 'Come as you are.' : 'Vino așa cum ești.'}
          </span>
        </p>

        <div className="hero-welcome-info">
          <div className="hero-welcome-times">
            {schedule.map(s => (
              <span key={s.time} className="hero-welcome-time">
                <strong>{s.time}</strong> {s.label}
              </span>
            ))}
          </div>
          <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" className="hero-welcome-address">
            <HiOutlineLocationMarker aria-hidden />
            {ADDRESS}
          </a>
        </div>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="wrap-wide hero-launch-meta" style={{
          paddingTop: '32px', paddingBottom: '36px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 20,
        }}>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(13px, 1.1vw, 15px)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 680,
            lineHeight: 1.9,
            letterSpacing: '0.01em',
            whiteSpace: 'pre-line',
          }}>
            {displayed}
            {!done && (
              <span style={{
                display: 'inline-block',
                width: 2,
                height: '1.1em',
                background: '#1932af',
                marginLeft: 3,
                verticalAlign: 'text-bottom',
                animation: 'blink 1s step-end infinite',
              }} />
            )}
          </p>
          <div className="hero-actions">
            <Link href={newHref} className="btn btn-navy">{isEnglish ? "It's my first time" : 'Sunt pentru prima dată'}</Link>
          </div>
        </div>
      </div>

    </section>
  )
}
