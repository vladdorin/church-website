import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'Momentum Website <onboarding@resend.dev>',
      to: process.env.EMAIL_TO!,
      subject: `Formular nou: ${data.formType || 'Site'}`,
      text: `
Ai primit un formular nou.

Formular: ${data.formType || '-'}
Nume: ${data.name || '-'}
Email: ${data.email || '-'}
Telefon: ${data.phone || '-'}
Subiect: ${data.subject || '-'}
Mesaj: ${data.message || '-'}

Google Sheet:
${process.env.GOOGLE_SHEET_URL}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('FORM ERROR:', err)

    return NextResponse.json(
      { success: false, error: err?.message || 'Eroare la trimiterea formularului.' },
      { status: 500 }
    )
  }
}