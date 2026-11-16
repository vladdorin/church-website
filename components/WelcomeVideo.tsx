'use client'
import { useState } from 'react'

export type WelcomeVideoSource =
  | { youtube: string; vertical?: boolean }
  | { file: string; poster?: string; vertical?: boolean }

/* Video-ul de pe pagina /bun-venit. YouTube se încarcă abia la apăsare (fără cookie-uri
   până atunci); un fișier propriu se redă direct în pagină, fără ecran complet pe iPhone. */
export default function WelcomeVideo({ source }: { source: WelcomeVideoSource | null }) {
  const [playing, setPlaying] = useState(false)
  const cls = `bv-video${source?.vertical ? ' bv-video--vertical' : ''}`

  if (!source) {
    return (
      <div className={cls}>
        <div className="bv-video-empty">Video-ul de bun venit vine în curând</div>
      </div>
    )
  }

  if ('file' in source) {
    return (
      <div className={cls}>
        <video src={source.file} poster={source.poster} controls playsInline preload="metadata" />
      </div>
    )
  }

  const id = source.youtube
  return (
    <div className={cls}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
          title="Bun venit la Biserica Momentum"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label="Pornește video-ul de bun venit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" />
          <span className="bv-video-play" aria-hidden>
            <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" /></svg>
          </span>
        </button>
      )}
    </div>
  )
}
