import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Misiunea noastră · Momentum | Alba Iulia',
  description: 'Misiunea Bisericii Momentum: un loc unde oamenii să-L cunoască pe Dumnezeu, să descopere scopul lor și să se simtă acasă.',
}

export default function MisiuneaNoastraPage() {
  return (
    <>
      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color:'white', padding:'100px 0 80px'}}>
        <div className="wrap" style={{textAlign:'center'}}>


          <h1 className="display" style={{fontSize:'clamp(2.4rem,5vw,6.5rem)', color:'white', marginBottom:24, lineHeight:1}}>
            UN LOC UNDE<br />
            <span style={{color:'#b6d8fc'}}>OAMENII ÎL CUNOSC<br />PE DUMNEZEU</span>
          </h1>

          <p style={{fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.65)', maxWidth:950, margin:'0 auto', fontWeight:300, lineHeight:1.7}}>
            Misiunea noastră este să creăm un spațiu și o comunitate în care fiecare om să fie binevenit, să-L cunoască pe Dumnezeu și să descopere scopul pentru care El l-a adus în existență.
          </p>
        </div>
      </section>

      {/* MISIUNEA */}
      <section className="section" style={{ background: 'white' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            
            <div>
              <p className="label">Ce credem</p>

              <h2 className="display" style={{fontSize:'clamp(2rem,5vw,3.8rem)', color:'#0a0f2c', marginBottom:24}}>
                FIECARE OM<br />ARE VALOARE
              </h2>

              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300, marginBottom:16}}>
                Credem că toți oamenii sunt creați după chipul lui Dumnezeu și, prin urmare, au o valoare inestimabilă.
              </p>

              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300, marginBottom:16}}>
                Dorim ca Biserica Momentum să fie o casă și o familie pentru tineri, pentru familii și pentru orice om care își dorește să fie aproape de Dumnezeu.
              </p>

              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300}}>
                Fie că ești în căutarea lui Dumnezeu, la începutul credinței sau un creștin matur, credem că Momentum poate fi un loc în care să crești și să înflorești.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                width: '100%',
                maxWidth: 420,
                height: 300,
                clipPath:'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)',
                position:'relative',
                overflow:'hidden',
                background:'#0f1052'
              }}>
                <Image src="/alba-iulia.jpg" alt="Biserica Momentum Alba Iulia" fill style={{objectFit:'cover'}} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PENTRU CINE */}
      <section className="section" style={{background:'#f4f2ee'}}>
        <div className="wrap">
          <div style={{textAlign:'center', maxWidth:850, margin:'0 auto 56px'}}>
            <p className="label">Pentru cine suntem aici</p>

            <h2 className="display" style={{fontSize:'clamp(2.2rem,6vw,4.8rem)', color:'#0a0f2c', marginBottom:20}}>
              UN LOC PENTRU<br />FIECARE OM
            </h2>

            <p style={{color:'rgba(10,15,44,0.6)', lineHeight:1.8, fontWeight:300, fontSize:17}}>
              Ne dorim ca fiecare persoană care intră în contact cu Biserica Momentum să găsească un loc primitor, clar, cald și plin de viață.
            </p>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24}}>
            {[
              {
                title: 'Pentru cei care Îl caută pe Dumnezeu',
                text: 'Dorim ca oamenii care sunt în căutarea lui Dumnezeu să Îl poată descoperi într-un mod simplu, clar și apropiat de viața lor de zi cu zi.'
              },
              {
                title: 'Pentru generația tânără',
                text: 'Dorim ca tinerii să găsească un loc în care sunt iubiți, îngrijiți și înconjurați de prieteni. Un loc care se simte ca o familie.'
              },
              {
                title: 'Pentru cei maturi spiritual',
                text: 'Dorim ca oamenii maturi în credință să găsească un loc în care darurile lor, inima lor și dorința de a sluji pot fi puse în lucrarea lui Dumnezeu.'
              },
            ].map(({ title, text }) => (
              <div key={title} className="card" style={{padding:32}}>
                <h3 style={{fontSize:20, fontWeight:800, color:'#0a0f2c', marginBottom:14, lineHeight:1.3}}>
                  {title}
                </h3>
                <p style={{color:'rgba(10,15,44,0.6)', lineHeight:1.75, fontWeight:300, fontSize:15}}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUM TRĂIM MISIUNEA */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center'}}>
            
            <div>
              <p className="label">Cum trăim misiunea</p>

              <h2 className="display" style={{fontSize:'clamp(2rem,5vw,3.8rem)', color:'#0a0f2c', marginBottom:24}}>
                SIMPLU.<br />RELEVANT.<br />CU INIMĂ.
              </h2>

              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300, marginBottom:16}}>
                Mesajele sunt simple, clare și pline de încurajare, pentru ca oamenii să poată înțelege cine este Dumnezeu și ce înseamnă să-L urmeze pe Isus.
              </p>

              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300, marginBottom:16}}>
                Muzica, relațiile și atmosfera sunt gândite pentru o generație care are nevoie de credință vie, autentică și aproape de realitatea ei.
              </p>

              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300}}>
                Implicarea este una dintre valorile noastre importante, pentru că noi credem că biserica nu este doar un loc în care vii, ci o familie din care faci parte.
              </p>
            </div>

            <div style={{display:'flex', flexDirection:'column', gap:16}}>
              {[
                'Mesaje clare și pline de încurajare',
                'O atmosferă potrivită pentru tineri și familii',
                'Relații autentice și apropiate',
                'Oportunități reale de implicare și slujire',
              ].map((item) => (
                <div key={item} className="card" style={{padding:28}}>
                  <div style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.45rem)',
                    lineHeight: 1.25,
                    letterSpacing: '-0.02em',
                    color: '#1932af',
                  }}>
                    {item}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* DE CE ALBA IULIA */}
      <section className="section" style={{background:'#f4f2ee'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center'}}>
            
            <div>
              <p className="label">De ce Alba Iulia</p>

              <h2 className="display" style={{fontSize:'clamp(2rem,5vw,3.5rem)', color:'#0a0f2c', marginBottom:24}}>
                UN ORAȘ CU ISTORIE,<br />UN VIITOR DE CONSTRUIT
              </h2>

              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300, marginBottom:16}}>
                Alba Iulia este un oraș bogat în istorie, identitate și semnificație națională. Un loc unde trecutul este onorat, dar unde credem că Dumnezeu vrea să scrie și povești noi.
              </p>

              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300}}>
                Vedem o generație tânără care are nevoie de speranță, familii care caută direcție și oameni care au nevoie de o comunitate în care să fie primiți, iubiți și ajutați să se apropie de Dumnezeu.
              </p>
            </div>

            <div style={{ display:'flex', justifyContent:'flex-end' }}>
  <div style={{
    width:'100%',
    maxWidth:460,
    height:520,
    borderRadius:40,
    overflow:'hidden',
    position:'relative',
    background:'#0f1052'
  }}>
    <Image
      src="/alba-iulia.jpg"
      alt="Alba Iulia"
      fill
      style={{ objectFit:'cover' }}
    />
  </div>
</div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{background:'white', textAlign:'center'}}>
        <div className="wrap">
          <h2 className="display" style={{fontSize:'clamp(2.5rem,7vw,6rem)', color:'#0a0f2c', marginBottom:16}}>
            MOMENTUM ESTE<br />UN LOC PENTRU FAMILII.
          </h2>

          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:560, margin:'0 auto 40px', fontWeight:300, fontSize:17, lineHeight:1.8}}>
            Biserica Momentum este o familie. Un loc în care oamenii sunt primiți, iubiți și încurajați să trăiască aproape de Dumnezeu.
          </p>

          <div style={{display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap'}}>
            <Link href="/join" className="btn btn-blue">Alătură-te echipei</Link>
            <Link href="/give" className="btn btn-outline-blue">Susține financiar</Link>
          </div>
        </div>
      </section>
    </>
  )
}