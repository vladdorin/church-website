import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'De ce Alba Iulia? | Momentum',
  description: 'De ce am ales Alba Iulia și ce vedem în acest oraș special.',
}

export default function WhyThisCityPage() {
  return (
    <>
      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color:'white', padding:'100px 0 80px'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="label" style={{color:'#b6d8fc'}}>De ce Alba Iulia?</p>
          <h1 className="display" style={{fontSize:'clamp(2.5rem,8vw,6.5rem)', color:'white', marginBottom:24, lineHeight:1}}>
            UN ORAȘ CU<br />ISTORIE,<br /><span style={{color:'#b6d8fc'}}>UN VIITOR<br />DE CONSTRUIT</span>
          </h1>
          <p style={{fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.6)', maxWidth:560, margin:'0 auto', fontWeight:300, lineHeight:1.7}}>
            Alba Iulia e un loc bogat în identitate și semnificație națională.
            Trecutul este onorat — dar viitorul este încă în formare.
          </p>
        </div>
      </section>

      {/* DESPRE ORAȘ */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center'}}>
            <div>
              <p className="label">Orașul</p>
              <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'#0a0f2c', marginBottom:24}}>
                ALBA IULIA,<br />ROMÂNIA
              </h2>
              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300, marginBottom:16}}>
                Un oraș bogat în istorie, identitate și semnificație națională. Un loc unde trecutul
                este onorat, dar viitorul este încă în construcție.
              </p>
              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300}}>
                Cu aproximativ 70.000 de locuitori, o comunitate locală în creștere de familii și tineri,
                și un rol cultural și spiritual de referință în România — Alba Iulia este locul perfect
                pentru a construi ceva nou și durabil.
              </p>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:16}}>
              {[
                { icon:'🏙️', stat:'~70.000', desc:'locuitori în Alba Iulia' },
                { icon:'👨‍👩‍👧', stat:'În creștere', desc:'comunitate de familii și tineri' },
                { icon:'🇷🇴', stat:'Reper', desc:'cultural și spiritual în România' },
                { icon:'🎓', stat:'Universitar', desc:'centru academic regional important' },
              ].map(({ icon, stat, desc }) => (
                <div key={stat} className="card" style={{display:'flex', gap:20, alignItems:'center', padding:24}}>
                  <span style={{fontSize:32}}>{icon}</span>
                  <div>
                    <div className="display" style={{fontSize:26, color:'#0a0f2c'}}>{stat}</div>
                    <div style={{color:'rgba(10,15,44,0.5)', fontSize:14, fontWeight:300}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEMNIFICAȚIE ISTORICĂ */}
      <section style={{background:'#0a0f2c', padding:'80px 0'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="label" style={{color:'#b6d8fc'}}>Semnificație</p>
          <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'white', marginBottom:32}}>
            UN LOC CU GREUTATE
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:20}}>
            {[
              { icon:'⚔️', titlu:'Cetatea Albă', desc:'Alba Iulia găzduiește una dintre cele mai impresionante cetăți medievale din Europa.' },
              { icon:'🇷🇴', titlu:'Unirea din 1918', desc:'Locul unde s-a semnat Unirea cea Mare — inima simbolică a României.' },
              { icon:'⛪', titlu:'Moștenire creștină', desc:'Oraș cu rădăcini creștine adânci, gata să primească o comunitate de credință vie.' },
            ].map(({ icon, titlu, desc }) => (
              <div key={titlu} style={{
                background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:20, padding:32, textAlign:'center'
              }}>
                <div style={{fontSize:40, marginBottom:16}}>{icon}</div>
                <h3 className="display" style={{fontSize:22, color:'white', marginBottom:10}}>{titlu}</h3>
                <p style={{color:'rgba(255,255,255,0.5)', fontSize:14, lineHeight:1.7, fontWeight:300}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEVOIA */}
      <section className="section" style={{background:'#f8f9ff'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="label">Nevoia reală</p>
          <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'#0a0f2c', marginBottom:12}}>
            ÎN SPATELE CIFRELOR
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:520, margin:'0 auto 48px', fontWeight:300}}>
            Sunt oameni reali care caută scop, speranță și apartenență.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:20}}>
            {[
              { icon:'📡', titlu:'O generație deconectată', desc:'O generație în creștere s-a îndepărtat de credință și nu mai găsește relevanță în biserica tradițională.' },
              { icon:'🧭', titlu:'Familii fără direcție', desc:'Familiile caută valori și direcție, dar nu găsesc o comunitate care să vorbească pe limba lor.' },
              { icon:'✝️', titlu:'Creștin în act, nu în trăire', desc:'Mulți se identifică drept creștini, dar trăiesc religia ca tradiție, nu ca relație vie cu Dumnezeu.' },
            ].map(({ icon, titlu, desc }) => (
              <div key={titlu} className="card" style={{textAlign:'center', padding:36}}>
                <div style={{fontSize:40, marginBottom:16}}>{icon}</div>
                <h3 className="display" style={{fontSize:22, color:'#0a0f2c', marginBottom:10}}>{titlu}</h3>
                <p style={{color:'rgba(10,15,44,0.6)', fontSize:14, lineHeight:1.7, fontWeight:300}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DE CE ACUM */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap">
          <div style={{
            background:'linear-gradient(135deg,#0f1052,#1932af)',
            borderRadius:32, padding:'64px 48px', textAlign:'center', maxWidth:800, margin:'0 auto'
          }}>
            <div style={{fontSize:56, marginBottom:16}}>🚀</div>
            <p className="label" style={{color:'#b6d8fc'}}>De ce acum?</p>
            <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'white', marginBottom:20}}>
              MOMENTUL E ACUM
            </h2>
            <p style={{color:'rgba(255,255,255,0.65)', maxWidth:560, margin:'0 auto 24px', lineHeight:1.8, fontWeight:300, fontSize:16}}>
              Nu construim doar o zi bună de lansare. Construim o biserică care va crește,
              va face ucenici și va avea impact în acest oraș pe termen lung.
            </p>
            <p style={{color:'#b6d8fc', fontStyle:'italic', fontSize:18, fontWeight:500, maxWidth:520, margin:'0 auto'}}>
              „Momentum-ul nu se oprește la noi. Merge din generație în generație, până la venirea Lui."
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{background:'#f8f9ff', textAlign:'center'}}>
        <div className="wrap">
          <p className="label">Fă parte din asta</p>
          <h2 className="display" style={{fontSize:'clamp(2.5rem,7vw,6rem)', color:'#0a0f2c', marginBottom:16}}>
            POVESTEA TA CONTEAZĂ.
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:480, margin:'0 auto 40px', fontWeight:300, fontSize:17}}>
            Suntem la început. Fiecare persoană aduce ceva unic în această comunitate.
          </p>
          <div style={{display:'flex', flexWrap:'wrap', gap:16, justifyContent:'center'}}>
            <Link href="/join" className="btn btn-blue">Alătură-te echipei</Link>
            <Link href="/give" className="btn btn-outline-blue">Susține financiar</Link>
          </div>
        </div>
      </section>
    </>
  )
}
