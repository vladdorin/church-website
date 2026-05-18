import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'

export const metadata: Metadata = {
  title: 'Momentum | Alba Iulia',
  description:
    'O comunitate condusă de Duhul Sfânt, în mișcare, pentru gloria lui Dumnezeu. Alba Iulia, România.',
  icons: { icon: '/logo-icon.png', apple: '/logo-icon.png' },
  openGraph: {
    title: 'Momentum | Alba Iulia',
    description:
      'O comunitate condusă de Duhul Sfânt, în mișcare, pentru gloria lui Dumnezeu.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}