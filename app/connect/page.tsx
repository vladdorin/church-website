import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Biserica Speranța',
  description: 'Conectează-te cu noi pe social media sau trimite-ne un mesaj.',
}

export default function ConnectPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-church-navy text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-church-gold font-semibold uppercase tracking-widest text-sm mb-3">Contact</p>
          <h1 className="text-5xl font-bold mb-4">Hai să vorbim</h1>
          <p className="text-xl text-gray-300">
            Suntem oameni reali, cu telefoane reale. Nu ezita să ne contactezi.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* FORMULAR */}
        <div>
          <h2 className="text-2xl font-bold text-church-navy mb-6">Trimite-ne un mesaj</h2>
          <form className="space-y-5" action="mailto:contact@bisericasperanta.ro" method="GET">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nume complet</label>
              <input
                type="text"
                name="name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-church-gold bg-white"
                placeholder="Ion Ionescu"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-church-gold bg-white"
                placeholder="ion@exemplu.ro"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subiect</label>
              <select
                name="subject"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-church-gold bg-white"
              >
                <option>Vreau să aflu mai multe</option>
                <option>Cerere de rugăciune</option>
                <option>Întrebare generală</option>
                <option>Parteneriat / colaborare</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mesaj</label>
              <textarea
                name="body"
                rows={5}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-church-gold bg-white resize-none"
                placeholder="Scrie mesajul tău aici..."
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Trimite mesajul →
            </button>
          </form>
        </div>

        {/* INFO + SOCIAL */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-church-navy mb-4">Găsește-ne</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-xl mt-0.5">📍</span>
                <span>Strada Exemplu 10, Sector 1<br />București, 010000</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">🕙</span>
                <span>Duminică · 10:00</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">✉️</span>
                <a href="mailto:contact@bisericasperanta.ro" className="text-church-blue underline">
                  contact@bisericasperanta.ro
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">📞</span>
                <a href="tel:+40712345678" className="text-church-blue underline">
                  +40 712 345 678
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-church-navy mb-4">Social media</h3>
            <div className="flex flex-col gap-3">
              {[
                { icon: '📘', label: 'Facebook', href: 'https://facebook.com/bisericasperanta', handle: '@bisericasperanta' },
                { icon: '📸', label: 'Instagram', href: 'https://instagram.com/bisericasperanta', handle: '@bisericasperanta' },
                { icon: '▶️',  label: 'YouTube',   href: 'https://youtube.com/@bisericasperanta', handle: 'Biserica Speranța' },
              ].map(({ icon, label, href, handle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 card hover:shadow-md transition-shadow py-4"
                >
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <div className="font-semibold text-church-navy">{label}</div>
                    <div className="text-sm text-gray-500">{handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="card bg-church-gold/10 border-church-gold/30 text-center">
            <p className="font-semibold text-church-navy mb-1">📧 Rămâi la curent</p>
            <p className="text-sm text-gray-600 mb-3">Abonează-te pentru noutăți și anunțuri</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="email@tau.ro"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-church-gold"
              />
              <button type="submit" className="bg-church-gold text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-yellow-600 transition-colors">
                OK
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
