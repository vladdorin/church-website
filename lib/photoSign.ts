// Linkurile /api/photo sunt semnate, ca serverul să servească doar pozele noastre (galerii, evenimente),
// nu orice imagine publică din Google Drive pe adresa site-ului.
// Cheia de semnare: PHOTO_SIGNING_KEY, sau – dacă lipsește – cheia Google Drive/Calendar (oricum secretă, doar pe server).

const enc = new TextEncoder()
let keyPromise: Promise<CryptoKey | null> | null = null

function signingKey() {
  const secret =
    process.env.PHOTO_SIGNING_KEY?.trim() ||
    process.env.GOOGLE_DRIVE_API_KEY?.trim() ||
    process.env.GOOGLE_CALENDAR_API_KEY?.trim()
  keyPromise ??= secret
    ? crypto.subtle.importKey('raw', enc.encode(`photo:${secret}`), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
    : Promise.resolve(null)
  return keyPromise
}

const b64url = (buf: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buf).slice(0, 16)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

export async function photoSig(id: string): Promise<string> {
  const key = await signingKey()
  return key ? b64url(await crypto.subtle.sign('HMAC', key, enc.encode(id))) : ''
}

/** URL-ul unei poze din Drive, semnat. */
export async function photoUrl(id: string, width: number): Promise<string> {
  return `/api/photo?id=${encodeURIComponent(id)}&w=${width}&s=${await photoSig(id)}`
}

/** Comparație în timp constant, ca semnătura să nu poată fi ghicită caracter cu caracter. */
export async function photoSigValid(id: string, sig: string): Promise<boolean> {
  const expected = await photoSig(id)
  if (!expected || expected.length !== sig.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i)
  return diff === 0
}
