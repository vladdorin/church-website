'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/about',            label: 'Cine suntem?' },
  { href: '/misiunea-noastra', label: 'Misiunea noastră' },
  { href: '/pray',             label: 'Rugăciune' },
  { href: '/join',             label: 'Alătură-te' },
  { href: '/connect',          label: 'Contact' },
]

export default function Navigation() {
  const [open, setOpen]       = useState(false)
  const [mobile, setMobile]   = useState(false)
  const pathname              = usePathname()

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Închide meniul când schimbă pagina
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header style={{
      background: '#080c1e',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div className="wrap-wide" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 88,
      }}>

        {/* ── LOGO ── */}
        <Link href="/" style={{display:'flex', alignItems:'center', flexShrink:0, marginLeft: -12}}>
          <Image
            src="/logo-horizontal.png"
            alt="Momentum"
            width={260} height={60}
            style={{height:220, width:'auto'}}
            priority
          />
        </Link>

        {/* ── DESKTOP NAV ── */}
        {!mobile && (
          <nav style={{display:'flex', alignItems:'center', gap:4}}>
            {links.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`nav-link${pathname === href ? ' active' : ''}`}>
                {label}
              </Link>
            ))}
            <Link href="/give" className="btn-donate">
              <span>Donează</span>
              <span className="donate-arrow">→</span>
            </Link>
          </nav>
        )}

        {/* ── HAMBURGER ── */}
        {mobile && (
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Meniu"
            style={{
              background:'transparent', border:'none',
              cursor:'pointer', padding:10,
              display:'flex', flexDirection:'column',
              gap:5, alignItems:'center', justifyContent:'center',
            }}
          >
            <span style={{
              display:'block', width:24, height:2, background:'white',
              transition:'all 0.25s ease',
              transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }} />
            <span style={{
              display:'block', width:24, height:2, background:'white',
              transition:'all 0.25s ease',
              opacity: open ? 0 : 1,
            }} />
            <span style={{
              display:'block', width:24, height:2, background:'white',
              transition:'all 0.25s ease',
              transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }} />
          </button>
        )}
      </div>

      {/* ── MOBILE DROPDOWN ── */}
      {mobile && open && (
        <div style={{
          background:'#080c1e',
          borderTop:'1px solid rgba(255,255,255,0.07)',
          padding:'16px 24px 24px',
        }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href}
              onClick={() => setOpen(false)}
              style={{
                display:'block',
                fontFamily:"'Montserrat', sans-serif",
                fontSize:16, fontWeight:600,
                color: pathname === href ? 'white' : 'rgba(255,255,255,0.7)',
                padding:'14px 16px',
                borderRadius:10,
                textDecoration:'none',
                borderBottom:'1px solid rgba(255,255,255,0.05)',
              }}>
              {label}
            </Link>
          ))}
          <Link href="/give" onClick={() => setOpen(false)}
            style={{
              display:'block', marginTop:16,
              background:'#1932af', color:'white',
              textAlign:'center',
              fontFamily:"'Montserrat', sans-serif",
              fontSize:14, fontWeight:700,
              letterSpacing:'0.08em', textTransform:'uppercase',
              padding:'15px 24px', borderRadius:999,
              textDecoration:'none',
            }}>
            Donează →
          </Link>
        </div>
      )}
    </header>
  )
}
