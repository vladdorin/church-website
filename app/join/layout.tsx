import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join Us · Momentum | Alba Iulia',
  description: 'There is a place for you at Momentum. Connect, get involved, grow.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
