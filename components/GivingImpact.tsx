const DELAYS = ['sr-d1', 'sr-d2', 'sr-d3']

export default function GivingImpact({ items }: { items: [string, string][] }) {
  return (
    <div className="giving-impact">
      {items.map(([title, desc], i) => (
        <div key={title} className={`giving-impact-item sr sr-right ${DELAYS[i] ?? ''}`}>
          <span className="giving-impact-num">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <p className="giving-impact-title">{title}</p>
            <p className="giving-impact-desc">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
