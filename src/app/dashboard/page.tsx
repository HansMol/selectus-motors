import Link from 'next/link'
import {
  CheckCircle2,
  Eye,
  MessageSquare,
  LayoutGrid,
  Plus,
  Car,
  ChevronRight,
  Clock,
  TrendingUp,
  MoreHorizontal,
} from 'lucide-react'

// ── Mock data (replaced by Supabase when wired) ─────────────────────────────
const dealer = {
  name: 'John Smith',
  dealership: 'Bramley Prestige Cars',
  verified: true,
  verifiedVia: 'Companies House',
  companyNumber: '14523891',
  location: 'Birmingham, B16 0LP',
  memberSince: 'June 2026',
}

const listings = [
  {
    id: '1',
    make: 'BMW',
    model: '320i M Sport',
    year: 2021,
    mileage: 34200,
    price: 24995,
    colour: 'Mineral White',
    fuel: 'Petrol',
    transmission: 'Automatic',
    status: 'live' as const,
    views: 142,
    enquiries: 8,
    addedAt: '2 Jun 2026',
  },
  {
    id: '2',
    make: 'Land Rover',
    model: 'Discovery Sport SE',
    year: 2020,
    mileage: 51000,
    price: 28750,
    colour: 'Indus Silver',
    fuel: 'Diesel',
    transmission: 'Automatic',
    status: 'live' as const,
    views: 89,
    enquiries: 4,
    addedAt: '5 Jun 2026',
  },
  {
    id: '3',
    make: 'Mercedes-Benz',
    model: 'C-Class AMG Line',
    year: 2022,
    mileage: 18000,
    price: 34500,
    colour: 'Obsidian Black',
    fuel: 'Petrol',
    transmission: 'Automatic',
    status: 'draft' as const,
    views: 0,
    enquiries: 0,
    addedAt: '10 Jun 2026',
  },
]

// ── Derived stats ────────────────────────────────────────────────────────────
const liveCount    = listings.filter(l => l.status === 'live').length
const draftCount   = listings.filter(l => l.status === 'draft').length
const totalViews   = listings.reduce((s, l) => s + l.views, 0)
const totalEnqs    = listings.reduce((s, l) => s + l.enquiries, 0)

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatPrice(n: number) {
  return '£' + n.toLocaleString('en-GB')
}

function formatMileage(n: number) {
  return n.toLocaleString('en-GB') + ' mi'
}

// ── Verification badge ───────────────────────────────────────────────────────
function VerificationBadge({ verified, via }: { verified: boolean; via: string }) {
  if (verified) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-[#F8F8FA] text-[#0A0A0F] border border-[#C4C6CC] rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide">
        <CheckCircle2 size={11} className="text-[#C4C6CC] flex-shrink-0" />
        Verified · {via}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-[#F8F8FA] text-[#6E6E73] border border-[#E5E5E7] rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide">
      <Clock size={11} className="flex-shrink-0" />
      Verification pending
    </span>
  )
}

// ── Status pill ──────────────────────────────────────────────────────────────
function StatusPill({ status }: { status: 'live' | 'draft' | 'sold' }) {
  const styles = {
    live:  'bg-green-50 text-green-700 border-green-200',
    draft: 'bg-[#F8F8FA] text-[#6E6E73] border-[#E5E5E7]',
    sold:  'bg-blue-50 text-blue-700 border-blue-200',
  }
  const labels = { live: 'Live', draft: 'Draft', sold: 'Sold' }
  return (
    <span className={`inline-flex items-center border rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${styles[status]}`}>
      {status === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />}
      {labels[status]}
    </span>
  )
}

// ── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  sub?: string
}) {
  return (
    <div className="bg-white border border-[#E5E5E7] rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6E6E73]">{label}</span>
        <Icon size={16} className="text-[#C4C6CC]" />
      </div>
      <p className="text-[28px] font-light text-[#0A0A0F] leading-none">{value}</p>
      {sub && <p className="text-[12px] text-[#6E6E73] mt-1.5">{sub}</p>}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="bg-[#F8F8FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Dealer header ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-[22px] font-semibold text-[#0A0A0F]">{dealer.dealership}</h1>
              <VerificationBadge verified={dealer.verified} via={dealer.verifiedVia} />
            </div>
            <p className="text-[14px] text-[#6E6E73]">
              {dealer.name} · {dealer.location} · Member since {dealer.memberSince}
            </p>
          </div>
          <Link
            href="/dashboard/listings/new"
            className="inline-flex items-center gap-2 bg-[#0A0A0F] hover:bg-[#1C1C1E] text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap self-start"
          >
            <Plus size={15} />
            Add listing
          </Link>
        </div>

        {/* ── Stats ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={LayoutGrid} label="Total listings"   value={listings.length} sub={`${liveCount} live · ${draftCount} draft`} />
          <StatCard icon={Eye}        label="Views this week"  value={totalViews.toLocaleString()} sub="across all listings" />
          <StatCard icon={MessageSquare} label="Enquiries"     value={totalEnqs}       sub="this week" />
          <StatCard icon={TrendingUp} label="Top listing"      value="BMW 320i"        sub="142 views · 8 enquiries" />
        </div>

        {/* ── Listings table ────────────────────────────────────────────── */}
        <div className="bg-white border border-[#E5E5E7] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E7]">
            <h2 className="text-[15px] font-semibold text-[#0A0A0F]">My listings</h2>
            <span className="text-[13px] text-[#6E6E73]">{listings.length} vehicles</span>
          </div>

          {listings.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-20 text-center px-6">
              <div className="w-14 h-14 rounded-full bg-[#F8F8FA] border border-[#E5E5E7] flex items-center justify-center mb-4">
                <Car size={22} className="text-[#C4C6CC]" />
              </div>
              <p className="text-[15px] font-medium text-[#0A0A0F] mb-1">No listings yet</p>
              <p className="text-[13px] text-[#6E6E73] mb-6 max-w-xs">
                Add your first vehicle to start reaching buyers on Selectus Motors.
              </p>
              <Link
                href="/dashboard/listings/new"
                className="inline-flex items-center gap-2 bg-[#0A0A0F] text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-colors hover:bg-[#1C1C1E]"
              >
                <Plus size={15} />
                Add your first listing
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#E5E5E7]">
                    {['Vehicle', 'Price', 'Mileage', 'Status', 'Views', 'Enquiries', ''].map(h => (
                      <th key={h} className="px-6 py-3 text-[11px] font-semibold tracking-[0.08em] uppercase text-[#6E6E73]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing, i) => (
                    <tr
                      key={listing.id}
                      className={`hover:bg-[#F8F8FA] transition-colors ${i < listings.length - 1 ? 'border-b border-[#E5E5E7]' : ''}`}
                    >
                      {/* Vehicle */}
                      <td className="px-6 py-4">
                        <p className="text-[14px] font-semibold text-[#0A0A0F]">
                          {listing.year} {listing.make} {listing.model}
                        </p>
                        <p className="text-[12px] text-[#6E6E73] mt-0.5">
                          {listing.colour} · {listing.fuel} · {listing.transmission}
                        </p>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <span className="text-[14px] font-semibold text-[#0A0A0F]">{formatPrice(listing.price)}</span>
                      </td>

                      {/* Mileage */}
                      <td className="px-6 py-4">
                        <span className="text-[13px] text-[#6E6E73]">{formatMileage(listing.mileage)}</span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <StatusPill status={listing.status} />
                      </td>

                      {/* Views */}
                      <td className="px-6 py-4">
                        <span className="text-[13px] text-[#0A0A0F]">{listing.views.toLocaleString()}</span>
                      </td>

                      {/* Enquiries */}
                      <td className="px-6 py-4">
                        <span className={`text-[13px] font-medium ${listing.enquiries > 0 ? 'text-[#0A0A0F]' : 'text-[#6E6E73]'}`}>
                          {listing.enquiries}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <Link
                            href={`/dashboard/listings/${listing.id}/edit`}
                            className="text-[12px] font-medium text-[#6E6E73] hover:text-[#0A0A0F] transition-colors px-2.5 py-1 rounded-md border border-transparent hover:border-[#E5E5E7]"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            className="p-1.5 text-[#6E6E73] hover:text-[#0A0A0F] rounded-md hover:bg-[#F8F8FA] transition-colors"
                            aria-label="More options"
                          >
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Verification detail ────────────────────────────────────────── */}
        {dealer.verified && (
          <div className="mt-6 flex items-center gap-3 bg-white border border-[#E5E5E7] rounded-xl px-5 py-4">
            <CheckCircle2 size={18} className="text-[#C4C6CC] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-[#0A0A0F]">
                {dealer.dealership} is verified via Companies House
              </p>
              <p className="text-[12px] text-[#6E6E73] mt-0.5">
                Company number {dealer.companyNumber} · Active status confirmed
              </p>
            </div>
            <ChevronRight size={16} className="text-[#C4C6CC] flex-shrink-0" />
          </div>
        )}

      </div>
    </div>
  )
}
