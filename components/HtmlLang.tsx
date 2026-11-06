'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { isEnglishPath } from '@/lib/routes'

// <html lang> e „ro” din layout-ul principal; pe paginile în engleză îl schimbăm în „en”,
// ca cititoarele de ecran și traducerea automată din browser să știe limba corectă.
export default function HtmlLang() {
  const pathname = usePathname()
  useEffect(() => {
    document.documentElement.lang = isEnglishPath(pathname) ? 'en' : 'ro'
  }, [pathname])
  return null
}
