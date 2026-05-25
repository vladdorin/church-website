'use client'
import { useEffect, useRef, useState, ReactNode, CSSProperties } from 'react'
import LocalizedLink from '@/components/LocalizedLink'
import Image from 'next/image'
import CountdownHero from '@/components/CountdownHero'
import { FundraiserCompact } from '@/components/FundraiserBar'
import PhotoCarousel from '@/components/PhotoCarousel'

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
  { titlu: 'Connect',      desc: 'Share the message and bring your friends. Every person matters in Alba Iulia.',        bg: '#7b9aff', col: '#080c1e' },
  { titlu: 'Pray',         desc: 'Stand with us in prayer for this city and for the launch in October 2026.',   bg: '#080c1e', col: '#f4f2ee' },
  { titlu: 'Get Involved', desc: 'Use your gifts and talents to help build this community from the ground up.',         bg: '#f0ede8', col: '#080c1e' },
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const onScroll = () => {
      const el = ref.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const vh   = window.innerHeight
      const start = vh * 0.95
      const end   = vh * 0.65
      const raw   = (start - rect.top) / (start - end)
      setP(Math.min(1, Math.max(0, raw)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  const ep   = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
  const lerp = (a: number, b: number) => a + (b - a) * ep

  // ── MOBILE: cards stacked vertically, each fully visible ──
  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {STACK_CARDS.map(({ titlu, desc, bg, col }, i) => (
          <div key={i} style={{
            background: bg,
            padding: '28px 28px 32px',
            display: 'flex', flexDirection: 'column', gap: 12,
            borderRadius: 20, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', right: -8, bottom: -16,
              fontFamily: "'Climate Crisis',sans-serif",
              fontSize: 120, lineHeight: 1,
              color: col, opacity: 0.07,
              pointerEvents: 'none', userSelect: 'none',
            }}>{titlu[0]}</div>
            <h3 style={{
              fontFamily: "'Climate Crisis',sans-serif",
              fontSize: '1.35rem',
              color: col, lineHeight: 1.1,
              position: 'relative', zIndex: 1, margin: 0,
            }}>{titlu.toUpperCase()}</h3>
            <p style={{
              fontSize: 14, color: col, opacity: 0.6,
              fontWeight: 300, lineHeight: 1.75, margin: 0,
              position: 'relative', zIndex: 1,
            }}>{desc}</p>
          </div>
        ))}
      </div>
    )
  }

  // ── DESKTOP: fan-out animation, compact cards ──
  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, borderRadius: 24, overflow: 'hidden' }}>
      {STACK_CARDS.map(({ titlu, desc, bg, col }, i) => {
        const { tx, rot, sc, z } = STACK_INIT[i]
        return (
          <div key={i} style={{
            background: bg,
            padding: 'clamp(32px,3.5vw,44px) clamp(28px,3.5vw,44px)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'flex-start', gap: 16,
            position: 'relative', overflow: 'hidden',
            borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            transform: `translateX(${lerp(tx, 0)}%) rotate(${lerp(rot, 0)}deg) scale(${lerp(sc, 1)})`,
            zIndex: z,
            willChange: 'transform',
          }}>
            <div style={{
              position: 'absolute', right: -8, bottom: -20,
              fontFamily: "'Climate Crisis',sans-serif",
              fontSize: 'clamp(110px,16vw,180px)', lineHeight: 1,
              color: col, opacity: 0.07,
              pointerEvents: 'none', userSelect: 'none',
            }}>{titlu[0]}</div>
            <h3 style={{
              fontFamily: "'Climate Crisis',sans-serif",
              fontSize: 'clamp(1rem,1.5vw,1.5rem)',
              color: col, lineHeight: 1.1, position: 'relative', zIndex: 1,
              whiteSpace: 'nowrap',
            }}>{titlu.toUpperCase()}</h3>
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
        <div style={{ display: 'flex', animation: 'ticker 20s linear infinite', whiteSpace: 'nowrap' }}>
          {Array(10).fill(null).map((_, i) => (
            <span key={i} style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', flexShrink: 0 }}>
              &nbsp;·&nbsp; A church in Alba Iulia for everyone &nbsp;·&nbsp; You are welcome just as you are
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════ 01 — WHO WE ARE ═══════════ */}
      <section className="page-section" style={{ background: '#f4f2ee', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <GhostNum num="01" />
        <div className="wrap-wide">
          <RevealSection className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left: text */}
            <div>
              <p className="sr sr-up label">WHO ARE WE?</p>
              <h2 className="sr sr-left sr-d1" style={{ ...T9, fontSize: 'clamp(2rem,4vw,4.5rem)', color: '#080c1e' }}>
                JOHN &amp;<br />VOICHI<br />DURA.
              </h2>
              <p className="sr sr-up sr-d2" style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(8,12,30,0.6)', fontWeight: 300, maxWidth: 420, marginBottom: 12 }}>
                Momentum Church began from a calling for the young generation of Alba Iulia and from the desire to build a community where people can know God and feel at home.
              </p>
              <p className="sr sr-up sr-d2" style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(8,12,30,0.45)', fontWeight: 300, maxWidth: 420, marginBottom: 36, fontStyle: 'italic' }}>
                "We&apos;re not just building a church. We&apos;re building a place people can call home."
              </p>
              {/* Desktop button — hidden on mobile */}
              <div className="sr sr-up sr-d3 btn-desktop">
                <LocalizedLink href="/about" className="btn btn-dark">Meet Us</LocalizedLink>
              </div>
            </div>

            {/* Right: photo card */}
<div className="sr sr-right sr-d1">
  <div
    className="photo-card-wrap"
    style={{
      aspectRatio: '4/5',
      maxHeight: 500,

      background:
        'linear-gradient(160deg,#1932af 0%,#080c1e 100%)',

      borderRadius: 28,

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      position: 'relative',
      overflow: 'hidden',

      boxShadow:
        '0 40px 120px rgba(8,12,30,0.22)',
    }}
  >
    <Image
      src="/john-voichi.jpg"
      alt="John and Voichi Dura"
      fill
      style={{
        objectFit: 'cover',
        objectPosition: 'center top',
      }}
    />

    {/* subtle cinematic overlay */}
    <div
      style={{
        position: 'absolute',
        inset: 0,

        background:
          'linear-gradient(135deg, rgba(255,255,255,0.08), transparent 32%)',

        pointerEvents: 'none',
      }}
    />

    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,

        background:
          'linear-gradient(to top, rgba(8,12,30,0.9), transparent)',

        padding: '32px 28px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 32,
            height: 2,
            background: 'rgba(255,255,255,0.5)',
            flexShrink: 0,
          }}
        />

        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          Pastors · Momentum Church
        </p>
      </div>
    </div>
  </div>
</div>
            {/* Mobile button — after photo, hidden on desktop */}
            <div className="btn-mobile-after section-01-button">
              <LocalizedLink href="/about" className="btn btn-dark">Meet Us</LocalizedLink>
            </div>

          </RevealSection>
        </div>
      </section>

<PhotoCarousel />



      {/* ═══════════ 02 — OUR MISSION ═══════════ */}
      <section className="page-section" style={{ background: '#080c1e', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="ghost-num" style={{
  	position: 'absolute', left: '-3%', top: '50%', transform: 'translateY(-50%)',
  	fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
  	fontSize: 'clamp(12rem,30vw,28rem)', lineHeight: 1, letterSpacing: '-0.05em',
  	color: 'rgba(255,255,255,0.05)',
  	pointerEvents: 'none', userSelect: 'none',
	}}>02</div>
        <div className="wrap-wide">
          <RevealSection style={{ maxWidth: 680, marginLeft: 'auto', textAlign: 'right' }}>
            <p className="sr sr-up label-light">OUR MISSION</p>
            <h2 className="sr sr-left sr-d1" style={{ ...T9, fontSize: 'clamp(2rem,4vw,4.5rem)', color: 'white' }}>
              WHY DOES<br />MOMENTUM EXIST?
            </h2>
            <p className="sr sr-up sr-d2" style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', fontWeight: 300, maxWidth: 520, marginBottom: 36, marginLeft: 'auto' }}>
              We exist to build a life-giving community in Alba Iulia, a place where people meet God, grow in authentic community, and live out the purpose He has given them.
            </p>
            <div className="sr sr-up sr-d3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <LocalizedLink href="/misiunea-noastra" className="btn btn-white">Discover the Mission</LocalizedLink>
            </div>
          </RevealSection>
        </div>
      </section>

{/* ═══════════ 03 — JOIN US ═══════════ */}
      <section style={{ background: '#ffffff', position: 'relative' }}>

        {/* Single sticky container — locks header + cards together */}
        <div className="join-sticky" style={{
          position: 'sticky', top: 80,
          height: 'calc(100vh - 160px)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          background: '#ffffff',
        }}>

          {/* Ghost 03 */}
          <div className="ghost-num" style={{
            position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%)',
            fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
            fontSize: 'clamp(12rem,30vw,28rem)', lineHeight: 1, letterSpacing: '-0.05em',
            color: 'rgba(8,12,30,0.05)',
            pointerEvents: 'none', userSelect: 'none',
          }}>03</div>

          {/* Header content */}
          <div style={{ paddingTop: 48, paddingBottom: 40, position: 'relative', zIndex: 1 }}>
            <div className="wrap-wide">
              <RevealSection
                className="grid-2col join-mobile-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 80,
                  alignItems: 'flex-start',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div className="join-text-col">
                  <h2 className="sr sr-left sr-d1" style={{ ...T9, fontSize: 'clamp(2rem,4vw,4.5rem)', color: '#080c1e', whiteSpace: 'nowrap' }}>
                    JOIN US.
                  </h2>
                  <p className="sr sr-up sr-d1" style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(8,12,30,0.55)', fontWeight: 300, marginBottom: 36, maxWidth: 420 }}>
                    You are welcome exactly as you are. We need your talent, energy, and heart to build this community.
                  </p>
                  <div className="sr sr-up sr-d2 btn-desktop">
                    <LocalizedLink href="/join" className="btn btn-dark">Join the Team</LocalizedLink>
                  </div>
                </div>

                <div
  className="sr sr-right sr-d1 join-image-col"
  style={{
    display: 'flex',
    alignItems: 'center',
  }}
>
  <div
    className="join-photo-wrap"
    style={{
      width: '100%',
      maxWidth: 380,
      aspectRatio: '7/5',

      borderRadius: 28,

      overflow: 'hidden',
      position: 'relative',

      boxShadow: '0 40px 120px rgba(8,12,30,0.18)',
    }}
  >
    <Image
      src="/echipa.jpg"
      alt="Momentum Team"
      fill
      style={{
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
  </div>
</div>

                </RevealSection>
            </div>
          </div>

          {/* Cards — remain visible while scrolling through the section */}
<div style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
  <div className="wrap-wide">
    <StackedCards />

    <div className="join-bottom-cta">
      <LocalizedLink href="/join" className="btn btn-dark">Join the Team</LocalizedLink>
    </div>
  </div>
</div>


        </div>
      </section>

      {/* ═══════════ 04 — PRAYER ═══════════ */}
<section className="page-section prayer-section-home" style={{ background: '#f4f2ee', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
  <GhostNum num="04" />
  <div className="wrap-wide">
    <RevealSection
      className="prayer-home-grid"
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}
    >

     {/* Left: photo */}
<div className="sr sr-left sr-d1 prayer-home-image">
  <div
    style={{
      aspectRatio: '4/5',
      maxHeight: 500,

      borderRadius: 28,

      position: 'relative',
      overflow: 'hidden',

      boxShadow:
        '0 40px 120px rgba(8,12,30,0.18)',
    }}
  >
    <Image
      src="/rugaciune.jpg"
      alt="Prayer"
      fill
      style={{
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
  </div>
</div>

      {/* Right: text */}
      <div className="prayer-home-text" style={{ textAlign: 'right' }}>
        <h2 className="sr sr-left sr-d1" style={{ ...T9, fontSize: 'clamp(2rem,4vw,4.5rem)', color: '#080c1e' }}>
          DO YOU NEED<br />PRAYER?
        </h2>

        <p className="sr sr-up sr-d2" style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(8,12,30,0.55)', fontWeight: 300, maxWidth: 520, marginBottom: 36, marginLeft: 'auto' }}>
          Our team prays daily for Alba Iulia and the people in it. Send us your request.
        </p>

        <div className="sr sr-up sr-d3 prayer-home-button" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LocalizedLink href="/pray" className="btn btn-dark">Stand With Us</LocalizedLink>
        </div>
      </div>

    </RevealSection>
  </div>
</section>

      {/* ═══════════ 05 — DONATIONS ═══════════ */}
      <section className="page-section" style={{ background: '#0b1628', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <GhostNum num="05" light />
        <div className="wrap-wide">
          <RevealSection className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <p className="sr sr-up label-light">SUPPORT THE LAUNCH</p>
              <h2 className="sr sr-left sr-d1" style={{ ...T9, fontSize: 'clamp(2rem,4vw,4.5rem)', color: 'white' }}>
                BECOME A<br />PARTNER.
              </h2>
              <p className="sr sr-up sr-d2" style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', fontWeight: 300, maxWidth: 420, marginBottom: 20 }}>
                Every donation you make will be matched by ARC up to $50,000.
              </p>
              {/* Desktop button — hidden on mobile */}
              <div className="sr sr-up sr-d3 btn-desktop">
                <LocalizedLink href="/give" className="btn btn-white">Give</LocalizedLink>
              </div>
            </div>
            <div className="sr sr-right sr-d1 donation-progress-mobile">
  <FundraiserCompact variant="side" />
</div>
            {/* Mobile button — after progress bar, hidden on desktop */}
            <div className="btn-mobile-after">
              <LocalizedLink href="/give" className="btn btn-white">Give</LocalizedLink>
            </div>
          </RevealSection>
        </div>
      </section>
      <Diagonal to="#080c1e" />

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="page-section" style={{ background: '#080c1e', padding: '112px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="cta-ghost" style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          fontFamily: "'Climate Crisis',sans-serif",
          fontSize: 'clamp(5rem,17vw,16rem)', color: 'rgba(255,255,255,0.025)',
          lineHeight: 1, whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
        }}>MOMENTUM</div>
        <div className="wrap-wide" style={{ position: 'relative', zIndex: 1 }}>
          <RevealSection>
            <h2 className="sr sr-left sr-d1" style={{ ...T9, fontSize: 'clamp(2.5rem,7vw,7rem)', color: 'white', marginBottom: 48 }}>
              THE MOMENT<br />
              <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)', color: 'transparent' }}>IS NOW.</span>
            </h2>
            <p className="sr sr-up sr-d2" style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', maxWidth: 420, lineHeight: 1.8, fontWeight: 300, marginBottom: 36 }}>
              Whether you want to come, pray, get involved or donate, there is a place for you in Momentum.
            </p>
            <div className="sr sr-up sr-d3">
              <LocalizedLink href="/connect" className="btn btn-navy">Contact Us</LocalizedLink>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  )
}
