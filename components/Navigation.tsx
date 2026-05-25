'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const roLinks = [
  { href: '/about',            label: 'Cine suntem?' },
  { href: '/misiunea-noastra', label: 'Misiunea noastră' },
  { href: '/pray',             label: 'Rugăciune' },
  { href: '/join',             label: 'Alătură-te' },
  { href: '/connect',          label: 'Contact' },
]

const enLinks = [
  { href: '/en/about',            label: 'Who we are?' },
  { href: '/en/misiunea-noastra', label: 'Our mission' },
  { href: '/en/pray',             label: 'Prayer' },
  { href: '/en/join',             label: 'Join us' },
  { href: '/en/connect',          label: 'Contact' },
]

export default function Navigation() {
  const [open, setOpen]       = useState(false)
  const [mobile, setMobile]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname              = usePathname()

  const isEnglish = pathname.startsWith('/en')

  const links = isEnglish ? enLinks : roLinks

  const homeHref = isEnglish ? '/en' : '/'

  const giveHref = isEnglish ? '/en/give' : '/give'

  const donateLabel = isEnglish ? 'Give' : 'Donează'

  const switchHref = isEnglish
    ? pathname.replace('/en', '') || '/'
    : `/en${pathname}`

  const switchLabel = isEnglish ? 'RO' : 'EN'

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Fixed header */}
      <header style={{
        background: scrolled
          ? 'rgba(8, 12, 30, 0.97)'
          : '#080c1e',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.45)' : 'none',
        transition: 'background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
      }}>
        <div className="wrap-wide" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 88,
          padding: '0 32px',
        }}>

          {/* ── LOGO ── */}
          <Link
            href={homeHref}
            style={{display:'flex', alignItems:'center', flexShrink:0, marginLeft: -15}}
          >
            <Image
              src="/logo-horizontal.png"
              alt="Momentum"
              width={260}
              height={60}
              style={{height:260, width:'auto'}}
              priority
            />
          </Link>

          {/* ── DESKTOP NAV ── */}
          {!mobile && (
            <nav style={{display:'flex', alignItems:'center', gap:4}}>
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link${pathname === href ? ' active' : ''}`}
                >
                  {label}
                </Link>
              ))}

              <Link href={switchHref} className="nav-link">
                {switchLabel}
              </Link>

              <Link href={giveHref} className="btn-donate">
                <span>{donateLabel}</span>
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
                background:'transparent',
                border:'none',
                cursor:'pointer',
                padding:10,
                display:'flex',
                flexDirection:'column',
                gap:5,
                alignItems:'center',
                justifyContent:'center',
              }}
            >
              <span style={{
                display:'block',
                width:24,
                height:2,
                background:'white',
                transition:'all 0.25s ease',
                transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }} />

              <span style={{
                display:'block',
                width:24,
                height:2,
                background:'white',
                transition:'all 0.25s ease',
                opacity: open ? 0 : 1,
              }} />

              <span style={{
                display:'block',
                width:24,
                height:2,
                background:'white',
                transition:'all 0.25s ease',
                transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }} />
            </button>
          )}
        </div>

        {/* ── MOBILE DROPDOWN ── */}
        {mobile && open && (
          <div style={{
            background:'rgba(8, 12, 30, 0.97)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop:'1px solid rgba(255,255,255,0.07)',
            padding:'16px 24px 24px',
          }}>

            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  display:'block',
                  fontFamily:"'Montserrat', sans-serif",
                  fontSize:16,
                  fontWeight:600,
                  color: pathname === href ? 'white' : 'rgba(255,255,255,0.7)',
                  padding:'14px 16px',
                  borderRadius:10,
                  textDecoration:'none',
                  borderBottom:'1px solid rgba(255,255,255,0.05)',
                }}
              >
                {label}
              </Link>
            ))}

            <Link
              href={switchHref}
              onClick={() => setOpen(false)}
              style={{
                display:'block',
                fontFamily:"'Montserrat', sans-serif",
                fontSize:16,
                fontWeight:600,
                color:'rgba(255,255,255,0.7)',
                padding:'14px 16px',
                borderRadius:10,
                textDecoration:'none',
                borderBottom:'1px solid rgba(255,255,255,0.05)',
              }}
            >
              {switchLabel}
            </Link>

            <Link
              href={giveHref}
              onClick={() => setOpen(false)}
              style={{
                display:'block',
                marginTop:16,
                background:'#1932af',
                color:'white',
                textAlign:'center',
                fontFamily:"'Montserrat', sans-serif",
                fontSize:14,
                fontWeight:700,
                letterSpacing:'0.08em',
                textTransform:'uppercase',
                padding:'15px 24px',
                borderRadius:999,
                textDecoration:'none',
              }}
            >
              {donateLabel} →
            </Link>
          </div>
        )}
      </header>

      {/* Spacer to push page content below the fixed header */}
      <div style={{ height: 88 }} aria-hidden="true" />
    </>
  )
}
