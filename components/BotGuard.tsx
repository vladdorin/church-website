'use client'

import { useEffect, useRef } from 'react'

// Protecție anti-spam pentru formulare, pusă în interiorul <form>:
//  - „website”: câmp-capcană invizibil pentru oameni; boții îl completează și sunt ignorați de /api/form;
//  - Cloudflare Turnstile (gratuit), doar dacă e setat NEXT_PUBLIC_TURNSTILE_SITE_KEY. Widget-ul adaugă
//    în formular câmpul „cf-turnstile-response”, verificat pe server cu TURNSTILE_SECRET_KEY.
// În pagină: website: formData.get('website'), turnstile: formData.get('cf-turnstile-response').
//
// Widget-ul se desenează explicit (render=explicit), la fiecare afișare a formularului: cu desenarea automată,
// scriptul caută widget-uri doar la prima încărcare, deci pe o pagină deschisă din meniu (fără reîncărcare)
// formularul rămânea fără verificare și era respins.

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

type Turnstile = {
  render(el: HTMLElement, options: Record<string, unknown>): string
  reset(id: string): void
  remove(id: string): void
}
declare global {
  interface Window {
    turnstile?: Turnstile
  }
}

let loading: Promise<void> | null = null
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve()
  loading ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => {
      loading = null
      reject(new Error('Turnstile nu s-a încărcat'))
    }
    document.head.appendChild(s)
  })
  return loading
}

export default function BotGuard() {
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = box.current
    if (!SITE_KEY || !el) return
    let id: string | undefined
    let cancelled = false
    loadTurnstile()
      .then(() => {
        if (!cancelled && window.turnstile) id = window.turnstile.render(el, { sitekey: SITE_KEY, theme: 'light' })
      })
      .catch(err => console.error(err))

    // Tokenul e bun o singură dată: după fiecare trimitere cerem altul, ca o nouă încercare să nu fie respinsă.
    // (Cu o mică întârziere, ca pagina să apuce să citească tokenul curent din formular.)
    const form = el.closest('form')
    const onSubmit = () => setTimeout(() => id && window.turnstile?.reset(id), 1500)
    form?.addEventListener('submit', onSubmit)

    return () => {
      cancelled = true
      form?.removeEventListener('submit', onSubmit)
      if (id) window.turnstile?.remove(id)
    }
  }, [])

  return (
    <>
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {SITE_KEY && <div ref={box} style={{ marginBottom: '1rem', minHeight: 65 }} />}
    </>
  )
}
