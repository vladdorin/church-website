import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Alătură-te | Biserica Speranța',
  description: 'Completează cardul de conectare și vino la prima noastră întâlnire.',
}

export default function JoinPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-church-navy text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-church-gold font-semibold uppercase tracking-widest text-sm mb-3">Alătură-te</p>
          <h1 className="text-5xl font-bold mb-4">Ești binevenit(ă)</h1>
          <p className="text-xl text-gray-300">
            Primul pas e cel mai greu — după aia devine tot mai ușor.
          </p>
        </div>
      </section>

      {/* PROGRAM ÎNTÂLNIRI */}
      <section className="py-16 max-w-5xl mx-auto px-4 text-center">
        <h2 className="section-title">Programul nostru</h2>
        <p className="section-subtitle">Avem întâlniri de recrutare înainte de lansarea oficială.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { data: '15 Iunie 2025',       ora: '10:00 – 12:00', tip: 'Întâlnire de prezentare' },
            { data: '29 Iunie 2025',       ora: '10:00 – 12:00', tip: 'Viziunea și valorile noastre' },
            { data: '15 Septembrie 2025',  ora: '10:00 – 12:00', tip: '🎉 LANSARE OFICIALĂ' },
          ].map(({ data, ora, tip }) => (
            <div key={data} className="card text-center hover:shadow-md transition-shadow">
              <p className="text-church-gold font-bold text-lg mb-1">{data}</p>
              <p className="text-gray-500 text-sm mb-2">🕙 {ora}</p>
              <p className="font-semibold text-church-navy">{tip}</p>
              <p className="text-xs text-gray-400 mt-2">Strada Exemplu 10, București</p>
            </div>
          ))}
        </div>
      </section>

      {/* CARD DE CONECTARE */}
      <section className="bg-church-warm py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title">Card de conectare</h2>
            <p className="text-gray-600">
              Completează formularul de mai jos și te vom contacta cu detalii despre prima ta vizită.
            </p>
          </div>

          <form
            className="card space-y-5"
            action="mailto:contact@bisericasperanta.ro"
            method="GET"
            encType="text/plain"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prenume *</label>
                <input
                  type="text"
                  name="prenume"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-church-gold bg-white"
                  placeholder="Ion"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nume *</label>
                <input
                  type="text"
                  name="nume"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-church-gold bg-white"
                  placeholder="Ionescu"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-church-gold bg-white"
                placeholder="ion@exemplu.ro"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input
                type="tel"
                name="telefon"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-church-gold bg-white"
                placeholder="+40 7xx xxx xxx"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">La ce întâlnire vrei să vii?</label>
              <select
                name="intalnire"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-church-gold bg-white"
              >
                <option>15 Iunie 2025 – Întâlnire de prezentare</option>
                <option>29 Iunie 2025 – Viziunea și valorile noastre</option>
                <option>15 Septembrie 2025 – Lansare oficială</option>
                <option>Nu știu încă</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Situația familiei tale</label>
              <select
                name="familie"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-church-gold bg-white"
              >
                <option>Singur(ă)</option>
                <option>Cuplu fără copii</option>
                <option>Familie cu copii</option>
                <option>Prefer să nu spun</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cum ai auzit de noi?</label>
              <select
                name="sursa"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-church-gold bg-white"
              >
                <option>Instagram / Facebook</option>
                <option>Un prieten mi-a recomandat</option>
                <option>Am căutat pe Google</option>
                <option>Altceva</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ceva ce vrei să ne spui?
              </label>
              <textarea
                name="mesaj"
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-church-gold bg-white resize-none"
                placeholder="Opțional..."
              />
            </div>

            <button type="submit" className="btn-primary w-full text-lg py-4">
              Trimite cardul de conectare →
            </button>
            <p className="text-xs text-center text-gray-400">
              Nu vei fi adăugat la nicio listă fără acordul tău. Promitem să nu facem spam.
            </p>
          </form>
        </div>
      </section>

      {/* VALORI */}
      <section className="py-20 max-w-5xl mx-auto px-4 text-center">
        <h2 className="section-title">La ce să te aștepți</h2>
        <p className="section-subtitle">Fără costume obligatorii. Fără judecată. Doar oameni reali.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: '☕', titlu: 'Relaxat și prietenos', desc: 'Muzică bună, cafea proastă (lucrăm la asta) și oameni care te primesc cu căldură.' },
            { icon: '👶', titlu: 'Program pentru copii', desc: 'Avem activități separate pentru copii de toate vârstele, astfel că și ei se vor bucura.' },
            { icon: '⏱️', titlu: 'Durează ~90 minute', desc: 'Respectăm programul tău. Nici noi nu vrem să stăm toată ziua în întâlnire.' },
          ].map(({ icon, titlu, desc }) => (
            <div key={titlu} className="card text-center">
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="font-bold text-church-navy text-lg mb-2">{titlu}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
