import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata("contact", "ro", {
  title: "Contact",
  description: "Ia legătura cu Biserica Momentum din Alba Iulia. Ne găsești pe Calea Moților 258, în fiecare duminică de la 9:30.",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
