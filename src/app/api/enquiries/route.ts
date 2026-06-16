import Stripe from 'stripe'
import { NextRequest } from 'next/server'
import { Resend } from 'resend'
import { createServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

function startOfNextMonth(): number {
  const now = new Date()
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1))
  return Math.floor(next.getTime() / 1000)
}

function nextMonthLabel(): string {
  const now = new Date()
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1))
  return next.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export async function POST(req: NextRequest) {
  const body = await req.json() as {
    dealer_id: string
    listing_id: string
    listing_title: string
    name: string
    email: string
    phone?: string
    message: string
  }

  const { dealer_id, listing_id, listing_title, name, email, phone, message } = body

  if (!dealer_id || !listing_id || !listing_title || !name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createServerClient()
  const { data: dealer, error } = await supabase
    .from('dealers')
    .select('email, first_name, last_name, plan, stripe_customer_id, billing_starts_at, subscription_status')
    .eq('id', dealer_id)
    .single()

  if (error || !dealer) {
    return Response.json({ error: 'Dealer not found' }, { status: 404 })
  }

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.error('[Enquiry] RESEND_API_KEY not set')
    return Response.json({ error: 'Email service not configured' }, { status: 503 })
  }

  const resend = new Resend(resendKey)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://selectusmotors.com'
  const listingUrl = `${baseUrl}/cars/${listing_id}`
  const from = 'Selectus Motors <enquiries@selectusmotors.com>'

  // ── Send enquiry email to dealer ──────────────────────────────────────────

  await resend.emails.send({
    from,
    to: dealer.email,
    replyTo: email,
    subject: `New enquiry — ${listing_title}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0A0A0F">
        <p style="font-size:18px;font-weight:600;margin-bottom:4px">New buyer enquiry</p>
        <p style="color:#6E6E73;margin-top:0">via Selectus Motors</p>

        <table style="width:100%;border-collapse:collapse;margin:24px 0">
          <tr><td style="padding:8px 0;border-bottom:1px solid #E5E5E7;color:#6E6E73;width:120px">Vehicle</td><td style="padding:8px 0;border-bottom:1px solid #E5E5E7;font-weight:500"><a href="${listingUrl}" style="color:#0A0A0F">${listing_title}</a></td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #E5E5E7;color:#6E6E73">From</td><td style="padding:8px 0;border-bottom:1px solid #E5E5E7;font-weight:500">${name}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #E5E5E7;color:#6E6E73">Email</td><td style="padding:8px 0;border-bottom:1px solid #E5E5E7"><a href="mailto:${email}" style="color:#0A0A0F">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:8px 0;border-bottom:1px solid #E5E5E7;color:#6E6E73">Phone</td><td style="padding:8px 0;border-bottom:1px solid #E5E5E7"><a href="tel:${phone}" style="color:#0A0A0F">${phone}</a></td></tr>` : ''}
        </table>

        <p style="color:#6E6E73;font-size:13px;margin-bottom:4px">Message</p>
        <p style="white-space:pre-wrap;background:#F8F8FA;border:1px solid #E5E5E7;border-radius:6px;padding:16px;margin:0">${message}</p>

        <p style="margin-top:32px;font-size:13px;color:#A8AAB0">Reply directly to this email to respond to ${name}.<br>Selectus Motors — <a href="${baseUrl}" style="color:#A8AAB0">${baseUrl.replace('https://', '')}</a></p>
      </div>
    `,
  })

  // ── Billing trigger — first enquiry only ──────────────────────────────────

  const isFirstEnquiry = dealer.billing_starts_at === null && dealer.subscription_status === 'free'

  if (isFirstEnquiry) {
    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (stripeKey && stripeKey !== 'sk_test_REPLACE_ME') {
      try {
        const stripe = new Stripe(stripeKey)

        const PRICE_LOOKUP: Record<string, string> = {
          solo: 'selectus-solo-monthly',
          pro:  'selectus-pro-monthly',
        }
        const plan = (dealer.plan ?? 'solo') as 'solo' | 'pro'
        const lookupKey = PRICE_LOOKUP[plan]

        const existing = await stripe.prices.list({ lookup_keys: [lookupKey], limit: 1 })
        let priceId = existing.data[0]?.id

        if (!priceId) {
          const PRICE_AMOUNTS: Record<string, { amount: number; name: string }> = {
            solo: { amount: 5500,  name: 'Selectus Solo' },
            pro:  { amount: 13200, name: 'Selectus Pro'  },
          }
          const cfg = PRICE_AMOUNTS[plan]
          const product = await stripe.products.create({ name: cfg.name })
          const price = await stripe.prices.create({
            product: product.id,
            unit_amount: cfg.amount,
            currency: 'gbp',
            recurring: { interval: 'month' },
            lookup_key: lookupKey,
            transfer_lookup_key: true,
          })
          priceId = price.id
        }

        const session = await stripe.checkout.sessions.create({
          mode: 'subscription',
          customer: dealer.stripe_customer_id ?? undefined,
          customer_email: dealer.stripe_customer_id ? undefined : dealer.email,
          line_items: [{ price: priceId, quantity: 1 }],
          subscription_data: {
            trial_end: startOfNextMonth(),
            metadata: { dealer_id, plan, billing_period: 'monthly' },
          },
          metadata: { dealer_id },
          success_url: `${baseUrl}/dashboard?billing=success`,
          cancel_url:  `${baseUrl}/dashboard?billing=cancelled`,
        })

        const checkoutUrl = session.url ?? `${baseUrl}/dashboard`
        const planLabel = plan === 'pro' ? 'Selectus Pro — £132/month' : 'Selectus Solo — £55/month'
        const billingDate = nextMonthLabel()

        await resend.emails.send({
          from,
          to: dealer.email,
          subject: 'You just received your first buyer enquiry — set up billing',
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0A0A0F">
              <p style="font-size:18px;font-weight:600;margin-bottom:4px">Great news, ${dealer.first_name}</p>
              <p style="color:#6E6E73;margin-top:0">A buyer just enquired about your listing on Selectus Motors.</p>

              <p>To keep receiving buyer enquiries, set up your subscription now. You won't be charged until <strong>${billingDate}</strong>.</p>

              <a href="${checkoutUrl}" style="display:inline-block;background:#0A0A0F;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:600;margin:16px 0">Set up billing →</a>

              <table style="width:100%;border-collapse:collapse;margin:24px 0">
                <tr><td style="padding:8px 0;border-bottom:1px solid #E5E5E7;color:#6E6E73;width:160px">Your plan</td><td style="padding:8px 0;border-bottom:1px solid #E5E5E7;font-weight:500">${planLabel}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #E5E5E7;color:#6E6E73">First charge</td><td style="padding:8px 0;border-bottom:1px solid #E5E5E7;font-weight:500">${billingDate}</td></tr>
                <tr><td style="padding:8px 0;color:#6E6E73">Cancel any time</td><td style="padding:8px 0;font-weight:500">No lock-in</td></tr>
              </table>

              <p style="margin-top:32px;font-size:13px;color:#A8AAB0">Questions? Reply to this email.<br>Selectus Motors — <a href="${baseUrl}" style="color:#A8AAB0">${baseUrl.replace('https://', '')}</a></p>
            </div>
          `,
        })
      } catch (err) {
        console.error('[Enquiry] Billing trigger failed:', err)
      }
    }
  }

  return Response.json({ success: true })
}
