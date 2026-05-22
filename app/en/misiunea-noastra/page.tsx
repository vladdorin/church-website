import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Our Mission · Momentum | Alba Iulia',
  description: 'The mission of Momentum Church: a place where people know God, discover their purpose, and feel at home.',
}

const cards = [
  {
    title: 'For Those Seeking God',
    text: 'We want people who are searching for God to be able to discover Him in a simple, clear way that is close to their everyday life.',
  },
  {
    title: 'For the Young Generation',
    text: 'We want young people to find a place where they are loved, cared for, and surrounded by friends. A place that feels like family.',
  },
  {
    title: 'For the Spiritually Mature',
    text: 'We want people who are mature in faith to find a place where their gifts, their heart, and their desire to serve can be put to work in God\'s mission.',
  },
]

const values = [
  'Clear and encouraging messages',
  'An atmosphere welcoming to young people and families',
  'Authentic and meaningful relationships',
  'Real opportunities for involvement and service',
]

export default function MisiuneaNoastraPage() {
  return (
    <>
      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color:'white', padding:'100px 0 80px'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <h1 className="display" style={{fontSize:'clamp(2.4rem,5vw,6.5rem)', color:'white', marginBottom:24, lineHeight:1}}>
            A PLACE WHERE<br />
            <span style={{color:'#b6d8fc'}}>PEOPLE MEET<br />GOD</span>
          </h1>

          <p style={{fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.65)', maxWidth:930, margin:'0 auto', fontWeight:300, lineHeight:1.7}}>
            Our mission is to create a space and a community where every person is welcomed, can know God, and discover the purpose for which He brought them into existence.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="mission-premium-section mission-white">
        <div className="mission-glow mission-glow-blue" />
        <div className="wrap">
          <div className="mission-split">
            <div className="mission-copy">
              <span className="mission-number">01</span>
              <p className="label">What do we believe?</p>

              <h2 className="display mission-title">
                EVERY PERSON<br />HAS VALUE
              </h2>

              <div className="mission-text-box">
                <p>
                  We believe that all people are created in the image of God and therefore have immeasurable worth.
                </p>
                <p>
                  We want Momentum Church to be a home and a family for young people, for families, and for anyone who desires to be close to God.
                </p>
                <p>
                  Whether you are searching for God, just beginning in faith, or a mature Christian, we believe Momentum can be a place where you grow and flourish.
                </p>
              </div>
            </div>

            <div className="mission-image-frame">
              <Image
                src="/misiunea.jpg"
                alt="Momentum Mission"
                fill
                style={{ objectFit:'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR */}
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
              A PLACE FOR<br />EVERY PERSON
            </h2>
            <p>
              We want every person who comes into contact with Momentum Church to find a welcoming, warm, and life-filled place.
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

      {/* HOW WE LIVE THE MISSION */}
      <section className="mission-premium-section mission-dark">
        <div className="mission-glow mission-glow-light" />
        <div className="wrap">
          <div className="mission-split">
            <div className="mission-copy">
              <span className="mission-number dark">03</span>
              <p className="label-light">How do we live the mission?</p>

              <h2 className="display mission-title light">
                SIMPLE.<br />RELEVANT.<br />HEARTFELT.
              </h2>

              <div className="mission-text-box dark">
                <p>
                  Messages are simple, clear, and full of encouragement, so that people can understand who God is and what it means to follow Jesus.
                </p>
                <p>
                  The music, relationships, and atmosphere are designed for a generation that needs a living, authentic faith that is close to their reality.
                </p>
                <p>
                  Involvement is one of our core values, because we believe that church is not just a place you attend, but a family you belong to.
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

      {/* WHY ALBA IULIA */}
      <section className="mission-premium-section mission-cream">
        <div className="wrap">
          <div className="mission-split reverse-mobile">
            <div className="mission-copy">
              <span className="mission-number">04</span>
              <p className="label">Why Alba Iulia?</p>

              <h2 className="display mission-title">
                A PLACE WE<br />BELIEVE IN
              </h2>

              <div className="mission-text-box">
                <p>
                  Alba Iulia is a city rich in history, identity, and national significance. A place where the past is honoured, but where we believe God also wants to write new stories.
                </p>
                <p>
                  We see a young generation in need of hope, families looking for direction, and people who need a community where they are welcomed, loved, and helped to draw closer to God.
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
              YOUR STORY MATTERS
            </h2>

            <p>
              Momentum Church is a family. We are just getting started. Every person brings something unique to this community.
            </p>

            <div>
              <Link href="/join" className="btn btn-white">Join the Team</Link>
              <Link href="/give" className="btn btn-outline-white">Give Financially</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
