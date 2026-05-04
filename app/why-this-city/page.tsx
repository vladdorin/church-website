import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'De ce București? | Biserica Momentum',
  description: 'Povestea noastră cu Bucureștiul și motivul pentru care am ales să plantăm o biserică aici.',
}

export default function WhyThisCityPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-church-navy text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-church-gold font-semibold uppercase tracking-widest text-sm mb-3">De ce București?</p>
          <h1 className="text-5xl font-bold mb-4">Acest oraș are nevoie<br />de speranță</h1>
          <p className="text-xl text-gray-300">
            Nu am ales Bucureștiul pentru că e ușor. L-am ales pentru că îl iubim.
          </p>
        </div>
      </section>

      {/* POVESTEA */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <div className="prose prose-lg max-w-none text-gray-700">
          <h2 className="text-3xl font-bold text-church-navy mb-6">Povestea noastră cu Bucureștiul</h2>
          <p className="leading-relaxed mb-6">
            Bucureștiul este un oraș de 2 milioane de oameni. E aglomerat, zgomotos, plin de energie și — dacă te uiți
            cu atenție — plin de oameni care caută ceva mai mult. Statisticile spun că o proporție tot mai mare
            din populația urbană se consideră „spiritual, dar nu religios". Oameni care cred că există ceva dincolo
            de material, dar nu și-au găsit un loc unde să exploreze asta în siguranță.
          </p>
          <p className="leading-relaxed mb-6">
            Am trăit în București toată viața noastră. Am văzut cum arată singurătatea în bloc, în birou,
            în metrou. Am văzut tineri strălucitori care aveau totul, dar se simțeau goi. Am văzut familii
            care au uitat cum să vorbească unele cu altele.
          </p>
          <p className="leading-relaxed">
            Și am văzut și altceva: am văzut ce se întâmplă când oamenii găsesc comunitate adevărată.
            Cum se schimbă fețele. Cum se restaurează relațiile. Cum oamenii reîncep să spere.
            Asta vrem să aducem în București — nu o religie, ci o comunitate.
          </p>
        </div>
      </section>

      {/* CIFRE */}
      <section className="bg-church-warm py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="section-title">De ce chiar acum?</h2>
          <p className="section-subtitle">Bucureștiul are nevoie de mai mult decât oricând.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { nr: '2M+',  label: 'Locuitori în București' },
              { nr: '~60%', label: 'Se simt singuri în oraș' },
              { nr: '1:40K',label: 'Raport biserică:locuitori în sectoarele noi' },
              { nr: '2025', label: 'Momentul potrivit să construim ceva nou' },
            ].map(({ nr, label }) => (
              <div key={label} className="card text-center">
                <div className="text-3xl font-bold text-church-gold mb-2">{nr}</div>
                <div className="text-sm text-gray-600 leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOCUS PE CEILALȚI */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <div className="bg-church-navy text-white rounded-3xl p-10 md:p-16 text-center">
          <div className="text-5xl mb-6">🌍</div>
          <h2 className="text-3xl font-bold mb-4">Nu existăm pentru noi</h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            O biserică sănătoasă nu există pentru membrii ei. Există pentru orașul din jurul ei.
            Vrem ca fiecare cartier, fiecare stradă, fiecare bloc din București să fie atins de
            generozitatea și bunătatea comunității noastre.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="section-title">Fă parte din această poveste</h2>
          <p className="section-subtitle">
            Suntem la început. Acum e momentul perfect să te alături nouă.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join" className="btn-primary">Alătură-te echipei →</Link>
            <Link href="/give" className="btn-secondary">Susține financiar</Link>
          </div>
        </div>
      </section>
    </>
  )
}
