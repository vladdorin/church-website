import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata("give", "ro", {
  title: "Donează",
  description: "Susține lucrarea Bisericii Momentum din Alba Iulia: donație online cu cardul, transfer bancar sau redirecționarea a 3,5% prin Formularul 230.",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
