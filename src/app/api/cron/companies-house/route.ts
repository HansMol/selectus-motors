import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
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

  const results: {
    id: string
    business_name: string
    company_number: string
    previous: string | null
    current: string | null
    changed: boolean
  }[] = []

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
        business_name: dealer.business_name,
        company_number: dealer.company_number,
        previous: dealer.company_status,
        current: freshStatus,
        changed,
      })
    } catch {
      // Skip on network error — retried next month
    }
  }

  const changed = results.filter(r => r.changed)

  if (changed.length > 0) {
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const resend = new Resend(resendKey)
      const rows = changed.map(r => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #E5E5E7;font-weight:500">${r.business_name}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #E5E5E7;color:#6E6E73">${r.company_number}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #E5E5E7;color:#6E6E73">${r.previous ?? '—'}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #E5E5E7;font-weight:600;color:${r.current === 'active' ? '#16a34a' : '#dc2626'}">${r.current ?? '—'}</td>
        </tr>
      `).join('')

      await resend.emails.send({
        from: 'Kerb <notifications@kerb.autos>',
        to: 'hans@kerb.autos',
        subject: `Companies House alert — ${changed.length} dealer ${changed.length === 1 ? 'status' : 'statuses'} changed`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0A0A0F">
            <p style="font-size:18px;font-weight:600;margin-bottom:4px">Companies House — monthly status check</p>
            <p style="color:#6E6E73;margin-top:0">${results.length} dealers checked · ${changed.length} status ${changed.length === 1 ? 'change' : 'changes'} found</p>

            <table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:14px">
              <thead>
                <tr style="background:#F8F8FA">
                  <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#6E6E73;border-bottom:1px solid #E5E5E7">Dealer</th>
                  <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#6E6E73;border-bottom:1px solid #E5E5E7">Co. number</th>
                  <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#6E6E73;border-bottom:1px solid #E5E5E7">Previous</th>
                  <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#6E6E73;border-bottom:1px solid #E5E5E7">Now</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>

            <p style="font-size:13px;color:#6E6E73">Review affected dealers in the <a href="https://kerb.autos/admin" style="color:#0A0A0F">admin dashboard</a> or on <a href="https://find-and-update.company-information.service.gov.uk" style="color:#0A0A0F">Companies House</a>.</p>
            <p style="font-size:12px;color:#A8AAB0;margin-top:32px">Kerb — automated monthly check · 1st of each month</p>
          </div>
        `,
      })
    }
  }

  return NextResponse.json({
    checked: results.length,
    changed: changed.length,
    changes: changed,
    timestamp: new Date().toISOString(),
  })
}
