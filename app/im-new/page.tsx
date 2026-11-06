import { pageMetadata } from '@/lib/seo'
import NewHere from '@/components/NewHere'

export const metadata = pageMetadata("new", "en", {
  title: "I'm New",
  description: "First time at Momentum Church in Alba Iulia? Sundays from 9:30: coffee at Momentum Café, worship music, kids' groups and a community that welcomes you as you are.",
})

export default function ImNewPage() {
  return <NewHere lang="en" />
}
