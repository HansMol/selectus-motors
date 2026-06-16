import Stripe from 'stripe'
import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const key    = process.env.STRIPE_SECRET_KEY
  const secret = process.env.STRIPE_WEBHOOK_SECRET
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

  const supabase = createServerClient()

  // ── Stripe Identity ────────────────────────────────────────────────────────

  if (event.type === 'identity.verification_session.verified') {
    const session = event.data.object as Stripe.Identity.VerificationSession
    const email   = session.metadata?.email ?? 'unknown'
    const name    = session.metadata?.name  ?? 'unknown'
    console.log(`[Identity] VERIFIED — ${name} <${email}> · ${session.id}`)

    await supabase
      .from('dealers')
      .update({ verified_via: 'Stripe Identity (verified)', status: 'approved' })
      .eq('email', email)
  }

  if (event.type === 'identity.verification_session.requires_input') {
    const session = event.data.object as Stripe.Identity.VerificationSession
    console.log(`[Identity] REQUIRES INPUT — ${session.metadata?.email} · ${session.id}`)
  }

  // ── Subscriptions ──────────────────────────────────────────────────────────

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const dealerId = session.metadata?.dealer_id
    if (!dealerId || session.mode !== 'subscription') return Response.json({ received: true })

    const subscriptionId = typeof session.subscription === 'string'
      ? session.subscription
      : session.subscription?.id

    if (subscriptionId) {
      await supabase
        .from('dealers')
        .update({
          stripe_subscription_id: subscriptionId,
          stripe_customer_id:     typeof session.customer === 'string' ? session.customer : session.customer?.id ?? null,
          subscription_status:    'active',
        })
        .eq('id', dealerId)
      console.log(`[Checkout] Subscription active — dealer ${dealerId}`)
    }
  }

  if (event.type === 'customer.subscription.updated') {
    const sub     = event.data.object as Stripe.Subscription
    const dealerId = sub.metadata?.dealer_id
    if (!dealerId) return Response.json({ received: true })

    type SubStatus = 'free' | 'active' | 'cancelled' | 'past_due'
    const statusMap: Record<string, SubStatus> = {
      active:   'active',
      past_due: 'past_due',
      canceled: 'cancelled',
      unpaid:   'past_due',
    }
    const status: SubStatus = statusMap[sub.status] ?? 'free'
    const billingStartsAt = sub.trial_end
      ? new Date(sub.trial_end * 1000).toISOString()
      : null

    await supabase
      .from('dealers')
      .update({ subscription_status: status, billing_starts_at: billingStartsAt })
      .eq('id', dealerId)
    console.log(`[Subscription] Updated — dealer ${dealerId} → ${status}`)
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub     = event.data.object as Stripe.Subscription
    const dealerId = sub.metadata?.dealer_id
    if (!dealerId) return Response.json({ received: true })

    await supabase
      .from('dealers')
      .update({ subscription_status: 'cancelled', stripe_subscription_id: null })
      .eq('id', dealerId)
    console.log(`[Subscription] Cancelled — dealer ${dealerId}`)
  }

  if (event.type === 'invoice.payment_failed') {
    const invoice  = event.data.object as Stripe.Invoice
    const customer = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id
    if (!customer) return Response.json({ received: true })

    await supabase
      .from('dealers')
      .update({ subscription_status: 'past_due' })
      .eq('stripe_customer_id', customer)
    console.log(`[Invoice] Payment failed — customer ${customer}`)
  }

  return Response.json({ received: true })
}
