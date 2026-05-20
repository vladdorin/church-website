import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Misiunea noastră · Momentum | Alba Iulia',
  description: 'Misiunea Bisericii Momentum: un loc unde oamenii să-L cunoască pe Dumnezeu, să descopere scopul lor și să se simtă acasă.',
}

const cards = [
  {
    title: 'Pentru cei care Îl caută pe Dumnezeu',
    text: 'Dorim ca oamenii care sunt în căutarea lui Dumnezeu să Îl poată descoperi într-un mod simplu, clar și apropiat de viața lor de zi cu zi.',
  },
  {
    title: 'Pentru generația tânără',
    text: 'Dorim ca tinerii să găsească un loc în care sunt iubiți, îngrijiți și înconjurați de prieteni. Un loc care se simte ca o familie.',
  },
  {
    title: 'Pentru cei maturi spiritual',
    text: 'Dorim ca oamenii maturi în credință să găsească un loc în care darurile lor, inima lor și dorința de a sluji pot fi puse în lucrarea lui Dumnezeu.',
  },
]

const values = [
  'Mesaje clare și pline de încurajare',
  'O atmosferă potrivită pentru tineri și familii',
  'Relații autentice și apropiate',
  'Oportunități reale de implicare și slujire',
]

export default function MisiuneaNoastraPage() {
  return (
    <>
      {/* HERO — păstrat la fel */}
      <section style={{background:'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color:'white', padding:'100px 0 80px'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <h1 className="display" style={{fontSize:'clamp(2.4rem,5vw,6.5rem)', color:'white', marginBottom:24, lineHeight:1}}>
            UN LOC UNDE<br />
            <span style={{color:'#b6d8fc'}}>OAMENII ÎL CUNOSC<br />PE DUMNEZEU</span>
          </h1>

          <p style={{fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.65)', maxWidth:930, margin:'0 auto', fontWeight:300, lineHeight:1.7}}>
            Misiunea noastră este să creăm un spațiu și o comunitate în care fiecare om să fie binevenit, să-L cunoască pe Dumnezeu și să descopere scopul pentru care El l-a adus în existență.
          </p>
        </div>
      </section>

      {/* MISIUNEA */}
      <section className="mission-premium-section mission-white">
        <div className="mission-glow mission-glow-blue" />
        <div className="wrap">
          <div className="mission-split">
            <div className="mission-copy">
              <span className="mission-number">01</span>
              <p className="label">Ce credem?</p>

              <h2 className="display mission-title">
                FIECARE OM<br />ARE VALOARE
              </h2>

              <div className="mission-text-box">
                <p>
                  Credem că toți oamenii sunt creați după chipul lui Dumnezeu și, prin urmare, au o valoare inestimabilă.
                </p>
                <p>
                  Dorim ca Biserica Momentum să fie o casă și o familie pentru tineri, pentru familii și pentru orice om care își dorește să fie aproape de Dumnezeu.
                </p>
                <p>
                  Fie că ești în căutarea lui Dumnezeu, la începutul credinței sau un creștin matur, credem că Momentum poate fi un loc în care să crești și să înflorești.
                </p>
              </div>
            </div>

            <div className="mission-image-frame">
              <Image
                src="/misiunea.jpg"
                alt="Misiunea Momentum"
                fill
                style={{ objectFit:'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PENTRU CINE */}
      <section className="mission-premium-section mission-warm-people">
        <div className="wrap">
          <div className="mission-center" style={{position:'relative'}}>
  <span className="mission-number" style={{
    left:'50%',
    transform:'translateX(-50%)',
    top:'-90px',
    zIndex:0
  }}>
    02
  </span>
            <h2 className="display mission-title center">
              UN LOC PENTRU<br />FIECARE OM
            </h2>
            <p>
              Ne dorim ca fiecare persoană care intră în contact cu Biserica Momentum să găsească un loc primitor, cald și plin de viață.
            </p>
          </div>

          <div className="mission-card-grid">
            {cards.map((card, index) => (
              <div className="mission-premium-card" key={card.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUM TRĂIM MISIUNEA */}
      <section className="mission-premium-section mission-dark">
        <div className="mission-glow mission-glow-light" />
        <div className="wrap">
          <div className="mission-split">
            <div className="mission-copy">
              <span className="mission-number dark">03</span>
              <p className="label-light">Cum trăim misiunea?</p>

              <h2 className="display mission-title light">
                SIMPLU.<br />RELEVANT.<br />CU INIMĂ.
              </h2>

              <div className="mission-text-box dark">
                <p>
                  Mesajele sunt simple, clare și pline de încurajare, pentru ca oamenii să poată înțelege cine este Dumnezeu și ce înseamnă să-L urmeze pe Isus.
                </p>
                <p>
                  Muzica, relațiile și atmosfera sunt gândite pentru o generație care are nevoie de credință vie, autentică și aproape de realitatea ei.
                </p>
                <p>
                  Implicarea este una dintre valorile noastre importante, pentru că noi credem că biserica nu este doar un loc în care vii, ci o familie din care faci parte.
                </p>
              </div>
            </div>

            <div className="mission-value-stack">
              {values.map((item, index) => (
                <div className="mission-value-card" key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DE CE ALBA IULIA */}
      <section className="mission-premium-section mission-cream">
        <div className="wrap">
          <div className="mission-split reverse-mobile">
            <div className="mission-copy">
              <span className="mission-number">04</span>
              <p className="label">De ce Alba Iulia?</p>

              <h2 className="display mission-title">
                UN LOC ÎN CARE<br />CREDEM
              </h2>

              <div className="mission-text-box">
                <p>
                  Alba Iulia este un oraș bogat în istorie, identitate și semnificație națională. Un loc unde trecutul este onorat, dar unde credem că Dumnezeu vrea să scrie și povești noi.
                </p>
                <p>
                  Vedem o generație tânără care are nevoie de speranță, familii care caută direcție și oameni care au nevoie de o comunitate în care să fie primiți, iubiți și ajutați să se apropie de Dumnezeu.
                </p>
              </div>
            </div>

            <div className="mission-image-frame tall">
              <Image
                src="/alba-iulia.jpg"
                alt="Alba Iulia"
                fill
                style={{ objectFit:'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mission-final-cta">
        <div className="wrap">
          <div className="mission-cta-box">

            <h2 className="display">
              POVESTEA TA CONTEAZĂ
            </h2>

            <p>
              Biserica Momentum este o familie. Suntem la început. Fiecare persoană aduce ceva unic în această comunitate.
            </p>

            <div>
              <Link href="/join" className="btn btn-white">Alătură-te echipei</Link>
              <Link href="/give" className="btn btn-outline-white">Susține financiar</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}