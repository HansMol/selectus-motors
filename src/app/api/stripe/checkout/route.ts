import Stripe from 'stripe'
import { auth } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

type Plan = 'solo' | 'pro'
type BillingPeriod = 'monthly' | 'annual'

const PRICES: Record<`${Plan}-${BillingPeriod}`, { unit_amount: number; interval: 'month' | 'year'; lookup_key: string; product_name: string }> = {
  'solo-monthly': { unit_amount: 5500,   interval: 'month', lookup_key: 'kerb-solo-monthly', product_name: 'Kerb Solo' },
  'solo-annual':  { unit_amount: 55000,  interval: 'year',  lookup_key: 'kerb-solo-annual',  product_name: 'Kerb Solo' },
  'pro-monthly':  { unit_amount: 13200,  interval: 'month', lookup_key: 'kerb-pro-monthly',  product_name: 'Kerb Pro'  },
  'pro-annual':   { unit_amount: 132000, interval: 'year',  lookup_key: 'kerb-pro-annual',   product_name: 'Kerb Pro'  },
}

// Returns start of next calendar month as a Unix timestamp
function startOfNextMonth(): number {
  const now = new Date()
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1))
  return Math.floor(next.getTime() / 1000)
}

async function ensurePrice(stripe: Stripe, key: keyof typeof PRICES): Promise<string> {
  const config = PRICES[key]

  // Find existing price by lookup key
  const existing = await stripe.prices.list({ lookup_keys: [config.lookup_key], limit: 1 })
  if (existing.data.length > 0) return existing.data[0].id

  // Create product then price
  const product = await stripe.products.create({ name: config.product_name })
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: config.unit_amount,
    currency: 'gbp',
    recurring: { interval: config.interval },
    lookup_key: config.lookup_key,
    transfer_lookup_key: true,
  })
  return price.id
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorised' }, { status: 401 })

  const key = process.env.STRIPE_SECRET_KEY
  if (!key || key === 'sk_test_REPLACE_ME') {
    return Response.json({ error: 'Stripe not configured' }, { status: 503 })
  }

  const { dealerId, billingPeriod = 'monthly' } = await req.json() as {
    dealerId: string
    billingPeriod?: BillingPeriod
  }

  const supabase = createServerClient()
  const { data: dealer, error } = await supabase
    .from('dealers')
    .select('plan, stripe_customer_id, email, first_name, last_name')
    .eq('id', dealerId)
    .eq('clerk_user_id', userId)
    .single()

  if (error || !dealer) {
    return Response.json({ error: 'Dealer not found' }, { status: 404 })
  }

  const plan = (dealer.plan ?? 'solo') as Plan
  const stripe = new Stripe(key)

  const priceId = await ensurePrice(stripe, `${plan}-${billingPeriod}`)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3001'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: dealer.stripe_customer_id ?? undefined,
    customer_email: dealer.stripe_customer_id ? undefined : dealer.email,
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      billing_cycle_anchor: startOfNextMonth(),
      proration_behavior: 'none',
      metadata: { dealer_id: dealerId, plan, billing_period: billingPeriod },
    },
    metadata: { dealer_id: dealerId },
    success_url: `${baseUrl}/dashboard?billing=success`,
    cancel_url:  `${baseUrl}/dashboard?billing=cancelled`,
  })

  return Response.json({ url: session.url })
}
