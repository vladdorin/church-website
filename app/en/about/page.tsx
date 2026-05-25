import type { Metadata } from 'next'
import LocalizedLink from '@/components/LocalizedLink'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Who We Are · Momentum | Alba Iulia',
  description: 'The story of Momentum Church in Alba Iulia.',
}

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color:'white', padding:'100px 0 80px'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <h1 className="display" style={{fontSize:'clamp(3rem,5vw,7rem)', color:'white', marginBottom:24}}>
            OUR<br /><span style={{color:'#b6d8fc'}}>STORY</span>
          </h1>
        </div>
      </section>

      {/* PASTORS */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center'}} className="grid-1col-md-2col">
            <div>
              <p className="label">Pastors</p>
              <h2 className="display" style={{fontSize:'clamp(1.8rem,4vw,3.5rem)', color:'#0a0f2c', marginBottom:24, lineHeight:1}}>
                JOHN &amp;<br />VOICHI DURA
              </h2>
              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, marginBottom:16, fontWeight:300, fontSize:16}}>
  Momentum Church was founded by John and Voichi Dura, who, together with a passionate group of young people, laid the foundation of a new church in Alba Iulia. We are a Christian church and believe that every person deserves the opportunity to know and follow Jesus Christ, the Son of God, the Savior of all.
</p>

<p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, marginBottom:16, fontWeight:300, fontSize:16}}>
    From the very beginning, our desire was more than just building a church. We wanted a place where people feel welcomed, loved, and close to God, a place they can call home and experience real transformation.
</p>

<p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300, fontSize:16}}>
    We wholeheartedly believe that God has called us to be an authentic, relevant, and life-giving community for Alba Iulia and that is what we seek to build day by day, together.
</p>
            </div>
            <div style={{position:'relative'}}>
              <div style={{
                aspectRatio:'4/5', borderRadius:32, overflow:'hidden', position:'relative',
                background:'linear-gradient(135deg,#1932af 0%,#0f1052 100%)',
              }}>
                <Image
                  src="/john-voichi.jpg"
                  alt="John and Voichi Dura — Pastors of Momentum Church"
                  fill
                  style={{ objectFit:'cover', objectPosition:'center top' }}
                />
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0,
                  background:'linear-gradient(to top, rgba(8,12,30,0.75), transparent)',
                  padding:'28px 24px',
                }}>
                  <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.55)' }}>
                    Pastors · Momentum Church
                  </p>
                </div>
              </div>
              <div style={{
                position:'absolute', bottom:-16, right:-16, background:'#1932af', color:'white',
                borderRadius:16, padding:'12px 20px', fontSize:13, fontWeight:700
              }}>
                Alba Iulia, Romania
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{background:'#0a0f2c', padding:'80px 0'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="display" style={{fontSize:'clamp(1.4rem,3.5vw,2.8rem)', color:'white', maxWidth:800, margin:'0 auto', lineHeight:1.2}}>
            &ldquo;WE&apos;RE NOT JUST BUILDING A CHURCH.
            <span style={{color:'#b6d8fc'}}> WE&apos;RE BUILDING A PLACE PEOPLE CAN CALL HOME.&rdquo;</span>
          </p>
          <p style={{color:'rgba(255,255,255,0.4)', marginTop:24, fontSize:14, fontWeight:500, letterSpacing:'0.1em'}}>
            — John Dura, Pastor
          </p>
        </div>
      </section>

{/* OUR IDENTITY */}
<section className="identity-section">
  <div className="wrap">
    <div className="identity-layout">
      <div>
        <p className="label identity-label">Our Identity</p>

        <h2 className="identity-title">
          We are building a living, authentic, and relevant community.
        </h2>

        <p className="identity-text">
          A place where people meet God, grow in real community,
          and live out the purpose He has for them.
        </p>
      </div>

      <div className="identity-cards">
        {[
          { nr: '01', titlu: 'For the Young Generation', desc: 'A vibrant, bold, and relevant space for the young people of Alba Iulia.' },
          { nr: '02', titlu: 'For Families', desc: 'A community that strengthens relationships, values, and faith at home.' },
          { nr: '03', titlu: 'For Purpose', desc: 'A place where every person discovers their gifts and calling.' },
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

      {/* VISION */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap">
          <p className="label" style={{textAlign:'center'}}>Our Vision</p>
          <h2 className="display vision-title">
            WE WANT TO BE A CHURCH
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', textAlign:'center', maxWidth:560, margin:'0 auto 48px', fontWeight:300}}>

          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:20}}>
            {[
              'Alive, relevant, and full of love, where people know God, grow spiritually, and live out their faith authentically',
              'That shows the city the Kingdom of God through service, generosity, and genuine presence in the community',
              'That strengthens families and supports parents in raising their children with healthy values and trust in God',
              'That awakens creativity, encouraging the gifts and potential God has placed in every person',
              'That reaches young people in a practical, authentic, and loving way',
              'With leadership that empowers every believer to be a witness of Christ in everyday life',
              'Where children are loved and formed with care, wisdom, and passion to know Jesus',
              'That grows together, where every member is taught, supported, and encouraged to become mature and active',
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
            <p className="label" style={{color:'#b6d8fc'}}>Official Partnership</p>
            <h2 className="display" style={{fontSize:'clamp(1.5rem,3.5vw,2.8rem)', color:'white', marginBottom:16}}>
              WE ARE PARTNERS WITH ARC
            </h2>
            <p style={{color:'rgba(255,255,255,0.55)', maxWidth:640, margin:'0 auto 24px', lineHeight:1.8, fontWeight:300}}>
              The Association of Related Churches (ARC) is a global organization that has helped
              launch over 1,000 churches around the world. They believe in the Momentum vision
              and stand with us through training, strategic guidance, and financial partnership.
            </p>
            <p style={{color:'#b6d8fc', fontWeight:700, fontSize:16, marginBottom:32}}>
              ✦ Every donation you make will be matched by ARC up to $50,000 ✦
            </p>
            <LocalizedLink href="/give" className="arc-btn">
  <span>Support the Launch</span>
</LocalizedLink>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{background:'white', textAlign:'center'}}>
        <div className="wrap">
          <p className="label">Be Part of This</p>
          <h2 className="display" style={{fontSize:'clamp(1.8rem,5vw,4.5rem)', color:'#0a0f2c', marginBottom:16}}>
            THE MOMENT IS NOW.
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:550, margin:'0 auto 40px', fontWeight:300, fontSize:17}}>
            We are just getting started. Now is the perfect time to join.
          </p>
          <div style={{display:'flex', flexWrap:'wrap', gap:16, justifyContent:'center'}}>
            <LocalizedLink href="/join" className="btn btn-blue">Join Us</LocalizedLink>

          </div>
        </div>
      </section>
    </>
  )
}
