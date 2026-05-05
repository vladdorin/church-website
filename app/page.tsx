'use client'
import { useEffect, useRef, ReactNode, CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CountdownHero from '@/components/CountdownHero'

/* ── Scroll reveal wrapper ─────────────────────────────────── */
function RevealSection({ children, style, className }: {
  children: ReactNode; style?: CSSProperties; className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { el.querySelectorAll('.sr').forEach(c => c.classList.toggle('sr-visible', e.isIntersecting)) },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return <div ref={ref} style={style} className={className}>{children}</div>
}

/* ── Diagonal colour transition ────────────────────────────── */
function Diagonal({ to, flip }: { to: string; flip?: boolean }) {
  return (
    <div style={{
      height: 72, background: to, marginTop: -1,
      clipPath: flip ? 'polygon(0 0, 100% 52px, 100% 100%, 0 100%)' : 'polygon(0 52px, 100% 0, 100% 100%, 0 100%)',
    }} />
  )
}

/* ── Ghost number ───────────────────────────────────────────── */
function GhostNum({ num, light }: { num: string; light?: boolean }) {
  return (
    <div className="ghost-num" style={{
      position: 'absolute', right: '-3%', top: '50%', transform: 'translateY(-50%)',
      fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
      fontSize: 'clamp(12rem,30vw,28rem)', lineHeight: 1, letterSpacing: '-0.05em',
      color: light ? 'rgba(255,255,255,0.05)' : 'rgba(8,12,30,0.05)',
      pointerEvents: 'none', userSelect: 'none',
    }}>{num}</div>
  )
}

const T9: CSSProperties = {
  fontFamily: "'Climate Crisis',sans-serif",
  letterSpacing: '0.01em', lineHeight: 0.92, margin: '20px 0 32px',
}

/* ═══════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <CountdownHero />

      {/* ── TICKER ── */}
      <div style={{ background: '#1932af', padding: '14px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', animation: 'ticker 30s linear infinite', whiteSpace: 'nowrap' }}>
          {Array(10).fill(null).map((_, i) => (
            <span key={i} style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', flexShrink: 0 }}>
              &nbsp;·&nbsp; O biserică în Alba Iulia pentru toată lumea &nbsp;·&nbsp; Ești binevenit așa cum ești
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════ 01 — CINE SUNTEM ═══════════ */}
      <section className="page-section" style={{ background: '#f4f2ee', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <GhostNum num="01" />
        <div className="wrap-wide">
          <RevealSection style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left: text */}
            <div>
              <p className="sr sr-up label">CINE SUNTEM?</p>
              <h2 className="sr sr-left sr-d1" style={{ ...T9, fontSize: 'clamp(2rem,4vw,4.5rem)', color: '#080c1e' }}>
                JOHN &amp;<br />VOICHI<br />DURA.
              </h2>
              <p className="sr sr-up sr-d2" style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(8,12,30,0.6)', fontWeight: 300, maxWidth: 420, marginBottom: 12 }}>
                Momentum Church a fost fondată de John și Voichi Dura — un cuplu care a ales să rămână în Alba Iulia și să construiască ceva durabil.
              </p>
              <p className="sr sr-up sr-d2" style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(8,12,30,0.45)', fontWeight: 300, maxWidth: 420, marginBottom: 36, fontStyle: 'italic' }}>
                „Nu am vrut să construim o altă biserică tradițională. Am vrut să construim un acasă."
              </p>
              <div className="sr sr-up sr-d3">
                <Link href="/about" className="btn btn-dark">Cunoaște-ne</Link>
              </div>
            </div>

            {/* Right: photo card */}
            <div className="sr sr-right sr-d1">
              <div className="photo-card-wrap" style={{
                aspectRatio: '4/5', maxHeight: 500,
                background: 'linear-gradient(160deg,#1932af 0%,#080c1e 100%)',
                borderRadius: 28, display: 'flex', alignItems: 'center',
                justifyContent: 'center', position: 'relative', overflow: 'hidden',
              }}>
                <Image
                  src="/john-voichi.jpg"
                  alt="John și Voichi Dura"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(8,12,30,0.9), transparent)',
                  padding: '32px 28px',
                }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 32, height: 2, background: '#1932af', flexShrink: 0 }} />
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                      Pastori · Momentum Church
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </RevealSection>
        </div>
      </section>
      <Diagonal to="#080c1e" />

      {/* ═══════════ 02 — MISIUNEA NOASTRĂ ═══════════ */}
      <section className="page-section" style={{ background: '#080c1e', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <GhostNum num="02" light />
        <div className="wrap-wide">
          <RevealSection style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <p className="sr sr-up label-light">MISIUNEA NOASTRĂ</p>
              <h2 className="sr sr-left sr-d1" style={{ ...T9, fontSize: 'clamp(2rem,4vw,4.5rem)', color: 'white' }}>
                DE CE EXISTĂ<br />MOMENTUM?
              </h2>
              <p className="sr sr-up sr-d2" style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', fontWeight: 300, maxWidth: 420, marginBottom: 36 }}>
                Existăm pentru a construi o comunitate dătătoare de viață în Alba Iulia — un loc unde oamenii Îl întâlnesc pe Dumnezeu, cresc în comunitate autentică și trăiesc scopul dat de El.
              </p>
              <div className="sr sr-up sr-d3">
                <Link href="/misiunea-noastra" className="btn btn-white">Descoperă misiunea</Link>
              </div>
            </div>
            <div className="sr sr-right sr-d1" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { nr: '01', titlu: 'NOUA GENERAȚIE', desc: 'Ajungem la tineri într-un mod practic, autentic și plin de iubire.' },
                { nr: '02', titlu: 'FAMILII', desc: 'Întărim familiile și sprijinim părinții să crească copii în valori sănătoase.' },
                { nr: '03', titlu: 'SCOP GOD-GIVEN', desc: 'Trezim darurile puse de Dumnezeu în fiecare om.' },
              ].map(({ nr, titlu, desc }, i) => (
                <div key={nr} style={{
                  background: i === 0 ? '#1932af' : i === 1 ? '#0f1440' : '#111629',
                  padding: '28px 32px', borderRadius: 6,
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                }}>
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', marginTop: 4, flexShrink: 0 }}>{nr}</span>
                  <div>
                    <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: '0.08em', color: 'white', marginBottom: 6 }}>{titlu}</p>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 300, lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>
      <Diagonal to="#ffffff" flip />

      {/* ═══════════ 03 — FĂ PARTE ═══════════ */}
      <section className="page-section" style={{ background: '#ffffff', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <GhostNum num="03" />
        <div className="wrap-wide">
          <RevealSection>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'flex-start', marginBottom: 64 }}>
              <div>
                <p className="sr sr-up label">ECHIPA</p>
                <h2 className="sr sr-left sr-d1" style={{ ...T9, fontSize: 'clamp(2rem,4vw,4.5rem)', color: '#080c1e' }}>
                  VINO<br />CU NOI.
                </h2>
              </div>
              <div style={{ paddingTop: 8 }}>
                <p className="sr sr-up sr-d1" style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(8,12,30,0.55)', fontWeight: 300, marginBottom: 36 }}>
                  Ești binevenit exact așa cum ești. Avem nevoie de talentul, energia și inima ta pentru a construi această comunitate.
                </p>
                <div className="sr sr-up sr-d2">
                  <Link href="/join" className="btn btn-dark">Alătură-te echipei</Link>
                </div>
              </div>
            </div>

            {/* 3 panouri editoriale */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, borderRadius: 24, overflow: 'hidden' }}>
              {[
                { nr: '01', titlu: 'Conectează-te', desc: 'Distribuie vestea și aduce-ți prietenii. Fiecare persoană contează pentru Alba Iulia.', bg: '#080c1e', col: 'white', accent: '#4a7fff' },
                { nr: '02', titlu: 'Roagă-te', desc: 'Stai alături de noi în rugăciune pentru acest oraș și pentru lansarea din octombrie 2026.', bg: '#1932af', col: 'white', accent: 'rgba(255,255,255,0.5)' },
                { nr: '03', titlu: 'Implică-te', desc: 'Folosește-ți darurile și talentele pentru a construi această comunitate din temelii.', bg: '#f4f2ee', col: '#080c1e', accent: '#1932af' },
              ].map(({ nr, titlu, desc, bg, col, accent }, i) => (
                <div key={nr} className={`sr sr-up sr-d${i + 1}`} style={{
                  background: bg, padding: '52px 40px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  minHeight: 340, position: 'relative', overflow: 'hidden',
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}>
                  {/* Număr ghost fundal */}
                  <div style={{
                    position: 'absolute', right: -12, bottom: -20,
                    fontFamily: "'Climate Crisis',sans-serif",
                    fontSize: 'clamp(100px,14vw,160px)', lineHeight: 1,
                    color: accent, opacity: 0.13,
                    pointerEvents: 'none', userSelect: 'none',
                  }}>{nr}</div>
                  {/* Top */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
                      <div style={{ width: 28, height: 2, background: accent, opacity: 0.7 }} />
                      <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent }}>{nr}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Climate Crisis',sans-serif", fontSize: 'clamp(1.6rem,2.5vw,2.4rem)', color: col, lineHeight: 0.95 }}>{titlu}</h3>
                  </div>
                  {/* Bottom */}
                  <p style={{ fontSize: 14, color: col, opacity: 0.6, fontWeight: 300, lineHeight: 1.85, maxWidth: 220, position: 'relative', zIndex: 1 }}>{desc}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>
      <Diagonal to="#f4f2ee" />

      {/* ═══════════ 04 — RUGĂCIUNE ═══════════ */}
      <section className="page-section" style={{ background: '#f4f2ee', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <GhostNum num="04" />
        <div className="wrap-wide">
          <RevealSection style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div className="sr sr-right sr-d1 prayer-list-col">
              <div style={{ background: 'linear-gradient(135deg,#0f1052,#1932af)', borderRadius: 24, padding: '40px 36px' }}>
                {[
                  { nr: '01', text: 'O generație cu scop' },
                  { nr: '02', text: 'Familii restaurate' },
                  { nr: '03', text: 'Lansarea Momentum' },
                  { nr: '04', text: 'Resurse și susținători' },
                ].map(({ nr, text }, idx, arr) => (
                  <div key={nr} style={{
                    display: 'flex', gap: 20, alignItems: 'center',
                    paddingBottom: idx < arr.length - 1 ? 20 : 0,
                    marginBottom: idx < arr.length - 1 ? 20 : 0,
                    borderBottom: idx < arr.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  }}>
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 11, color: 'rgba(255,255,255,0.25)', minWidth: 28 }}>{nr}</span>
                    <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="prayer-text-col">
              <p className="sr sr-up label">RUGĂCIUNE</p>
              <h2 className="sr sr-right sr-d1" style={{ ...T9, fontSize: 'clamp(2rem,4vw,4.5rem)', color: '#080c1e' }}>
                AI NEVOIE<br />DE<br />RUGĂCIUNE?
              </h2>
              <p className="sr sr-up sr-d2" style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(8,12,30,0.55)', fontWeight: 300, maxWidth: 420, marginBottom: 36 }}>
                Echipa noastră se roagă zilnic pentru Alba Iulia și pentru oamenii din ea. Trimite-ne cererea ta.
              </p>
              <div className="sr sr-up sr-d3">
                <Link href="/pray" className="btn btn-dark">Stai alături</Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
      <Diagonal to="#0d1020" flip />

      {/* ═══════════ 05 — DONAȚII ═══════════ */}
      <section className="page-section" style={{ background: '#0d1020', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <GhostNum num="05" light />
        <div className="wrap-wide">
          <RevealSection style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <p className="sr sr-up label-light">DONEAZĂ</p>
              <h2 className="sr sr-left sr-d1" style={{ ...T9, fontSize: 'clamp(2rem,4vw,4.5rem)', color: 'white' }}>
                DEVINO<br />PARTENER.
              </h2>
              <p className="sr sr-up sr-d2" style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', fontWeight: 300, maxWidth: 420, marginBottom: 36 }}>
                Fiecare donație pe care o faci va fi dublată de ARC până la $50.000.
              </p>
              <div className="sr sr-up sr-d3">
                <Link href="/give" className="btn btn-white">Susține lansarea</Link>
              </div>
            </div>

            {/* ARC partnership block */}
            <div className="sr sr-right sr-d1" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* ARC band */}
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderLeft: '4px solid #1932af',
                borderRadius: 16, padding: '28px 32px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap',
              }}>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Parteneriat oficial</p>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 20, color: 'white', letterSpacing: '-0.01em' }}>ÎN PARTENERIAT CU ARC</p>
                </div>
                <div style={{ width: 88, height: 88, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                  <Image src="/arc-logo.png" alt="ARC" width={88} height={88} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
              </div>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { stat: '1.000+', desc: 'biserici lansate global' },
                  { stat: 'x2', desc: 'fiecare donație dublată' },
                  { stat: '20+', desc: 'ani de experiență' },
                  { stat: 'Global', desc: 'rețea internațională' },
                ].map(({ stat, desc }) => (
                  <div key={stat} style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 14, padding: '20px 24px', textAlign: 'center',
                  }}>
                    <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 24, color: 'white', marginBottom: 4 }}>{stat}</p>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
      <Diagonal to="#080c1e" />

      {/* ═══════════ CTA FINAL ═══════════ */}
      <section className="page-section" style={{ background: '#080c1e', padding: '112px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="cta-ghost" style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
          fontSize: 'clamp(6rem,22vw,20rem)', color: 'rgba(255,255,255,0.018)',
          lineHeight: 1, whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
        }}>MOMENTUM</div>
        <div className="wrap-wide" style={{ position: 'relative', zIndex: 1 }}>
          <RevealSection>
            <p className="sr sr-up label-light">Fă parte din asta</p>
            <h2 className="sr sr-left sr-d1" style={{ ...T9, fontSize: 'clamp(2.5rem,7vw,7rem)', color: 'white', marginBottom: 48 }}>
              MOMENTUL<br />
              <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)', color: 'transparent' }}>E ACUM.</span>
            </h2>
            <div className="sr sr-up sr-d2 cta-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', maxWidth: 380, lineHeight: 1.8, fontWeight: 300 }}>
                Fie că vrei să vii, să te rogi, să te implici sau să susții financiar — există un loc pentru tine în Momentum.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/connect" className="btn btn-navy">Contactează-ne</Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  )
}
