import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata("contact", "en", {
  title: "Contact",
  description: "Get in touch with Momentum Church in Alba Iulia. Find us at Calea Moților 258, every Sunday from 9:30.",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
