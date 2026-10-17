'use client'
import { useState, type ReactNode } from 'react'
import { HiArrowRight } from 'react-icons/hi'

export type FaqItem = { q: string; a: ReactNode }

/* Întrebări frecvente (pagina Donează și pagina Sunt nou).
   Pe calculator: întrebările în stânga, răspunsul ales într-un card mare în dreapta.
   Pe telefon: răspunsul se deschide sub întrebare. */
export default function FaqExplorer({ id, kicker, title, sub, items }: {
  id?: string
  kicker?: string
  title: ReactNode
  sub?: ReactNode
  items: FaqItem[]
}) {
  const [active, setActive] = useState(0)
  const num = (i: number) => String(i + 1).padStart(2, '0')
  const current = items[active]

  return (
    <section id={id} className="faqx">
      <div className="faqx-ghost" aria-hidden>?</div>
      <div className="wrap faqx-wrap">
        <header className="faqx-head">
          {kicker && <span className="faqx-kicker">{kicker}</span>}
          <h2 className="display faqx-title">{title}</h2>
          {sub && <p className="faqx-sub">{sub}</p>}
        </header>

        <div className="faqx-body">
          <ul className="faqx-list">
            {items.map((item, i) => (
              <li key={item.q} className={i === active ? 'is-open' : ''}>
                <button
                  type="button"
                  className={`faqx-q${i === active ? ' is-active' : ''}`}
                  aria-expanded={i === active}
                  aria-controls={`${id ?? 'faq'}-answer`}
                  onClick={() => setActive(i)}
                >
                  <span className="faqx-num">{num(i)}</span>
                  <span className="faqx-q-text">{item.q}</span>
                  <HiArrowRight className="faqx-arrow" aria-hidden />
                </button>
                {/* pe telefon răspunsul apare aici, sub întrebare */}
                {i === active && <div className="faqx-inline">{item.a}</div>}
              </li>
            ))}
          </ul>

          <div className="faqx-card" id={`${id ?? 'faq'}-answer`} aria-live="polite">
            <div key={active} className="faqx-card-inner">
              <span className="faqx-card-num" aria-hidden>{num(active)}</span>
              <h3>{current.q}</h3>
              <div className="faqx-answer">{current.a}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
