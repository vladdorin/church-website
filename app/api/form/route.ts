import { NextRequest, NextFetchEvent } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const resend = new Resend(process.env.RESEND_API_KEY)

    await Promise.all([
      fetch(process.env.GOOGLE_SCRIPT_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),

      resend.emails.send({
        from: 'Momentum Website <onboarding@resend.dev>',
        to: process.env.EMAIL_TO!,
        subject: `Formular nou: ${data.formType || 'Site'}`,
        text: `
Ai primit un formular nou.

Nume: ${data.name || '-'}
Email: ${data.email || '-'}
Telefon: ${data.phone || '-'}
Mesaj: ${data.message || '-'}
        `,
      }),
    ])

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)

    return Response.json(
      { success: false, error: 'Form submit failed' },
      { status: 500 }
    )
  }
}