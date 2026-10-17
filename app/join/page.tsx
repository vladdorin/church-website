'use client'

import Link from 'next/link'
import JumpNav from '@/components/JumpNav'
import { useState } from 'react'

export default function JoinPage() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

const getInputStyle = (field: string) => ({
  width: '100%',
  border: fieldErrors[field]
    ? '1.5px solid #dc2626'
    : '1.5px solid rgba(10,15,44,0.15)',
  borderRadius: 12,
  padding: '12px 16px',
  fontSize: 15,
  outline: 'none',
  fontFamily: 'Inter,sans-serif',
  boxSizing: 'border-box' as const,
})

  return (
    <>
      {/* HERO */}
      <section
  style={{
    background: 'linear-gradient(135deg,#0f1052 0%,#080818 100%)',
    color: 'white',
    padding: '100px 0 80px',
    overflow: 'hidden',
    maxWidth: '100vw',
  }}
>
        <div className="wrap" style={{textAlign:'center'}}>
          <h1
  className="display"
  style={{
    fontSize: 'clamp(3rem, 5vw, 7rem)',
    lineHeight: 0.85,
    color: 'white',
    marginBottom: 24,
    maxWidth: '100%',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    textAlign: 'center',
  }}
>
  YOU ARE<br />
  <span
  style={{
    color: '#b6d8fc',
    display: 'block',
    fontSize: 'clamp(3rem, 5vw, 7rem)',
    lineHeight: 0.9,
    whiteSpace: 'nowrap',
  }}
>
  WELCOME
</span>
</h1>
          <p style={{fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.6)', maxWidth:520, margin:'0 auto', fontWeight:300, lineHeight:1.7}}>
            There is a place for you in Momentum. Connect, get involved, grow.
          </p>
          <JumpNav label="On this page" links={[['get-involved', 'How to get involved'], ['connection-card', 'Connection card']]} />
        </div>
      </section>

      {/* HOW YOU CAN GET INVOLVED */}
      <section id="get-involved" className="section" style={{background:'white'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <h2 className="display" style={{fontSize:'clamp(2rem,5vw,4rem)', color:'#0a0f2c', marginBottom:12}}>
            HOW YOU CAN GET INVOLVED
          </h2>
          <p style={{color:'rgba(10,15,44,0.5)', maxWidth:480, margin:'0 auto 48px', fontWeight:400}}>
            4 ways you can be part of Momentum Church.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:20}}>
            {[
              { titlu:'Connect',      desc:'Help us reach people in Alba Iulia, spread the word, and bring your friends.' },
              { titlu:'Pray',         desc:'Stand with us in prayer for this city and the people in it.' },
              { titlu:'Get Involved', desc:'Use your gifts and talents to build this community from the ground up.' },
              { titlu:'Give',         desc:'Be part of building something eternal.' },
            ].map(({ titlu, desc }, index) => (
             <div
  key={titlu}
  className="involve-card"
>
  <div className="involve-glow" />
  <div className="involve-number">
    {String(index + 1).padStart(2, '0')}
  </div>

  <h3 className="display involve-title">
    {titlu}
  </h3>

  <p className="involve-desc">
    {desc}
  </p>
</div>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECTION CARD */}
      <section id="connection-card" className="join-connect-section">
        <div className="wrap">
          <div style={{maxWidth:640, margin:'0 auto'}}>
            <div style={{textAlign:'center', marginBottom:40}}>
              <h2 className="display" style={{fontSize:'clamp(2rem,5vw,3.5rem)', color:'#0a0f2c', marginBottom:12}}>
                CONNECTION CARD
              </h2>
              <p style={{color:'rgba(10,15,44,0.55)', fontWeight:300}}>
                Fill in the form and we will get back to you as soon as possible.
              </p>
            </div>

            <form
  noValidate
  className="card"
  style={{ padding: 40 }}
  onSubmit={async (e) => {
    e.preventDefault()
    if (submitStatus === 'loading') return

    setSubmitStatus('loading')

    const form = e.currentTarget
    const formData = new FormData(form)

    const errors: Record<string, string> = {}

    if (!formData.get('name')) {
      errors.name = 'Please enter your name.'
    }

    if (!formData.get('email')) {
      errors.email = 'Please enter your email address.'
    }

    if (formData.get('privacy') !== 'on') {
      errors.privacy = 'You must accept the privacy policy.'
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setSubmitStatus('idle')
      return
    }

    setFieldErrors({})

    try {
      const request = fetch('/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'Join',
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          subject: formData.get('implicare'),
          message: formData.get('message'),
          extra: {
            sursa: formData.get('sursa'),
            privacy: formData.get('privacy') === 'on',
          },
        }),
      })

      setTimeout(() => {
        form.reset()
        setSubmitStatus('success')
      }, 700)

      const res = await request

      if (!res.ok) {
        setSubmitStatus('error')
        return
      }

      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }
  }}
>
  <div style={{ marginBottom: 16 }}>
    <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6 }}>
      Name *
    </label>
    <input
      type="text"
      name="name"
      style={getInputStyle('name')}
      placeholder="John Smith"
    />
    {fieldErrors.name && (
      <p className="form-error">{fieldErrors.name}</p>
    )}
  </div>

  <div style={{ marginBottom: 16 }}>
    <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6 }}>
      Email *
    </label>
    <input
      type="email"
      name="email"
      style={getInputStyle('email')}
      placeholder="john@example.com"
    />
    {fieldErrors.email && (
      <p className="form-error">{fieldErrors.email}</p>
    )}
  </div>

  <div style={{ marginBottom: 16 }}>
    <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6 }}>
      Phone
    </label>
    <input
      type="tel"
      name="phone"
      style={getInputStyle('phone')}
      placeholder="+40 7xx xxx xxx"
    />
  </div>

  <div style={{ marginBottom: 16 }}>
    <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6 }}>
      What would you like to do next?
    </label>
    <select
      name="implicare"
      style={{
        ...getInputStyle('implicare'),
        background: 'white',
      }}
    >
      <option>I&apos;d love to grab a coffee, I have questions</option>
      <option>I&apos;d like to visit on a Sunday</option>
      <option>I want to join the team</option>
      <option>I want to know more about Momentum</option>
    </select>
  </div>

  <div style={{ marginBottom: 16 }}>
    <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6 }}>
      How did you hear about Momentum?
    </label>
    <select
      name="sursa"
      style={{
        ...getInputStyle('sursa'),
        background: 'white',
      }}
    >
      <option>Instagram / Facebook</option>
      <option>A friend recommended it</option>
      <option>I searched on Google</option>
      <option>Other</option>
    </select>
  </div>

  <div style={{ marginBottom: 24 }}>
    <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#0a0f2c', marginBottom:6 }}>
      Optional message
    </label>
    <textarea
      name="message"
      rows={3}
      style={{
        ...getInputStyle('message'),
        resize: 'none',
      }}
      placeholder="Tell us something about yourself..."
    />
  </div>

  <div style={{ marginBottom: 24 }}>
    <label
      style={{
        display:'flex',
        alignItems:'flex-start',
        gap:10,
        fontSize:13,
        color:'rgba(10,15,44,0.65)',
        lineHeight:1.5,
        cursor:'pointer',
      }}
    >
      <input
        type="checkbox"
        name="privacy"
        style={{
          marginTop:3,
          width:16,
          height:16,
          accentColor:'#1932af',
          flexShrink: 0,
        }}
      />
      <span>
        I agree to the Privacy Policy —{' '}
        <Link
          href="/privacy-policy"
          style={{ color:'#1932af', fontWeight:600, textDecoration:'underline' }}
        >
          English
        </Link>
        {' / '}
        <Link
          href="/politica-de-confidentialitate"
          style={{ color:'#1932af', fontWeight:600, textDecoration:'underline' }}
        >
          Română
        </Link>
      </span>
    </label>

    {fieldErrors.privacy && (
      <p className="form-error">{fieldErrors.privacy}</p>
    )}
  </div>

  <button
    type="submit"
    className="btn btn-blue"
    disabled={submitStatus === 'loading'}
    style={{
      width:'100%',
      fontSize:16,
      padding:'16px 32px',
      justifyContent:'center',
      transition:'all 0.25s ease',
      background:
        submitStatus === 'success'
          ? '#16a34a'
          : submitStatus === 'error'
          ? '#dc2626'
          : submitStatus === 'loading'
          ? '#64748b'
          : undefined,
      transform: submitStatus === 'success' ? 'scale(1.03)' : 'scale(1)',
      opacity: submitStatus === 'loading' ? 0.85 : 1,
    }}
  >
    {submitStatus === 'loading'
      ? 'Sending...'
      : submitStatus === 'success'
      ? 'Sent ✓'
      : submitStatus === 'error'
      ? 'Error ❌'
      : 'Submit'}
  </button>
</form>
          </div>
        </div>
      </section>
<style jsx>{`
.form-error {
  margin-top: 7px;
  color: #dc2626;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
}

.involve-card {
  position: relative;
  overflow: hidden;
  min-height: 210px;
  padding: 34px 28px;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.95), rgba(248,249,255,0.9)),
    radial-gradient(circle at top right, rgba(182,216,252,0.7), transparent 35%);
  border: 1px solid rgba(25,50,175,0.12);
  box-shadow: 0 22px 50px rgba(10,15,44,0.08);
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.involve-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 70px rgba(25,50,175,0.16);
  border-color: rgba(25,50,175,0.28);
}

.involve-glow {
  position: absolute;
  width: 130px;
  height: 130px;
  right: -45px;
  top: -45px;
  border-radius: 999px;
  background: rgba(25,50,175,0.12);
  filter: blur(4px);
}

.involve-number {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  background: #1932af;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 28px;
  box-shadow: 0 12px 26px rgba(25,50,175,0.25);
}

.involve-title {
  font-size: clamp(18px, 2vw, 24px);
  color: #0a0f2c;
  margin-bottom: 12px;
  white-space: nowrap;
}

.involve-desc {
  color: rgba(10,15,44,0.58);
  font-size: 14px;
  line-height: 1.75;
  font-weight: 400;
  margin: 0;
}

@media (max-width: 768px) {
  .involve-card {
    min-height: auto;
    padding: 28px 24px;
  }

  .involve-card:hover {
    transform: none;
  }
}
`}</style>
    </>
  )
}
