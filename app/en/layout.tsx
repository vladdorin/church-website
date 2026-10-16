import type { Metadata } from 'next'

// Titlul și descrierea implicite pentru paginile în engleză.
export const metadata: Metadata = {
  title: 'Momentum | Alba Iulia',
  description: 'A Spirit-led community, in motion, for the glory of God. Alba Iulia, Romania.',
  openGraph: {
    title: 'Momentum | Alba Iulia',
    description: 'A Spirit-led community, in motion, for the glory of God.',
    type: 'website',
  },
}

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return children
}
