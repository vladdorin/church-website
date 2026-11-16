import type { Metadata } from 'next'
import Link from 'next/link'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { PiClock } from 'react-icons/pi'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import WelcomeVideo, { type WelcomeVideoSource } from '@/components/WelcomeVideo'
import { routeFor } from '@/lib/routes'

// Pagina din QR code-ul de pe pahare (outreach). Nu e în meniu, nici în sitemap, și nu e indexată.
// ATENȚIE: adresa /bun-venit e tipărită pe pahare, nu o redenumi.
//
// Video-ul de bun venit, una din variante:
//   { youtube: 'ID-ul din link' }        (ex. youtube.com/shorts/ABC123 → 'ABC123'; poate fi „Unlisted”)
//   { file: '/bun-venit.mp4' }           (fișierul pus în public/, sub 25 MB)
// Adaugă `vertical: true` dacă e filmat cu telefonul pe verticală. null = încă nu avem video.
const VIDEO: WelcomeVideoSource | null = null

export const metadata: Metadata = {
  title: 'Bun venit · Biserica Momentum Alba Iulia',
  description: 'Un mesaj de bun venit de la Biserica Momentum din Alba Iulia.',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}

export default function BunVenitPage() {
  return (
    <div className="bv">
      <div className="bv-inner">
        <Link href="/" className="bv-logo" aria-label="Biserica Momentum">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-horizontal.png" alt="Momentum" />
        </Link>

        <h1 className="bv-title">Bun venit</h1>
        <p className="bv-lead">Ne bucurăm că ești aici. Avem un mesaj scurt pentru tine.</p>

        <WelcomeVideo source={VIDEO} />

        <p className="bv-text">
          Vrei să ne cunoști mai bine? Descoperă cine suntem și ce facem.
        </p>

        <Link href="/" className="bv-cta">
          Vreau să aflu mai multe
          <span aria-hidden>→</span>
        </Link>

        <div className="bv-visit">
          <p className="bv-visit-title">Te așteptăm duminică</p>
          <p><PiClock aria-hidden /> De la 9:30 la cafea, programul începe la 10:30</p>
          <p><HiOutlineLocationMarker aria-hidden /> Calea Moților nr. 258, Alba Iulia</p>
          <Link href={routeFor('new', false)} className="bv-link">Prima dată la noi? Vezi ce te așteaptă</Link>
        </div>

        <div className="bv-socials">
          <a href="https://instagram.com/biserica.momentum" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://facebook.com/bisericamomentum" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://youtube.com/@bisericamomentum" aria-label="YouTube"><FaYoutube /></a>
        </div>
      </div>
    </div>
  )
}
