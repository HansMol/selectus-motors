import Stripe from 'stripe'
import { NextRequest } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const key     = process.env.STRIPE_SECRET_KEY
  const secret  = process.env.STRIPE_WEBHOOK_SECRET
  const payload = await req.text()
  const sig     = req.headers.get('stripe-signature') ?? ''

  if (!key || key === 'sk_test_REPLACE_ME') {
    return Response.json({ error: 'Stripe not configured' }, { status: 503 })
  }

  const stripe = new Stripe(key)

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, sig, secret ?? '')
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return Response.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'identity.verification_session.verified') {
    const session = event.data.object as Stripe.Identity.VerificationSession
    const email   = session.metadata?.email ?? 'unknown'
    const name    = session.metadata?.name  ?? 'unknown'
    console.log(`[Stripe Identity] VERIFIED — ${name} <${email}> · session ${session.id}`)
    // TODO: update dealers.verification_status = 'verified' in Supabase once connected
  }

  if (event.type === 'identity.verification_session.requires_input') {
    const session = event.data.object as Stripe.Identity.VerificationSession
    const email   = session.metadata?.email ?? 'unknown'
    console.log(`[Stripe Identity] REQUIRES INPUT — ${email} · session ${session.id}`)
    // TODO: notify dealer to retry / flag for manual review
  }

  return Response.json({ received: true })
}
