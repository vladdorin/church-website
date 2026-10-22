export const runtime = 'edge'

// O poză din Google Drive, adusă prin serverul nostru (la evenimente, carusel și galerie).
// Browserele (mai ales cu un cont Google logat sau cu protecția la urmărire) blochează adesea
// imaginile încărcate direct de pe drive.google.com, așa că le servim de pe adresa site-ului.
// Fișierul trebuie să fie public („Oricine are linkul”) sau într-un folder public.
// ?w= lățimea dorită, ca pozele mari de pe telefon să nu se încarce la rezoluție maximă.
// ?s= semnătura (lib/photoSign.ts): servim doar pozele din galeriile și evenimentele noastre.

import { photoSigValid } from '@/lib/photoSign'

const CACHE_SECONDS = 86_400
const WIDTHS = [400, 800, 1200, 1600]

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams
  const id = params.get('id') ?? ''
  if (!/^[\w-]{10,100}$/.test(id)) return new Response('Bad id', { status: 400 })
  if (!(await photoSigValid(id, params.get('s') ?? ''))) return new Response('Forbidden', { status: 403 })
  const w = WIDTHS.find(x => x >= Number(params.get('w') ?? 1200)) ?? 1600

  const res = await fetch(`https://drive.google.com/thumbnail?id=${id}&sz=w${w}`, {
    next: { revalidate: CACHE_SECONDS },
  })
  const type = res.headers.get('content-type') ?? ''
  if (!res.ok || !type.startsWith('image/')) {
    // De obicei: fișierul nu e partajat cu „Oricine are linkul”.
    return new Response('Not found', { status: 404 })
  }

  return new Response(res.body, {
    headers: {
      'Content-Type': type,
      'Cache-Control': `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS * 7}`,
    },
  })
}
