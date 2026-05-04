import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Rugăciune | Biserica Speranța',
  description: 'Iată ce credem și pentru ce ne rugăm în legătură cu Bucureștiul.',
}

export default function PrayPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-church-navy text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-church-gold font-semibold uppercase tracking-widest text-sm mb-3">Rugăciune</p>
          <h1 className="text-5xl font-bold mb-4">Ce credem și pentru ce ne rugăm</h1>
          <p className="text-xl text-gray-300">
            Nu avem toate răspunsurile — dar știm Cui îi punem întrebările.
          </p>
        </div>
      </section>

      {/* DUREREA ORAȘULUI */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-church-navy mb-4">Ce vedem în București</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Vedem un oraș frumos și inteligent, dar profund singur. Vedem tineri care au totul
              material, dar simt un gol pe care nu știu cum să îl umple. Vedem familii dezbinate,
              oameni epuizați, comunități fără coeziune.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Vedem și speranță. Vedem oameni care vor mai mult — mai multă autenticitate, mai multă
              comunitate, mai mult sens. Noi credem că biserica poate fi răspunsul la această foame.
            </p>
          </div>
          <div className="card bg-church-navy text-white text-center py-10">
            <div className="text-6xl mb-4">🏙️</div>
            <blockquote className="text-xl font-serif italic text-gray-200 leading-relaxed">
              „Căutați bunăstarea cetății... rugați-vă pentru ea."
            </blockquote>
            <p className="text-church-gold mt-3 text-sm font-medium">— Ieremia 29:7</p>
          </div>
        </div>
      </section>

      {/* RUGĂCIUNI SPECIFICE */}
      <section className="bg-church-warm py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="section-title">Rugăciunile noastre pentru București</h2>
          <p className="section-subtitle">
            Acestea sunt lucrurile concrete pentru care ne rugăm zilnic.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {[
              {
                nr: '01',
                titlu: 'O generație cu scop',
                desc: 'Ne rugăm ca tinerii din București să descopere că viața are sens dincolo de succes și consum.',
              },
              {
                nr: '02',
                titlu: 'Familii restaurate',
                desc: 'Ne rugăm ca familiile dezbinate să găsească vindecare, iertare și un nou început.',
              },
              {
                nr: '03',
                titlu: 'Comunități autentice',
                desc: 'Ne rugăm ca oamenii singuri să găsească un loc unde sunt cu adevărat cunoscuți și iubiți.',
              },
              {
                nr: '04',
                titlu: 'O biserică care servește',
                desc: 'Ne rugăm ca Biserica Speranța să fie o binecuvântare concretă pentru cartierul și orașul nostru.',
              },
            ].map(({ nr, titlu, desc }) => (
              <div key={nr} className="card flex gap-4">
                <span className="text-church-gold font-bold text-2xl font-serif flex-shrink-0">{nr}</span>
                <div>
                  <h3 className="font-bold text-church-navy text-lg mb-1">{titlu}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULAR CERERE RUGĂCIUNE */}
      <section className="py-20 max-w-2xl mx-auto px-4 text-center">
        <h2 className="section-title">Ai o cerere de rugăciune?</h2>
        <p className="section-subtitle">
          Trimite-ne cererea ta. Echipa noastră se va ruga personal pentru tine.
        </p>
        <Link href="/connect" className="btn-primary">
          Trimite o cerere de rugăciune →
        </Link>
      </section>
    </>
  )
}
