import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Misiunea noastră | Momentum · Alba Iulia',
  description: 'De ce Alba Iulia, ce vedem în acest oraș și care este misiunea Momentum Church.',
}

export default function MisiuneaNoastraPage() {
  return (
    <>
      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color:'white', padding:'100px 0 80px'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="label" style={{color:'#b6d8fc'}}>Misiunea noastră</p>
          <h1 className="display" style={{fontSize:'clamp(2.5rem,8vw,6.5rem)', color:'white', marginBottom:24, lineHeight:1}}>
            UN ORAȘ CU ISTORIE,<br /><span style={{color:'#b6d8fc'}}>UN VIITOR<br />DE CONSTRUIT</span>
          </h1>
          <p style={{fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.6)', maxWidth:560, margin:'0 auto', fontWeight:300, lineHeight:1.7}}>
            De ce Alba Iulia? De ce acum? Și ce credem că Dumnezeu vrea să facă în acest loc.
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

      {/* CE VEDEM ÎN ALBA IULIA */}
      <section className="section" style={{background:'#f4f2ee'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center'}}>
            <div>
              <p className="label">Nevoia reală</p>
              <h2 className="display" style={{fontSize:'clamp(2rem,5vw,3.5rem)', color:'#0a0f2c', marginBottom:24}}>
                CE VEDEM ÎN<br />ALBA IULIA
              </h2>
              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300, marginBottom:16}}>
                O generație în creștere este deconectată de credință. Familiile caută valori și direcție.
                Mulți oameni se identifică drept creștini, dar nu participă activ la viața unei comunități.
              </p>
              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300, marginBottom:16}}>
                Peste 85–90% din populație se identifică drept creștin, dar doar o mică parte participă
                activ la o biserică. Mulți văd religia ca o tradiție, nu o relație personală cu Dumnezeu.
              </p>
              <p style={{color:'#0a0f2c', lineHeight:1.8, fontWeight:600, fontStyle:'italic'}}>
                „În spatele acestor numere sunt oameni reali, care caută scop, speranță și apartenența."
              </p>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:16}}>
              {[
                { icon:'🎓', stat:'18–20%', desc:'din populație are vârsta școlară (0–18 ani)' },
                { icon:'✝️', stat:'85–90%', desc:'se identifică drept creștini — dar puțini merg la biserică' },
                { icon:'🔌', stat:'Mulți', desc:'văd credința ca tradiție, nu ca relație vie cu Dumnezeu' },
              ].map(({ icon, stat, desc }) => (
                <div key={stat} className="card" style={{display:'flex', gap:20, alignItems:'center', padding:24}}>
                  <span style={{fontSize:32}}>{icon}</span>
                  <div>
                    <div className="display" style={{fontSize:28, color:'#1932af'}}>{stat}</div>
                    <div style={{color:'rgba(10,15,44,0.6)', fontSize:14, fontWeight:300}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA & OPORTUNITATEA */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="label">Context</p>
          <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'#0a0f2c', marginBottom:48}}>
            PROBLEMA ȘI OPORTUNITATEA
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, textAlign:'left'}}>
            <div className="card" style={{borderLeft:'4px solid #ef4444', padding:32}}>
              <h3 style={{fontWeight:800, fontSize:18, color:'#0a0f2c', marginBottom:20}}>Problema</h3>
              {[
                'Biserica tradițională pare irelevantă',
                'Credința este văzută ca depășită',
                'Oamenii sunt deconectați spiritual',
                'Tinerii pleacă din comunități de credință',
              ].map((p) => (
                <div key={p} style={{display:'flex', gap:12, alignItems:'flex-start', marginBottom:12}}>
                  <span style={{color:'#ef4444', fontWeight:700, flexShrink:0}}>›</span>
                  <span style={{color:'rgba(10,15,44,0.7)', fontWeight:400, fontSize:15}}>{p}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{borderLeft:'4px solid #1932af', padding:32}}>
              <h3 style={{fontWeight:800, fontSize:18, color:'#0a0f2c', marginBottom:20}}>Oportunitatea</h3>
              {[
                'Oamenii sunt deschiși la o credință autentică',
                'O nouă generație caută ceva real',
                'Alba Iulia e un centru universitar în creștere',
                'Biserica potrivită îi poate atinge pe toți',
              ].map((p) => (
                <div key={p} style={{display:'flex', gap:12, alignItems:'flex-start', marginBottom:12}}>
                  <span style={{color:'#1932af', fontWeight:700, flexShrink:0}}>›</span>
                  <span style={{color:'rgba(10,15,44,0.7)', fontWeight:400, fontSize:15}}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DE CE ACUM */}
      <section className="section" style={{background:'#f4f2ee'}}>
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
      <section className="section" style={{background:'white', textAlign:'center'}}>
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
