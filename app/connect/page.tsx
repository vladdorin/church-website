import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Momentum · Alba Iulia',
  description: 'Conectează-te cu noi — biserica.momentum@gmail.com · Alba Iulia, România',
}

export default function ConnectPage() {
  return (
    <>
      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color:'white', padding:'100px 0 80px'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="label" style={{color:'#b6d8fc'}}>Contact</p>
          <h1 className="display" style={{fontSize:'clamp(3rem,9vw,7rem)', color:'white', marginBottom:24}}>
            HAI SĂ<br /><span style={{color:'#b6d8fc'}}>VORBIM</span>
          </h1>
          <p style={{fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.6)', maxWidth:520, margin:'0 auto', fontWeight:300, lineHeight:1.7}}>
            Suntem oameni reali și suntem bucuroși să auzim de la tine.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'start'}}>

            {/* FORMULAR */}
            <div>
              <p className="label">Mesaj direct</p>
              <h2 className="display" style={{fontSize:'clamp(2rem,4vw,3rem)', color:'#0a0f2c', marginBottom:32}}>
                TRIMITE-NE UN MESAJ
              </h2>
              <form style={{display:'flex', flexDirection:'column', gap:16}} action="mailto:biserica.momentum@gmail.com" method="GET">
                <div>
                  <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Nume complet</label>
                  <input type="text" name="name" required
                    style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', boxSizing:'border-box'}}
                    placeholder="Ion Ionescu" />
                </div>
                <div>
                  <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Email</label>
                  <input type="email" name="email" required
                    style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', boxSizing:'border-box'}}
                    placeholder="ion@exemplu.ro" />
                </div>
                <div>
                  <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Subiect</label>
                  <select name="subject"
                    style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', background:'white', boxSizing:'border-box'}}>
                    <option>Vreau să mă alătur</option>
                    <option>Cerere de rugăciune</option>
                    <option>Vreau să susțin financiar</option>
                    <option>Parteneriat / colaborare</option>
                    <option>Întrebare generală</option>
                  </select>
                </div>
                <div>
                  <label style={{display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Mesaj</label>
                  <textarea name="body" rows={5} required
                    style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', resize:'none', boxSizing:'border-box'}}
                    placeholder="Scrie mesajul tău aici..." />
                </div>
                <button type="submit" className="btn btn-blue" style={{justifyContent:'center', fontSize:15}}>
                  Trimite mesajul
                </button>
              </form>
            </div>

            {/* INFO + SOCIAL */}
            <div>
              <div style={{marginBottom:40}}>
                <p className="label">Găsește-ne</p>
                <h2 className="display" style={{fontSize:'clamp(2rem,4vw,3rem)', color:'#0a0f2c', marginBottom:24}}>
                  SUNTEM AICI
                </h2>
                <div style={{display:'flex', flexDirection:'column', gap:16}}>
                  <div style={{display:'flex', gap:16, alignItems:'flex-start'}}>
                    <span style={{fontSize:22, marginTop:2}}>📍</span>
                    <div>
                      <div style={{fontWeight:600, color:'#0a0f2c', marginBottom:2}}>Locație</div>
                      <div style={{color:'rgba(10,15,44,0.6)', fontWeight:300}}>Alba Iulia, România</div>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:16, alignItems:'flex-start'}}>
                    <span style={{fontSize:22, marginTop:2}}>✉️</span>
                    <div>
                      <div style={{fontWeight:600, color:'#0a0f2c', marginBottom:2}}>Email</div>
                      <a href="mailto:biserica.momentum@gmail.com"
                        style={{color:'#1932af', textDecoration:'none', fontWeight:300}}>
                        biserica.momentum@gmail.com
                      </a>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:16, alignItems:'flex-start'}}>
                    <span style={{fontSize:22, marginTop:2}}>🌐</span>
                    <div>
                      <div style={{fontWeight:600, color:'#0a0f2c', marginBottom:2}}>Website</div>
                      <a href="https://www.bisericamomentum.ro"
                        style={{color:'#1932af', textDecoration:'none', fontWeight:300}}>
                        www.bisericamomentum.ro
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{marginBottom:40}}>
                <p className="label">Social media</p>
                <div style={{display:'flex', flexDirection:'column', gap:12}}>
                  {[
                    { icon:'📘', label:'Facebook',  href:'https://facebook.com/bisericamomentum',  handle:'@bisericamomentum' },
                    { icon:'📸', label:'Instagram', href:'https://instagram.com/bisericamomentum', handle:'@bisericamomentum' },
                    { icon:'▶️',  label:'YouTube',   href:'https://youtube.com/@bisericamomentum',  handle:'Biserica Momentum' },
                  ].map(({ icon, label, href, handle }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="card"
                      style={{display:'flex', alignItems:'center', gap:16, padding:'16px 20px', textDecoration:'none', transition:'all 0.2s ease'}}>
                      <span style={{fontSize:24}}>{icon}</span>
                      <div>
                        <div style={{fontWeight:600, color:'#0a0f2c', fontSize:15}}>{label}</div>
                        <div style={{fontSize:13, color:'rgba(10,15,44,0.5)', fontWeight:300}}>{handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{background:'#f8f9ff', border:'1px solid rgba(10,15,44,0.1)', borderRadius:20, padding:28, textAlign:'center'}}>
                <p style={{fontWeight:700, color:'#0a0f2c', marginBottom:4, fontSize:15}}>📧 Rămâi la curent</p>
                <p style={{fontSize:13, color:'rgba(10,15,44,0.5)', fontWeight:300, marginBottom:16}}>
                  Abonează-te pentru noutăți despre lansare
                </p>
                <form style={{display:'flex', gap:8}}>
                  <input type="email" placeholder="email@tau.ro"
                    style={{flex:1, border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'10px 14px', fontSize:14, outline:'none', fontFamily:'Inter,sans-serif'}} />
                  <button type="submit"
                    style={{background:'#1932af', color:'white', border:'none', borderRadius:12, padding:'10px 16px', fontSize:14, fontWeight:600, cursor:'pointer'}}>
                    OK
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{background:'#0a0f2c', padding:'64px 0'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="display" style={{fontSize:'clamp(1.5rem,4vw,3rem)', color:'white', marginBottom:8}}>
            NU EȘTI SINGUR(Ă).
          </p>
          <p style={{color:'rgba(255,255,255,0.45)', fontWeight:300, marginBottom:32}}>
            Există o comunitate care te așteaptă în Alba Iulia.
          </p>
          <div style={{display:'flex', flexWrap:'wrap', gap:16, justifyContent:'center'}}>
            <a href="/join" className="btn btn-white">Alătură-te</a>
            <a href="/pray" className="btn btn-outline-white">Rugăciune</a>
          </div>
        </div>
      </section>
    </>
  )
}
