import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata("join", "en", {
  title: "Join Us",
  description: "There is a place for you in the Momentum community in Alba Iulia: young people, families, worship team, café, kids. Connect, get involved and grow in faith.",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
