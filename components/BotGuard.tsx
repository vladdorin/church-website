'use client'

import Script from 'next/script'

// Protecție anti-spam pentru formulare, pusă în interiorul <form>:
//  - „website”: câmp-capcană invizibil pentru oameni; boții îl completează și sunt ignorați de /api/form;
//  - Cloudflare Turnstile (gratuit), doar dacă e setat NEXT_PUBLIC_TURNSTILE_SITE_KEY. Widget-ul adaugă
//    în formular câmpul „cf-turnstile-response”, verificat pe server cu TURNSTILE_SECRET_KEY.
// În pagină: website: formData.get('website'), turnstile: formData.get('cf-turnstile-response').

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export default function BotGuard() {
  return (
    <>
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
          <div className="cf-turnstile" data-sitekey={SITE_KEY} data-theme="light" style={{ marginBottom: '1rem' }} />
        </>
      )}
    </>
  )
}
