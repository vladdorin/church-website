import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Prayer · Momentum | Alba Iulia',
  description: 'Stand with us in prayer for Alba Iulia and for the launch of Momentum Church.',
}

export default function PrayPage() {
  return (
    <>
      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color:'white', padding:'100px 0 80px'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <h1 className="display" style={{fontSize:'clamp(3rem,5vw,7rem)', color:'white', marginBottom:24}}>
            STAND<span style={{color:'#b6d8fc'}}> <br />WITH US</span>
          </h1>
          <p style={{fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.6)', maxWidth:520, margin:'0 auto', fontWeight:300, lineHeight:1.7}}>
            Prayer is the engine behind everything we do.<br />
            Every prayer matters.
          </p>
        </div>
      </section>

      {/* WHAT WE PRAY FOR */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <h2 className="display" style={{fontSize:'clamp(2rem,3.5vw,4rem)', color:'#0a0f2c', marginBottom:12, lineHeight: 1.05, maxWidth:850, margin:'0 auto 40px'}}>
            OUR PRAYER FOCUS
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:480, margin:'0 auto 56px', fontWeight:300}}>
            Here is what we pray for daily. We invite you to join us.
          </p>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:20, textAlign:'left'}}>
            {[
              { nr:'01', titlu:'A generation with purpose', desc:'We pray that the young people of Alba Iulia would discover God-given purpose and live out an authentic faith.' },
              { nr:'02', titlu:'Restored families', desc:'We pray that families would find healthy values and grow together in faith and love.' },
              { nr:'03', titlu:'The Momentum launch', desc:'We pray that God would prepare people\'s hearts and bring exactly who needs to be here in October 2026.' },
              { nr:'04', titlu:'Resources and supporters', desc:'We pray for partners who believe in the vision and will financially support the building of this community.' },
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
            DO YOU HAVE A PERSONAL PRAYER REQUEST?
          </h2>
          <p style={{color:'rgba(255,255,255,0.55)', maxWidth:380, margin:'0 auto 40px', fontWeight:300, lineHeight:1.8}}>
            Our team will personally pray for you. You are not alone.
          </p>
          <Link href="/connect" className="btn btn-white">Send Your Request</Link>
        </div>
      </section>


    </>
  )
}
