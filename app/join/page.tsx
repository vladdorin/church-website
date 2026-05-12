'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function JoinPage() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  return (
    <>
      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color:'white', padding:'100px 0 80px'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <h1 className="display" style={{fontSize:'clamp(3rem,5vw,7rem)', color:'white', marginBottom:24}}>
            EȘTI<br /><span style={{color:'#b6d8fc'}}>BINEVENIT</span>
          </h1>
          <p style={{fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.6)', maxWidth:520, margin:'0 auto', fontWeight:300, lineHeight:1.7}}>
            Există un loc pentru tine în Momentum. Conectează-te, implică-te, crește.
          </p>
        </div>
      </section>

      {/* CUM TE POȚI IMPLICA */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'#0a0f2c', marginBottom:12}}>
            CUM TE POȚI IMPLICA
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:480, margin:'0 auto 48px', fontWeight:400}}>
            4 moduri prin care poți face parte din Biserica Momentum.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:20}}>
            {[
              { titlu:'Conectează-te', desc:'Ajută-ne să ajungem la oameni din Alba Iulia, distribuie vestea și adu-ți prietenii.' },
              { titlu:'Roagă-te', desc:'Stai alături de noi în rugăciune pentru acest oraș și pentru lansarea din octombrie 2026.' },
              { titlu:'Implică-te', desc:'Folosește-ți darurile și talentele pentru a construi această comunitate din temelii.' },
              { titlu:'Donează', desc:'Fii parte din construirea a ceva etern. Fiecare contribuție este dublată de ARC.' },
            ].map(({ titlu, desc }) => (
             <div
  key={titlu}
  className="involve-card"
>
  <div className="involve-glow" />
  <div className="involve-number">
    {String(['Conectează-te', 'Roagă-te', 'Implică-te', 'Donează'].indexOf(titlu) + 1).padStart(2, '0')}
  </div>

  <h3 className="display involve-title">
    {titlu}
  </h3>

  <p className="involve-desc">
    {desc}
  </p>
</div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
<section className="section" style={{background:'#f8f9ff'}}>
  <div className="wrap" style={{textAlign:'center'}}>
    <p className="label" style={{fontSize:'clamp(2.5rem,2vw,4rem)'}}>Timeline</p>
    <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'#0a0f2c', marginBottom:12}}>
      LANSARE 4 OCT 2026
    </h2>
    <p style={{color:'rgba(10,15,44,0.5)', maxWidth:800, margin:'0 auto 48px', fontWeight:400}}>
      Nu ne dorim să planificăm doar o zi de lansare, vrem să construim o comunitate pe termen lung.
    </p>

    <div className="timeline-mobile">
      {[
        { luna:'Mai–Iun', act:'PREGĂTIRE', desc:'Brand & awareness', highlight:false },
        { luna:'Iul–Aug', act:'ECHIPARE', desc:'Echipă, contacte, outreach', highlight:false },
        { luna:'Sep', act:'IMPLICARE', desc:'Traininguri & rugăciune', highlight:false },
        { luna:'Oct', act:'LANSARE', desc:'Prima duminică', highlight:true },
        { luna:'Nov+', act:'CREȘTERE', desc:'O comunitate puternică și vie', highlight:false },
      ].map(({ luna, act, desc, highlight }, index) => (
        <div
          key={luna}
          className={`timeline-item ${highlight ? 'timeline-highlight' : ''}`}
          style={{ animationDelay: `${index * 120}ms` }}
        >
          <div className="timeline-dot" />
          <div className="timeline-card">
            <div className="timeline-month">{luna} 2026</div>
            <div className="display timeline-title">{act}</div>
            <div className="timeline-desc">{desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* CARD DE CONECTARE */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap">
          <div style={{maxWidth:640, margin:'0 auto'}}>
            <div style={{textAlign:'center', marginBottom:40}}>
              <h2 className="display" style={{fontSize:'clamp(2rem,5vw,3.5rem)', color:'#0a0f2c', marginBottom:12}}>
                CARD DE CONECTARE
              </h2>
              <p style={{color:'rgba(10,15,44,0.55)', fontWeight:300}}>
                Completează formularul și vom lua legătura cu tine în cel mai scurt timp.
              </p>
            </div>

            <form
              className="card"
              style={{padding:40}}
              onSubmit={async (e) => {
                e.preventDefault()
                if (submitStatus === 'loading') return

                setSubmitStatus('loading')

                const form = e.currentTarget
                const formData = new FormData(form)

                try {
  const request = fetch('/api/form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      formType: 'Alătură-te',
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('implicare'),
      message: formData.get('message'),
      extra: {
        sursa: formData.get('sursa'),
        privacy: formData.get('privacy') === 'on',
      },
    }),
  })

  setTimeout(() => {
    form.reset()
    setSubmitStatus('success')
  }, 700)

  const res = await request

  if (!res.ok) {
    setSubmitStatus('error')
    return
  }

  setTimeout(() => setSubmitStatus('idle'), 3000)
} catch {
  setSubmitStatus('error')
  setTimeout(() => setSubmitStatus('idle'), 3000)
}
              }}
            >
              <div style={{marginBottom:16}}>
                <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Nume *</label>
                <input type="text" name="name" required
                  style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif'}}
                  placeholder="Ion Ionescu" />
              </div>

              <div style={{marginBottom:16}}>
                <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Email *</label>
                <input type="email" name="email" required
                  style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif'}}
                  placeholder="ion@exemplu.ro" />
              </div>

              <div style={{marginBottom:16}}>
                <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Telefon</label>
                <input type="tel" name="phone"
                  style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif'}}
                  placeholder="07xx xxx xxx" />
              </div>

              <div style={{marginBottom:16}}>
                <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Cum vrei să te implici?</label>
                <select name="implicare"
                  style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', background:'white'}}>
                  <option>Vreau să beau o cafea, am întrebări</option>
		  <option>Vreau să vin la prima întâlnire</option>
                  <option>Vreau să mă implic în echipă</option>
                  <option>Vreau să susțin financiar</option>
                </select>
              </div>

              <div style={{marginBottom:16}}>
                <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Cum ai auzit de Momentum?</label>
                <select name="sursa"
                  style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', background:'white'}}>
                  <option>Instagram / Facebook</option>
                  <option>Un prieten mi-a recomandat</option>
                  <option>Am căutat pe Google</option>
                  <option>Altele</option>
                </select>
              </div>

              <div style={{marginBottom:24}}>
                <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Mesaj (opțional)</label>
                <textarea name="message" rows={3}
                  style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', resize:'none'}}
                  placeholder="Spune-ne ceva despre tine..." />
              </div>

<div style={{marginBottom:24}}>
  <label
    style={{
      display:'flex',
      alignItems:'flex-start',
      gap:10,
      fontSize:13,
      color:'rgba(10,15,44,0.65)',
      lineHeight:1.5,
      cursor:'pointer'
    }}
  >
    <input
      type="checkbox"
      name="privacy"
      required
      style={{
        marginTop:3,
        width:16,
        height:16,
        accentColor:'#1932af'
      }}
    />
    <span>
      Sunt de acord cu{' '}
      <Link
        href="/politica-de-confidentialitate"
        style={{color:'#1932af', fontWeight:600, textDecoration:'underline'}}
      >
        Politica de confidențialitate
      </Link>
      .
    </span>
  </label>
</div>

              <button
                type="submit"
                className="btn btn-blue"
                disabled={submitStatus === 'loading'}
                style={{
                  width:'100%',
                  fontSize:16,
                  padding:'16px 32px',
                  justifyContent:'center',
                  transition:'all 0.25s ease',
                  background:
                    submitStatus === 'success'
                      ? '#16a34a'
                      : submitStatus === 'error'
                      ? '#dc2626'
                      : submitStatus === 'loading'
                      ? '#64748b'
                      : undefined,
                  transform: submitStatus === 'success' ? 'scale(1.03)' : 'scale(1)',
                  opacity: submitStatus === 'loading' ? 0.85 : 1,
                }}
              >
                {submitStatus === 'loading'
                  ? 'Se trimite...'
                  : submitStatus === 'success'
                  ? 'Trimis ✓'
                  : submitStatus === 'error'
                  ? 'Eroare ❌'
                  : 'Trimite cardul de conectare'}
              </button>

            </form>
          </div>
        </div>
      </section>
<style jsx>{`
  .timeline-mobile {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
  }

  .timeline-item {
    position: relative;
    animation: fadeUp 0.6s ease both;
  }

  .timeline-card {
    background: white;
    color: #0a0f2c;
    border-radius: 20px;
    padding: 24px 16px;
    border: 1px solid rgba(10,15,44,0.1);
  }

  .timeline-highlight .timeline-card {
    background: #1932af;
    color: white;
    border: 2px solid #1932af;
    transform: scale(1.05);
    box-shadow: 0 20px 40px rgba(25,50,175,0.35);
  }

  .timeline-month {
    font-size: 11px;
    font-weight: 700;
    margin-bottom: 8px;
    opacity: 0.45;
  }

  .timeline-highlight .timeline-month {
    opacity: 0.7;
  }

  .timeline-title {
    font-size: 18px;
    margin-bottom: 6px;
  }

  .timeline-desc {
    font-size: 12px;
    opacity: 0.55;
    font-weight: 300;
  }

  .timeline-highlight .timeline-desc {
    opacity: 0.75;
  }

  @media (max-width: 768px) {
    .timeline-mobile {
      display: flex;
      flex-direction: column;
      gap: 18px;
      position: relative;
      text-align: left;
      padding-left: 22px;
    }

    .timeline-mobile::before {
      content: '';
      position: absolute;
      left: 7px;
      top: 8px;
      bottom: 8px;
      width: 2px;
      background: linear-gradient(to bottom, rgba(25,50,175,0.15), #1932af, rgba(25,50,175,0.15));
      border-radius: 999px;
    }

    .timeline-item {
      padding-left: 18px;
    }

    .timeline-dot {
      position: absolute;
      left: -20px;
      top: 28px;
      width: 14px;
      height: 14px;
      border-radius: 999px;
      background: white;
      border: 3px solid #1932af;
      box-shadow: 0 0 0 6px rgba(25,50,175,0.08);
    }

    .timeline-card {
      padding: 22px 20px;
      transform: none !important;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .timeline-card:active {
      transform: scale(0.98) !important;
    }

    .timeline-highlight .timeline-card {
      transform: none !important;
      box-shadow: 0 18px 34px rgba(25,50,175,0.28);
    }
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
.involve-card {
  position: relative;
  overflow: hidden;
  min-height: 210px;
  padding: 34px 28px;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.95), rgba(248,249,255,0.9)),
    radial-gradient(circle at top right, rgba(182,216,252,0.7), transparent 35%);
  border: 1px solid rgba(25,50,175,0.12);
  box-shadow: 0 22px 50px rgba(10,15,44,0.08);
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.involve-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 70px rgba(25,50,175,0.16);
  border-color: rgba(25,50,175,0.28);
}

.involve-glow {
  position: absolute;
  width: 130px;
  height: 130px;
  right: -45px;
  top: -45px;
  border-radius: 999px;
  background: rgba(25,50,175,0.12);
  filter: blur(4px);
}

.involve-number {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  background: #1932af;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 28px;
  box-shadow: 0 12px 26px rgba(25,50,175,0.25);
}

.involve-title {
  font-size: clamp(18px, 2vw, 24px);
  color: #0a0f2c;
  margin-bottom: 12px;
  white-space: nowrap;
}

.involve-desc {
  color: rgba(10,15,44,0.58);
  font-size: 14px;
  line-height: 1.75;
  font-weight: 400;
  margin: 0;
}

@media (max-width: 768px) {
  .involve-card {
    min-height: auto;
    padding: 28px 24px;
  }

  .involve-card:hover {
    transform: none;
  }
}
`}</style>
    </>
  )
}
