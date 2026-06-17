import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const secret = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const apiKey = process.env.COMPANIES_HOUSE_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Companies House API key not configured' }, { status: 503 })
  }

  const supabase = createServerClient()

  const { data: dealers, error } = await supabase
    .from('dealers')
    .select('id, business_name, company_number, company_status')
    .eq('status', 'approved')
    .not('company_number', 'is', null)

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch dealers' }, { status: 500 })
  }

  const results: { id: string; company_number: string; previous: string | null; current: string | null; changed: boolean }[] = []

  for (const dealer of dealers ?? []) {
    if (!dealer.company_number) continue

    try {
      const res = await fetch(
        `https://api.company-information.service.gov.uk/company/${dealer.company_number}`,
        { headers: { Authorization: `Basic ${btoa(`${apiKey}:`)}` } }
      )

      if (!res.ok) continue

      const data = await res.json()
      const freshStatus: string = data.company_status ?? 'unknown'
      const changed = freshStatus !== dealer.company_status

      if (changed) {
        await supabase
          .from('dealers')
          .update({ company_status: freshStatus })
          .eq('id', dealer.id)
      }

      results.push({
        id: dealer.id,
        company_number: dealer.company_number,
        previous: dealer.company_status,
        current: freshStatus,
        changed,
      })
    } catch {
      // Skip this dealer on network error — will be retried next month
    }
  }

  const changed = results.filter(r => r.changed)

  return NextResponse.json({
    checked: results.length,
    changed: changed.length,
    changes: changed,
    timestamp: new Date().toISOString(),
  })
}
