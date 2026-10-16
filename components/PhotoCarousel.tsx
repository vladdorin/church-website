'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const IMAGES = [
  '/carousel-1.jpg',
  '/carousel-2.jpg',
  '/carousel-4.jpg',
  '/carousel-5.jpg',
  '/carousel-6.jpg',
  '/carousel-7.jpg',
  '/carousel-8.jpg',
  '/carousel-9.jpg',
  '/carousel-10.jpg',
  '/carousel-11.jpg',
  '/carousel-12.jpg',
  '/carousel-13.jpg',
]

export default function PhotoCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    let x = 0
    let speed = 0.65
    let targetSpeed = 0.65
    let isDragging = false
    let startX = 0
    let lastX = 0
    let velocity = 0
    let frame = 0

    const getHalfWidth = () => track.scrollWidth / 2

    const animate = () => {
      const half = getHalfWidth()

      if (!isDragging) {
        speed += (targetSpeed - speed) * 0.04
        x -= speed + velocity
        velocity *= 0.92
      }

      if (Math.abs(x) >= half) x = 0
      if (x > 0) x = -half

      track.style.transform = `translate3d(${x}px, 0, 0)`

      const cards = track.querySelectorAll<HTMLElement>('.photo-card')
      const center = window.innerWidth / 2

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const cardCenter = rect.left + rect.width / 2
        const distance = Math.abs(cardCenter - center)
        const t = Math.min(distance / center, 1)

        const edge = Math.pow(t, 2.1)

        const scale = 1 + edge * 0.16
        const lift = edge * 8

        card.style.transform = `translateY(${lift}px) scale(${scale})`
      })

      frame = requestAnimationFrame(animate)
    }

    const down = (clientX: number) => {
      isDragging = true
      startX = clientX
      lastX = clientX
      velocity = 0
      targetSpeed = 0
    }

    const move = (clientX: number) => {
      if (!isDragging) return
      const delta = clientX - lastX
      x += delta
      velocity = delta * -0.08
      lastX = clientX
    }

    const up = () => {
      isDragging = false
      targetSpeed = 0.65
    }

    const onMouseDown = (e: MouseEvent) => down(e.clientX)
    const onMouseMove = (e: MouseEvent) => move(e.clientX)
    const onMouseUp = () => up()

    const onTouchStart = (e: TouchEvent) => down(e.touches[0].clientX)
    const onTouchMove = (e: TouchEvent) => move(e.touches[0].clientX)
    const onTouchEnd = () => up()

    viewport.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    viewport.addEventListener('touchstart', onTouchStart, { passive: true })
    viewport.addEventListener('touchmove', onTouchMove, { passive: true })
    viewport.addEventListener('touchend', onTouchEnd)

    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)

      viewport.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)

      viewport.removeEventListener('touchstart', onTouchStart)
      viewport.removeEventListener('touchmove', onTouchMove)
      viewport.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  const loopImages = [...IMAGES, ...IMAGES]

  return (
    <section className="photo-section">
      <div ref={viewportRef} className="photo-viewport">
        <div ref={trackRef} className="photo-track">
          {loopImages.map((src, i) => (
            <div key={i} className="photo-card">
              <Image
                src={src}
                alt="Momentum"
                fill
                draggable={false}
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Trecere de la secțiunea de deasupra (#080c1e) la cea de dedesubt (#f4f2ee).
           Începe și se termină exact cu culorile lor, ca să nu existe margini vizibile.
           Stopurile urmează o curbă ease-in-out (smoothstep) și sunt amestecate în OKLab,
           ca trecerea să fie lină și să nu treacă printr-un gri murdar. */
        .photo-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(to bottom, #080c1e 12%, #f4f2ee 90%);
          background: linear-gradient(
            in oklab to bottom,
            #080c1e 0%,
            #080c1e 12%,
            color-mix(in oklab, #080c1e, #f4f2ee 4.3%) 21.75%,
            color-mix(in oklab, #080c1e, #f4f2ee 15.6%) 31.5%,
            color-mix(in oklab, #080c1e, #f4f2ee 31.6%) 41.25%,
            color-mix(in oklab, #080c1e, #f4f2ee 50%) 51%,
            color-mix(in oklab, #080c1e, #f4f2ee 68.4%) 60.75%,
            color-mix(in oklab, #080c1e, #f4f2ee 84.4%) 70.5%,
            color-mix(in oklab, #080c1e, #f4f2ee 95.7%) 80.25%,
            #f4f2ee 90%,
            #f4f2ee 100%
          );
        }

        .photo-viewport {
          width: 100%;
          overflow: hidden;
          cursor: grab;
          user-select: none;
          touch-action: pan-y;
        }

        .photo-viewport:active {
          cursor: grabbing;
        }

        .photo-track {
          display: flex;
          align-items: center;
          gap: 20px;
          width: max-content;
          /* sus și jos spațiu pentru gradient și pentru umbra pozelor */
          padding: 56px 0 96px;
          will-change: transform;
        }

        .photo-card {
          position: relative;
          flex: 0 0 auto;
          width: clamp(190px, 16vw, 270px);
          aspect-ratio: 3 / 4;
          border-radius: 18px;
          overflow: hidden;
          background: #101010;
          box-shadow: 0 22px 44px -22px rgba(8, 12, 30, 0.5);
          will-change: transform;
          transform-origin: center center;
        }

        .photo-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
          background: linear-gradient(to top, rgba(8, 12, 30, 0.16), transparent 54%);
          pointer-events: none;
        }

        .photo-card :global(img) {
          pointer-events: none;
          user-select: none;
          filter: saturate(1.04) contrast(1.04);
        }

        @media (max-width: 768px) {
          .photo-track {
            gap: 14px;
            padding: 40px 0 72px;
          }

          .photo-card {
            width: 178px;
          }
        }
      `}</style>
    </section>
  )
}
