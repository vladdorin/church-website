import type { Metadata } from 'next'
import Link from 'next/link'
import JumpNav from '@/components/JumpNav'

export const metadata: Metadata = {
  title: 'Why Alba Iulia? · Momentum | Alba Iulia',
  description: 'Why we chose Alba Iulia and what we see in this special city.',
}

export default function WhyThisCityPage() {
  return (
    <>
      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color:'white', padding:'100px 0 80px'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="label" style={{color:'#b6d8fc'}}>Why Alba Iulia?</p>
          <h1 className="display" style={{fontSize:'clamp(2.5rem,8vw,6.5rem)', color:'white', marginBottom:24, lineHeight:1}}>
            A CITY WITH<br />HISTORY,<br /><span style={{color:'#b6d8fc'}}>A FUTURE<br />TO BUILD</span>
          </h1>
          <p style={{fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.6)', maxWidth:560, margin:'0 auto', fontWeight:300, lineHeight:1.7}}>
            Alba Iulia is a place rich in identity and national significance.
            The past is honoured — but the future is still being shaped.
          </p>
          <JumpNav label="On this page" links={[
            ['the-city', 'The city'], ['history', 'History'], ['the-need', 'The need'], ['why-now', 'Why now'],
          ]} />
        </div>
      </section>

      {/* THE CITY */}
      <section id="the-city" className="section" style={{background:'white'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center'}}>
            <div>
              <p className="label">The city</p>
              <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'#0a0f2c', marginBottom:24}}>
                ALBA IULIA,<br />ROMANIA
              </h2>
              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300, marginBottom:16}}>
                A city rich in history, identity and national significance. A place where the past
                is honoured, but the future is still under construction.
              </p>
              <p style={{color:'rgba(10,15,44,0.65)', lineHeight:1.8, fontWeight:300}}>
                With around 70,000 residents, a growing local community of families and young people,
                and a key cultural and spiritual role in Romania, Alba Iulia is the perfect place
                to build something new and lasting.
              </p>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:16}}>
              {[
                { icon:'🏙️', stat:'~70,000', desc:'residents in Alba Iulia' },
                { icon:'👨‍👩‍👧', stat:'Growing', desc:'community of families and young people' },
                { icon:'🇷🇴', stat:'Landmark', desc:'cultural and spiritual landmark in Romania' },
                { icon:'🎓', stat:'University', desc:'an important regional academic centre' },
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

      {/* HISTORICAL SIGNIFICANCE */}
      <section id="history" style={{background:'#0a0f2c', padding:'80px 0'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="label" style={{color:'#b6d8fc'}}>Significance</p>
          <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'white', marginBottom:32}}>
            A PLACE THAT MATTERS
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:20}}>
            {[
              { icon:'⚔️', title:'The Citadel', desc:'Alba Iulia is home to one of the most impressive star-shaped fortresses in Europe.' },
              { icon:'🇷🇴', title:'The 1918 Union', desc:'Where the Great Union was proclaimed — the symbolic heart of Romania.' },
              { icon:'⛪', title:'Christian heritage', desc:'A city with deep Christian roots, ready to welcome a living community of faith.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:20, padding:32, textAlign:'center'
              }}>
                <div style={{fontSize:40, marginBottom:16}}>{icon}</div>
                <h3 className="display" style={{fontSize:22, color:'white', marginBottom:10}}>{title}</h3>
                <p style={{color:'rgba(255,255,255,0.5)', fontSize:14, lineHeight:1.7, fontWeight:300}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE NEED */}
      <section id="the-need" className="section" style={{background:'#f8f9ff'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="label">The real need</p>
          <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'#0a0f2c', marginBottom:12}}>
            BEHIND THE NUMBERS
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:520, margin:'0 auto 48px', fontWeight:300}}>
            They are real people looking for purpose, hope and belonging.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:20}}>
            {[
              { icon:'📡', title:'A disconnected generation', desc:'A growing generation has drifted away from faith and no longer finds relevance in the traditional church.' },
              { icon:'🧭', title:'Families without direction', desc:'Families are looking for values and direction, but can’t find a community that speaks their language.' },
              { icon:'✝️', title:'Christian in name, not in life', desc:'Many identify as Christians but live their faith as tradition rather than a living relationship with God.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card" style={{textAlign:'center', padding:36}}>
                <div style={{fontSize:40, marginBottom:16}}>{icon}</div>
                <h3 className="display" style={{fontSize:22, color:'#0a0f2c', marginBottom:10}}>{title}</h3>
                <p style={{color:'rgba(10,15,44,0.6)', fontSize:14, lineHeight:1.7, fontWeight:300}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NOW */}
      <section id="why-now" className="section" style={{background:'white'}}>
        <div className="wrap">
          <div style={{
            background:'linear-gradient(135deg,#0f1052,#1932af)',
            borderRadius:32, padding:'64px 48px', textAlign:'center', maxWidth:800, margin:'0 auto'
          }}>
            <div style={{fontSize:56, marginBottom:16}}>🚀</div>
            <p className="label" style={{color:'#b6d8fc'}}>Why now?</p>
            <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'white', marginBottom:20}}>
              THE TIME IS NOW
            </h2>
            <p style={{color:'rgba(255,255,255,0.65)', maxWidth:560, margin:'0 auto 24px', lineHeight:1.8, fontWeight:300, fontSize:16}}>
              We’re not just building a good launch day. We’re building a church that will grow,
              make disciples and have a lasting impact on this city.
            </p>
            <p style={{color:'#b6d8fc', fontStyle:'italic', fontSize:18, fontWeight:500, maxWidth:520, margin:'0 auto'}}>
              “The momentum doesn’t stop with us. It carries on from generation to generation, until He returns.”
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{background:'#f8f9ff', textAlign:'center'}}>
        <div className="wrap">
          <p className="label">Be part of it</p>
          <h2 className="display" style={{fontSize:'clamp(2.5rem,7vw,6rem)', color:'#0a0f2c', marginBottom:16}}>
            YOUR STORY MATTERS.
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:480, margin:'0 auto 40px', fontWeight:300, fontSize:17}}>
            We’re just getting started. Every person brings something unique to this community.
          </p>
          <div style={{display:'flex', flexWrap:'wrap', gap:16, justifyContent:'center'}}>
            <Link href="/join" className="btn btn-blue">Join the team</Link>
            <Link href="/en/give" className="btn btn-outline-blue">Give</Link>
          </div>
        </div>
      </section>
    </>
  )
}
