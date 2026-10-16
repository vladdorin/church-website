import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact · Momentum | Alba Iulia',
  description: 'Ia legătura cu Biserica Momentum din Alba Iulia.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
