'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

const FULL_TEXT = 'Construim o comunitate vie, autentică și plină de dragoste în inima Albei Iulia.\nPentru gloria lui Dumnezeu.'

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

const TARGET = new Date('2026-10-04T10:00:00+03:00')

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now()
  if (diff <= 0) return { zile: 0, ore: 0, min: 0 }
  const totalMin = Math.floor(diff / (1000 * 60))
  const totalOre = Math.floor(diff / (1000 * 60 * 60))
  const totalZile = Math.floor(diff / (1000 * 60 * 60 * 24))
  return {
    zile: totalZile,
    ore:  totalOre  % 24,
    min:  totalMin  % 60,
  }
}

export default function CountdownHero() {
  const [t, setT] = useState({ zile: 0, ore: 0, min: 0 })
  const { displayed, done } = useTypewriter(FULL_TEXT, 38)

  useEffect(() => {
    setT(getTimeLeft())
    const id = setInterval(() => setT(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const NUM: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 900,
    lineHeight: 0.88,
    letterSpacing: '-0.03em',
    color: 'white',
    fontSize: 'clamp(3.5rem, 9.5vw, 10rem)',
  }

  const COLON: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 900,
    lineHeight: 1,
    color: 'rgba(255,255,255,0.13)',
    fontSize: 'clamp(2.5rem, 6.5vw, 7rem)',
    flexShrink: 0,
    paddingLeft: 'clamp(8px, 2vw, 28px)',
    paddingRight: 'clamp(8px, 2vw, 28px)',
    paddingBottom: 0,           /* fix: aliniat cu cifrele */
  }

  const UNIT_LABEL: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    fontSize: 11,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.28)',
    marginTop: 14,
    textAlign: 'center',
  }

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

      {/* ── COLȚURI — aliniate cu nav prin wrap-wide ── */}
      <div className="wrap-wide" style={{
  	position: 'absolute', top: 28, left: 0, right: 0,
  	zIndex: 2, padding: '0 10px',
  	display: 'flex', justifyContent: 'space-between',
  	alignItems: 'center',
      }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)' }}>
          Alba Iulia, România
        </p>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)' }}>
          4 Octombrie 2026 · 10:00
        </p>
      </div>

      {/* ── CENTRU ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        padding: '60px 32px 24px',
      }}>
        {/* Label */}
        <p style={{
          fontFamily: "'Climate Crisis', sans-serif",
          fontSize: 'clamp(1rem, 2.2vw, 2rem)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          marginBottom: 40,
        }}>
          Lansarea oficială · Prima duminică
        </p>

        {/* ── NUMERE — colonul centrat vertical ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',       /* fix: centrat, nu flex-end */
          justifyContent: 'center',
          flexWrap: 'nowrap',
        }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
            <span style={NUM}>{t.zile}</span>
            <span style={UNIT_LABEL}>Zile</span>
          </div>
          <span style={COLON}>:</span>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
            <span style={NUM}>{String(t.ore).padStart(2,'0')}</span>
            <span style={UNIT_LABEL}>Ore</span>
          </div>
          <span style={COLON}>:</span>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
            <span style={NUM}>{String(t.min).padStart(2,'0')}</span>
            <span style={UNIT_LABEL}>Minute</span>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="wrap-wide" style={{
          paddingTop: '24px', paddingBottom: '36px',
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
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link href="/join" className="btn btn-navy">Alătură-te</Link>
            <Link href="/about" className="btn btn-outline-white">Povestea noastră</Link>
          </div>
        </div>
      </div>

    </section>
  )
}
