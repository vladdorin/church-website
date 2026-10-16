import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alătură-te · Momentum | Alba Iulia',
  description: 'Există un loc pentru tine în Momentum. Conectează-te, implică-te, crește.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
