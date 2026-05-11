'use client'


import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi'
import Link from 'next/link'


export default function ConnectPage() {
  return (
    <>
      {/* HERO */}
      <section style={{background:'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color:'white', padding:'100px 0 80px'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <h1 className="display" style={{fontSize:'clamp(3rem,5vw,7rem)', color:'white', marginBottom:24}}>
            HAI SĂ<br /><span style={{color:'#b6d8fc'}}>NE CONECTĂM</span>
          </h1>
          <p style={{fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.6)', maxWidth:520, margin:'0 auto', fontWeight:300, lineHeight:1.7}}>
            Suntem bucuroși să te cunoaștem.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="section" style={{background:'white'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'start'}}>

            {/* FORMULAR */}
            <div>
              <h2
  className="display"
  style={{
    fontSize: 'clamp(2rem, 2.2vw, 3rem)',
    color: '#0a0f2c',
    marginBottom: 32,
    whiteSpace: 'nowrap',
  }}
>
  LASĂ-NE UN MESAJ
</h2>
              <form
  style={{
    display:'flex',
    flexDirection:'column',
    gap:18,
    paddingBottom:40
  }}
  onSubmit={async (e) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    const res = await fetch('/api/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'Contact',
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        extra: {
          privacy: formData.get('privacy') === 'on',
        },
      }),
    })

    if (res.ok) {
      form.reset()
      alert('Mesaj trimis cu succes!')
    } else {
      alert('A apărut o eroare. Încearcă din nou.')
    }
  }}
>
  <div>
    <label style={{display:'block', fontSize:15, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Nume *</label>
    <input type="text" name="name" required
      style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', boxSizing:'border-box'}}
      placeholder="Ion Ionescu" />
  </div>

  <div>
    <label style={{display:'block', fontSize:15, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Email *</label>
    <input type="email" name="email" required
      style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', boxSizing:'border-box'}}
      placeholder="ion@exemplu.ro" />
  </div>

  <div>
    <label style={{display:'block', fontSize:15, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Subiect</label>
    <select name="subject"
      style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', background:'white', boxSizing:'border-box'}}>
      <option>Vreau să mă alătur echipei</option>
      <option>Am un motiv de rugăciune</option>
      <option>Vreau să susțin financiar</option>
      <option>Sunt interesat de un parteneriat / colaborare</option>
      <option>Altă întrebare</option>
    </select>
  </div>

  <div>
    <label style={{display:'block', fontSize:15, fontWeight:600, color:'#0a0f2c', marginBottom:6}}>Mesaj *</label>
    <textarea name="message" rows={5} required
      style={{width:'100%', border:'1.5px solid rgba(10,15,44,0.15)', borderRadius:12, padding:'12px 16px', fontSize:15, outline:'none', fontFamily:'Inter,sans-serif', resize:'none', boxSizing:'border-box'}}
      placeholder="Scrie mesajul tău aici..." />
  </div>

  <div style={{ marginTop: 4 }}>
    <label style={{display:'flex', alignItems:'flex-start', gap:10, fontSize:13, color:'rgba(10,15,44,0.65)', lineHeight:1.5, cursor:'pointer', marginTop: 40, marginBottom: 10 }}>
      <input type="checkbox" name="privacy" required style={{marginTop:3, width:16, height:16, accentColor:'#1932af', flexShrink:0}} />
      <span>
        Sunt de acord cu{' '}
        <Link href="/politica-de-confidentialitate" style={{color:'#1932af', fontWeight:600, textDecoration:'underline'}}>
          Politica de confidențialitate
        </Link>
        .
      </span>
    </label>
  </div>

  <button type="submit" className="btn btn-blue" style={{justifyContent:'center', fontSize:15}}>
    Trimite mesajul
  </button>
</form>
            </div>

            {/* INFO + SOCIAL */}
            <div>
              <div style={{ marginBottom: 40 }}>
  <h2
  className="display"
  style={{
    fontSize: 'clamp(2rem, 2.2vw, 3rem)',
    color: '#0a0f2c',
    marginBottom: 24,
    whiteSpace: 'nowrap',
  }}
>
  UNDE NE GĂSEȘTI
</h2>

  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    {[
  {
    icon: <HiOutlineLocationMarker />,
    title: 'Locație',
    text: 'Alba Iulia, România',
    href: 'https://www.google.com/maps/search/?api=1&query=Alba+Iulia+Romania',
  },
  {
    icon: <HiOutlineMail />,
    title: 'Email',
    text: 'biserica.momentum@gmail.com',
    href: 'mailto:biserica.momentum@gmail.com',
  },
].map(({ icon, title, text, href }) => (
      <a
        key={title}
        href={href}
        target={title === 'Locație' ? '_blank' : undefined}
        rel={title === 'Locație' ? 'noopener noreferrer' : undefined}
        className="card contact-info-card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          padding: '18px 20px',
          textDecoration: 'none',
        }}
      >
        <span className="contact-info-icon">
          {icon}
        </span>

        <div>
          <div style={{ fontWeight: 700, color: '#0a0f2c', fontSize: 15, marginBottom: 3 }}>
            {title}
          </div>
          <div style={{ color: 'rgba(10,15,44,0.55)', fontSize: 14, fontWeight: 300 }}>
            {text}
          </div>
        </div>
      </a>
    ))}
  </div>
</div>

              <div style={{ marginBottom: 40 }}>
  <p className="label">Social media</p>

  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    {[
      { icon: <FaFacebookF />, label: 'Facebook', handle: 'Biserica Momentum', href: 'https://facebook.com/bisericamomentum' },
      { icon: <FaInstagram />, label: 'Instagram', handle: '@biserica.momentum', href: 'https://instagram.com/bisericamomentum' },
      { icon: <FaYoutube />, label: 'YouTube', handle: 'Canalul Bisericii Momentum', href: 'https://youtube.com/@bisericamomentum' },
      { icon: <FaWhatsapp />, label: 'WhatsApp', handle: 'Canal Info WhatsApp', href: 'https://whatsapp.com/channel/0029Vb6aUifIyPtZ3wzObi0l' },
    ].map(({ icon, label, handle, href }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="card social-card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          padding: '16px 20px',
          textDecoration: 'none',
        }}
      >
        <span className="social-icon">
          {icon}
        </span>

        <div>
          <div style={{ fontWeight: 600, color: '#0a0f2c', fontSize: 15 }}>
            {label}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(10,15,44,0.5)', fontWeight: 300 }}>
            {handle}
          </div>
        </div>
      </a>
    ))}
  </div>
</div>


              
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{background:'#0a0f2c', padding:'64px 0'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <p className="display" style={{fontSize:'clamp(1.5rem,4vw,3rem)', color:'white', marginBottom:8}}>
            NU EȘTI SINGUR.
          </p>
          <p style={{color:'rgba(255,255,255,0.45)', fontWeight:300, marginBottom:32}}>
            Comunitatea Momentum te așteaptă.
          </p>
        </div>
      </section>
    </>
  )
}
