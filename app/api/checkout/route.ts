export const runtime = 'edge'

import Stripe from 'stripe'

type CheckoutBody = {
  amount: number
  currency?: 'ron' | 'eur' | 'usd'
  reason?: string
  notes?: string
}

// Rate aproximative către USD
const TO_USD: Record<string, number> = { usd: 1, eur: 1.08, ron: 0.22 }

export async function POST(request: Request) {
  try {
    const { amount, currency = 'ron', reason = '', notes = '' } =
      await request.json() as CheckoutBody

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

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency,
          product_data: {
            name: 'Donation – Momentum Church',
            description: 'Thank you! Your donation helps build the community.',
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      return_url: `${origin}${returnPath}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      payment_intent_data: {
        metadata: { church: 'Momentum Church', amount: amount.toString(), currency, reason },
      },
    })

        return Response.json({ clientSecret: session.client_secret })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error'
    console.error('[Stripe error]', message)
    return Response.json({ error: message }, { status: 500 })
  }
}