import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Despre noi | Biserica Momentum',
  description: 'Cunoaște-i pe Andrei și Maria Popescu și povestea din spatele Bisericii Speranța.',
}

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-church-navy text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-church-gold font-semibold uppercase tracking-widest text-sm mb-3">Despre noi</p>
          <h1 className="text-5xl font-bold mb-4">Cine suntem noi</h1>
          <p className="text-xl text-gray-300">
            O familie, o poveste, un vis pentru București.
          </p>
        </div>
      </section>

      {/* PASTORI */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-shrink-0 text-center">
            <div className="w-56 h-56 rounded-2xl bg-church-warm mx-auto flex items-center justify-center text-8xl mb-4">
              👨‍👩‍👧‍👦
            </div>
            <p className="text-sm text-gray-500">Andrei, Maria, Ioana și Mihai</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-church-navy mb-4">Andrei & Maria Popescu</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Suntem bucaresteni get-beget. Am crescut în acest oraș, l-am iubit, l-am criticat și,
              la un moment dat, am decis că vrem să facem ceva pentru el. Nu avem un plan perfect —
              avem credință, entuziasm și o pasiune sinceră pentru oamenii din jurul nostru.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Andrei a studiat teologia la București și a lucrat 8 ani în misiune urbană.
              Maria este psiholog și conduce grupuri de suport pentru tineri.
              Împreună, credem că o biserică sănătoasă poate schimba un cartier, un oraș, o generație.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Avem doi copii minunați — Ioana (8 ani) și Mihai (5 ani) — care ne amintesc în fiecare zi
              că speranța are picioare mici și râs zgomotos.
            </p>
          </div>
        </div>
      </section>

      {/* VALORI */}
      <section className="bg-church-warm py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="section-title">Valorile noastre</h2>
          <p className="section-subtitle">
            Nu suntem perfecți — dar acestea sunt lucrurile care ne ghidează.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            {[
              { icon: '🙏', val: 'Rugăciunea înaintea oricărui plan' },
              { icon: '🤝', val: 'Relații autentice, nu relații de fațadă' },
              { icon: '📖', val: 'Biblia ca fundament al vieții' },
              { icon: '🌍', val: 'Generozitate față de comunitate' },
              { icon: '🎉', val: 'Bucurie chiar și în dificultăți' },
              { icon: '🔓', val: 'Ușă deschisă pentru oricine' },
            ].map(({ icon, val }) => (
              <div key={val} className="card flex items-center gap-4">
                <span className="text-3xl">{icon}</span>
                <span className="font-medium text-church-navy">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="section-title">Vino să ne cunoști personal</h2>
          <p className="section-subtitle">
            Cel mai bun mod de a ne cunoaște e să vii la o întâlnire. Nu e nicio obligație.
          </p>
          <Link href="/join" className="btn-primary">
            Vreau să vin →
          </Link>
        </div>
      </section>
    </>
  )
}
