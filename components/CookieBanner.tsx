'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('momentum_cookie_consent')
    if (!consent) setShow(true)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('momentum_cookie_consent', 'accepted')
    setShow(false)
  }

  const rejectCookies = () => {
    localStorage.setItem('momentum_cookie_consent', 'rejected')
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      style={{
        position: 'fixed',
        left: 20,
        right: 20,
        bottom: 20,
        zIndex: 9999,
        background: '#0a0f2c',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 18,
        padding: 20,
        boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
        maxWidth: 720,
        margin: '0 auto',
      }}
    >
      <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
        Folosim cookie-uri
      </p>

      <p
        style={{
          color: 'rgba(255,255,255,0.65)',
          fontSize: 14,
          lineHeight: 1.6,
          marginBottom: 18,
        }}
      >
         Folosim cookie-uri pentru funcționarea corectă a site-ului și pentru a vă
  oferi o experiență cât mai bună în timpul navigării. Puteți afla mai multe
  în{' '}
        <Link
          href="/politica-cookies"
          style={{
            color: '#b6d8fc',
            fontWeight: 600,
            textDecoration: 'underline',
          }}
        >
          Politica Cookies
        </Link>
        .
      </p>

      <div
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
        }}
      >
        <button
          onClick={rejectCookies}
          style={{
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'transparent',
            color: 'white',
            borderRadius: 999,
            padding: '10px 18px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Refuz
        </button>

        <button
          onClick={acceptCookies}
          style={{
            border: 'none',
            background: '#b6d8fc',
            color: '#0a0f2c',
            borderRadius: 999,
            padding: '10px 18px',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          Accept
        </button>
      </div>
    </div>
  )
}