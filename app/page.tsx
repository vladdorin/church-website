'use client'
import { useEffect, useRef, useState, ReactNode, CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CountdownHero from '@/components/CountdownHero'
import { FundraiserCompact } from '@/components/FundraiserBar'

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

/* ── Stacked → spread cards (fan-out, completes while header is visible) ── */
const STACK_CARDS = [
  { titlu: 'Conectează-te', desc: 'Distribuie vestea și aduce-ți prietenii. Fiecare persoană contează pentru Alba Iulia.',        bg: '#7b9aff', col: '#080c1e' },
  { titlu: 'Roagă-te',      desc: 'Stai alături de noi în rugăciune pentru acest oraș și pentru lansarea din octombrie 2026.',   bg: '#080c1e', col: '#f4f2ee' },
  { titlu: 'Implică-te',    desc: 'Folosește-ți darurile și talentele pentru a construi această comunitate din temelii.',         bg: '#f0ede8', col: '#080c1e' },
]

// Initial stacked offsets for each card
const STACK_INIT = [
  { tx: 100, rot: -5, sc: 0.90, z: 1 },
  { tx: 0,   rot:  0, sc: 0.96, z: 3 },
  { tx: -100, rot: 5, sc: 0.90, z: 1 },
]

function StackedCards() {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const vh   = window.innerHeight
      // Animation starts as cards enter viewport (top at 90% vh)
      // Animation ENDS when card top reaches 55% vh — while header above is still pinned/visible
      const start = vh * 0.9
      const end   = vh * 0.55
      const raw   = (start - rect.top) / (start - end)
      setP(Math.min(1, Math.max(0, raw)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const ep   = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
  const lerp = (a: number, b: number) => a + (b - a) * ep

  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, borderRadius: 24, overflow: 'hidden' }}>
      {STACK_CARDS.map(({ titlu, desc, bg, col }, i) => {
        const { tx, rot, sc, z } = STACK_INIT[i]
        return (
          <div key={i} style={{
            background: bg,
            padding: 'clamp(36px,4vw,52px) clamp(28px,3.5vw,44px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            minHeight: 360, position: 'relative', overflow: 'hidden',
            borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            transform: `translateX(${lerp(tx, 0)}%) rotate(${lerp(rot, 0)}deg) scale(${lerp(sc, 1)})`,
            zIndex: z,
            willChange: 'transform',
          }}>
            {/* Ghost first letter */}
            <div style={{
              position: 'absolute', right: -8, bottom: -20,
              fontFamily: "'Climate Crisis',sans-serif",
              fontSize: 'clamp(110px,16vw,180px)', lineHeight: 1,
              color: col, opacity: 0.07,
              pointerEvents: 'none', userSelect: 'none',
            }}>{titlu[0]}</div>
            {/* Title */}
            <h3 style={{
              fontFamily: "'Climate Crisis',sans-serif",
              fontSize: 'clamp(1rem,1.5vw,1.5rem)',
              color: col, lineHeight: 1.1, position: 'relative', zIndex: 1,
              whiteSpace: 'nowrap',
            }}>{titlu.toUpperCase()}</h3>
            {/* Description */}
            <p style={{
              fontSize: 14, color: col, opacity: 0.58,
              fontWeight: 300, lineHeight: 1.85, maxWidth: 240,
              position: 'relative', zIndex: 1,
            }}>{desc}</p>
          </div>
        )
      })}
    </div>
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
                Biserica Momentum a fost fondată de John și Voichi Dura. Ei poartă o chemare pentru generația tânără a Albei Iulia și au decis să facă ceva în privința asta.
              </p>
              <p className="sr sr-up sr-d2" style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(8,12,30,0.45)', fontWeight: 300, maxWidth: 420, marginBottom: 36, fontStyle: 'italic' }}>
                „Nu am vrut să construim o altă biserică tradițională. Am vrut să construim o comunitate în care fiecare să se simtă acasă."
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
                    <div style={{ width: 32, height: 2, background: 'rgba(255,255,255,0.5)', flexShrink: 0 }} />
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                      Pastori · Biserica Momentum
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
          <RevealSection style={{ maxWidth: 680 }}>
            <p className="sr sr-up label-light">MISIUNEA NOASTRĂ</p>
            <h2 className="sr sr-left sr-d1" style={{ ...T9, fontSize: 'clamp(2rem,4vw,4.5rem)', color: 'white' }}>
              DE CE EXISTĂ<br />MOMENTUM?
            </h2>
            <p className="sr sr-up sr-d2" style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', fontWeight: 300, maxWidth: 520, marginBottom: 36 }}>
              Existăm pentru a construi o comunitate dătătoare de viață în Alba Iulia — un loc unde oamenii Îl întâlnesc pe Dumnezeu, cresc în comunitate autentică și trăiesc scopul dat de El.
            </p>
            <div className="sr sr-up sr-d3">
              <Link href="/misiunea-noastra" className="btn btn-white">Descoperă misiunea</Link>
            </div>
          </RevealSection>
        </div>
      </section>
      <Diagonal to="#ffffff" flip />

      {/* ═══════════ 03 — VINO CU NOI ═══════════ */}
      <section style={{ background: '#ffffff', paddingTop: 96, paddingBottom: 96, position: 'relative' }}>
        <GhostNum num="03" />

        {/* ── Header row — sticky so it stays visible while cards fan out ── */}
        <div style={{ position: 'sticky', top: 88, zIndex: 10, background: '#ffffff', paddingBottom: 48 }}>
          <div className="wrap-wide">
            <RevealSection style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'flex-start' }}>
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
            </RevealSection>
          </div>
        </div>

        {/* ── StackedCards fan-out animation ── */}
        <div className="wrap-wide">
          <StackedCards />
        </div>
      </section>
      <Diagonal to="#f4f2ee" />

      {/* ═══════════ 04 — RUGĂCIUNE ═══════════ */}
      <section className="page-section" style={{ background: '#f4f2ee', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <GhostNum num="04" />
        <div className="wrap-wide">
          <RevealSection style={{ maxWidth: 680 }}>
            <p className="sr sr-up label">RUGĂCIUNE</p>
            <h2 className="sr sr-left sr-d1" style={{ ...T9, fontSize: 'clamp(2rem,4vw,4.5rem)', color: '#080c1e' }}>
              AI NEVOIE<br />DE<br />RUGĂCIUNE?
            </h2>
            <p className="sr sr-up sr-d2" style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(8,12,30,0.55)', fontWeight: 300, maxWidth: 520, marginBottom: 36 }}>
              Echipa noastră se roagă zilnic pentru Alba Iulia și pentru oamenii din ea. Trimite-ne cererea ta.
            </p>
            <div className="sr sr-up sr-d3">
              <Link href="/pray" className="btn btn-dark">Stai alături</Link>
            </div>
          </RevealSection>
        </div>
      </section>
      <Diagonal to="#0b1628" flip />

      {/* ═══════════ 05 — DONAȚII ═══════════ */}
      <section className="page-section" style={{ background: '#0b1628', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <GhostNum num="05" light />
        <div className="wrap-wide">
          <RevealSection style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <p className="sr sr-up label-light">SUSȚINE LANSAREA</p>
              <h2 className="sr sr-left sr-d1" style={{ ...T9, fontSize: 'clamp(2rem,4vw,4.5rem)', color: 'white' }}>
                DEVINO<br />PARTENER.
              </h2>
              <p className="sr sr-up sr-d2" style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', fontWeight: 300, maxWidth: 420, marginBottom: 36 }}>
                Fiecare donație pe care o faci va fi dublată de ARC până la $50.000.
              </p>
              <div className="sr sr-up sr-d3">
                <Link href="/give" className="btn btn-white">Donează</Link>
              </div>
            </div>
            <div className="sr sr-right sr-d1">
              <FundraiserCompact variant="side" />
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
            <h2 className="sr sr-left sr-d1" style={{ ...T9, fontSize: 'clamp(2.5rem,7vw,7rem)', color: 'white', marginBottom: 48 }}>
              MOMENTUL<br />
              <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)', color: 'transparent' }}>E ACUM.</span>
            </h2>
            <p className="sr sr-up sr-d2" style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', maxWidth: 420, lineHeight: 1.8, fontWeight: 300, marginBottom: 36 }}>
              Fie că vrei să vii, să te rogi, să te implici sau să susții financiar — există un loc pentru tine în Momentum.
            </p>
            <div className="sr sr-up sr-d3">
              <Link href="/connect" className="btn btn-navy">Contactează-ne</Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  )
}
