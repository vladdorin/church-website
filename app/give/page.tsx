'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { FundraiserFull } from '@/components/FundraiserBar'

const PRESET_AMOUNTS = [25, 50, 100, 250]

function GiveForm() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')

  const [selected, setSelected] = useState<number | null>(100)
  const [custom, setCustom] = useState('')
  const [donationReason, setDonationReason] = useState('Fond lansare Momentum')
  const [customReason, setCustomReason] = useState('')
  const [donationType, setDonationType] = useState<'once' | 'monthly'>('once')
  const [coverFees, setCoverFees] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const effectiveAmount = custom ? parseFloat(custom) : selected
  const finalReason = donationReason === 'Alt motiv' ? customReason.trim() : donationReason
const finalAmount = effectiveAmount
  ? coverFees
    ? Math.ceil(effectiveAmount * 1.03 + 1)
    : effectiveAmount
  : null

  async function handleDonate() {
    if (!effectiveAmount || effectiveAmount < 5) {
      setError('Suma minimă este de 5 RON.')
      return
    }

    if (donationReason === 'Alt motiv' && !customReason.trim()) {
      setError('Te rugăm să completezi motivul donației.')
      return
    }

    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
  amount: finalAmount,
  originalAmount: effectiveAmount,
  reason: finalReason,
  donationType,
  coverFees,
}),
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
      <section className="section" style={{ background: 'white' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{ maxWidth: 480, width: '100%', textAlign: 'center', padding: 56 }}>
            <h2 className="display" style={{ fontSize: 36, color: '#0a0f2c', marginBottom: 12 }}>
              MULȚUMIM DIN INIMĂ!
            </h2>
            <p style={{ color: 'rgba(10,15,44,0.6)', lineHeight: 1.8, fontWeight: 300, marginBottom: 32 }}>
              Donația ta face o diferență reală în Alba Iulia. Fiecare donație pe care o faci va fi dublată de ARC —
              impactul tău este de două ori mai mare!
            </p>
            <a href="/give" className="btn btn-blue">Donează din nou</a>
          </div>
        </div>
      </section>
    )
  }

  if (canceled) {
    return (
      <section className="section" style={{ background: 'white' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{ maxWidth: 480, width: '100%', textAlign: 'center', padding: 56 }}>
            <h2 className="display" style={{ fontSize: 36, color: '#0a0f2c', marginBottom: 12 }}>
              NICIO PROBLEMĂ!
            </h2>
            <p style={{ color: 'rgba(10,15,44,0.6)', lineHeight: 1.8, fontWeight: 300, marginBottom: 32 }}>
              Plata a fost anulată. Poți reveni oricând ești pregătit(ă).
            </p>
            <a href="/give" className="btn btn-blue">Încearcă din nou</a>
          </div>
        </div>
      </section>
    )
  }

  return (
  <section
    className="section"
    style={{
      background:
        'radial-gradient(circle at top left, rgba(182,216,252,0.22), transparent 35%), linear-gradient(135deg,#0f1052 0%,#080818 100%)',
    }}
  >
      <div className="wrap">
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div
  className="card"
  style={{
    padding: 40,
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(255,255,255,0.45)',
    boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
  }}
>
            <h2 className="display" style={{ fontSize: 32, color: '#0a0f2c', textAlign: 'center', marginBottom: 8 }}>
              ALEGE SUMA
            </h2>

            <p style={{ color: 'rgba(10,15,44,0.5)', textAlign: 'center', fontSize: 14, marginBottom: 28, fontWeight: 300 }}>
              Donația ta este procesată securizat prin Stripe.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setSelected(amt)
                    setCustom('')
                  }}
                  style={{
                    padding: '16px 8px',
                    borderRadius: 14,
                    fontWeight: 700,
                    fontSize: 18,
                    cursor: 'pointer',
                    border: selected === amt && !custom ? '2px solid #1932af' : '2px solid rgba(10,15,44,0.12)',
                    background: selected === amt && !custom ? '#1932af' : 'white',
                    color: selected === amt && !custom ? 'white' : '#0a0f2c',
                    transition: 'all 0.15s ease',
                    transform: selected === amt && !custom ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {amt} <span style={{ fontSize: 12, fontWeight: 400 }}>RON</span>
                </button>
              ))}
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0a0f2c', marginBottom: 6 }}>
                Sau introdu altă sumă (RON)
              </label>

              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  min="5"
                  max="50000"
                  value={custom}
                  onChange={(e) => {
                    setCustom(e.target.value)
                    setSelected(null)
                  }}
                  style={{
                    width: '100%',
                    border: custom ? '2px solid #1932af' : '2px solid rgba(10,15,44,0.12)',
                    borderRadius: 14,
                    padding: '14px 52px 14px 16px',
                    fontSize: 18,
                    outline: 'none',
                    fontFamily: 'Inter,sans-serif',
                    transition: 'border-color 0.15s ease',
                  }}
                  placeholder="ex: 150"
                />
                <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(10,15,44,0.4)', fontWeight: 600 }}>
                  RON
                </span>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0a0f2c', marginBottom: 6 }}>
                Motivul donației
              </label>

              <select
                value={donationReason}
                onChange={(e) => setDonationReason(e.target.value)}
                style={{
                  width: '100%',
                  border: '2px solid rgba(10,15,44,0.12)',
                  borderRadius: 14,
                  padding: '14px 16px',
                  fontSize: 15,
                  outline: 'none',
                  fontFamily: 'Inter,sans-serif',
                  background: 'white',
                  marginBottom: donationReason === 'Alt motiv' ? 10 : 0,
                }}
              >
                <option>Fond lansare Momentum</option>
                <option>Echipamente & logistică</option>
                <option>Evenimente & outreach</option>
                <option>Dărnicie / Zeciuială</option>
                <option>Alt motiv</option>
              </select>

              {donationReason === 'Alt motiv' && (
                <input
                  type="text"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Scrie motivul donației"
                  style={{
                    width: '100%',
                    border: '2px solid rgba(10,15,44,0.12)',
                    borderRadius: 14,
                    padding: '14px 16px',
                    fontSize: 15,
                    outline: 'none',
                    fontFamily: 'Inter,sans-serif',
                  }}
                />
              )}
            </div>

<div style={{marginBottom:20}}>
  <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:8}}>
    Tipul donației
  </label>

  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
    <button
      type="button"
      onClick={() => setDonationType('once')}
      style={{
        padding:'14px 12px',
        borderRadius:14,
        border: donationType === 'once' ? '2px solid #1932af' : '2px solid rgba(10,15,44,0.12)',
        background: donationType === 'once' ? '#1932af' : 'white',
        color: donationType === 'once' ? 'white' : '#0a0f2c',
        fontWeight:700,
        cursor:'pointer',
      }}
    >
      O singură dată
    </button>

    <button
      type="button"
      onClick={() => setDonationType('monthly')}
      style={{
        padding:'14px 12px',
        borderRadius:14,
        border: donationType === 'monthly' ? '2px solid #1932af' : '2px solid rgba(10,15,44,0.12)',
        background: donationType === 'monthly' ? '#1932af' : 'white',
        color: donationType === 'monthly' ? 'white' : '#0a0f2c',
        fontWeight:700,
        cursor:'pointer',
      }}
    >
      Lunar
    </button>
  </div>
</div>

<label
  style={{
    display:'flex',
    alignItems:'flex-start',
    gap:10,
    fontSize:13,
    color:'rgba(10,15,44,0.65)',
    lineHeight:1.5,
    cursor:'pointer',
    marginBottom:20,
  }}
>
  <input
    type="checkbox"
    checked={coverFees}
    onChange={(e) => setCoverFees(e.target.checked)}
    style={{
      marginTop:3,
      width:16,
      height:16,
      accentColor:'#1932af',
      flexShrink:0,
    }}
  />
  <span>
    Vreau să acopăr și taxele de procesare.
  </span>
</label>

            {error && (
              <div style={{ background: '#fff1f1', border: '1px solid #fecaca', color: '#dc2626', borderRadius: 12, padding: '12px 16px', fontSize: 14, marginBottom: 16 }}>
                {error}
              </div>
            )}

            <div style={{ background: '#f8f9ff', borderRadius: 14, padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ color: 'rgba(10,15,44,0.6)', fontWeight: 500 }}>Donația ta</span>
              <span className="display" style={{ fontSize: 28, color: '#0a0f2c' }}>
                {finalAmount ? `${finalAmount} RON` : '—'}
              </span>
            </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <span style={{ color: '#16a34a', fontWeight: 500, fontSize: 13 }}>+ Matched de ARC (până la $50K total)</span>
              <span style={{ color: '#16a34a', fontWeight: 700 }}>×2 impact</span>
            </div>

            <button
              onClick={handleDonate}
              disabled={loading || !effectiveAmount}
              className="btn btn-blue"
              style={{
                width: '100%',
                fontSize: 16,
                padding: '16px 32px',
                justifyContent: 'center',
                opacity: loading || !effectiveAmount ? 0.5 : 1,
                cursor: loading || !effectiveAmount ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? '⏳ Se procesează...' : `Donează ${finalAmount ? finalAmount + ' RON' : ''}`}
            </button>

            <p style={{ fontSize: 12, textAlign: 'center', color: 'rgba(10,15,44,0.35)', marginTop: 12 }}>
              🔒 Plată securizată prin Stripe · Cardul tău nu este stocat de noi
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function GivePage() {
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color: 'white', padding: '100px 0 80px' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h1 className="display" style={{ fontSize: 'clamp(3rem,5vw,7rem)', color: 'white', marginBottom: 24 }}>
            FII PARTE<br /><span style={{ color: '#b6d8fc' }}>DIN CEVA ETERN</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem,2.5vw,1.25rem)', color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto 16px', fontWeight: 300, lineHeight: 1.7 }}>
            Ajută la construirea comunității Momentum în Alba Iulia.
          </p>

          <p style={{ color: '#b6d8fc', fontWeight: 700, fontSize: 16 }}>
            ✦ Fiecare $1 donat este dublat de ARC - impactul tău este de 2× mai mare ✦
          </p>
        </div>
      </section>

      <section className="section" style={{ background: '#f8f9ff' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="display" style={{ fontSize: 'clamp(2rem,5vw,4rem)', color: '#0a0f2c', marginBottom: 12 }}>
              PROGRESUL NOSTRU
            </h2>

            <p style={{ color: 'rgba(10,15,44,0.5)', maxWidth: 750, margin: '0 auto', fontWeight: 300 }}>
              Urmărește în timp real cât am strâns împreună pentru lansarea oficială Momentum.
            </p>
          </div>

          <FundraiserFull />
        </div>
      </section>

      <Suspense fallback={
        <div style={{ padding: '64px 24px', textAlign: 'center', color: 'rgba(10,15,44,0.4)' }}>
          Se încarcă...
        </div>
      }>
        <GiveForm />
      </Suspense>

      <section className="section" style={{ background: '#f8f9ff' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2 className="display" style={{ fontSize: 'clamp(2rem,5vw,4rem)', color: '#0a0f2c', marginBottom: 48 }}>
            ALTE MODURI DE A NE SUSȚINE
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { titlu: 'Roagă-te', desc: 'Rugăciunea ta este cea mai valoroasă contribuție pentru lansarea Momentum.' },
              { titlu: 'Spune altora', desc: 'Vorbește despre Biserica Momentum în cercul tău de prieteni și familie.' },
              { titlu: 'Implică-te', desc: 'Vino în echipă și contribuie cu talentele tale la construirea comunității.' },
            ].map(({ titlu, desc }) => (
              <div key={titlu} className="card" style={{ textAlign: 'center', padding: 36 }}>
                <h3 className="display" style={{ fontSize: 22, color: '#0a0f2c', marginBottom: 10 }}>
                  {titlu}
                </h3>
                <p style={{ color: 'rgba(10,15,44,0.55)', fontSize: 14, lineHeight: 1.7, fontWeight: 300 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}