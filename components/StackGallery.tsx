'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { HiChevronLeft, HiChevronRight, HiOutlineX } from 'react-icons/hi'
import { useDrivePhotos } from '@/lib/useDrivePhotos'

// Pozele galeriei vin din folderul de Google Drive (app/api/photos/route.ts), maxim 18 (câte locuri are grila).
// Lista de mai jos e rezerva: se folosește dacă Drive nu e configurat sau nu răspunde.
const FALLBACK = [
  '/carousel-1.jpg', '/carousel-2.jpg', '/echipa.jpg', '/carousel-4.jpg', '/carousel-5.jpg', '/carousel-13.jpg',
  '/carousel-6.jpg', '/john-voichi.jpg', '/carousel-7.jpg', '/carousel-8.jpg', '/misiunea.jpg', '/carousel-9.jpg',
  '/carousel-10.jpg', '/rugaciune.jpg', '/carousel-11.jpg', '/carousel-3.jpg', '/carousel-12.jpg',
  // al 18-lea loc din grilă e liber — adaugă aici încă o poză cu oameni (ex. '/poza-noua.jpg')
]

// Variație fixă (nu aleatoare la fiecare încărcare) pentru mărime, proporție, poziție în celulă și rotația din teanc.
const WIDTHS  = [88, 64, 78, 70, 96, 72, 66, 90, 74, 82, 62, 92, 76, 68, 94, 70, 84, 66]
const RATIOS  = ['3 / 4', '4 / 5', '1 / 1', '4 / 3', '3 / 4', '4 / 5']
const ALIGN_X = ['start', 'center', 'end', 'center', 'start', 'end']
const ALIGN_Y = ['center', 'end', 'start', 'center', 'end', 'start']
const ROTATE  = [-6, 4, -3, 7, -5, 2, 5, -7, 3, -2, 6, -4, 1, -6, 4, -3, 7, -5]

const STACK_STEP = 110   // ms între pozele care cad în teanc
const SPREAD_HOLD = 450  // ms de pauză înainte de răsfirare

const LABELS = {
  ro: { open: 'Deschide poza', close: 'Închide', prev: 'Poza anterioară', next: 'Poza următoare', gallery: 'Galerie foto' },
  en: { open: 'Open photo', close: 'Close', prev: 'Previous photo', next: 'Next photo', gallery: 'Photo gallery' },
}

// Pozele din Drive vin mici pentru grilă (w=400); pe tot ecranul cerem o variantă cât ecranul
// (800 / 1200 / 1600 px), ca pe telefon să nu se descarce mai mult decât e nevoie.
function large(src: string) {
  if (!src.startsWith('/api/photo')) return src
  const px = window.innerWidth * (window.devicePixelRatio || 1)
  return src.replace(/w=\d+/, `w=${px > 1300 ? 1600 : px > 900 ? 1200 : 800}`)
}

// Descarcă poza mare din timp, ca la clic să fie deja în cache.
const started = new Set<string>()   // descărcări pornite
const ready = new Set<string>()     // poze mari descărcate complet
function preload(src: string | null) {
  if (!src) return Promise.resolve()
  const url = large(src)
  if (started.has(url)) return Promise.resolve()
  started.add(url)
  return new Promise<void>(resolve => {
    const img = new window.Image()
    img.onload = () => { ready.add(url); resolve() }
    img.onerror = () => resolve()
    img.src = url
  })
}

// Pe conexiuni lente sau cu „economizor de date” nu descărcăm nimic în avans.
function fastConnection() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  return !c || (!c.saveData && (!c.effectiveType || c.effectiveType === '4g'))
}

/* Poza pe tot ecranul. Un clic oriunde (sau ✕, sau Esc) o închide; săgețile trec la altă poză.
   Varianta mică (deja încărcată) se vede imediat, iar cea mare apare peste ea când e gata. */
function Lightbox({ photos, index, lang, onClose, onNav }: {
  photos: string[]; index: number; lang: 'ro' | 'en'; onClose: () => void; onNav: (dir: 1 | -1) => void
}) {
  const t = LABELS[lang]
  const ref = useRef<HTMLDialogElement>(null)
  const [loaded, setLoaded] = useState(false)
  const src = photos[index]

  useEffect(() => {
    ref.current!.showModal()
    document.documentElement.classList.add('modal-open')
    return () => document.documentElement.classList.remove('modal-open')
  }, [])

  useEffect(() => {
    // Dacă poza mare e deja descărcată, o arătăm direct, fără blur.
    setLoaded(ready.has(large(src)))
    // pregătim și pozele vecine, pentru săgeți
    preload(photos[(index + 1) % photos.length])
    preload(photos[(index - 1 + photos.length) % photos.length])
  }, [index, src, photos])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onNav])

  const close = () => ref.current?.close()
  const nav = (dir: 1 | -1) => (e: React.MouseEvent) => { e.stopPropagation(); onNav(dir) }

  return (
    <dialog ref={ref} className="sg-lightbox" aria-label={t.gallery} onClose={onClose} onClick={close}>
      <button type="button" className="sg-lb-btn sg-lb-close" aria-label={t.close} onClick={close}>
        <HiOutlineX aria-hidden />
      </button>
      {photos.length > 1 && (
        <>
          <button type="button" className="sg-lb-btn sg-lb-prev" aria-label={t.prev} onClick={nav(-1)}><HiChevronLeft aria-hidden /></button>
          <button type="button" className="sg-lb-btn sg-lb-next" aria-label={t.next} onClick={nav(1)}><HiChevronRight aria-hidden /></button>
        </>
      )}
      <div className="sg-lb-frame" key={src}>
        <img src={src} alt="" className="sg-lb-small" />
        <img src={large(src)} alt="" className={`sg-lb-large${loaded ? ' is-loaded' : ''}`} onLoad={() => setLoaded(true)} />
      </div>
      <span className="sg-lb-count">{index + 1} / {photos.length}</span>
    </dialog>
  )
}

/* Galerie „stack then scatter”: când secțiunea intră în ecran, pozele cad una peste alta
   în centru, apoi se răsfiră simultan într-o grilă aerisită. Rulează o singură dată.
   Un clic pe o poză o deschide pe tot ecranul (Lightbox). */
export default function StackGallery({ lang = 'ro' }: { lang?: 'ro' | 'en' }) {
  const drivePhotos = useDrivePhotos('gallery', FALLBACK)
  // Cât se încarcă lista, celulele sunt goale (dar la locul lor), ca să nu sară pagina.
  const PHOTOS: (string | null)[] = (drivePhotos ?? FALLBACK.map(() => null)).slice(0, WIDTHS.length)
  const loadedPhotos = PHOTOS.filter((p): p is string => !!p)
  const rootRef = useRef<HTMLDivElement>(null)
  const photoRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [shown, setShown] = useState(0)                 // câte poze au căzut în teanc
  const [phase, setPhase] = useState<'idle' | 'stack' | 'spread'>('idle')
  const [open, setOpen] = useState<number | null>(null) // poza deschisă pe tot ecranul
  const navigate = useCallback((dir: 1 | -1) => {
    setOpen(i => (i === null ? i : (i + dir + loadedPhotos.length) % loadedPhotos.length))
  }, [loadedPhotos.length])

  // Distanța de la fiecare poză până în centrul galeriei (poziția din teanc).
  useEffect(() => {
    const measure = () => {
      const root = rootRef.current; if (!root) return
      const r = root.getBoundingClientRect()
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2
      photoRefs.current.forEach(el => {
        if (!el) return
        const prev = el.style.transform
        el.style.transform = 'none'
        const p = el.getBoundingClientRect()
        el.style.transform = prev
        el.style.setProperty('--dx', `${cx - (p.left + p.width / 2)}px`)
        el.style.setProperty('--dy', `${cy - (p.top + p.height / 2)}px`)
      })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [drivePhotos])   // se măsoară din nou când sosesc pozele din Drive (pot fi mai multe sau mai puține)

  // Pornește animația când galeria e vizibilă.
  useEffect(() => {
    const root = rootRef.current; if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPhase('spread'); return }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setPhase('stack'); obs.disconnect() }
    }, { threshold: 0.35 })
    obs.observe(root)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (phase !== 'stack' || !drivePhotos) return   // animația pornește doar după ce avem pozele
    if (shown < PHOTOS.length) {
      const t = setTimeout(() => setShown(n => n + 1), STACK_STEP)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setPhase('spread'), SPREAD_HOLD)
    return () => clearTimeout(t)
  }, [phase, shown, drivePhotos, PHOTOS.length])

  // După ce galeria s-a așezat, descărcăm pe rând pozele mari, în fundal, ca la clic să se deschidă imediat.
  useEffect(() => {
    if (phase !== 'spread' || !drivePhotos || !fastConnection()) return
    let cancelled = false
    ;(async () => {
      for (const src of drivePhotos) {
        if (cancelled) return
        await preload(src)
      }
    })()
    return () => { cancelled = true }
  }, [phase, drivePhotos])

  return (
    <section className="stack-gallery" aria-label={LABELS[lang].gallery}>
      <div ref={rootRef} className={`sg-grid sg-${phase}`}>
        {PHOTOS.map((src, i) => (
          <div
            key={src ?? i}
            className="sg-cell"
            style={{ justifyContent: ALIGN_X[i % 6], alignItems: ALIGN_Y[(i + 2) % 6] }}
          >
            <button
              type="button"
              ref={el => { photoRefs.current[i] = el }}
              className={`sg-photo${i < shown ? ' is-in' : ''}`}
              aria-label={`${LABELS[lang].open} ${i + 1}`}
              disabled={!src}
              onClick={() => src && setOpen(loadedPhotos.indexOf(src))}
              onPointerEnter={() => preload(src)}   // pe calculator: începe descărcarea când treci cu mouse-ul
              onFocus={() => preload(src)}
              style={{
                width: `${WIDTHS[i]}%`,
                aspectRatio: RATIOS[(i * 5) % 6],
                zIndex: i + 1,
                ['--r' as string]: `${ROTATE[i]}deg`,
                ['--delay' as string]: `${(i % 6) * 25}ms`,
              }}
            >
              {src && (
                <Image
                  src={src} alt="" fill loading="eager" sizes="(max-width: 760px) 30vw, 16vw"
                  unoptimized={src.startsWith('/api/')}   // pozele din Drive vin deja micșorate
                  style={{ objectFit: 'cover', objectPosition: 'center 18%' }} /* fețele sunt de obicei în treimea de sus */
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {open !== null && loadedPhotos[open] && (
        <Lightbox photos={loadedPhotos} index={open} lang={lang} onClose={() => setOpen(null)} onNav={navigate} />
      )}
    </section>
  )
}
