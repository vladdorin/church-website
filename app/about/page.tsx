import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

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
          <h1 className="display" style={{fontSize:'clamp(3rem,5vw,7rem)', color:'white', marginBottom:24}}>
            POVESTEA<br /><span style={{color:'#b6d8fc'}}>NOASTRĂ</span>
          </h1>
        </div>
      </section>

      {/* PASTORII */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center'}} className="grid-1col-md-2col">
            <div>
              <p className="label">Pastori</p>
              <h2 className="display" style={{fontSize:'clamp(1.8rem,4vw,3.5rem)', color:'#0a0f2c', marginBottom:24, lineHeight:1}}>
                JOHN &amp;<br />VOICHI DURA
              </h2>
              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, marginBottom:16, fontWeight:300, fontSize:16}}>
                Biserica Momentum a fost fondată de John și Voichi Dura, care, împreună
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
                  alt="John și Voichi Dura — Pastori Biserica Momentum"
                  fill
                  style={{ objectFit:'cover', objectPosition:'center top' }}
                />
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0,
                  background:'linear-gradient(to top, rgba(8,12,30,0.75), transparent)',
                  padding:'28px 24px',
                }}>
                  <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.55)' }}>
                    Pastori · Biserica Momentum
                  </p>
                </div>
              </div>
              <div style={{
                position:'absolute', bottom:-16, right:-16, background:'#1932af', color:'white',
                borderRadius:16, padding:'12px 20px', fontSize:13, fontWeight:700
              }}>
                Alba Iulia, România
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CITAT */}
      <section style={{background:'#0a0f2c', padding:'80px 0'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="display" style={{fontSize:'clamp(1.4rem,3.5vw,2.8rem)', color:'white', maxWidth:800, margin:'0 auto', lineHeight:1.2}}>
            „NU VREM DOAR SĂ CONSTRUIM O BISERICĂ.
            <span style={{color:'#b6d8fc'}}> VREM SĂ CONSTRUIM UN LOC UNDE TOATĂ LUMEA SE SIMTE ACASĂ."</span>
          </p>
          <p style={{color:'rgba(255,255,255,0.4)', marginTop:24, fontSize:14, fontWeight:500, letterSpacing:'0.1em'}}>
            — John Dura, Pastor
          </p>
        </div>
      </section>

{/* NE DORIM O BISERICĂ */}
<section className="identity-section">
  <div className="wrap">
    <div className="identity-layout">
      <div>
        <p className="label identity-label">Identitatea noastră</p>

        <h2 className="identity-title">
          Construim o comunitate vie, autentică și relevantă.
        </h2>

        <p className="identity-text">
          Un loc unde oamenii Îl întâlnesc pe Dumnezeu, cresc într-o comunitate reală
          și trăiesc scopul pe care El îl are pentru ei.
        </p>
      </div>

      <div className="identity-cards">
        {[
          { nr: '01', titlu: 'Pentru generația tânără', desc: 'Un spațiu viu, curajos și relevant pentru tinerii din Alba Iulia.' },
          { nr: '02', titlu: 'Pentru familii', desc: 'O comunitate care întărește relațiile, valorile și credința de acasă.' },
          { nr: '03', titlu: 'Pentru scop', desc: 'Un loc unde fiecare om își descoperă darurile și chemarea.' },
        ].map(({ nr, titlu, desc }) => (
          <div key={nr} className="identity-card">
            <span>{nr}</span>
            <div>
              <h3>{titlu}</h3>
              <p>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* VIZIUNEA */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap">
          <p className="label" style={{textAlign:'center'}}>Viziunea Noastră</p>
          <h2 className="display vision-title">
            VREM SĂ FIM O BISERICĂ
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', textAlign:'center', maxWidth:560, margin:'0 auto 48px', fontWeight:300}}>

          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:20}}>
            {[
              'Vie, relevantă și plină de dragoste, unde oamenii Îl cunosc pe Dumnezeu, cresc spiritual și trăiesc credința în mod autentic',
              'Care arată orașului Împărăția lui Dumnezeu prin slujire, generozitate și prezență reală în comunitate',
              'Care întărește familiile și sprijină părinții să-și crească copiii în valori sănătoase și încredere în Dumnezeu',
              'Care trezește creativitatea, încurajând darurile și potențialul pus de Dumnezeu în fiecare om',
              'Care ajunge la tineri într-un mod practic, autentic și plin de iubire',
              'Cu o conducere care împuternicește fiecare credincios să fie martor al lui Hristos în viața de zi cu zi',
              'Unde copiii sunt iubiți și formați cu grijă, înțelepciune și pasiune ca să-L cunoască pe Isus',
              'Care crește împreună, unde fiecare membru este învățat, sprijinit și încurajat să devină matur și activ',
            ].map((text, index) => (
  <div key={text} className="vision-card">
    <div className="vision-index">
      {String(index + 1).padStart(2, '0')}
    </div>

    <div className="vision-arrow">›</div>

    <p className="vision-text">{text}</p>
  </div>
))}
          </div>
        </div>
      </section>

      {/* ARC */}
      <section className="arc-section" style={{ padding:'120px 0' }}>
        <div className="wrap">
          <div style={{
            background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
            borderRadius:32, padding:'56px 48px', textAlign:'center'
          }}>
            <p className="label" style={{color:'#b6d8fc'}}>Parteneriat oficial</p>
            <h2 className="display" style={{fontSize:'clamp(1.5rem,3.5vw,2.8rem)', color:'white', marginBottom:16}}>
              SUNTEM PARTENERI CU ARC
            </h2>
            <p style={{color:'rgba(255,255,255,0.55)', maxWidth:640, margin:'0 auto 24px', lineHeight:1.8, fontWeight:300}}>
              The Association of Related Churches (ARC) este o organizație globală care a ajutat
              la lansarea a peste 1.000 de biserici în întreaga lume. Ei cred în viziunea Momentum
              și sunt alături de noi prin formare, ghidare strategică și parteneriat financiar.
            </p>
            <p style={{color:'#b6d8fc', fontWeight:700, fontSize:16, marginBottom:32}}>
              ✦ Fiecare donație pe care o faci va fi dublată de ARC până la $50.000 ✦
            </p>
            <Link href="/give" className="arc-btn">
  <span>Susține lansarea</span>
</Link>
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
          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:550, margin:'0 auto 40px', fontWeight:300, fontSize:17}}>
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
