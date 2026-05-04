export const runtime = 'edge'

import Stripe from 'stripe'

export async function POST(request: Request) {
  try {
    const { amount } = await request.json() as { amount: number }

    if (!amount || amount < 5 || amount > 50000) {
      return Response.json({ error: 'Suma invalidă. Minim 5 RON, maxim 50.000 RON.' }, { status: 400 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
      // Folosim fetch în loc de http pentru compatibilitate Cloudflare Edge
      httpClient: Stripe.createFetchHttpClient(),
    })

    const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'ron',
            product_data: {
              name: 'Donație – Biserica Momentum',
              description: 'Mulțumim! Donația ta ajută la construirea comunității.',
            },
            unit_amount: Math.round(amount * 100), // Stripe folosește bani (cenți/bani)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/give?success=true`,
      cancel_url:  `${origin}/give?canceled=true`,
      // Dezactivează salvarea metodei de plată pentru donații simple
      payment_intent_data: {
        metadata: {
          church: 'Biserica Momentum',
          amount_ron: amount.toString(),
        },
      },
    })

    return Response.json({ url: session.url })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Eroare internă'
    console.error('[Stripe error]', message)
    return Response.json({ error: message }, { status: 500 })
  }
}
