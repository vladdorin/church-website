'use client'

import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi'
import Link from 'next/link'
import { useState } from 'react'

export default function ConnectPage() {
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
      <section style={{ background:'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color:'white', padding:'100px 0 80px' }}>
        <div className="wrap" style={{ textAlign:'center' }}>
          <h1 className="display" style={{ fontSize:'clamp(3rem,5vw,7rem)', color:'white', marginBottom:24 }}>
            LET&apos;S<br /><span style={{ color:'#b6d8fc' }}>CONNECT</span>
          </h1>
          <p style={{ fontSize:'clamp(1rem,2.5vw,1.25rem)', color:'rgba(255,255,255,0.6)', maxWidth:520, margin:'0 auto', fontWeight:300, lineHeight:1.7 }}>
            We&apos;d love to get to know you.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="section" style={{ background:'white' }}>
        <div className="wrap">
          <div className="connect-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'start' }}>

            {/* FORM */}
            <div>
              <h2
                className="display"
                style={{
                  fontSize: 'clamp(2rem, 2.2vw, 3rem)',
                  color: '#0a0f2c',
                  marginBottom: 32,
                  whiteSpace: 'normal',
		  lineHeight: 0.95,
                }}
              >
                SEND US A MESSAGE
              </h2>

              <form
                noValidate
                style={{
                  display:'flex',
                  flexDirection:'column',
                  gap:18,
                  paddingBottom:40,
                }}
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

                  if (!formData.get('message')) {
                    errors.message = 'Please write a message.'
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
                        formType: 'Contact',
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        subject: formData.get('subject'),
                        message: formData.get('message'),
                        extra: {
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
                <div>
                  <label style={{ display:'block', fontSize:15, fontWeight:600, color:'#0a0f2c', marginBottom:6 }}>
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

                <div>
                  <label style={{ display:'block', fontSize:15, fontWeight:600, color:'#0a0f2c', marginBottom:6 }}>
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

                <div>
                  <label style={{ display:'block', fontSize:15, fontWeight:600, color:'#0a0f2c', marginBottom:6 }}>
                    Subject
                  </label>
                  <select
                    name="subject"
                    style={{
                      ...getInputStyle('subject'),
                      background: 'white',
                    }}
                  >
                    <option>I want to join the team</option>
                    <option>I have a prayer request</option>
                    <option>I want to give financially</option>
                    <option>I&apos;m interested in a partnership / collaboration</option>
                    <option>Other question</option>
                  </select>
                </div>

                <div>
                  <label style={{ display:'block', fontSize:15, fontWeight:600, color:'#0a0f2c', marginBottom:6 }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    style={{
                      ...getInputStyle('message'),
                      resize: 'none',
                    }}
                    placeholder="Write your message here..."
                  />
                  {fieldErrors.message && (
                    <p className="form-error">{fieldErrors.message}</p>
                  )}
                </div>

                <div style={{ marginTop: 4 }}>
                  <label style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:13, color:'rgba(10,15,44,0.65)', lineHeight:1.5, cursor:'pointer', marginTop: 40, marginBottom: 10 }}>
                    <input
                      type="checkbox"
                      name="privacy"
                      style={{
                        marginTop:3,
                        width:16,
                        height:16,
                        accentColor:'#1932af',
                        flexShrink:0,
                      }}
                    />
                    <span>
                      I agree to the Privacy Policy —{' '}
                      <Link href="/en/privacy-policy" style={{ color:'#1932af', fontWeight:600, textDecoration:'underline' }}>
                        English
                      </Link>
                      {' / '}
                      <Link href="/politica-de-confidentialitate" style={{ color:'#1932af', fontWeight:600, textDecoration:'underline' }}>
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
                    justifyContent:'center',
                    fontSize:15,
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
                    ? 'Message sent ✓'
                    : submitStatus === 'error'
                    ? 'Error. Please try again'
                    : 'Send message'}
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
                    whiteSpace: 'normal',
		    lineHeight: 0.95,
                  }}
                >
                  WHERE TO FIND US
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    {
                      icon: <HiOutlineLocationMarker />,
                      title: 'Location',
                      text: 'Alba Iulia, Romania',
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
                      target={title === 'Location' ? '_blank' : undefined}
                      rel={title === 'Location' ? 'noopener noreferrer' : undefined}
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
                    { icon: <FaFacebookF />, label: 'Facebook',  handle: 'Biserica Momentum',           href: 'https://facebook.com/bisericamomentum' },
                    { icon: <FaInstagram />, label: 'Instagram', handle: '@biserica.momentum',           href: 'https://instagram.com/biserica.momentum' },
                    { icon: <FaYoutube />,   label: 'YouTube',   handle: 'Momentum Church Channel',     href: 'https://youtube.com/@bisericamomentum' },
                    { icon: <FaWhatsapp />,  label: 'WhatsApp',  handle: 'WhatsApp Info Channel',       href: 'https://whatsapp.com/channel/0029Vb6aUifIyPtZ3wzObi0l' },
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

      {/* FINAL CTA */}
      <section style={{ background:'#0a0f2c', padding:'64px 0' }}>
        <div className="wrap" style={{ textAlign:'center' }}>
          <p className="display" style={{ fontSize:'clamp(1.5rem,4vw,3rem)', color:'white', marginBottom:8 }}>
            YOU ARE NOT ALONE.
          </p>
          <p style={{ color:'rgba(255,255,255,0.45)', fontWeight:300, marginBottom:32 }}>
            The Momentum community is waiting for you.
          </p>
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

        @media (max-width: 768px) {
          .connect-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </>
  )
}
