import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata("give", "en", {
  title: "Give",
  description: "Support the work of Momentum Church in Alba Iulia: give online by card or by bank transfer.",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
