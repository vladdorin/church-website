import type { Metadata } from 'next'
import Link from 'next/link'

export const runtime = 'edge'
export const metadata: Metadata = {
  title: 'Alătură-te | Momentum · Alba Iulia',
  description: 'Completează cardul de conectare și fă parte din echipa Momentum.',
}

export default function JoinPage() {
  return (
    <>
      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color:'white', padding:'100px 0 80px'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="label" style={{color:'#b6d8fc'}}>Alătură-te</p>
          <h1 className="display" style={{fontSize:'clamp(3rem,9vw,7rem)', color:'white', marginBottom:24}}>
            EȘTI<br /><span style={{color:'#b6d8fc'}}>BINEVENIT(Ă)</span>
          </h1>
          <p style={{fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.6)', maxWidth:520, margin:'0 auto', fontWeight:300, lineHeight:1.7}}>
            Există un loc pentru tine în Momentum. Conectează-te, implică-te, crește.
          </p>
        </div>
      </section>

      {/* CUM TE POȚI IMPLICA */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="label">Modalități</p>
          <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'#0a0f2c', marginBottom:12}}>
            CUM TE POȚI IMPLICA
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:480, margin:'0 auto 48px', fontWeight:300}}>
            4 moduri prin care poți face parte din Momentum Church.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:20}}>
            {[
              { icon:'🤝', titlu:'Conectează-te', desc:'Ajută-ne să ajungem la oameni din Alba Iulia — distribuie vestea și aduce-ți prietenii.' },
              { icon:'🙏', titlu:'Roagă-te', desc:'Stai alături de noi în rugăciune pentru acest oraș și pentru lansarea din octombrie 2026.' },
              { icon:'❤️', titlu:'Implică-te', desc:'Folosește-ți darurile și talentele pentru a construi această comunitate din temelii.' },
              { icon:'💛', titlu:'Donează', desc:'Fii parte din construirea a ceva etern. Fiecare contribuție este dublată de ARC.' },
            ].map(({ icon, titlu, desc }) => (
              <div key={titlu} className="card" style={{textAlign:'center', padding:36}}>
                <div style={{fontSize:40, marginBottom:16}}>{icon}</div>
                <h3 className="display" style={{fontSize:22, color:'#0a0f2c', marginBottom:10}}>{titlu}</h3>
                <p style={{color:'rgba(10,15,44,0.55)', fontSize:14, lineHeight:1.7, fontWeight:300}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section" style={{background:'#f8f9ff'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="label">Timeline</p>
          <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'#0a0f2c', marginBottom:12}}>
            LANSARE OCT 2026
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:480, margin:'0 auto 48px', fontWeight:300}}>
            Nu planificăm doar o zi de lansare — construim o comunitate pe termen lung.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:12}}>
            {[
              { luna:'Mai–Iun', act:'PREGĂTIRE', desc:'Brand & awareness', highlight:false },
              { luna:'Iul–Aug', act:'CONSTRUIM', desc:'Website, contacte, outreach', highlight:false },
              { luna:'Sep',     act:'IMPLICĂM',  desc:'Countdown & rugăciune', highlight:false },
              { luna:'Oct',     act:'LANSARE 🚀', desc:'Prima duminică', highlight:true },
              { luna:'Nov+',    act:'CREȘTEM',   desc:'O comunitate vie', highlight:false },
            ].map(({ luna, act, desc, highlight }) => (
              <div key={luna} style={highlight
                ? {background:'#1932af', color:'white', borderRadius:20, padding:'24px 16px', border:'2px solid #1932af', transform:'scale(1.05)', boxShadow:'0 20px 40px rgba(25,50,175,0.35)'}
                : {background:'white', color:'#0a0f2c', borderRadius:20, padding:'24px 16px', border:'1px solid rgba(10,15,44,0.1)'}}>
                <div style={{fontSize:11, fontWeight:700, marginBottom:8, opacity: highlight ? 0.7 : 0.4}}>
                  {luna} 2026
                </div>
                <div className="display" style={{fontSize:18, marginBottom:6}}>{act}</div>
                <div style={{fontSize:12, opacity: highlight ? 0.7 : 0.5, fontWeight:300}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARD DE CONECTARE */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap">
          <div style={{maxWidth:640, margin:'0 auto'}}>
            <div style={{textAlign:'center', marginBottom:40}}>
              <p className="label">Formular</p>
              <h2 className="display" style={{fontSize:'clamp(2rem,5vw,3.5rem)', color:'#0a0f2c', marginBottom:12}}>
                CARD DE CONECTARE
              </h2>
              <p style={{color:'rgba(10,15,44,0.55)', fontWeight:300}}>
                Completează formularul și te vom contacta cu detalii despre cum poți fi implicat(ă).
              </p>
            </div>

            <form className="card" action="mailto:biserica.momentum@gmail.com" method="GET" style={{padding:40}}>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16}}>
                <div>
                  <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Prenume *</label>
                  <input type="text" name="prenume" required
                    style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif'}}
                    placeholder="Ion" />
                </div>
                <div>
                  <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Nume *</label>
                  <input type="text" name="nume" required
                    style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif'}}
                    placeholder="Ionescu" />
                </div>
              </div>

              <div style={{marginBottom:16}}>
                <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Email *</label>
                <input type="email" name="email" required
                  style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif'}}
                  placeholder="ion@exemplu.ro" />
              </div>

              <div style={{marginBottom:16}}>
                <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Telefon</label>
                <input type="tel" name="telefon"
                  style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif'}}
                  placeholder="+40 7xx xxx xxx" />
              </div>

              <div style={{marginBottom:16}}>
                <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Cum vrei să te implici?</label>
                <select name="implicare"
                  style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', background:'white'}}>
                  <option>Vreau să vin la prima întâlnire</option>
                  <option>Vreau să mă implic în echipă</option>
                  <option>Vreau să susțin financiar</option>
                  <option>Vreau să mă rog pentru această misiune</option>
                  <option>Toate cele de mai sus</option>
                </select>
              </div>

              <div style={{marginBottom:16}}>
                <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Situația familiei tale</label>
                <select name="familie"
                  style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', background:'white'}}>
                  <option>Singur(ă)</option>
                  <option>Cuplu fără copii</option>
                  <option>Familie cu copii</option>
                  <option>Prefer să nu spun</option>
                </select>
              </div>

              <div style={{marginBottom:16}}>
                <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Cum ai auzit de Momentum?</label>
                <select name="sursa"
                  style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', background:'white'}}>
                  <option>Instagram / Facebook</option>
                  <option>Un prieten mi-a recomandat</option>
                  <option>Am căutat pe Google</option>
                  <option>Altceva</option>
                </select>
              </div>

              <div style={{marginBottom:24}}>
                <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Mesaj (opțional)</label>
                <textarea name="body" rows={3}
                  style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', resize:'none'}}
                  placeholder="Spune-ne ceva despre tine..." />
              </div>

              <button type="submit" className="btn btn-blue" style={{width:'100%', fontSize:16, padding:'16px 32px', justifyContent:'center'}}>
                Trimite cardul de conectare
              </button>
              <p style={{fontSize:12, textAlign:'center', color:'rgba(10,15,44,0.35)', marginTop:12}}>
                Nu vei fi adăugat la nicio listă fără acordul tău.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
