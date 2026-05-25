'use client'

import { useState, useEffect, Suspense } from 'react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useSearchParams } from 'next/navigation'
import { FundraiserFull } from '@/components/FundraiserBar'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

const PRESET_AMOUNTS = [25, 50, 100, 250]

function GiveForm() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')

  useEffect(() => {
    if (!success) return
    const sessionId = searchParams.get('session_id')
    if (!sessionId) return

    fetch('/api/log-donation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId }),
    }).catch(console.error)
  }, [success])

  useEffect(() => {
    if (!success) return
    document.getElementById('success-message')?.scrollIntoView({ behavior: 'smooth' })
  }, [success])

  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [selected, setSelected] = useState<number | null>(100)
  const [custom, setCustom] = useState('')
  const [donationReason, setDonationReason] = useState('Momentum Launch Fund')
  const [customReason, setCustomReason] = useState('')
  const [donationType, setDonationType] = useState<'once' | 'monthly'>('once')
  const [coverFees, setCoverFees] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currency, setCurrency] = useState<'ron' | 'eur' | 'usd'>('ron')

  const effectiveAmount = custom ? parseFloat(custom) : selected
  const finalReason = donationReason === 'Other' ? customReason.trim() : donationReason
  const currencyLabel = currency.toUpperCase()

  function calculateGrossAmount(amount: number, currency: 'ron' | 'eur' | 'usd') {
    const fixedFee = { ron: 1, eur: 0.25, usd: 0.3 }[currency]
    const percentageFee = 0.029
    return Math.ceil((amount + fixedFee) / (1 - percentageFee))
  }

  const finalAmount = effectiveAmount
    ? coverFees
      ? calculateGrossAmount(effectiveAmount, currency)
      : effectiveAmount
    : null

  async function handleDonate() {
    if (!effectiveAmount || effectiveAmount < 5) {
      setError('The minimum amount is 5.')
      return
    }

    if (donationReason === 'Other' && !customReason.trim()) {
      setError('Please enter the reason for your donation.')
      return
    }

    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          originalAmount: effectiveAmount,
          reason: finalReason,
          donationType,
          coverFees,
          currency,
        }),
      })

      const data = await res.json()

      if (data.clientSecret) {
        setClientSecret(data.clientSecret)
        setLoading(false)
      } else {
        setError(data.error ?? 'An error occurred. Please try again.')
        setLoading(false)
      }
    } catch {
      setError('Network error. Check your connection and try again.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section
	 id="success-message"
        style={{
          minHeight: 'auto',
	  padding: '40px 16px',
          display: 'flex',
          alignItems: 'center',
          padding: '72px 0',
          background:
            'radial-gradient(circle at top left, rgba(182,216,252,0.24), transparent 34%), radial-gradient(circle at bottom right, rgba(25,50,175,0.22), transparent 32%), linear-gradient(135deg,#0f1052 0%,#080818 100%)',
        }}
      >
        <div className="wrap" style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            className="card"
            style={{
              maxWidth: 560,
              width: '100%',
              textAlign: 'center',
              padding: 56,
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.45)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
            }}
          >
            <div style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: '#16a34a',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: 30,
              fontWeight: 900,
            }}>
              ✓
            </div>

            <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 7vw, 2.4rem)', color: '#0a0f2c', marginBottom: 16, lineHeight: 1.05 }}>
              THANK YOU SO MUCH!
            </h2>

            <p style={{ color: 'rgba(10,15,44,0.62)', lineHeight: 1.85, fontWeight: 300, marginBottom: 32 }}>
              Your donation makes a real difference in Alba Iulia. Every donation you make is matched by ARC —
              your impact is twice as great!
            </p>

            <a href="/give" className="btn btn-blue">Give again</a>
          </div>
        </div>
      </section>
    )
  }

  if (canceled) {
    return (
      <section className="section" style={{ background: 'white' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{ maxWidth: 480, width: '100%', textAlign: 'center', padding: 56 }}>
            <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 7vw, 2.25rem)', color: '#0a0f2c', marginBottom: 12 }}>
              NO PROBLEM!
            </h2>
            <p style={{ color: 'rgba(10,15,44,0.6)', lineHeight: 1.8, fontWeight: 300, marginBottom: 32 }}>
              The payment was cancelled. You can come back whenever you&apos;re ready.
            </p>
            <a href="/give" className="btn btn-blue">Try again</a>
          </div>
        </div>
      </section>
    )
  }

  if (clientSecret) {
    return (
      <section
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          padding: '64px 0',
          background:
            'radial-gradient(circle at top left, rgba(182,216,252,0.22), transparent 35%), linear-gradient(135deg,#0f1052 0%,#080818 100%)',
        }}
      >
        <div className="wrap">
          <div
            style={{
              maxWidth: 640,
              margin: '0 auto',
              padding: 22,
              borderRadius: 32,
              background: 'rgba(255,255,255,0.96)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.45)',
            }}
          >
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      style={{
        padding: '48px 0',
        background:
          'radial-gradient(circle at top left, rgba(182,216,252,0.22), transparent 35%), linear-gradient(135deg,#0f1052 0%,#080818 100%)',
      }}
    >
      <div className="wrap">
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <div
            className="card donation-card"
            style={{
              padding: 30,
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.45)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
            }}
          >
            <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              <h2 className="display" style={{ fontSize: 'clamp(2rem, 8vw, 3.75rem)', color: '#0a0f2c', marginBottom: 6 }}>
                CHOOSE AMOUNT
              </h2>

              <p style={{ color: 'rgba(10,15,44,0.5)', fontSize: 13, marginBottom: 18, fontWeight: 300 }}>
              </p>
            </div>

            <div className="donation-left">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 14 }}>
                {PRESET_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setSelected(amt)
                      setCustom('')
                    }}
                    style={{
                      padding: '12px 8px',
                      borderRadius: 14,
                      fontWeight: 700,
                      fontSize: 16,
                      cursor: 'pointer',
                      border: selected === amt && !custom ? '2px solid #1932af' : '2px solid rgba(10,15,44,0.12)',
                      background: selected === amt && !custom ? '#1932af' : 'white',
                      color: selected === amt && !custom ? 'white' : '#0a0f2c',
                    }}
                  >
                    {amt} <span style={{ fontSize: 11, fontWeight: 400 }}>{currencyLabel}</span>
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0a0f2c', marginBottom: 6 }}>
                  Or enter a custom amount ({currencyLabel})
                </label>

                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    min="5"
                    max="50000"
                    value={custom}
                    onChange={(e) => {
                      setCustom(e.target.value)
                      setSelected(null)
                    }}
                    style={{
                      width: '100%',
                      border: custom ? '2px solid #1932af' : '2px solid rgba(10,15,44,0.12)',
                      borderRadius: 14,
                      padding: '12px 52px 12px 14px',
                      fontSize: 16,
                      outline: 'none',
                      fontFamily: 'Inter,sans-serif',
                    }}
                    placeholder="e.g. 150"
                  />
                  <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(10,15,44,0.4)', fontWeight: 700 }}>
                    {currencyLabel}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0a0f2c', marginBottom: 6 }}>
                  Donation purpose
                </label>

                <select
                  value={donationReason}
                  onChange={(e) => setDonationReason(e.target.value)}
                  style={{
                    width: '100%',
                    border: '2px solid rgba(10,15,44,0.12)',
                    borderRadius: 14,
                    padding: '12px 14px',
                    fontSize: 15,
                    outline: 'none',
                    fontFamily: 'Inter,sans-serif',
                    background: 'white',
                    marginBottom: donationReason === 'Other' ? 8 : 0,
                  }}
                >
                  <option>Momentum Launch Fund</option>
                  <option>Equipment &amp; Logistics</option>
                  <option>Events &amp; Outreach</option>
                  <option>Generosity / Tithe</option>
                  <option>Other</option>
                </select>

                {donationReason === 'Other' && (
                  <input
                    type="text"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Enter the reason for your donation"
                    style={{
                      width: '100%',
                      border: '2px solid rgba(10,15,44,0.12)',
                      borderRadius: 14,
                      padding: '12px 14px',
                      fontSize: 15,
                      outline: 'none',
                      fontFamily: 'Inter,sans-serif',
                    }}
                  />
                )}
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0a0f2c', marginBottom: 6 }}>
                  Donation type
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setDonationType('once')}
                    style={{
                      padding: '12px 12px',
                      borderRadius: 14,
                      border: donationType === 'once' ? '2px solid #1932af' : '2px solid rgba(10,15,44,0.12)',
                      background: donationType === 'once' ? '#1932af' : 'white',
                      color: donationType === 'once' ? 'white' : '#0a0f2c',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    One-time
                  </button>

                  <button
                    type="button"
                    onClick={() => setDonationType('monthly')}
                    style={{
                      padding: '12px 12px',
                      borderRadius: 14,
                      border: donationType === 'monthly' ? '2px solid #1932af' : '2px solid rgba(10,15,44,0.12)',
                      background: donationType === 'monthly' ? '#1932af' : 'white',
                      color: donationType === 'monthly' ? 'white' : '#0a0f2c',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0a0f2c', marginBottom: 6 }}>
                  Currency
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  {[
                    { value: 'ron', label: 'RON' },
                    { value: 'eur', label: 'EUR' },
                    { value: 'usd', label: 'USD' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setCurrency(item.value as 'ron' | 'eur' | 'usd')}
                      style={{
                        padding: '12px 12px',
                        borderRadius: 14,
                        border: currency === item.value ? '2px solid #1932af' : '2px solid rgba(10,15,44,0.12)',
                        background: currency === item.value ? '#1932af' : 'white',
                        color: currency === item.value ? 'white' : '#0a0f2c',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="donation-right">
              <div>
                {error && (
                  <div style={{ background: '#fff1f1', border: '1px solid #fecaca', color: '#dc2626', borderRadius: 12, padding: '10px 14px', fontSize: 14, marginBottom: 12 }}>
                    {error}
                  </div>
                )}

                <div style={{ background: '#f8f9ff', borderRadius: 20, padding: '24px 26px', marginBottom: 14 }}>
                  <span style={{ color: 'rgba(10,15,44,0.6)', fontWeight: 500, display: 'block', marginBottom: 8 }}>
                    Your donation
                  </span>
                  <span className="display" style={{ fontSize: 38, color: '#0a0f2c' }}>
                    {finalAmount ? `${finalAmount} ${currencyLabel}` : '—'}
                  </span>
                </div>

                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 18, padding: '16px 20px', marginBottom: 14 }}>
                  <div style={{ color: '#16a34a', fontWeight: 800, fontSize: 15, marginBottom: 4 }}>
                    ×2 impact
                  </div>
                  <div style={{ color: '#16a34a', fontWeight: 500, fontSize: 13, lineHeight: 1.5 }}>
                    Matched by ARC up to $50K total.
                  </div>
                </div>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 13,
                    color: 'rgba(10,15,44,0.65)',
                    lineHeight: 1.5,
                    cursor: 'pointer',
                    marginBottom: 14,
                    padding: '12px 14px',
                    borderRadius: 14,
                    background: 'rgba(255,255,255,0.72)',
                    border: '1px solid rgba(10,15,44,0.08)',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={coverFees}
                    onChange={(e) => setCoverFees(e.target.checked)}
                    style={{
                      width: 16,
                      height: 16,
                      accentColor: '#1932af',
                      flexShrink: 0,
                    }}
                  />
                  <span>I want to cover the Stripe processing fees</span>
                </label>
              </div>

              <div>
                <button
                  onClick={handleDonate}
                  disabled={loading || !effectiveAmount}
                  className="btn btn-blue"
                  style={{
                    width: '100%',
                    fontSize: 15,
                    padding: '14px 28px',
                    justifyContent: 'center',
                    opacity: loading || !effectiveAmount ? 0.5 : 1,
                    cursor: loading || !effectiveAmount ? 'not-allowed' : 'pointer',
                    marginBottom: 10,
                  }}
                >
                  {loading ? '⏳ Processing...' : `Give ${finalAmount ? `${finalAmount} ${currencyLabel}` : ''}`}
                </button>

{!clientSecret && (
  <p style={{ fontSize: 12, textAlign: 'center', color: 'rgba(10,15,44,0.35)' }}>
    🔒 Secure payment via Stripe · Your card is not stored by us
  </p>
)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .donation-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: stretch;
        }

        .donation-left,
        .donation-right {
          display: flex;
          flex-direction: column;
        }

        .donation-left {
          justify-content: flex-start;
        }

        .donation-right {
          justify-content: space-between;
        }

        @media (max-width: 768px) {
          .donation-card {
            display: block;
          }

          .donation-right {
            margin-top: 20px;
            gap: 18px;
          }
        }
      `}</style>
    </section>
  )
}

export default function GivePage() {
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg,#0f1052 0%,#080818 100%)', color: 'white', padding: '100px 0 80px' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h1 className="display" style={{ fontSize: 'clamp(2rem,5vw,7rem)', color: 'white', marginBottom: 24, lineHeight: 0.93 }}>
            BE PART OF<br /><span style={{ color: '#b6d8fc' }}>SOMETHING<br />ETERNAL</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem,2.5vw,1.25rem)', color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto 16px', fontWeight: 300, lineHeight: 1.7 }}>
            Help build the Momentum community in Alba Iulia.
          </p>

          <p style={{ color: '#b6d8fc', fontWeight: 700, fontSize: 16 }}>
            ✦ Every $1 donated is matched by ARC — your impact is 2× greater ✦
          </p>
        </div>
      </section>

      <section className="section" style={{ background: '#f8f9ff' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="display" style={{ fontSize: 'clamp(2rem,5vw,4rem)', color: '#0a0f2c', marginBottom: 12 }}>
              OUR PROGRESS
            </h2>

            <p style={{ color: 'rgba(10,15,44,0.5)', maxWidth: 750, margin: '0 auto', fontWeight: 300 }}>
              Track in real time how much we have raised together for the official Momentum launch.
            </p>
          </div>

          <FundraiserFull />
        </div>
      </section>

      <Suspense fallback={
        <div style={{ padding: '64px 24px', textAlign: 'center', color: 'rgba(10,15,44,0.4)' }}>
          Loading...
        </div>
      }>
        <GiveForm />
      </Suspense>

<section className="bank-transfer-section">
  <div className="wrap">
    <div className="bank-transfer-card">
      <div className="bank-transfer-header">

        <h2 className="display bank-transfer-title">
          GIVE BY BANK TRANSFER
        </h2>

        <p className="bank-transfer-subtitle">
          You can also support Momentum Church via direct bank transfer
          to the association&apos;s accounts.
        </p>
      </div>

      <div className="bank-transfer-info">
        <div className="bank-info-box">
          <span>Beneficiary name</span>
          <strong>ASOCIATIA CRESTINA VIATA NOUA</strong>
        </div>

        <div className="bank-info-box">
          <span>Payment reference</span>
          <strong>Momentum Donation</strong>
        </div>
      </div>

      <div className="bank-accounts-grid">
        {[
          {
            currency: 'RON',
            iban: 'RO51 BTRL RONC RT0C Y785 5702',
          },
          {
            currency: 'EUR',
            iban: 'RO25 BTRL EURC RT0C Y785 5701',
          },
          {
            currency: 'USD',
            iban: 'RO37 BTRL USDC RT0C Y785 5701',
          },
        ].map(({ currency, iban }) => (
          <div key={currency} className="bank-account-card">
            <div className="bank-account-currency">{currency}</div>

            <p>{currency} Account</p>

            <strong>{iban}</strong>
          </div>
        ))}
      </div>

    </div>
  </div>

  <style jsx>{`
    .bank-transfer-section {
  background: #ffffff;
  padding: 88px 0;
}

    .bank-transfer-card {
  max-width: 1040px;
  margin: 0 auto;
  padding: 42px;
  border-radius: 36px;
  background:
    radial-gradient(circle at top right, rgba(182,216,252,0.16), transparent 34%),
    linear-gradient(135deg, #0f1052 0%, #080818 100%);
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 34px 90px rgba(10,15,44,0.28);
}


    .bank-transfer-header {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 36px;
    }

    .bank-transfer-label {
      margin-bottom: 12px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #1932af;
    }

    .bank-transfer-title {
  font-size: clamp(2rem, 5vw, 4rem);
  color: #ffffff;
  margin-bottom: 14px;
  line-height: 0.95;
}

.bank-transfer-subtitle {
  color: rgba(255,255,255,0.62);
  font-weight: 300;
  line-height: 1.7;
  margin: 0;
}

    .bank-transfer-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 18px;
    }

.bank-info-box {
  padding: 18px 20px;
  border-radius: 20px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
}

    .bank-info-box span,
.bank-account-card p {
  display: block;
  margin-bottom: 8px;
  color: rgba(255,255,255,0.42);
  font-size: 13px;
  font-weight: 600;
}

    .bank-info-box strong {
  color: #ffffff;
  font-size: 16px;
}

    .bank-accounts-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }

    .bank-account-card {
  position: relative;
  overflow: hidden;
  padding: 24px;
  border-radius: 20px;

  background: rgba(255,255,255,0.04);

  border: 1px solid rgba(255,255,255,0.08);

  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease;
}

.bank-account-card:hover {
  transform: translateY(-4px);

  background: rgba(255,255,255,0.07);

  border-color: rgba(182,216,252,0.25);
}

.bank-account-currency {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 18px;

  padding: 8px 14px;

  border-radius: 999px;

  background: rgba(182,216,252,0.12);

  color: #b6d8fc;

  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.08em;
}

    .bank-account-card strong {
  display: block;

  color: #ffffff;

  font-size: 13px;

  line-height: 1.8;

  word-break: break-word;

  font-family: 'JetBrains Mono', monospace;

  letter-spacing: 0.06em;
}

    .bank-transfer-note {
      margin: 24px 0 0;
      text-align: center;
      color: rgba(10,15,44,0.48);
      font-size: 13px;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .bank-transfer-section {
        padding: 56px 0;
      }

      .bank-transfer-card {
        padding: 30px 22px;
        border-radius: 28px;
      }

      .bank-transfer-info,
      .bank-accounts-grid {
        grid-template-columns: 1fr;
      }
    }
  `}</style>
</section>

      <section className="section support-section">
  <div className="wrap" style={{ textAlign: 'center' }}>

    <h2 className="display support-title" style={{ textAlign: 'center', maxWidth: 1000 }}>
      OTHER WAYS TO SUPPORT US
    </h2>

    <p className="support-subtitle">
      You can be part of the Momentum story through prayer, people, and involvement.
    </p>

    <div className="support-grid">
      {[
        { nr: '01', titlu: 'Pray',         desc: 'Your prayer is the most valuable contribution to the Momentum launch.' },
        { nr: '02', titlu: 'Spread the word', desc: 'Talk about Momentum Church within your circle of friends and family.' },
        { nr: '03', titlu: 'Get involved',  desc: 'Join the team and contribute your talents to building the community.' },
      ].map(({ nr, titlu, desc }) => (
        <div key={titlu} className="support-card">
          <div className="support-number">{nr}</div>
          <div className="support-orb" />
          <h3 className="display support-card-title">{titlu}</h3>
          <p className="support-card-desc">{desc}</p>
        </div>
      ))}
    </div>
  </div>

  <style jsx>{`
    .support-section {
      background:
        radial-gradient(circle at top left, rgba(182,216,252,0.45), transparent 28%),
        radial-gradient(circle at bottom right, rgba(25,50,175,0.18), transparent 30%),
        #f8f9ff;
      overflow: hidden;
    }

    .support-label {
      margin-bottom: 14px;
      color: #1932af;
    }

    .support-title {
      font-size: clamp(2.5rem, 6vw, 5rem);
      color: #0a0f2c;
      max-width: 920px;
      margin: 0 auto 16px;
      line-height: 0.9;
    }

    .support-subtitle {
      color: rgba(10,15,44,0.55);
      max-width: 620px;
      margin: 0 auto 52px;
      font-weight: 300;
      line-height: 1.7;
    }

    .support-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 22px;
    }

    .support-card {
      position: relative;
      overflow: hidden;
      min-height: 260px;
      padding: 34px;
      border-radius: 34px;
      text-align: left;
      background: rgba(255,255,255,0.72);
      border: 1px solid rgba(25,50,175,0.12);
      box-shadow: 0 30px 80px rgba(10,15,44,0.09);
      backdrop-filter: blur(18px);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .support-card:hover {
      transform: translateY(-10px) rotate(-1deg);
      box-shadow: 0 40px 100px rgba(25,50,175,0.18);
    }

    .support-number {
      font-size: 13px;
      font-weight: 900;
      color: white;
      background: #1932af;
      width: 48px;
      height: 48px;
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 44px;
      box-shadow: 0 18px 36px rgba(25,50,175,0.28);
    }

    .support-card {
  position: relative;
  overflow: hidden;
  min-height: 260px;
  padding: 34px;
  border-radius: 34px;
  text-align: left;

  background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(248,249,255,0.9));
  border: 1px solid rgba(25,50,175,0.12);

  box-shadow: 0 30px 80px rgba(10,15,44,0.08);

  transition: all 0.35s ease;
}

/* subtle glow on hover */
.support-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle at top left, rgba(25,50,175,0.18), transparent 40%);
  opacity: 0;
  transition: opacity 0.35s ease;
}

.support-card:hover::after {
  opacity: 1;
}

/* premium accent line */
.support-card::before {
  content: '';
  position: absolute;
  left: 24px;
  bottom: 0;
  height: 3px;
  width: 0;
  background: linear-gradient(90deg, #1932af, #b6d8fc);
  border-radius: 999px;
  transition: width 0.35s ease;
}

.support-card:hover::before {
  width: 60%;
}

/* smoother hover */
.support-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 40px 100px rgba(25,50,175,0.15);
}

    .support-card-title {
      position: relative;
      font-size: clamp(1.4rem, 2vw, 2rem);
      color: #0a0f2c;
      margin-bottom: 12px;
    }

    .support-card-desc {
      position: relative;
      color: rgba(10,15,44,0.58);
      font-size: 15px;
      line-height: 1.75;
      font-weight: 300;
      margin: 0;
    }

    @media (max-width: 768px) {
      .support-grid {
        grid-template-columns: 1fr;
      }

      .support-card {
        min-height: auto;
        padding: 30px 26px;
      }

      .support-card:hover {
        transform: none;
      }
    }
  `}</style>
</section>
    </>
  )
}
