'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const PRESET_AMOUNTS = [25, 50, 100, 200]

function GiveForm() {
  const searchParams = useSearchParams()
  const success  = searchParams.get('success')
  const canceled = searchParams.get('canceled')

  const [selected, setSelected] = useState<number | null>(50)
  const [custom, setCustom] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const effectiveAmount = custom ? parseFloat(custom) : selected

  async function handleDonate() {
    if (!effectiveAmount || effectiveAmount < 5) {
      setError('Suma minimă este de 5 RON.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: effectiveAmount }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error ?? 'A apărut o eroare. Încearcă din nou.')
        setLoading(false)
      }
    } catch {
      setError('Eroare de rețea. Verifică conexiunea și încearcă din nou.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="card max-w-md w-full text-center py-12">
          <div className="text-6xl mb-4">🙏</div>
          <h2 className="text-2xl font-bold text-church-navy mb-3">Mulțumim din inimă!</h2>
          <p className="text-gray-600 leading-relaxed">
            Donația ta face o diferență reală. Vom folosi fiecare leu cu responsabilitate
            pentru a construi o comunitate sănătoasă în București.
          </p>
          <a href="/give" className="btn-primary mt-6 inline-block">Donează din nou</a>
        </div>
      </div>
    )
  }

  if (canceled) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="card max-w-md w-full text-center py-12">
          <div className="text-6xl mb-4">👋</div>
          <h2 className="text-2xl font-bold text-church-navy mb-3">Nicio problemă!</h2>
          <p className="text-gray-600">Plata a fost anulată. Poți încerca oricând ești pregătit(ă).</p>
          <a href="/give" className="btn-primary mt-6 inline-block">Încearcă din nou</a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">

      {/* CARD DONAȚIE */}
      <div className="card">
        <h2 className="text-2xl font-bold text-church-navy mb-2 text-center">Alege suma</h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Donația ta este procesată securizat prin Stripe.
        </p>

        {/* Sume preset */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {PRESET_AMOUNTS.map((amt) => (
            <button
              key={amt}
              onClick={() => { setSelected(amt); setCustom('') }}
              className={`py-4 rounded-xl font-bold text-lg border-2 transition-all ${
                selected === amt && !custom
                  ? 'border-church-gold bg-church-gold text-white scale-105'
                  : 'border-gray-200 text-church-navy hover:border-church-gold'
              }`}
            >
              {amt} <span className="text-sm font-normal">RON</span>
            </button>
          ))}
        </div>

        {/* Sumă custom */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sau introdu altă sumă (RON)
          </label>
          <div className="relative">
            <input
              type="number"
              min="5"
              max="50000"
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(null) }}
              className={`w-full border-2 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-church-gold transition-colors ${
                custom ? 'border-church-gold' : 'border-gray-200'
              }`}
              placeholder="ex: 75"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">RON</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4">
            {error}
          </div>
        )}

        {/* Sumă totală */}
        <div className="bg-church-warm rounded-xl px-4 py-3 flex justify-between items-center mb-6">
          <span className="text-gray-600 font-medium">Total donație</span>
          <span className="text-2xl font-bold text-church-navy">
            {effectiveAmount ? `${effectiveAmount} RON` : '—'}
          </span>
        </div>

        <button
          onClick={handleDonate}
          disabled={loading || !effectiveAmount}
          className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
            loading || !effectiveAmount
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-church-gold text-white hover:bg-yellow-600'
          }`}
        >
          {loading ? '⏳ Se procesează...' : `Donează ${effectiveAmount ? effectiveAmount + ' RON' : ''} →`}
        </button>

        <p className="text-xs text-center text-gray-400 mt-3">
          🔒 Plată securizată prin Stripe · Cardul tău nu este stocat de noi
        </p>
      </div>
    </div>
  )
}

export default function GivePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-church-navy text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-church-gold font-semibold uppercase tracking-widest text-sm mb-3">Donează</p>
          <h1 className="text-5xl font-bold mb-4">Investește în oameni</h1>
          <p className="text-xl text-gray-300 mb-6">
            Fiecare donație ajută la construirea unei comunități care schimbă vieți în București.
          </p>
        </div>
      </section>

      {/* BUGET & VIZIUNE */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-center">
          {[
            { icon: '🎯', titlu: 'Obiectiv strângere', suma: '50.000 RON', desc: 'Buget de lansare pentru primul an' },
            { icon: '✅', titlu: 'Strâns până acum',  suma: '12.500 RON', desc: '25% din obiectiv atins' },
            { icon: '🏗️', titlu: 'La ce folosim banii', suma: '',         desc: 'Spațiu, echipamente, programe comunitate' },
          ].map(({ icon, titlu, suma, desc }) => (
            <div key={titlu} className="card text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="font-bold text-church-navy text-lg">{titlu}</div>
              {suma && <div className="text-church-gold font-bold text-2xl my-1">{suma}</div>}
              <div className="text-gray-500 text-sm">{desc}</div>
            </div>
          ))}
        </div>

        {/* Progres bar */}
        <div className="card mb-16">
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
            <span>12.500 RON strânși</span>
            <span>Obiectiv: 50.000 RON</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <div className="bg-church-gold h-4 rounded-full" style={{ width: '25%' }} />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">25% din obiectivul de lansare</p>
        </div>
      </section>

      {/* FORMULAR DONAȚIE */}
      <Suspense fallback={<div className="py-16 text-center text-gray-400">Se încarcă...</div>}>
        <GiveForm />
      </Suspense>

      {/* DE CE SĂ DONEZI */}
      <section className="bg-church-warm py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-title text-center">Cum sunt folosiți banii</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {[
              { procent: '40%', label: 'Spațiu & infrastructură', desc: 'Chirie, dotare sală, sistem audio-video' },
              { procent: '30%', label: 'Programe comunitate',     desc: 'Evenimente, grupuri mici, programe pentru copii' },
              { procent: '20%', label: 'Comunicare',              desc: 'Website, social media, materiale tipărite' },
              { procent: '10%', label: 'Misiune locală',          desc: 'Ajutor pentru familii în dificultate din cartier' },
            ].map(({ procent, label, desc }) => (
              <div key={label} className="card flex gap-4 items-start">
                <span className="text-church-gold font-bold text-2xl flex-shrink-0">{procent}</span>
                <div>
                  <div className="font-semibold text-church-navy">{label}</div>
                  <div className="text-gray-500 text-sm">{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-gray-400 mt-6">
            Publicăm rapoarte financiare trimestriale pentru transparență deplină față de donatori.
          </p>
        </div>
      </section>
    </>
  )
}
