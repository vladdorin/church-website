'use client'
import { useEffect, useState } from 'react'

// Pozele din folderul de Google Drive (vezi app/api/photos/route.ts).
// Întoarce null cât timp se încarcă lista, apoi pozele din Drive sau, dacă nu sunt, `fallback`.
export function useDrivePhotos(set: 'carousel' | 'gallery', fallback: string[]) {
  const [photos, setPhotos] = useState<string[] | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/photos?set=${set}`)
      .then(r => r.json())
      .then(d => { if (!cancelled) setPhotos(d.photos?.length ? d.photos : fallback) })
      .catch(() => { if (!cancelled) setPhotos(fallback) })
    return () => { cancelled = true }
  }, [set, fallback])   // fallback e o listă constantă din componentă

  return photos
}
