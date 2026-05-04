import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Biserica Momentum | București',
  description: 'O comunitate vie în inima orașului. Slujbe duminica la 10:00. Te așteptăm!',
  openGraph: {
    title: 'Biserica Momentum | București',
    description: 'O comunitate vie în inima orașului.',
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
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
