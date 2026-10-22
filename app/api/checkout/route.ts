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
    // eslint-disable-next-line prefer-const -- reason / originalAmount sunt curățate mai jos
    let {
  amount,
  originalAmount,
  currency = 'ron',
  reason = '',
  donationType = 'once',
  coverFees = false,
} = await request.json() as CheckoutBody

    const allowedCurrencies = ['ron', 'eur', 'usd']
    if (!allowedCurrencies.includes(currency)) {
      return Response.json({ error: 'Invalid currency.' }, { status: 400 })
    }
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount < 5 || amount > 50000) {
      return Response.json(
        { error: 'Invalid amount. Minimum 5, maximum 50,000.' },
        { status: 400 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
      httpClient: Stripe.createFetchHttpClient(),
    })

    // Întoarcerea după plată doar pe site-ul nostru (sau previzualizări / local), pe pagina de donații.
    const requestOrigin = request.headers.get('origin') ?? ''
    const origin = /^https:\/\/([\w-]+\.)*(bisericamomentum\.ro|pages\.dev)$|^http:\/\/localhost(:\d+)?$/.test(requestOrigin)
      ? requestOrigin
      : process.env.NEXT_PUBLIC_URL?.trim() || 'https://bisericamomentum.ro'

    let returnPath = '/give'
    try {
      const path = new URL(request.headers.get('referer') ?? '').pathname
      if (/^\/(en\/)?give\/?$/.test(path)) returnPath = path
    } catch {
      returnPath = '/give'
    }

    // Texte libere: lungime limitată (Stripe acceptă maxim 500 de caractere în metadata).
    reason = typeof reason === 'string' ? reason.slice(0, 200) : ''
    if (typeof originalAmount !== 'number' || !Number.isFinite(originalAmount)) originalAmount = undefined

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
    // Detaliile (ex. configurarea Stripe) rămân în log, nu ajung în browser.
    console.error('[Stripe error]', err instanceof Error ? err.message : err)
    return Response.json({ error: 'Plata nu a putut fi pornită. Încearcă din nou.' }, { status: 500 })
  }
}