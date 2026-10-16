import type { Metadata } from 'next'
import NewHere from '@/components/NewHere'

export const metadata: Metadata = {
  title: 'Sunt nou · Momentum | Alba Iulia',
  description: 'Prima dată la Biserica Momentum? Program, locație, copii, Momentum Café și întrebări frecvente.',
}

export default function SuntNouPage() {
  return <NewHere lang="ro" />
}
