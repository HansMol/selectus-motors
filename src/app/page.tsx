import Link from 'next/link'
import { ShieldCheck, TrendingDown, Star } from 'lucide-react'
import { ListingCard } from '@/components/listings/listing-card'
import { mockListings } from '@/lib/mock-data'

const makes = ['BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Ford', 'Toyota', 'Porsche', 'Mazda', 'Land Rover', 'Volvo']
const bodyTypes = [
  { label: 'Hatchbacks', value: 'hatchback' },
  { label: 'SUVs', value: 'suv' },
  { label: 'Saloons', value: 'saloon' },
  { label: 'Estates', value: 'estate' },
  { label: 'Coupes', value: 'coupe' },
  { label: 'Convertibles', value: 'convertible' },
]

export default function HomePage() {
  const recentListings = [...mockListings].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0A0A0F] text-white px-4 sm:px-8 lg:px-16 pt-16 pb-16 flex flex-col gap-12">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#C4C6CC] mb-8 flex items-center gap-3 before:content-[''] before:block before:w-5 before:h-px before:bg-[#C4C6CC]">
            UK Car Marketplace
          </p>
          <h1 className="text-[clamp(48px,6vw,76px)] font-light leading-[1.06] tracking-[-0.01em] mb-9">
            Find your next car.<br />
            <span className="text-[#C4C6CC]">Your call. Your deal.</span>
          </h1>
          <p className="text-lg text-[#6E6E73] leading-relaxed mb-12 max-w-lg font-light">
            Every enquiry goes directly to the dealer — no platform inbox, no reservation gates, no intermediation. Just you and the seller.
          </p>

          <form action="/search" method="GET" className="max-w-xl mb-8">
            <div className="flex gap-2">
              <input
                name="q"
                type="text"
                placeholder="Make, model, or keyword..."
                className="flex-1 px-4 py-3.5 bg-[#1C1C1E] border border-[rgba(255,255,255,0.08)] text-white rounded-md text-sm placeholder:text-[#3A3A3E] focus:outline-none focus:border-[#C4C6CC] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#C4C6CC] text-[#0A0A0F] font-semibold px-7 py-3.5 rounded-md hover:bg-[#A8AAB0] transition-colors text-sm shrink-0"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap gap-2">
            {makes.map(make => (
              <Link
                key={make}
                href={`/search?make=${make.toLowerCase()}`}
                className="text-xs text-[#6E6E73] hover:text-white border border-[#1C1C1E] hover:border-[#C4C6CC] rounded-md px-3 py-1.5 transition-colors"
              >
                {make}
              </Link>
            ))}
          </div>
        </div>

        {/* Hero stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-[#1C1C1E] pt-12">
          {[
            { label: 'Verified sellers', value: '100%' },
            { label: 'Listing cost', value: 'Free' },
            { label: 'Hidden fees', value: '£0' },
            { label: 'Direct contact', value: 'Always' },
          ].map((stat, i) => (
            <div key={i} className="pr-8 border-r border-[#1C1C1E] mr-8 last:border-r-0 last:mr-0 mb-8 md:mb-0">
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6E6E73] mb-2">{stat.label}</p>
              <p className="text-[32px] font-light text-white tracking-[-0.02em] leading-none">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-white border-b border-[#E5E5E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#0A0A0F] flex items-center justify-center shrink-0">
                <ShieldCheck size={18} className="text-[#C4C6CC]" />
              </div>
              <div>
                <p className="font-semibold text-[#0A0A0F] text-sm">Verified sellers</p>
                <p className="text-sm text-[#6E6E73] mt-1 leading-relaxed">Every dealer independently verified. Private sellers identity-checked at enquiry.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#0A0A0F] flex items-center justify-center shrink-0">
                <TrendingDown size={18} className="text-[#C4C6CC]" />
              </div>
              <div>
                <p className="font-semibold text-[#0A0A0F] text-sm">Transparent pricing</p>
                <p className="text-sm text-[#6E6E73] mt-1 leading-relaxed">Every listing rated against market data. Know if you&apos;re getting a fair deal before you enquire.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#0A0A0F] flex items-center justify-center shrink-0">
                <Star size={18} className="text-[#C4C6CC]" />
              </div>
              <div>
                <p className="font-semibold text-[#0A0A0F] text-sm">Real reviews</p>
                <p className="text-sm text-[#6E6E73] mt-1 leading-relaxed">Buyer reviews on every dealer. Verified purchase history — no fake five-stars.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by body type */}
      <section className="bg-[#F8F8FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#A8AAB0] mb-3 flex items-center gap-3 before:content-[''] before:block before:w-5 before:h-px before:bg-[#A8AAB0]">
            Browse
          </p>
          <h2 className="text-2xl font-light text-[#0A0A0F] tracking-tight mb-8">Shop by type</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {bodyTypes.map(bt => (
              <Link
                key={bt.value}
                href={`/search?bodyType=${bt.value}`}
                className="flex flex-col items-center gap-2 bg-white border border-[#E5E5E7] rounded-md p-4 hover:border-[#C4C6CC] hover:shadow-sm transition-all text-center"
              >
                <span className="text-sm font-medium text-[#0A0A0F]">{bt.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest listings */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#A8AAB0] mb-2 flex items-center gap-3 before:content-[''] before:block before:w-5 before:h-px before:bg-[#A8AAB0]">
                Latest
              </p>
              <h2 className="text-2xl font-light text-[#0A0A0F] tracking-tight">Just listed</h2>
            </div>
            <Link href="/search?sort=newest" className="text-sm font-medium text-[#6E6E73] hover:text-[#0A0A0F] transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Sell CTA */}
      <section className="bg-[#0A0A0F] text-white px-4 sm:px-8 lg:px-16 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#C4C6CC] mb-6">Sell with Selectus Motors</p>
          <h2 className="text-[clamp(32px,4vw,48px)] font-light tracking-tight mb-4">
            Selling your car?
          </h2>
          <p className="text-[#6E6E73] mb-10 max-w-md mx-auto leading-relaxed">List in minutes. No hidden fees. Every enquiry goes straight to you — not a platform inbox.</p>
          <Link
            href="/sell"
            className="inline-block bg-[#C4C6CC] text-[#0A0A0F] font-semibold px-8 py-3.5 rounded-md hover:bg-[#A8AAB0] transition-colors text-sm"
          >
            List your car — it&apos;s free
          </Link>
        </div>
      </section>
    </div>
  )
}
