import { pageMetadata } from '@/lib/seo'
import NewHere from '@/components/NewHere'

export const metadata = pageMetadata("new", "ro", {
  title: "Sunt nou",
  description: "Prima dată la Biserica Momentum din Alba Iulia? Duminica de la 9:30: cafea la Momentum Café, muzică de închinare, grupe pentru copii și o comunitate care te primește așa cum ești.",
})

export default function SuntNouPage() {
  return <NewHere lang="ro" />
}
