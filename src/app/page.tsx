import Link from 'next/link'
import { CountdownTimer } from '@/components/countdown-timer'

export const dynamic = 'force-static'

export default function ComingSoonPage() {
  return (
    <div className="bg-[#0A0A0F] min-h-screen">

      {/* ── Hero ── */}
      <section className="px-6 sm:px-10 lg:px-20 pt-20 pb-20 border-b border-[#1C1C1E]">
        <div className="max-w-5xl">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#C4C6CC] mb-10 flex items-center gap-3 before:content-[''] before:block before:w-5 before:h-px before:bg-[#C4C6CC]">
            UK Car Marketplace — Launching August 2026
          </p>
          <h1 className="text-[clamp(32px,3.5vw,48px)] font-light text-white leading-[1.1] tracking-[-0.02em] mb-6">
            Every car.<br />You choose.
          </h1>
          <p className="text-[15px] text-[#6E6E73] font-light leading-relaxed max-w-lg mb-16">
            Clean listings, verified dealers, direct contact. No sponsored slots, no reservation fees, no platform inbox. Search, find, call.
          </p>

          {/* Countdown */}
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#2A2A2E] mb-7">
            Launching in
          </p>
          <CountdownTimer targetDate="2026-08-01T00:00:00Z" />

          {/* Buyer email capture */}
          <form
            action="https://api.resend.com/audiences"
            method="POST"
            className="mt-14 flex flex-col sm:flex-row gap-3 max-w-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3.5 bg-[#1C1C1E] border border-[#2A2A2E] text-white rounded-md text-sm placeholder:text-[#3A3A3E] focus:outline-none focus:border-[#C4C6CC] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#C4C6CC] text-[#0A0A0F] font-semibold px-6 py-3.5 rounded-md hover:bg-white transition-colors text-sm shrink-0"
            >
              Notify me at launch
            </button>
          </form>
          <p className="text-[#2A2A2E] text-[11px] mt-3">No spam. One email when we go live.</p>
        </div>
      </section>

      {/* ── Why it's different ── */}
      <section className="px-6 sm:px-10 lg:px-20 py-16 border-b border-[#1C1C1E]">
        <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#2A2A2E] mb-12">
          What's different
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl">
          {[
            { stat: '£0',    label: 'To enquire',       sub: 'No reservation fees. No lead charges. Ever.' },
            { stat: '100%',  label: 'Verified dealers', sub: 'Every dealer checked through Companies House before listing.' },
            { stat: 'Direct', label: 'Contact always',  sub: 'You call the dealer. No platform inbox, no middleman.' },
          ].map(({ stat, label, sub }) => (
            <div key={label}>
              <p className="text-[clamp(32px,4vw,48px)] font-light text-white leading-none tracking-[-0.03em] mb-2">{stat}</p>
              <p className="text-[#C4C6CC] text-[13px] font-medium mb-1">{label}</p>
              <p className="text-[#6E6E73] text-[12px] leading-relaxed">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Product preview ── */}
      <section className="px-6 sm:px-10 lg:px-20 py-20 border-b border-[#1C1C1E]">
        <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#2A2A2E] mb-12">
          Product preview
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Listing card mockup */}
          <div className="rounded-xl overflow-hidden border border-[#1C1C1E] bg-[#0D0D12]">
            <div className="aspect-[16/10] bg-[#141418] flex items-end p-3">
              <div className="flex gap-1.5">
                <div className="w-14 h-1 rounded-full bg-[#C4C6CC]" />
                <div className="w-6 h-1 rounded-full bg-[#2A2A2E]" />
                <div className="w-6 h-1 rounded-full bg-[#2A2A2E]" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white text-[13px] font-medium leading-tight mb-1">BMW 3 Series</p>
                  <p className="text-[#6E6E73] text-[11px]">2021 · 28,000 mi · Diesel</p>
                </div>
                <p className="text-white text-[15px] font-light tracking-tight">£24,500</p>
              </div>
              <div className="pt-3 border-t border-[#1C1C1E] flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#1C1C1E] flex-shrink-0" />
                <p className="text-[#3A3A3E] text-[11px]">Verified dealer · Manchester</p>
              </div>
            </div>
          </div>

          {/* Search results mockup */}
          <div className="rounded-xl overflow-hidden border border-[#E5E5E7] bg-[#F8F8FA]">
            <div className="bg-white border-b border-[#E5E5E7] px-4 py-3 flex items-center gap-2">
              <div className="flex-1 bg-[#F8F8FA] rounded-md px-3 py-2 text-[11px] text-[#A8AAB0]">
                BMW · Under £30k · Diesel
              </div>
              <div className="w-7 h-7 rounded-md bg-[#F8F8FA] border border-[#E5E5E7]" />
            </div>
            <div className="p-3 flex flex-col gap-2">
              {[
                { make: 'BMW 330d', year: '2021', price: '£24,500' },
                { make: 'BMW 320i', year: '2022', price: '£22,995' },
                { make: 'BMW 318d', year: '2020', price: '£19,750' },
              ].map((car, i) => (
                <div key={i} className="bg-white rounded-lg p-3 border border-[#E5E5E7] flex gap-3 items-center">
                  <div className="w-14 h-10 bg-[#F8F8FA] rounded-md flex-shrink-0 border border-[#E5E5E7]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[#0A0A0F] text-[12px] font-medium leading-tight">{car.make}</p>
                    <p className="text-[#A8AAB0] text-[10px] mt-0.5">{car.year}</p>
                  </div>
                  <p className="text-[#0A0A0F] text-[12px] font-medium flex-shrink-0">{car.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Car detail mockup */}
          <div className="rounded-xl overflow-hidden border border-[#E5E5E7] bg-white">
            <div className="aspect-video bg-[#F8F8FA] border-b border-[#E5E5E7] flex items-center justify-center">
              <p className="text-[11px] tracking-[0.1em] uppercase text-[#C4C6CC]">Gallery</p>
            </div>
            <div className="p-4">
              <p className="text-[#0A0A0F] text-[13px] font-medium mb-0.5">BMW 330d M Sport</p>
              <p className="text-[#6E6E73] text-[11px] mb-3">2021 · Auto · 28,000 mi · RWD</p>
              <p className="text-[#0A0A0F] text-[22px] font-light tracking-tight mb-4">£24,500</p>
              <div className="bg-[#0A0A0F] text-white text-[12px] font-semibold py-3 rounded-md text-center mb-2">
                Contact dealer directly →
              </div>
              <p className="text-[10px] text-[#A8AAB0] text-center">No fees. No inbox. Direct call.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Dealer secondary CTA ── */}
      <section className="px-6 sm:px-10 lg:px-20 py-16 border-b border-[#1C1C1E]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 max-w-4xl">
          <div>
            <p className="text-white text-[15px] font-medium mb-1">Are you a dealer?</p>
            <p className="text-[#6E6E73] text-[13px] font-light">Join as a founding dealer — 90 days free, £55/month locked for life.</p>
          </div>
          <Link
            href="/dealers/register"
            className="shrink-0 text-[13px] font-semibold text-[#C4C6CC] border border-[#2A2A2E] hover:border-[#C4C6CC] hover:text-white px-6 py-3 rounded-md transition-colors whitespace-nowrap"
          >
            Apply for early access →
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 sm:px-10 lg:px-20 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-[#2A2A2E] text-[12px]">© 2026 Selectus Motors</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[#2A2A2E] text-[12px] hover:text-[#6E6E73] transition-colors">Privacy</Link>
            <Link href="/terms"   className="text-[#2A2A2E] text-[12px] hover:text-[#6E6E73] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
