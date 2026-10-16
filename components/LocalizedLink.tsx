'use client'
import Link from 'next/link'
import { ROUTES } from '@/lib/routes'

// Folosit în paginile în engleză: primește adresa „scurtă” (ex. /give, /about)
// și o transformă în adresa reală a paginii în engleză (ex. /en/give, /about).
const EN_PATHS: string[] = Object.values(ROUTES).map(r => r.en)

export default function LocalizedLink({
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  const path = String(href)
  const localizedHref = EN_PATHS.includes(path)
    ? path
    : EN_PATHS.includes(`/en${path}`) ? `/en${path}` : path

  return <Link href={localizedHref} {...props} />
}
