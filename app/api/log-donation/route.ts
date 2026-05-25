export const runtime = 'edge'
import Stripe from 'stripe'

export async function POST(request: Request) {
  try {
    const { session_id } = await request.json()
    if (!session_id) return Response.json({ error: 'Missing session_id' }, { status: 400 })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
      httpClient: Stripe.createFetchHttpClient(),
    })

    const session = await stripe.checkout.sessions.retrieve(session_id, {
  expand: ['payment_intent'],
})
if (session.payment_status !== 'paid') {
  return Response.json({ error: 'Not paid' }, { status: 400 })
}

const amount = (session.amount_total ?? 0) / 100
const currency = session.currency ?? 'ron'
const TO_USD: Record<string, number> = { usd: 1, eur: 1.08, ron: 0.22 }
const amount_usd = Math.round(amount * (TO_USD[currency] ?? 1) * 100) / 100

// Recuperează reason din metadata
const paymentIntent = session.payment_intent as import('stripe').Stripe.PaymentIntent
const reason = paymentIntent?.metadata?.reason ?? ''

await fetch(process.env.GOOGLE_SCRIPT_DONATIONS_URL!, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount, currency, amount_usd, reason }),
})

    return Response.json({ success: true })
  } catch (err) {
    console.error('[log-donation]', err)
    return Response.json({ error: 'Failed' }, { status: 500 })
  }
}