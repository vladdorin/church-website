export const runtime = 'edge'

import Stripe from 'stripe'

type CheckoutBody = {
  amount: number
  currency?: 'ron' | 'eur' | 'usd'
}

export async function POST(request: Request) {
  try {
    const { amount, currency = 'ron' } = await request.json() as CheckoutBody

    const allowedCurrencies = ['ron', 'eur', 'usd']

    if (!allowedCurrencies.includes(currency)) {
      return Response.json(
        { error: 'Monedă invalidă.' },
        { status: 400 }
      )
    }

    if (!amount || amount < 5 || amount > 50000) {
      return Response.json(
        { error: 'Suma invalidă. Minim 5, maxim 50.000.' },
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

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'payment',
      payment_method_types: ['card'],

      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: 'Donație – Biserica Momentum',
              description: 'Mulțumim! Donația ta ajută la construirea comunității.',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],

      return_url: `${origin}/give?success=true&session_id={CHECKOUT_SESSION_ID}`,

      payment_intent_data: {
        metadata: {
          church: 'Biserica Momentum',
          amount: amount.toString(),
          currency,
        },
      },
    })

    return Response.json({
      clientSecret: session.client_secret,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Eroare internă'
    console.error('[Stripe error]', message)
    return Response.json({ error: message }, { status: 500 })
  }
}