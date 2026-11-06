import type { Metadata } from 'next'
import { ROUTES, type RouteKey } from './routes'

// Adresa oficială a site-ului. Toate linkurile canonice, sitemap-ul și preview-urile pornesc de aici.
export const SITE_URL = 'https://bisericamomentum.ro'

export const OG_IMAGE = { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Alba Iulia' }

const SUFFIX = { ro: 'Biserica Momentum Alba Iulia', en: 'Momentum Church Alba Iulia' }
const SITE_NAME = { ro: 'Biserica Momentum', en: 'Momentum Church' }
const LOCALE = { ro: 'ro_RO', en: 'en_US' }

type Lang = 'ro' | 'en'

// Metadatele unei pagini: titlu, descriere, adresa canonică, legătura cu varianta
// în cealaltă limbă (hreflang) și preview-ul pentru Facebook / WhatsApp.
// `title` fără sufix: „Cine suntem” → „Cine suntem · Biserica Momentum Alba Iulia”.
// Pentru prima pagină dă `fullTitle` în loc de `title`.
export function pageMetadata(
  key: RouteKey,
  lang: Lang,
  { title, fullTitle, description }: { title?: string; fullTitle?: string; description: string },
): Metadata {
  const t = fullTitle ?? `${title} · ${SUFFIX[lang]}`
  const path = ROUTES[key][lang]
  return {
    title: t,
    description,
    alternates: {
      canonical: path,
      languages: { ro: ROUTES[key].ro, en: ROUTES[key].en, 'x-default': ROUTES[key].ro },
    },
    openGraph: {
      type: 'website',
      url: path,
      siteName: SITE_NAME[lang],
      title: t,
      description,
      locale: LOCALE[lang],
      alternateLocale: LOCALE[lang === 'ro' ? 'en' : 'ro'],
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title: t, description, images: [OG_IMAGE.url] },
  }
}

// Date structurate pentru Google (schema.org): numele bisericii, adresa, contact, rețele sociale.
// Ajută Google să arate biserica corect la căutări ca „biserica momentum” sau „biserică alba iulia”.
// Dacă se schimbă adresa sau programul, actualizează și aici.
export const CHURCH_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  '@id': `${SITE_URL}/#church`,
  name: 'Biserica Momentum',
  alternateName: ['Momentum Church', 'Momentum Alba Iulia'],
  url: SITE_URL,
  logo: `${SITE_URL}/logo-icon.png`,
  image: `${SITE_URL}${OG_IMAGE.url}`,
  description:
    'Biserică creștină în Alba Iulia: o comunitate pentru tineri și familii, cu muzică de închinare, Momentum Café și grupe pentru copii. Duminica: 9:30 cafea și socializare, 10:30 programul.',
  email: 'contact@bisericamomentum.ro',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calea Moților nr. 258',
    addressLocality: 'Alba Iulia',
    addressRegion: 'Alba',
    addressCountry: 'RO',
  },
  areaServed: 'Alba Iulia',
  knowsLanguage: ['ro', 'en'],
  sameAs: [
    'https://facebook.com/bisericamomentum',
    'https://instagram.com/biserica.momentum',
    'https://youtube.com/@bisericamomentum',
  ],
}
