'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LocalizedLink({
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  const pathname = usePathname()
  const isEnglish = pathname.startsWith('/en')
  const localizedHref = isEnglish ? `/en${href}` : href

  return <Link href={localizedHref} {...props} />
}