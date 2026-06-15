import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const runtime = 'edge'

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

  const { data, error } = await supabase
    .from('dealers')
    .insert({
      clerk_user_id: userId,
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      phone: body.phone,
      business_name: body.businessName,
      company_number: body.companyNumber || null,
      company_status: body.isSoleTrader ? 'sole-trader' : (body.companyStatus || null),
      city: body.city,
      postcode: body.postcode,
      website: body.website || null,
      makes: body.makes,
      inventory_size: body.inventorySize,
      price_range: body.priceRange,
      verified_via: body.verifiedVia,
      status: body.companyStatus === 'active' ? 'approved' : 'pending',
    })
    .select('id')
    .single()

  if (error) {
    console.error('Dealer registration error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }

  return NextResponse.json({ dealerId: data.id }, { status: 201 })
}
