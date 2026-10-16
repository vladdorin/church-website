import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Give · Momentum | Alba Iulia',
  description: 'Support Momentum Church in Alba Iulia.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
