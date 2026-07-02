import { NextRequest } from 'next/server'
import { Resend } from 'resend'

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: NextRequest) {
  const body = await req.json() as {
    name: string
    email: string
    role: string
    message: string
  }

  const { name, email, role, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return Response.json({ error: 'Invalid fields' }, { status: 400 })
  }

  if (name.length > 200 || email.length > 320 || message.length > 5000) {
    return Response.json({ error: 'Field too long' }, { status: 400 })
  }

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    return Response.json({ error: 'Email service not configured' }, { status: 503 })
  }

  const resend = new Resend(resendKey)
  const safeName    = esc(name)
  const safeEmail   = esc(email)
  const safeRole    = esc(role ?? 'Not specified')
  const safeMessage = esc(message)

  await resend.emails.send({
    from: 'Kerb <hello@kerb.autos>',
    to: 'hans@kerb.autos',
    replyTo: email,
    subject: `Contact — ${name} (${safeRole})`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0A0A0F">
        <p style="font-size:18px;font-weight:600;margin-bottom:4px">New contact form message</p>
        <p style="color:#6E6E73;margin-top:0">via kerb.autos/contact</p>

        <table style="width:100%;border-collapse:collapse;margin:24px 0">
          <tr><td style="padding:8px 0;border-bottom:1px solid #E5E5E7;color:#6E6E73;width:120px">Name</td><td style="padding:8px 0;border-bottom:1px solid #E5E5E7;font-weight:500">${safeName}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #E5E5E7;color:#6E6E73">Email</td><td style="padding:8px 0;border-bottom:1px solid #E5E5E7"><a href="mailto:${safeEmail}" style="color:#0A0A0F">${safeEmail}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6E6E73">I am a</td><td style="padding:8px 0">${safeRole}</td></tr>
        </table>

        <p style="color:#6E6E73;font-size:13px;margin-bottom:4px">Message</p>
        <p style="white-space:pre-wrap;background:#F8F8FA;border:1px solid #E5E5E7;border-radius:6px;padding:16px;margin:0">${safeMessage}</p>

        <p style="margin-top:32px;font-size:13px;color:#A8AAB0">Reply directly to this email to respond to ${safeName}.<br>Kerb — Real Kerb Appeal.</p>
      </div>
    `,
  })

  return Response.json({ success: true })
}
