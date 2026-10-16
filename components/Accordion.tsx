'use client'
import { useState, ReactNode } from 'react'

export type AccordionItem = { title: string; content: ReactNode }

/* Acordeon cu „+” → „−” și înălțime animată.
   Folosit pentru valori (prima pagină) și pentru întrebările frecvente (Sunt nou).
   tone="light" pentru fundaluri deschise. */
export default function Accordion({ items, idPrefix, numbered = false, defaultOpen = null, tone = 'dark', className = '' }: {
  items: AccordionItem[]
  idPrefix: string
  numbered?: boolean
  defaultOpen?: number | null
  tone?: 'dark' | 'light'
  className?: string
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen)

  return (
    <ul className={`accordion${tone === 'light' ? ' accordion--light' : ''}${numbered ? '' : ' accordion--plain'} ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <li key={item.title} className={`acc-item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="acc-head"
              aria-expanded={isOpen}
              aria-controls={`${idPrefix}-panel-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {numbered && <span className="acc-num">{String(i + 1).padStart(2, '0')}</span>}
              <span className="acc-title">{item.title}</span>
              <span className="acc-icon" aria-hidden />
            </button>
            <div id={`${idPrefix}-panel-${i}`} className="acc-panel" role="region">
              <div>
                <div className="acc-body">{item.content}</div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
