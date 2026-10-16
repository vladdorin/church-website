'use client'
import { useEffect, useRef } from 'react'
import { VALUES } from '@/lib/values'
import Accordion from '@/components/Accordion'

// Adaugă clasa .is-visible când un element .values-reveal intră în ecran (animația de apariție).
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.15 })
    el.querySelectorAll('.values-reveal').forEach(n => obs.observe(n))
    return () => obs.disconnect()
  }, [])
  return ref
}

const num = (i: number) => String(i + 1).padStart(2, '0')

/* ── Prima pagină: 01 — Valorile noastre ──
   Stânga: titlul mare. Dreapta: acordeonul cu cele 5 valori (prima deschisă implicit). */
export function ValuesHome({ lang }: { lang: 'ro' | 'en' }) {
  const ref = useReveal<HTMLElement>()
  const en = lang === 'en'
  const values = VALUES[lang]

  return (
    <section ref={ref} className="page-section values-home">
      <div className="ghost-num values-home-ghost">01</div>
      <div className="wrap-wide values-home-layout">
        <div className="values-home-intro values-reveal">
          <h2 className="values-home-title">
            {en ? <>OUR<br />VALUES.</> : <>VALORILE<br />NOASTRE.</>}
          </h2>
        </div>

        <Accordion
          items={values.map(v => ({ title: v.title, content: <p>{v.text}</p> }))}
          idPrefix="value"
          numbered
          defaultOpen={0}
          className="values-reveal"
        />
      </div>
    </section>
  )
}

/* ── Cine suntem: Valorile noastre (variantă completă) ── */
export function ValuesFull({ lang }: { lang: 'ro' | 'en' }) {
  const ref = useReveal<HTMLElement>()
  const en = lang === 'en'
  return (
    <section ref={ref} id={en ? 'values' : 'valori'} className="values-full">
      <div className="wrap">
        <h2 className="display values-full-title values-reveal">
          {en ? 'OUR VALUES' : 'VALORILE NOASTRE'}
        </h2>
        <ol className="values-list">
          {VALUES[lang].map((v, i) => (
            <li key={v.title} className="values-row values-reveal">
              <span className="values-row-num" aria-hidden>{num(i)}</span>
              <h3 className="values-row-title">{v.title}</h3>
              <p className="values-row-text">{v.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
