import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // 🔹 Trimite către Google Sheets
    await fetch(process.env.GOOGLE_SCRIPT_URL!, {
  method: 'POST',
  body: JSON.stringify(data),
  })

    // 🔹 Config email (Gmail App Password)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // 🔹 Trimite email
    await transporter.sendMail({
      from: `"Momentum Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Formular nou: ${data.formType || 'Site'}`,
      text: `
Ai primit un formular nou.

Formular: ${data.formType || '-'}
Nume: ${data.name || '-'}
Email: ${data.email || '-'}
Telefon: ${data.phone || '-'}
Subiect: ${data.subject || '-'}
Mesaj: ${data.message || '-'}

Vezi toate răspunsurile:
${process.env.GOOGLE_SHEET_URL}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
  console.error('FORM ERROR:', err)

  return NextResponse.json(
    {
      success: false,
      error: err?.message || 'Eroare la trimiterea formularului.',
    },
    { status: 500 }
  )
}
}