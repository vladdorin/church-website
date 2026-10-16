// Corespondența dintre paginile în română și cele în engleză.
// Dacă redenumești o pagină, actualizează aici și adaugă un redirect în next.config.mjs.
// ATENȚIE: /give rămâne neschimbat — e folosit în QR code-ul pentru donații.
// Paginile în engleză nu au prefix, cu excepția paginii principale (/en) și a donațiilor (/en/give),
// unde adresa e aceeași în ambele limbi.
export const ROUTES = {
  home:    { ro: '/',                              en: '/en' },
  new:     { ro: '/sunt-nou',                      en: '/im-new' },
  about:   { ro: '/cine-suntem',                   en: '/about' },
  mission: { ro: '/misiunea-noastra',              en: '/our-mission' },
  pray:    { ro: '/rugaciune',                     en: '/pray' },
  join:    { ro: '/alatura-te',                    en: '/join' },
  contact: { ro: '/contact',                       en: '/connect' },
  give:    { ro: '/give',                          en: '/en/give' },
  why:     { ro: '/de-ce-alba-iulia',              en: '/why-this-city' },
  privacy: { ro: '/politica-de-confidentialitate', en: '/privacy-policy' },
  terms:   { ro: '/termeni-si-conditii',           en: '/terms-and-conditions' },
  cookies: { ro: '/politica-cookies',              en: '/cookie-policy' },
} as const

export type RouteKey = keyof typeof ROUTES

const normalize = (pathname: string) =>
  pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname

const EN_PATHS = new Set<string>(Object.values(ROUTES).map(r => r.en))

// Limba paginii curente, dedusă din adresă.
export function isEnglishPath(pathname: string) {
  const path = normalize(pathname)
  return EN_PATHS.has(path) || path === '/en' || path.startsWith('/en/')
}

export function routeFor(key: RouteKey, isEnglish: boolean) {
  return isEnglish ? ROUTES[key].en : ROUTES[key].ro
}

// Pagina echivalentă în cealaltă limbă (pentru butonul RO / EN).
export function switchLanguagePath(pathname: string) {
  const path = normalize(pathname)
  for (const { ro, en } of Object.values(ROUTES)) {
    if (path === ro) return en
    if (path === en) return ro
  }
  return isEnglishPath(path) ? ROUTES.home.ro : ROUTES.home.en
}
