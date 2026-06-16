import Link from 'next/link'
import { ShieldCheck, Star } from 'lucide-react'
import { ListingCard } from '@/components/listings/listing-card'
import { createServerClient } from '@/lib/supabase/server'

const makes = ['BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Ford', 'Toyota', 'Porsche', 'Mazda', 'Land Rover', 'Volvo']
const bodyTypes = [
  { label: 'Hatchbacks', value: 'hatchback' },
  { label: 'SUVs', value: 'suv' },
  { label: 'Saloons', value: 'saloon' },
  { label: 'Estates', value: 'estate' },
  { label: 'Coupes', value: 'coupe' },
  { label: 'Convertibles', value: 'convertible' },
]

export default async function HomePage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'live')
    .order('created_at', { ascending: false })
    .limit(6)
  const recentListings = data ?? []

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0A0A0F] text-white px-4 sm:px-8 lg:px-16 pt-16 pb-16 flex flex-col gap-12">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#C4C6CC] mb-8 flex items-center gap-3 before:content-[''] before:block before:w-5 before:h-px before:bg-[#C4C6CC]">
            UK Car Marketplace
          </p>
          <h1 className="text-[clamp(48px,6vw,76px)] font-light leading-[1.06] tracking-[-0.01em] mb-4">
            Find your next car.
          </h1>
          <p className="text-[clamp(20px,2.5vw,28px)] font-light text-[#C4C6CC] leading-snug tracking-[-0.01em] mb-9">
            Clean listings. Verified dealers. Direct contact.
          </p>
          <p className="text-lg text-[#6E6E73] leading-relaxed mb-12 max-w-lg font-light">
            No sponsored slots, no reservation fees, no platform inbox. Search, find, call.
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

          <p className="text-[13px] text-[#6E6E73] mb-4 font-light">
            <Link href="#notify" className="text-[#C4C6CC] hover:text-white underline underline-offset-2 transition-colors">
              Notify me when new cars land →
            </Link>
          </p>

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
            { label: 'Verified dealers', value: '100%' },
            { label: 'To enquire', value: '£0' },
            { label: 'Reservation fees', value: 'None' },
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#0A0A0F] flex items-center justify-center shrink-0">
                <ShieldCheck size={18} className="text-[#C4C6CC]" />
              </div>
              <div>
                <p className="font-semibold text-[#0A0A0F] text-sm">Verified dealers</p>
                <p className="text-sm text-[#6E6E73] mt-1 leading-relaxed">Every dealer independently verified through Companies House before their first listing goes live.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#0A0A0F] flex items-center justify-center shrink-0">
                <Star size={18} className="text-[#C4C6CC]" />
              </div>
              <div>
                <p className="font-semibold text-[#0A0A0F] text-sm">Real reviews</p>
                <p className="text-sm text-[#6E6E73] mt-1 leading-relaxed">Verified buyer reviews on every dealer. No incentivised five-stars.</p>
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
          <p className="text-[#6E6E73] mb-10 max-w-md mx-auto leading-relaxed">We&apos;re onboarding our founding dealer partners now. Verified listings, direct buyer contact, no platform cut.</p>
          <Link
            href="/dealers/register"
            className="inline-block bg-[#C4C6CC] text-[#0A0A0F] font-semibold px-8 py-3.5 rounded-md hover:bg-[#A8AAB0] transition-colors text-sm"
          >
            Apply for early access →
          </Link>
        </div>
      </section>
    </div>
  )
}
