import Stripe from 'stripe'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await request.json()
  const supabase = createServerClient()

  // Prevent duplicate registrations
  const { data: existing } = await supabase
    .from('dealers')
    .select('id')
    .eq('clerk_user_id', userId)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Already registered' }, { status: 409 })
  }

  // Create Stripe customer (no payment method — billing triggered on first enquiry)
  let stripeCustomerId: string | null = null
  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (stripeKey && stripeKey !== 'sk_test_REPLACE_ME') {
    try {
      const stripe   = new Stripe(stripeKey)
      const customer = await stripe.customers.create({
        email: body.email,
        name:  `${body.firstName} ${body.lastName}`,
        metadata: {
          business_name: body.businessName,
          plan:          body.plan ?? 'solo',
        },
      })
      stripeCustomerId = customer.id
    } catch (err) {
      console.error('Stripe customer creation failed:', err)
      // Non-fatal — proceed with registration, backfill customer ID later
    }
  }

  const verifiedVia = body.isSoleTrader
    ? 'Stripe Identity (pending)'
    : body.companyStatus === 'active'
      ? 'Companies House (auto)'
      : 'Manual review required'

  const { data, error } = await supabase
    .from('dealers')
    .insert({
      clerk_user_id:    userId,
      first_name:       body.firstName,
      last_name:        body.lastName,
      email:            body.email,
      phone:            body.phone,
      business_name:    body.businessName,
      company_number:   body.companyNumber || null,
      company_status:   body.isSoleTrader ? 'sole-trader' : (body.companyStatus || null),
      city:             body.city,
      postcode:         body.postcode,
      website:          body.website || null,
      makes:            body.makes,
      inventory_size:   body.inventorySize,
      price_range:      body.priceRange,
      verified_via:     verifiedVia,
      status:           body.companyStatus === 'active' ? 'approved' : 'pending',
      plan:             body.plan ?? 'solo',
      stripe_customer_id: stripeCustomerId,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Dealer registration error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }

  return NextResponse.json({ dealerId: data.id }, { status: 201 })
}
