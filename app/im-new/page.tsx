import type { Metadata } from 'next'
import NewHere from '@/components/NewHere'

export const metadata: Metadata = {
  title: "I'm New · Momentum | Alba Iulia",
  description: 'First time at Momentum Church? Service times, location, kids, Momentum Café and FAQ.',
}

export default function ImNewPage() {
  return <NewHere lang="en" />
}
