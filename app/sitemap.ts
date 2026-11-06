import type { MetadataRoute } from 'next'
import { ROUTES } from '@/lib/routes'
import { SITE_URL } from '@/lib/seo'

// /sitemap.xml — lista paginilor pentru Google, cu legătura dintre varianta RO și EN.
// Se generează automat din lib/routes.ts: o pagină nouă adăugată acolo apare și aici.
const PRIORITY: Partial<Record<keyof typeof ROUTES, number>> = {
  home: 1, new: 0.9, about: 0.8, contact: 0.8, mission: 0.7, why: 0.6, join: 0.6, pray: 0.6, give: 0.6,
  privacy: 0.1, terms: 0.1, cookies: 0.1,
}

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(ROUTES).flatMap(([key, { ro, en }]) => {
    const languages = { ro: SITE_URL + ro, en: SITE_URL + en }
    const priority = PRIORITY[key as keyof typeof ROUTES] ?? 0.5
    return [
      { url: SITE_URL + ro, priority, alternates: { languages } },
      { url: SITE_URL + en, priority: Math.max(0.1, priority - 0.1), alternates: { languages } },
    ]
  })
}
