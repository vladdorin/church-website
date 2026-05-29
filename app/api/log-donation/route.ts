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
      expand: [
        'payment_intent',
        'subscription',
        'subscription.latest_invoice.payment_intent',
      ],
    })

    if (session.payment_status !== 'paid') {
      return Response.json({ error: 'Not paid' }, { status: 400 })
    }

    const sub = session.subscription as Stripe.Subscription | null

    const oneTimePaymentIntent =
      session.payment_intent as Stripe.PaymentIntent | null

    const subscriptionPaymentIntent =
      sub?.latest_invoice &&
      typeof sub.latest_invoice !== 'string'
        ? sub.latest_invoice.payment_intent as Stripe.PaymentIntent | null
        : null

    const pi = oneTimePaymentIntent ?? subscriptionPaymentIntent

    const currency = session.currency ?? 'ron'

    const reason =
      pi?.metadata?.reason ??
      sub?.metadata?.reason ??
      ''

    const notes = session.mode === 'subscription' ? 'Lunar' : ''

    const coverFees =
      pi?.metadata?.cover_fees === 'true' ||
      sub?.metadata?.cover_fees === 'true'

    const originalAmount = Number(
      pi?.metadata?.original_amount ??
      sub?.metadata?.original_amount ??
      0
    )

    let amount = (session.amount_total ?? 0) / 100

    if (coverFees && originalAmount > 0) {
      amount = originalAmount
    } else if (pi?.latest_charge) {
      const charge = await stripe.charges.retrieve(
        typeof pi.latest_charge === 'string'
          ? pi.latest_charge
          : pi.latest_charge.id,
        { expand: ['balance_transaction'] }
      )

      const balanceTransaction =
        charge.balance_transaction as Stripe.BalanceTransaction | null

      if (balanceTransaction) {
        amount = (balanceTransaction.amount - balanceTransaction.fee) / 100
      }
    }

    amount = Math.round(amount * 100) / 100

    const TO_USD: Record<string, number> = { usd: 1, eur: 1.08, ron: 0.22 }
    const amount_usd = Math.round(amount * (TO_USD[currency] ?? 1) * 100) / 100

    const customerName = session.customer_details?.name ?? ''
    const customerEmail = session.customer_details?.email ?? ''

    await fetch(process.env.GOOGLE_SCRIPT_DONATIONS_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        currency,
        amount_usd,
        reason,
        notes,
        name: customerName,
        email: customerEmail,
      }),
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('[log-donation]', err)
    return Response.json({ error: 'Failed' }, { status: 500 })
  }
}