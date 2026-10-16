'use client'
import { useState } from 'react'

/* Player YouTube „lite”: afișează doar thumbnail-ul și încarcă iframe-ul
   abia la click — pagina rămâne rapidă și fără cookie-uri YouTube până
   când vizitatorul pornește video-ul. */
export default function YouTubeVideo({ id, title, playLabel }: {
  id: string; title: string; playLabel: string
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="yt-video">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`${playLabel}: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" loading="lazy" />
          <span className="yt-video-play" aria-hidden>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" /></svg>
          </span>
        </button>
      )}
    </div>
  )
}
