import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const runtime = 'edge'
export const metadata: Metadata = {
  title: 'Despre noi | Momentum · Alba Iulia',
  description: 'Povestea lui John și Voichi Dura și a Bisericii Momentum din Alba Iulia.',
}

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color:'white', padding:'100px 0 80px'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="label" style={{color:'#b6d8fc'}}>Despre noi</p>
          <h1 className="display" style={{fontSize:'clamp(2.2rem,6vw,5rem)', color:'white', marginBottom:24}}>
            POVESTEA<br /><span style={{color:'#b6d8fc'}}>NOASTRĂ</span>
          </h1>
          <p style={{fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.6)', maxWidth:560, margin:'0 auto', fontWeight:300, lineHeight:1.7}}>
            Nu am vrut să construim o altă biserică.<br />Am vrut să construim un acasă.
          </p>
        </div>
      </section>

      {/* PASTORI */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center'}} className="grid-1col-md-2col">
            <div>
              <p className="label">Pastori</p>
              <h2 className="display" style={{fontSize:'clamp(1.8rem,4vw,3.5rem)', color:'#0a0f2c', marginBottom:24, lineHeight:1}}>
                JOHN &amp;<br />VOICHI DURA
              </h2>
              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, marginBottom:16, fontWeight:300, fontSize:16}}>
                Momentum Church a fost fondată de John și Voichi Dura, care, împreună
                cu un grup pasionat de tineri, au pus bazele unei comunități de credință
                în creștere în Alba Iulia.
              </p>
              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, marginBottom:16, fontWeight:300, fontSize:16}}>
                Nu am vrut doar să construim o biserică — am vrut să construim un acasă.
                Un loc unde oamenii pot cu adevărat să-L întâlnească pe Dumnezeu, să găsească
                apartenența și să trăiască o transformare reală.
              </p>
              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300, fontSize:16}}>
                Credem cu toată inima că Alba Iulia are nevoie de o comunitate autentică,
                relevantă și plină de viață — și suntem determinați să o construim.
              </p>
            </div>
            <div style={{position:'relative'}}>
              <div style={{
                aspectRatio:'4/5', borderRadius:32, overflow:'hidden', position:'relative',
                background:'linear-gradient(135deg,#1932af 0%,#0f1052 100%)',
              }}>
                <Image
                  src="/john-voichi.jpg"
                  alt="John și Voichi Dura — Pastori Momentum Church"
                  fill
                  style={{ objectFit:'cover', objectPosition:'center top' }}
                />
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0,
                  background:'linear-gradient(to top, rgba(8,12,30,0.75), transparent)',
                  padding:'28px 24px',
                }}>
                  <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.55)' }}>
                    Pastori · Momentum Church · Alba Iulia
                  </p>
                </div>
              </div>
              <div style={{
                position:'absolute', bottom:-16, right:-16, background:'#1932af', color:'white',
                borderRadius:16, padding:'12px 20px', fontSize:13, fontWeight:700
              }}>
                Alba Iulia, România 📍
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CITAT */}
      <section style={{background:'#0a0f2c', padding:'80px 0'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="display" style={{fontSize:'clamp(1.4rem,3.5vw,2.8rem)', color:'white', maxWidth:800, margin:'0 auto', lineHeight:1.2}}>
            „NU AM VRUT DOAR SĂ CONSTRUIM O BISERICĂ.
            <span style={{color:'#b6d8fc'}}> AM VRUT SĂ CONSTRUIM UN ACASĂ."</span>
          </p>
          <p style={{color:'rgba(255,255,255,0.4)', marginTop:24, fontSize:14, fontWeight:500, letterSpacing:'0.1em'}}>
            — John Dura, Pastor
          </p>
        </div>
      </section>

      {/* O BISERICĂ CARE ESTE */}
      <section className="section" style={{background:'#f8f9ff'}}>
        <div className="wrap">
          <p className="label" style={{textAlign:'center'}}>Identitatea noastră</p>
          <h2 className="display" style={{fontSize:'clamp(1.5rem,3.5vw,3rem)', color:'#0a0f2c', textAlign:'center', marginBottom:48}}>
            O BISERICĂ CARE ESTE...
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:2, borderRadius:24, overflow:'hidden', border:'1px solid rgba(10,15,44,0.1)'}}>
            {[
              { nr:'1.', titlu:'Autentică,', sub:'nu religioasă' },
              { nr:'2.', titlu:'Relevantă,', sub:'nu depășită' },
              { nr:'3.', titlu:'Plină de viață,', sub:'nu de rutină' },
            ].map(({ nr, titlu, sub }, i) => (
              <div key={nr} style={{
                background:'white', padding:'48px 32px', textAlign:'center',
                borderLeft: i > 0 ? '1px solid rgba(10,15,44,0.08)' : 'none'
              }}>
                <div className="display" style={{fontSize:56, color:'#1932af', marginBottom:8}}>{nr}</div>
                <div className="display" style={{fontSize:28, color:'#0a0f2c'}}>{titlu}</div>
                <div style={{color:'rgba(10,15,44,0.4)', marginTop:4, fontWeight:300}}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIZIUNEA */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap">
          <p className="label" style={{textAlign:'center'}}>Viziunea</p>
          <h2 className="display" style={{fontSize:'clamp(1.5rem,3.5vw,3rem)', color:'#0a0f2c', textAlign:'center', marginBottom:12}}>
            VREM SĂ FIM O COMUNITATE...
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', textAlign:'center', maxWidth:560, margin:'0 auto 48px', fontWeight:300}}>
            Iată viziunea care ne ghidează fiecare pas.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:20}}>
            {[
              'Vie, relevantă și plină de dragoste, unde oamenii Îl cunosc pe Dumnezeu, cresc spiritual și trăiesc credința în mod autentic',
              'Care arată orașului Împărăția lui Dumnezeu prin slujire, generozitate și prezență reală în comunitate',
              'Care întărește familiile și sprijină părinții să-și crească copiii în valori sănătoase și încredere în Dumnezeu',
              'Care trezește creativitatea, încurajând darurile și potențialul pus de Dumnezeu în fiecare om',
              'Care ajunge la tineri într-un mod practic, autentic și plin de iubire',
              'Cu o conducere care împuternicește fiecare credincios să fie martor al lui Hristos în viața de zi cu zi',
              'Un loc unde copiii sunt iubiți și formați cu grijă, înțelepciune și pasiune ca să-L cunoască pe Isus',
              'Care crește împreună, unde fiecare membru este învățat, sprijinit și încurajat să devină matur și activ',
            ].map((text, i) => (
              <div key={i} className="card" style={{display:'flex', gap:16, alignItems:'flex-start'}}>
                <span style={{color:'#1932af', fontWeight:700, fontSize:20, flexShrink:0, marginTop:2}}>›</span>
                <p style={{color:'rgba(10,15,44,0.7)', lineHeight:1.7, fontSize:15, fontWeight:300}}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARC */}
      <section style={{background:'#0f1052', padding:'80px 0'}}>
        <div className="wrap">
          <div style={{
            background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
            borderRadius:32, padding:'56px 48px', textAlign:'center'
          }}>
            <p className="label" style={{color:'#b6d8fc'}}>Parteneriat oficial</p>
            <h2 className="display" style={{fontSize:'clamp(1.5rem,3.5vw,2.8rem)', color:'white', marginBottom:16}}>
              ÎN PARTENERIAT CU ARC
            </h2>
            <p style={{color:'rgba(255,255,255,0.55)', maxWidth:640, margin:'0 auto 24px', lineHeight:1.8, fontWeight:300}}>
              The Association of Related Churches (ARC) este o organizație globală care a ajutat
              la lansarea a peste 1.000 de biserici în întreaga lume. Ei cred în viziunea Momentum
              și sunt alături de noi prin formare, ghidare strategică și parteneriat financiar.
            </p>
            <p style={{color:'#b6d8fc', fontWeight:700, fontSize:16, marginBottom:32}}>
              ✦ Fiecare donație pe care o faci va fi dublată de ARC până la $50.000 ✦
            </p>
            <Link href="/give" className="btn btn-white">Susține lansarea</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{background:'white', textAlign:'center'}}>
        <div className="wrap">
          <p className="label">Fă parte din asta</p>
          <h2 className="display" style={{fontSize:'clamp(1.8rem,5vw,4.5rem)', color:'#0a0f2c', marginBottom:16}}>
            MOMENTUL E ACUM.
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:480, margin:'0 auto 40px', fontWeight:300, fontSize:17}}>
            Suntem la început. Acum e momentul perfect să te alături.
          </p>
          <div style={{display:'flex', flexWrap:'wrap', gap:16, justifyContent:'center'}}>
            <Link href="/join" className="btn btn-blue">Alătură-te</Link>
            <Link href="/give" className="btn btn-outline-blue">Susține financiar</Link>
          </div>
        </div>
      </section>
    </>
  )
}
