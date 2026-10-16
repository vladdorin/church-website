import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact · Momentum | Alba Iulia',
  description: 'Get in touch with Momentum Church in Alba Iulia.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
