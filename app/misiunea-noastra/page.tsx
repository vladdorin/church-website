import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

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
          <h1 className="display" style={{fontSize:'clamp(2.5rem,5vw,6.5rem)', color:'white', marginBottom:24, lineHeight:1}}>
            UN ORAȘ CU ISTORIE,<br /><span style={{color:'#b6d8fc'}}>UN VIITOR<br />DE CONSTRUIT</span>
          </h1>
          <p style={{fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.6)', maxWidth:850, margin:'0 auto', fontWeight:300, lineHeight:1.7}}>
            De ce Alba Iulia? De ce acum? Și ce credem că Dumnezeu vrea să facă în acest loc.
          </p>
        </div>
      </section>

      {/* DESPRE ORAȘ */}
      <section className="section" style={{ background: 'white' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            
            <div>
              <p className="label">Orașul</p>
              <h2 className="display" style={{fontSize:'clamp(2rem,5vw,3.5rem)', color:'#0a0f2c', marginBottom:24}}>
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

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                width: '100%',
                maxWidth: 400,
                height: 280,
                clipPath:'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)',
                position:'relative',
                overflow:'hidden',
                background:'#0f1052'
              }}>
                <Image src="/alba-iulia.jpg" alt="Alba Iulia" fill style={{objectFit:'cover'}} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CE VEDEM ÎN ALBA IULIA */}
      <section className="section" style={{background:'#f4f2ee'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center'}}>
            
            <div>
              <h2 className="display" style={{fontSize:'clamp(2rem,5vw,3.5rem)', color:'#0a0f2c', marginBottom:24}}>
                NEVOIA PE CARE O VEDEM ÎN<br />ALBA IULIA
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

            {/* 🔥 FIX AICI */}
            <div style={{display:'flex', flexDirection:'column', gap:16}}>
              {[
                { stat:'18–20% din populație are vârsta școlară (0-18 ani)' },
                { stat:'85–90% din populație se identifică ca și creștini' },
                { stat:'Un procent în creștere de oameni sunt deconectați de la credință' },
              ].map(({ stat }) => (
                <div key={stat} className="card" style={{padding:28}}>
                  <div style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(1.2rem, 1.6vw, 1.6rem)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                    color: '#1932af',
                  }}>
                    {stat}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{background:'white', textAlign:'center'}}>
        <div className="wrap">
          <h2 className="display" style={{fontSize:'clamp(2.5rem,7vw,6rem)', color:'#0a0f2c', marginBottom:16}}>
            POVESTEA TA CONTEAZĂ.
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:480, margin:'0 auto 40px', fontWeight:300, fontSize:17}}>
            Suntem la început. Fiecare persoană aduce ceva unic în această comunitate.
          </p>

          <div style={{display:'flex', gap:16, justifyContent:'center'}}>
            <Link href="/join" className="btn btn-blue">Alătură-te echipei</Link>
            <Link href="/give" className="btn btn-outline-blue">Susține financiar</Link>
          </div>
        </div>
      </section>
    </>
  )
}