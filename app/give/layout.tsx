import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Donează · Momentum | Alba Iulia',
  description: 'Susține Biserica Momentum din Alba Iulia.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
