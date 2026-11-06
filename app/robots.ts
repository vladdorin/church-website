import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// /robots.txt — motoarele de căutare pot indexa tot site-ul, mai puțin backend-ul (/api).
// Cloudflare adaugă deasupra regulile lui (Content-Signals), dacă sunt activate.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
