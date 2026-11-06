import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import HtmlLang from '@/components/HtmlLang'
import { SITE_URL, OG_IMAGE, CHURCH_JSON_LD } from '@/lib/seo'

// Valori implicite. Fiecare pagină își setează titlul, descrierea, adresa canonică și
// varianta în cealaltă limbă prin pageMetadata() din lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Biserica Momentum Alba Iulia',
  description:
    'O comunitate condusă de Duhul Sfânt, în mișcare, pentru gloria lui Dumnezeu. Alba Iulia, România.',
  icons: { icon: '/logo-icon.png', apple: '/logo-icon.png' },
  openGraph: { type: 'website', siteName: 'Biserica Momentum', locale: 'ro_RO', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(CHURCH_JSON_LD) }}
        />
        <HtmlLang />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
