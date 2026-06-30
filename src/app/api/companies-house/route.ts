import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export interface CompanyResult {
  company_number: string
  title: string
  company_status: string
  address_snippet: string
  date_of_creation: string
  company_type: string
}

export async function GET(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const q = request.nextUrl.searchParams.get('q')

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ items: [] })
  }

  const apiKey = process.env.COMPANIES_HOUSE_API_KEY
  if (!apiKey) {
    return NextResponse.json({ items: [], error: 'API key not configured' }, { status: 503 })
  }

  try {
    const res = await fetch(
      `https://api.company-information.service.gov.uk/search/companies?q=${encodeURIComponent(q.trim())}&items_per_page=6`,
      {
        headers: {
          Authorization: `Basic ${btoa(`${apiKey}:`)}`,
        },
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) {
      return NextResponse.json({ items: [] })
    }

    const data = await res.json()
    const items: CompanyResult[] = (data.items ?? []).map((item: CompanyResult) => ({
      company_number:  item.company_number,
      title:           item.title,
      company_status:  item.company_status,
      address_snippet: item.address_snippet,
      date_of_creation: item.date_of_creation,
      company_type:    item.company_type,
    }))

    return NextResponse.json({ items })
  } catch {
    return NextResponse.json({ items: [] })
  }
}
