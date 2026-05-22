'use client'
import { useEffect, useState } from 'react'
import { FUNDRAISER } from '@/lib/fundraiser'
import { usePathname } from 'next/navigation'

/* ── Helpers ─────────────────────────────────────────────── */
function fmt(n: number) {
  return '$' + n.toLocaleString('en-US')
}

function useAnimatedPct(target: number, delay = 350) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      let cur = 0
      const tick = () => {
        cur += (target - cur) * 0.09 + 0.06
        if (cur >= target) { setPct(target); return }
        setPct(cur)
        requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(t)
  }, [target, delay])
  return pct
}

/* ══════════════════════════════════════════════════════════
   COMPACT — landing page (dark background)
   variant="side" → in right column, no top border
   ══════════════════════════════════════════════════════════ */
export function FundraiserCompact({ variant = 'below' }: { variant?: 'below' | 'side' }) {
  const rawPct   = Math.min((FUNDRAISER.raised / FUNDRAISER.goal) * 100, 100)
  const animPct  = useAnimatedPct(rawPct)
  const pathname = usePathname()
  const isEnglish = pathname.startsWith('/en')

  return (
    <div style={variant === 'side' ? {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 20,
      padding: '32px 28px',
    } : {
      marginTop: 40,
      paddingTop: 32,
      borderTop: '1px solid rgba(255,255,255,0.09)',
    }}>
      {/* Amounts row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 5 }}>
            {isEnglish ? 'Raised so far' : 'Strânse până acum'}
          </p>
          <p style={{
            fontFamily: "'Climate Crisis',sans-serif",
            fontSize: 'clamp(1.4rem,2vw,1.9rem)',
            color: 'white', lineHeight: 1,
          }}>
            {fmt(FUNDRAISER.raised)}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 5 }}>
            {isEnglish ? 'Goal' : 'Obiectiv'}
          </p>
          <p style={{
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 800, fontSize: 14,
            color: 'rgba(255,255,255,0.45)',
          }}>
            {fmt(FUNDRAISER.goal)}
          </p>
        </div>
      </div>

      {/* Bar track */}
      <div style={{
        height: 5, background: 'rgba(255,255,255,0.07)',
        borderRadius: 99, overflow: 'hidden', marginBottom: 10,
      }}>
        <div style={{
          height: '100%',
          width: `${animPct}%`,
          background: 'linear-gradient(90deg,#1932af,#7b9aff)',
          borderRadius: 99,
        }} />
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', fontWeight: 300 }}>
          {isEnglish
  ? `${FUNDRAISER.donors} donors · every $1 matched by ARC`
  : `${FUNDRAISER.donors} susținători · fiecare $1 dublat de ARC`}
        </p>
        <p style={{
          fontFamily: "'Montserrat',sans-serif",
          fontWeight: 800, fontSize: 12,
          color: '#7b9aff', letterSpacing: '0.02em',
        }}>
          {animPct.toFixed(1)}%
        </p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   FULL — give page (replaces static goal block)
   ══════════════════════════════════════════════════════════ */
export function FundraiserFull() {
  const rawPct  = Math.min((FUNDRAISER.raised / FUNDRAISER.goal) * 100, 100)
  const animPct = useAnimatedPct(rawPct, 500)
  const pathname = usePathname()
  const isEnglish = pathname.startsWith('/en')

  const stats = [
  {
    label: isEnglish ? 'Raised so far' : 'Strânse până acum',
    value: fmt(FUNDRAISER.raised),
    accent: true
  },
  {
    label: isEnglish ? 'Goal' : 'Obiectiv',
    value: fmt(FUNDRAISER.goal),
    accent: false
  },
  {
    label: isEnglish ? 'Supporters' : 'Susținători',
    value: String(FUNDRAISER.donors),
    accent: false
  },
]

  return (
    <div style={{
      background: '#080c1e',
      borderRadius: 28,
      padding: 'clamp(32px,4vw,52px)',
      color: 'white',
    }}>

      {/* ── Stat chips ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3, marginBottom: 36 }}>
        {stats.map(({ label, value, accent }, i) => (
          <div key={label} style={{
            background: accent ? '#1932af' : 'rgba(255,255,255,0.04)',
            borderRadius:
              i === 0 ? '16px 4px 4px 16px' :
              i === 2 ? '4px 16px 16px 4px' : 4,
            padding: '22px 20px',
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: accent ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.28)',
              marginBottom: 7,
            }}>{label}</p>
            <p style={{
              fontFamily: "'Climate Crisis',sans-serif",
              fontSize: 'clamp(1.2rem,2vw,1.9rem)',
              color: 'white', lineHeight: 1,
            }}>{value}</p>
          </div>
        ))}
      </div>

      {/* ── Big percentage ── */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={{
          fontFamily: "'Climate Crisis',sans-serif",
          fontSize: 'clamp(3.5rem,8vw,6rem)',
          color: 'white', lineHeight: 1,
        }}>
          {animPct.toFixed(1)}
        </span>
        <span style={{
          fontFamily: "'Climate Crisis',sans-serif",
          fontSize: 'clamp(1.5rem,3vw,2.5rem)',
          color: 'rgba(255,255,255,0.3)',
        }}>%</span>
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
          marginTop: 6,
        }}>{isEnglish ? 'of goal reached' : 'din obiectiv atins'}</p>
      </div>

      {/* ── Progress bar ── */}
      <div style={{
        position: 'relative', height: 14,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 99, overflow: 'hidden',
        marginBottom: 8,
      }}>
        <div style={{
          height: '100%',
          width: `${animPct}%`,
          background: 'linear-gradient(90deg,#0f1052,#1932af 50%,#7b9aff)',
          borderRadius: 99,
          boxShadow: '0 0 24px rgba(25,50,175,0.55)',
        }} />
      </div>

      {/* ── Milestone ticks ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '0%', paddingRight: '0%', marginBottom: 28 }}>
        {[0, 25, 50, 75, 100].map(m => (
          <div key={m} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div style={{
              width: 1, height: 6,
              background: rawPct >= m ? 'rgba(123,154,255,0.5)' : 'rgba(255,255,255,0.08)',
            }} />
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
              color: rawPct >= m ? 'rgba(123,154,255,0.55)' : 'rgba(255,255,255,0.15)',
            }}>{m}%</span>
          </div>
        ))}
      </div>

      {/* ── ARC match note ── */}
      <div style={{
        background: 'rgba(25,50,175,0.15)',
        border: '1px solid rgba(25,50,175,0.3)',
        borderRadius: 12, padding: '14px 20px',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: '#1932af',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, flexShrink: 0,
        }}>✦</div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.6 }}>
          {isEnglish ? (
  <>
    With the partnership of{' '}
    <strong style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>
      ARC
    </strong>
    , every $1 donated is matched —
    your goal of {fmt(FUNDRAISER.goal)} becomes{' '}
    <strong style={{ color: 'white', fontWeight: 700 }}>
      {fmt(FUNDRAISER.goal * 2)} total impact
    </strong>.
  </>
) : (
  <>
    Cu parteneriatul{' '}
    <strong style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>
      ARC
    </strong>
    , fiecare $1 donat este dublat —
    obiectivul tău de {fmt(FUNDRAISER.goal)} devine{' '}
    <strong style={{ color: 'white', fontWeight: 700 }}>
      {fmt(FUNDRAISER.goal * 2)} impact total
    </strong>.
  </>
)}
        </p>
      </div>

    </div>
  )
}
