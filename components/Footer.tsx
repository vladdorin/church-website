'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a0f2c"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

export default function Footer() {
  const pathname = usePathname()
  const isEnglish = pathname.startsWith('/en')
  const socials: [string, string, React.FC][] = [
  ['https://facebook.com/bisericamomentum', 'Facebook', FacebookIcon],
  ['https://instagram.com/biserica.momentum', 'Instagram', InstagramIcon],
  ['https://youtube.com/@bisericamomentum', 'YouTube', YoutubeIcon],
  ['https://whatsapp.com/channel/0029Vb6aUifIyPtZ3wzObi0l', 'WhatsApp', WhatsAppIcon],
]

  return (
    <footer style={{ background:'#0a0f2c', color:'white', marginTop:'auto', position:'relative', overflow:'hidden' }}>

      {/* ── Logo gigant în fundal ── */}
      <div style={{
        position: 'absolute',
        bottom:0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        maxWidth: 1100,
        minWidth: 320,
        height: '550px',
        opacity: 0.12,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        <Image
          src="/logo-symbol.png"
          alt=""
          fill
          style={{ objectFit: 'contain', objectPosition: 'center bottom', filter: 'brightness(10)' }}
        />
      </div>

      {/* ── Conținut ── */}
      <div className="wrap-wide" style={{ paddingTop:'72px', paddingBottom:'48px', position:'relative', zIndex:1 }}>
        <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr', gap:48, paddingBottom:48, borderBottom:'1px solid rgba(255,255,255,0.08)' }}>

          {/* Brand */}
<div className="footer-brand">

<p
  style={{
    fontSize:11,
    fontWeight:700,
    letterSpacing:'0.18em',
    textTransform:'uppercase',
    color:'rgba(255,255,255,0.3)',
    marginBottom:20
  }}
>
  {isEnglish ? 'Policies' : 'Politici'}
</p>

  <div
    style={{
      display:'flex',
      flexDirection:'column',
      gap:10,
    }}
  >
    <Link
      href={isEnglish ? '/en/privacy-policy' : '/politica-de-confidentialitate'}
      style={{
        color:'rgba(255,255,255,0.55)',
        fontSize:14,
        textDecoration:'none',
      }}
    >
      {isEnglish ? 'Privacy Policy' : 'Politică de Confidențialitate'}
    </Link>

    <Link
      href={isEnglish ? '/en/terms-and-conditions' : '/termeni-si-conditii'}
      style={{
        color:'rgba(255,255,255,0.55)',
        fontSize:14,
        textDecoration:'none',
      }}
    >
      {isEnglish ? 'Terms & Conditions' : 'Termeni și Condiții'}
    </Link>

    <Link
      href={isEnglish ? '/en/cookie-policy' : '/politica-cookies'}
      style={{
        color:'rgba(255,255,255,0.55)',
        fontSize:14,
        textDecoration:'none',
      }}
    >
      {isEnglish ? 'Cookie Policy' : 'Politica Cookies'}
    </Link>
  </div>
</div>

          {/* Pagini */}
          <div>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:20 }}>{isEnglish ? 'Pages' : 'Pagini'}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {(
  isEnglish
    ? [
        ['/en/about','Who we are?'],
        ['/en/misiunea-noastra','Our mission'],
        ['/en/pray','Prayer'],
        ['/en/join','Join us'],
        ['/en/give','Give'],
        ['/en/connect','Contact']
      ]
    : [
        ['/about','Cine suntem?'],
        ['/misiunea-noastra','Misiunea noastră'],
        ['/pray','Rugăciune'],
        ['/join','Alătură-te'],
        ['/give','Donează'],
        ['/connect','Contact']
      ]
).map(([href, label]) => (
                <Link key={href} href={href} style={{ color:'rgba(255,255,255,0.55)', fontSize:14, textDecoration:'none' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact + Social */}
          <div>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:20 }}>{isEnglish ? 'Contact' : 'Contact'}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:12, fontSize:14, color:'rgba(255,255,255,0.55)' }}>
              <a
  href="https://www.google.com/maps/search/?api=1&query=Alba+Iulia+Romania"
  target="_blank"
  rel="noopener noreferrer"
  style={{ color:'rgba(255,255,255,0.55)', textDecoration:'none' }}
>
  {isEnglish ? 'Alba Iulia, Romania' : 'Alba Iulia, România'}
</a>
              <a href="mailto:contact@bisericamomentum.ro" style={{ color:'rgba(255,255,255,0.55)', textDecoration:'none' }}>
               contact@bisericamomentum.ro
              </a>
            </div>
            <div style={{ display:'flex', gap:10, marginTop:24 }}>
              {socials.map(([href, label, Icon]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label} className="footer-social">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

        </div>

        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', gap:12, paddingTop:32, fontSize:12, color:'rgba(255,255,255,0.25)' }}>
          <span>
  © {new Date().getFullYear()} Momentum Church · {isEnglish ? 'Alba Iulia, Romania' : 'Alba Iulia, România'}
</span>
          <span>
  {isEnglish
    ? 'Everything we do is for the glory of God.'
    : 'Tot ce facem este pentru gloria lui Dumnezeu.'}
</span>
        </div>
      </div>

    </footer>
  )
}
