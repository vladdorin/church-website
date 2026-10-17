export const runtime = 'edge'

// Lista de poze dintr-un folder public de Google Drive, pentru caruselul de pe prima pagină
// (?set=carousel) și galeria de pe „Sunt nou” (?set=gallery).
// Variabile: GOOGLE_DRIVE_CAROUSEL_FOLDER_ID, GOOGLE_DRIVE_GALLERY_FOLDER_ID (dacă lipsește, galeria
// folosește folderul caruselului) și o cheie Google cu acces la Drive API (GOOGLE_DRIVE_API_KEY,
// altfel GOOGLE_CALENDAR_API_KEY). Folderul trebuie partajat cu „Oricine are linkul”.
// Dacă ceva lipsește sau nu merge, componentele folosesc pozele din /public.

const REFRESH_SECONDS = 86_400   // pozele noi din folder apar pe site în maxim o zi

const SETS = {
  carousel: { folder: () => process.env.GOOGLE_DRIVE_CAROUSEL_FOLDER_ID, max: 24, width: 800 },
  gallery:  { folder: () => process.env.GOOGLE_DRIVE_GALLERY_FOLDER_ID ?? process.env.GOOGLE_DRIVE_CAROUSEL_FOLDER_ID, max: 18, width: 400 },
} as const

type DriveFile = { id: string; name: string }

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)

// Pozele din aceeași serie (ex. „041026 - 1”, „041026 - 2”) seamănă între ele. Le ordonăm după nume,
// apoi le luăm „în salturi” (pas ≈ n / 1,618, prim cu n), ca două poze vecine pe site — inclusiv
// ultima și prima, la carusel — să fie departe una de alta în serie. Punctul de start se schimbă zilnic.
function spread(files: DriveFile[]) {
  const n = files.length
  if (n < 3) return files
  const sorted = [...files].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
  let step = Math.round(n / 1.618)
  while (gcd(step, n) !== 1) step++
  const offset = Math.floor(Date.now() / 86_400_000) % n
  return sorted.map((_, i) => sorted[(offset + i * step) % n])
}

export async function GET(req: Request) {
  const name = new URL(req.url).searchParams.get('set') as keyof typeof SETS
  const set = SETS[name]
  if (!set) return Response.json({ error: 'Unknown set' }, { status: 400 })

  const folder = set.folder()
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY ?? process.env.GOOGLE_CALENDAR_API_KEY
  if (!folder || !apiKey) return Response.json({ configured: false, photos: [] })

  try {
    const params = new URLSearchParams({
      key: apiKey,
      q: `'${folder}' in parents and mimeType contains 'image/' and trashed = false`,
      orderBy: 'createdTime desc',   // se aleg cele mai noi poze, apoi se amestecă (spread)
      pageSize: String(set.max),
      fields: 'files(id,name)',
    })
    const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`, {
      next: { revalidate: REFRESH_SECONDS },
    })
    if (!res.ok) {
      console.error('[photos] Google Drive', res.status, await res.text())
      return Response.json({ configured: true, error: true, photos: [] }, { status: 502 })
    }

    const files: DriveFile[] = (await res.json()).files ?? []
    const photos = spread(files).map(f => `/api/photo?id=${encodeURIComponent(f.id)}&w=${set.width}`)

    return Response.json(
      { configured: true, photos },
      { headers: { 'Cache-Control': `public, s-maxage=${REFRESH_SECONDS}, stale-while-revalidate=3600` } },
    )
  } catch (err) {
    console.error('[photos]', err)
    return Response.json({ configured: true, error: true, photos: [] }, { status: 502 })
  }
}
