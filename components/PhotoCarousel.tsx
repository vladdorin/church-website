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
const shade = 1 - edge * 0.12

card.style.transform = `
  translateY(${lift}px)
  scale(${scale})
`
        card.style.opacity = `${shade}`
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
        .photo-section {
          position: relative;
          background:
  radial-gradient(
    circle at top center,
    rgba(25,50,175,0.08),
    transparent 42%
  ),
  #f4f2ee;
          padding: 78px 0 112px;
          overflow: hidden;
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
          padding: 52px 0 68px;
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
          box-shadow:
            0 30px 90px rgba(0, 0, 0, 0),
            0 0 0 1px rgba(255,255,255,0.08);
          will-change: transform, opacity;
          transform-origin: center center;
        }

        .photo-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to top,
              rgba(8,12,30,0.16),
              transparent 54%
            );
          pointer-events: none;
        }

.photo-section::after {
  content: '';

  position: absolute;

  left: 0;
  right: 0;
  bottom: 0;

  height: 180px;

  background:
    linear-gradient(
      to bottom,
      rgba(244,242,238,0),
      #080c1e 100%
    );

  pointer-events: none;
}

        .photo-card :global(img) {
          pointer-events: none;
          user-select: none;
          filter: saturate(1.04) contrast(1.04);
        }

        @media (max-width: 768px) {
          .photo-section {
            padding: 48px 0 78px;
	    position: relative;
            background:
              linear-gradient(
                180deg,
                #f4f2ee 0%,
                #10174a 34%,
                #080c1e 100%
              );
          }

          .photo-track {
            gap: 14px;
            padding: 42px 0 54px;
          }

          .photo-card {
            width: 178px;
          }
        }
      `}</style>
    </section>
  )
}