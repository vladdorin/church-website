import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-church-navy text-white min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-church-navy via-church-blue to-church-navy opacity-90" />
        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-block bg-church-gold/20 border border-church-gold/40 rounded-full px-5 py-2 text-church-gold text-sm font-medium mb-6">
            📅 Următoarea întâlnire: Duminică, 15 Iunie · 10:00
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            O comunitate<br />
            <span className="text-church-gold">pentru București</span>
          </h1>
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            Credem că fiecare persoană din acest oraș merită să audă o veste bună.
            Suntem o biserică nouă, construită pentru oamenii care nu au mai pus piciorul într-o biserică.
          </p>
          <p className="text-church-gold font-semibold text-lg mb-10">
            „Iubiți-vă unii pe alții." — Ioan 13:34
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join" className="btn-primary text-lg px-10 py-4">
              Vino la prima întâlnire →
            </Link>
            <Link href="/about" className="btn-white text-lg px-10 py-4">
              Află mai multe
            </Link>
          </div>
        </div>
      </section>

      {/* INFO RAPIDĂ */}
      <section className="bg-church-gold text-white py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl mb-1">📍</div>
            <div className="font-bold text-lg">Locație</div>
            <div className="text-yellow-100">Strada Exemplu 10, București</div>
          </div>
          <div>
            <div className="text-3xl mb-1">🕙</div>
            <div className="font-bold text-lg">Program</div>
            <div className="text-yellow-100">Duminică · 10:00</div>
          </div>
          <div>
            <div className="text-3xl mb-1">📅</div>
            <div className="font-bold text-lg">Data lansării</div>
            <div className="text-yellow-100">15 Septembrie 2025</div>
          </div>
        </div>
      </section>

      {/* VIZIUNE & MISIUNE */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Viziunea noastră</h2>
          <p className="section-subtitle">
            Vrem să vedem Bucureștiul transformat prin comunități sănătoase, relații autentice și speranță reală.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '❤️',
              title: 'Iubire autentică',
              desc: 'Un loc unde ești acceptat exact așa cum ești, fără să trebuiască să fii perfect.',
            },
            {
              icon: '🌱',
              title: 'Creștere reală',
              desc: 'Vrem să te ajutăm să devii cea mai bună versiune a ta — spiritual, emoțional și relațional.',
            },
            {
              icon: '🏙️',
              title: 'Impact în oraș',
              desc: 'Nu existăm doar pentru cei din interior. Existăm pentru București.',
            },
          ].map((item) => (
            <div key={item.title} className="card text-center hover:shadow-md transition-shadow">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-church-navy">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DESPRE PASTOR - scurt */}
      <section className="bg-church-warm py-20">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-48 h-48 rounded-full bg-church-navy flex-shrink-0 flex items-center justify-center text-white text-6xl mx-auto md:mx-0">
            👤
          </div>
          <div>
            <p className="text-church-gold font-semibold mb-2 uppercase tracking-wider text-sm">Păstor fondator</p>
            <h2 className="text-3xl font-bold text-church-navy mb-3">Andrei & Maria Popescu</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Suntem o familie care a crescut în București și care iubește acest oraș.
              Avem doi copii și credem cu toată inima că cel mai bun lucru pe care îl putem oferi
              comunității noastre este speranță — concretă, practică și plină de bucurie.
            </p>
            <Link href="/about" className="btn-secondary inline-block">
              Citește toată povestea noastră
            </Link>
          </div>
        </div>
      </section>

      {/* HARTĂ placeholder */}
      <section className="py-20 max-w-6xl mx-auto px-4 text-center">
        <h2 className="section-title">Unde ne găsești</h2>
        <p className="section-subtitle">Suntem în centrul Bucureștiului, accesibili cu metroul și cu mașina.</p>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-church-warm h-80 bg-church-warm flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-5xl mb-3">🗺️</div>
            <p className="font-medium">Strada Exemplu 10, Sector 1, București</p>
            <a
              href="https://maps.google.com/?q=Strada+Exemplu+10+Bucuresti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-church-blue underline text-sm mt-2 inline-block"
            >
              Deschide în Google Maps →
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-church-navy text-white py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Gata să faci primul pas?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Nu ai nevoie de experiență religioasă. Ai nevoie doar de curaj să vii.
          </p>
          <Link href="/join" className="btn-primary text-lg px-12 py-4">
            Vreau să vin →
          </Link>
        </div>
      </section>
    </>
  )
}
