export const runtime = 'edge'
import Stripe from 'stripe'

type CheckoutBody = {
  amount: number
  originalAmount?: number
  currency?: 'ron' | 'eur' | 'usd'
  reason?: string
  notes?: string
  donationType?: 'once' | 'monthly'
  coverFees?: boolean
}

export async function POST(request: Request) {
  try {
    const {
  amount,
  originalAmount,
  currency = 'ron',
  reason = '',
  notes = '',
  donationType = 'once',
  coverFees = false,
} = await request.json() as CheckoutBody

    const allowedCurrencies = ['ron', 'eur', 'usd']
    if (!allowedCurrencies.includes(currency)) {
      return Response.json({ error: 'Invalid currency.' }, { status: 400 })
    }
    if (!amount || amount < 5 || amount > 50000) {
      return Response.json(
        { error: 'Invalid amount. Minimum 5, maximum 50,000.' },
        { status: 400 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
      httpClient: Stripe.createFetchHttpClient(),
    })

    const origin =
      request.headers.get('origin') ??
      process.env.NEXT_PUBLIC_URL ??
      'http://localhost:3000'

    const referer = request.headers.get('referer') ?? ''
    let returnPath = '/give'
    try {
      returnPath = new URL(referer).pathname
    } catch {
      returnPath = '/give'
    }

    const isMonthly = donationType === 'monthly'

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: isMonthly ? 'subscription' : 'payment',
      payment_method_types: ['card'],

      line_items: [{
        price_data: isMonthly ? {
          currency,
          product: process.env.STRIPE_MONTHLY_PRODUCT_ID!,
          unit_amount: Math.round(amount * 100),
          recurring: { interval: 'month' },
        } : {
          currency,
          product_data: {
            name: 'Donație – Biserica Momentum',
            description: reason || 'Îți mulțumim! Donația ta ajută la construirea comunității.',
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],

      return_url: `${origin}${returnPath}?success=true&session_id={CHECKOUT_SESSION_ID}`,

      ...(isMonthly ? {
        subscription_data: {
          description: reason,
          metadata: {
  church: 'Momentum Church',
  amount_paid: amount.toString(),
  original_amount: (originalAmount ?? amount).toString(),
  cover_fees: coverFees ? 'true' : 'false',
  currency,
  reason,
},
        },
      } : {
        payment_intent_data: {
          description: reason,
          metadata: {
  church: 'Momentum Church',
  amount_paid: amount.toString(),
  original_amount: (originalAmount ?? amount).toString(),
  cover_fees: coverFees ? 'true' : 'false',
  currency,
  reason,
},
        },
      }),
    })

    return Response.json({ clientSecret: session.client_secret })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error'
    console.error('[Stripe error]', message)
    return Response.json({ error: message }, { status: 500 })
  }
}