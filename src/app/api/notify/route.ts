import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') ?? ''

  let email: string | null = null

  if (contentType.includes('application/json')) {
    const body = await req.json()
    email = body.email ?? null
  } else {
    const text = await req.text()
    const params = new URLSearchParams(text)
    email = params.get('email')
  }

  if (!email || !email.includes('@')) {
    return NextResponse.redirect(new URL('/?notify=invalid', req.url))
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!audienceId || !process.env.RESEND_API_KEY) {
    return NextResponse.redirect(new URL('/?notify=error', req.url))
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.contacts.create({
    email,
    unsubscribed: false,
    audienceId,
  })

  return NextResponse.redirect(new URL('/?notify=ok', req.url))
}
