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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'center',
      }}
    >
      
      {/* LEFT */}
      <div>
        <p className="label">Orașul</p>

        <h2
          className="display"
          style={{
            fontSize: 'clamp(2rem,5vw,3.5rem)',
            color: '#0a0f2c',
            marginBottom: 24,
          }}
        >
          ALBA IULIA,<br />ROMÂNIA
        </h2>

        <p
          style={{
            color: 'rgba(10,15,44,0.65)',
            lineHeight: 1.8,
            fontWeight: 300,
            marginBottom: 16,
          }}
        >
          Un oraș bogat în istorie, identitate și semnificație națională. Un loc unde trecutul
          este onorat, dar viitorul este încă în construcție.
        </p>

        <p
          style={{
            color: 'rgba(10,15,44,0.65)',
            lineHeight: 1.8,
            fontWeight: 300,
          }}
        >
          Cu aproximativ 70.000 de locuitori, o comunitate locală în creștere de familii și tineri,
          și un rol cultural și spiritual de referință în România — Alba Iulia este locul perfect
          pentru a construi ceva nou și durabil.
        </p>
      </div>

{/* RIGHT: PHOTO */}
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <div
    className="photo-card-wrap"
    style={{
      width: '100%',          // 🔥 important
      maxWidth: 400,          // controlezi cât de mare e
      height: 280,
      borderRadius: 0,
      clipPath:
        'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)',
      position: 'relative',
      overflow: 'hidden',
      background: '#0f1052',
    }}
  >
    <Image
      src="/alba-iulia.jpg"
      alt="Alba Iulia"
      fill
      style={{
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
  </div>
</div>
    </div>
  </div>
</section>

     {/* DE CE ALBA IULIA */}
<section style={{ background: '#0a0f2c', padding: '110px 0' }}>
  <div className="wrap">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.9fr 1.1fr',
        gap: 72,
        alignItems: 'start',
      }}
    >
      <div>
        <p className="label" style={{ color: '#b6d8fc' }}>
          De ce Alba Iulia?
        </p>

        <h2
          className="display"
          style={{
            fontSize: 'clamp(2.4rem,4.2vw,4.8rem)',
            color: 'white',
            lineHeight: 1,
            marginBottom: 28,
          }}
        >
          UN ORAȘ CU<br />RĂDĂCINI.<br />OAMENI CU<br />VIITOR.
        </h2>

        <p
          style={{
            color: 'rgba(255,255,255,0.58)',
            fontSize: 17,
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: 520,
          }}
        >
          Alba Iulia este un oraș cu memorie, identitate și simbol național.
          Dar dincolo de istorie, vedem oameni reali: familii, tineri,
          studenți și copii care au nevoie de speranță, comunitate și direcție.
        </p>
      </div>

      <div style={{ display: 'grid', gap: 18 }}>
        {[
          {
            nr: '01',
            titlu: 'Un oraș strategic',
            desc:
              'Alba Iulia este un centru regional în creștere, cu familii tinere, școli, universitate și o comunitate care se dezvoltă constant.',
          },
          {
            nr: '02',
            titlu: 'O generație care caută sens',
            desc:
              'Mulți tineri cresc într-un context religios, dar fără o legătură vie cu Dumnezeu sau cu o comunitate autentică de credință.',
          },
          {
            nr: '03',
            titlu: 'O nevoie de comunitate reală',
            desc:
              'Vrem să construim o biserică în care oamenii sunt cunoscuți, primiți, formați și trimiși să trăiască cu scop în orașul lor.',
          },
        ].map(({ nr, titlu, desc }) => (
          <div
            key={nr}
            style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: 24,
              padding: '28px 0',
              borderTop: '1px solid rgba(255,255,255,0.14)',
            }}
          >
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                fontSize: 18,
                color: '#b6d8fc',
                letterSpacing: '0.08em',
              }}
            >
              {nr}
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(1.35rem,2vw,2rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.04em',
                  color: 'white',
                  marginBottom: 10,
                }}
              >
                {titlu}
              </h3>

              <p
                style={{
                  color: 'rgba(255,255,255,0.56)',
                  fontSize: 15.5,
                  lineHeight: 1.75,
                  fontWeight: 300,
                  maxWidth: 640,
                }}
              >
                {desc}
              </p>
            </div>
          </div>
        ))}        
      </div>
    </div>
  </div>
</section>

      {/* CE VEDEM ÎN ALBA IULIA */}
<section className="section" style={{ background: '#f4f2ee' }}>
  <div className="wrap">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'center',
      }}
    >
      <div>
        <h2
          className="display"
          style={{
            fontSize: 'clamp(2rem,5vw,3.5rem)',
            color: '#0a0f2c',
            marginBottom: 24,
          }}
        >
          NEVOIA PE CARE O VEDEM ÎN<br />ALBA IULIA
        </h2>

        <p
          style={{
            color: 'rgba(10,15,44,0.65)',
            lineHeight: 1.8,
            fontWeight: 300,
            marginBottom: 16,
          }}
        >
          O generație în creștere este deconectată de credință. Familiile caută
          valori și direcție. Mulți oameni se identifică drept creștini, dar nu
          participă activ la viața unei comunități.
        </p>

        <p
          style={{
            color: 'rgba(10,15,44,0.65)',
            lineHeight: 1.8,
            fontWeight: 300,
            marginBottom: 16,
          }}
        >
          Peste 85–90% din populație se identifică drept creștin, dar doar o mică
          parte participă activ la o biserică. Mulți văd religia ca o tradiție, nu
          o relație personală cu Dumnezeu.
        </p>

        <p
          style={{
            color: '#0a0f2c',
            lineHeight: 1.8,
            fontWeight: 600,
            fontStyle: 'italic',
          }}
        >
          „În spatele acestor numere sunt oameni reali, care caută scop, speranță
          și apartenență.”
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { stat:'18–20% din populație are vârsta școlară (0-18 ani)'},
	  { stat:'85–90% din populație se identifică ca și creștini' }, 
	  { stat:'Un procent în creștere de oameni sunt deconectați de la credință'},
        ].map(({ stat, desc }) => (
          <div
            key={stat}
            className="card"
            style={{
              padding: 30,
              borderRadius: 24,
              background: 'white',
            }}
          >
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(1.25rem, 1.7vw, 1.75rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.035em',
                color: '#1932af',
                marginBottom: 10,
              }}
            >
              {stat}
            </div>

            <div
              style={{
                color: 'rgba(10,15,44,0.62)',
                fontSize: 15,
                lineHeight: 1.65,
                fontWeight: 300,
              }}
            >
              {desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* PROBLEMA & OPORTUNITATEA */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="label">Context</p>
          <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'#0a0f2c', marginBottom:48}}>
            PROBLEMA ȘI OPORTUNITATEA
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, textAlign:'left'}}>
            <div className="card" style={{borderLeft:'4px solid #ef4444', padding:32}}>
              <h3 style={{fontWeight:800, fontSize:18, color:'#0a0f2c', marginBottom:20}}>Problema</h3>
              {[
                'Biserica tradițională pare irelevantă',
                'Credința este văzută ca depășită',
                'Oamenii sunt deconectați spiritual',
                'Tinerii pleacă din comunități de credință',
              ].map((p) => (
                <div key={p} style={{display:'flex', gap:12, alignItems:'flex-start', marginBottom:12}}>
                  <span style={{color:'#ef4444', fontWeight:700, flexShrink:0}}>›</span>
                  <span style={{color:'rgba(10,15,44,0.7)', fontWeight:400, fontSize:15}}>{p}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{borderLeft:'4px solid #1932af', padding:32}}>
              <h3 style={{fontWeight:800, fontSize:18, color:'#0a0f2c', marginBottom:20}}>Oportunitatea</h3>
              {[
                'Oamenii sunt deschiși la o credință autentică',
                'O nouă generație caută ceva real',
                'Alba Iulia e un centru universitar în creștere',
                'Biserica potrivită îi poate atinge pe toți',
              ].map((p) => (
                <div key={p} style={{display:'flex', gap:12, alignItems:'flex-start', marginBottom:12}}>
                  <span style={{color:'#1932af', fontWeight:700, flexShrink:0}}>›</span>
                  <span style={{color:'rgba(10,15,44,0.7)', fontWeight:400, fontSize:15}}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DE CE ACUM */}
      <section className="section" style={{background:'#f4f2ee'}}>
        <div className="wrap">
          <div style={{
            background:'linear-gradient(135deg,#0f1052,#1932af)',
            borderRadius:32, padding:'64px 48px', textAlign:'center', maxWidth:800, margin:'0 auto'
          }}>
            
            <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'white', marginBottom:20}}>
              MOMENTUL E ACUM
            </h2>
            <p style={{color:'rgba(255,255,255,0.65)', maxWidth:560, margin:'0 auto 24px', lineHeight:1.8, fontWeight:300, fontSize:16}}>
              Nu construim doar o zi bună de lansare. Construim o biserică care va crește,
              va face ucenici și va avea impact în acest oraș pe termen lung.
            </p>
            <p style={{color:'#b6d8fc', fontStyle:'italic', fontSize:18, fontWeight:500, maxWidth:520, margin:'0 auto'}}>
              „Momentum-ul nu se oprește la noi. Merge din generație în generație, până la venirea Lui."
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{background:'white', textAlign:'center'}}>
        <div className="wrap">
          <p className="label">Fă parte din asta</p>
          <h2 className="display" style={{fontSize:'clamp(2.5rem,7vw,6rem)', color:'#0a0f2c', marginBottom:16}}>
            POVESTEA TA CONTEAZĂ.
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:480, margin:'0 auto 40px', fontWeight:300, fontSize:17}}>
            Suntem la început. Fiecare persoană aduce ceva unic în această comunitate.
          </p>
          <div style={{display:'flex', flexWrap:'wrap', gap:16, justifyContent:'center'}}>
            <Link href="/join" className="btn btn-blue">Alătură-te echipei</Link>
            <Link href="/give" className="btn btn-outline-blue">Susține financiar</Link>
          </div>
        </div>
      </section>
    </>
  )
}
