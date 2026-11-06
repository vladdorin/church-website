import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata("join", "ro", {
  title: "Alătură-te",
  description: "Există un loc pentru tine în comunitatea Momentum din Alba Iulia: tineri, familii, echipa de muzică, cafenea, copii. Conectează-te, implică-te și crește în credință.",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
