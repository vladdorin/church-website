'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// Pozele galeriei — se pot înlocui oricând cu alte fișiere din /public.
const PHOTOS = [
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

/* Galerie „stack then scatter”: când secțiunea intră în ecran, pozele cad una peste alta
   în centru, apoi se răsfiră simultan într-o grilă aerisită. Rulează o singură dată. */
export default function StackGallery() {
  const rootRef = useRef<HTMLDivElement>(null)
  const photoRefs = useRef<(HTMLDivElement | null)[]>([])
  const [shown, setShown] = useState(0)                 // câte poze au căzut în teanc
  const [phase, setPhase] = useState<'idle' | 'stack' | 'spread'>('idle')

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
  }, [])

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
    if (phase !== 'stack') return
    if (shown < PHOTOS.length) {
      const t = setTimeout(() => setShown(n => n + 1), STACK_STEP)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setPhase('spread'), SPREAD_HOLD)
    return () => clearTimeout(t)
  }, [phase, shown])

  return (
    <section className="stack-gallery" aria-hidden>
      <div ref={rootRef} className={`sg-grid sg-${phase}`}>
        {PHOTOS.map((src, i) => (
          <div
            key={src}
            className="sg-cell"
            style={{ justifyContent: ALIGN_X[i % 6], alignItems: ALIGN_Y[(i + 2) % 6] }}
          >
            <div
              ref={el => { photoRefs.current[i] = el }}
              className={`sg-photo${i < shown ? ' is-in' : ''}`}
              style={{
                width: `${WIDTHS[i]}%`,
                aspectRatio: RATIOS[(i * 5) % 6],
                zIndex: i + 1,
                ['--r' as string]: `${ROTATE[i]}deg`,
                ['--delay' as string]: `${(i % 6) * 25}ms`,
              }}
            >
              <Image src={src} alt="" fill loading="eager" sizes="(max-width: 760px) 30vw, 16vw" style={{ objectFit: 'cover', objectPosition: 'center 18%' }} /* fețele sunt de obicei în treimea de sus */ />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
