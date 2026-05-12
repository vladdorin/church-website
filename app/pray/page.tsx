import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Rugăciune · Momentum | Alba Iulia',
  description: 'Stai alături de noi în rugăciune pentru Alba Iulia și pentru lansarea Momentum Church.',
}

export default function PrayPage() {
  return (
    <>
      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color:'white', padding:'100px 0 80px'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <h1 className="display" style={{fontSize:'clamp(3rem,5vw,7rem)', color:'white', marginBottom:24}}>
            STAI ALĂTURI<span style={{color:'#b6d8fc'}}> <br />DE NOI</span>
          </h1>
          <p style={{fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.6)', maxWidth:520, margin:'0 auto', fontWeight:300, lineHeight:1.7}}>
            Rugăciunea este motorul din spatele a tot ce facem.<br />
            Fiecare rugăciune contează.
          </p>
        </div>
      </section>

      {/* PENTRU CE NE RUGĂM */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <h2 className="display" style={{fontSize:'clamp(2rem,3.5vw,4rem)', color:'#0a0f2c', marginBottom:12, lineHeight: 1.05, maxWidth:850, margin:'0 auto 40px'}}>
            MOTIVELE NOASTRE DE RUGĂCIUNE
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:480, margin:'0 auto 56px', fontWeight:300}}>
            Iată pentru ce ne rugăm zilnic. Te invităm să te alături.
          </p>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:20, textAlign:'left'}}>
            {[
              { nr:'01', titlu:'O generație cu scop', desc:'Ne rugăm ca tinerii din Alba Iulia să descopere scopul dat de Dumnezeu și să trăiască o credință autentică.' },
              { nr:'02', titlu:'Familii restaurate', desc:'Ne rugăm ca familiile să găsească valori sănătoase și să crească împreună în credință și iubire.' },
              { nr:'03', titlu:'Lansarea Momentum', desc:'Ne rugăm ca Dumnezeu să pregătească inimile oamenilor și să aducă la noi exact pe cine trebuie în octombrie 2026.' },
              { nr:'04', titlu:'Resurse și susținători', desc:'Ne rugăm pentru parteneri care să creadă în viziune și să susțină financiar construirea acestei comunități.' },
            ].map(({ nr, titlu, desc }) => (
              <div key={nr} className="prayer-card">
                <span className="display prayer-number">{nr}</span>

                <div className="prayer-content">
                  <h3 className="prayer-title">{titlu}</h3>
                  <p className="prayer-text">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'linear-gradient(135deg,#0f1052,#080818)', padding:'100px 0'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'white', marginBottom:16, lineHeight: 1.05 }}>
            AI O NEVOIE PERSONALĂ DE RUGĂCIUNE?
          </h2>
          <p style={{color:'rgba(255,255,255,0.55)', maxWidth:380, margin:'0 auto 40px', fontWeight:300, lineHeight:1.8}}>
            Echipa noastră se va ruga personal pentru tine. Nu ești singur(ă).
          </p>
          <Link href="/connect" className="btn btn-white">Trimite cererea ta</Link>
        </div>
      </section>

      
    </>
  )
}