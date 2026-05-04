import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-church-navy text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-bold text-white text-lg mb-3">
            <span className="text-church-gold text-xl">✦</span>
            Biserica Momentum
          </div>
          <p className="text-sm leading-relaxed">
            O comunitate vie în inima Bucureștiului.<br />
            Te așteptăm cu drag duminica la 10:00.
          </p>
        </div>

        {/* Linkuri rapide */}
        <div>
          <h3 className="text-white font-semibold mb-3">Pagini</h3>
          <ul className="space-y-2 text-sm">
            {[
              ['/join',          'Alătură-te'],
              ['/give',          'Donează'],
              ['/pray',          'Rugăciune'],
              ['/about',         'Despre noi'],
              ['/why-this-city', 'De ce București?'],
              ['/connect',       'Contact'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-church-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Găsește-ne</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Strada Exemplu 10, București</li>
            <li>🕙 Duminică, 10:00</li>
            <li>
              <a href="mailto:contact@bisericasperanta.ro" className="hover:text-church-gold transition-colors">
                ✉ contact@bisericasperanta.ro
              </a>
            </li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
               className="hover:text-church-gold transition-colors text-lg" aria-label="Facebook">
              f
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="hover:text-church-gold transition-colors text-lg" aria-label="Instagram">
              IG
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
               className="hover:text-church-gold transition-colors text-lg" aria-label="YouTube">
              ▶
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs py-4 text-gray-500">
        © {new Date().getFullYear()} Biserica Momentum. Toate drepturile rezervate.
      </div>
    </footer>
  )
}
