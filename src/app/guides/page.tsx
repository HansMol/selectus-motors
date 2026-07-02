import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Guides',
  description: 'Practical advice for buying a used car in the UK — from Kerb.',
}

const guides = [
  {
    href: '/guides/how-to-buy-a-used-car-uk',
    title: 'How to buy a used car in the UK',
    description: 'Service history, fuel types, gearboxes, rust checks, OBD readers, and everything to look for before you commit.',
    date: 'July 2026',
    readTime: '9 min read',
  },
]

export default function GuidesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <div className="mb-12">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#A0714A] mb-3">Kerb Guides</p>
        <h1 className="text-4xl font-light text-[#0A0A0F] tracking-tight mb-4">Practical advice for car buyers</h1>
        <p className="text-[#6E6E73] text-lg leading-relaxed">No fluff. No affiliate-stuffed listicles. Just useful information to help you buy the right car.</p>
      </div>

      <div className="space-y-4">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="block bg-white border border-[#E5E5E7] rounded-md p-6 hover:border-[#A0714A] transition-colors no-underline group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs text-[#78716C]">{guide.date}</span>
              <span className="text-[#E5E5E7]">·</span>
              <span className="text-xs text-[#78716C]">{guide.readTime}</span>
            </div>
            <h2 className="text-[#0A0A0F] font-semibold text-lg mb-2 group-hover:text-[#A0714A] transition-colors">{guide.title}</h2>
            <p className="text-[#6E6E73] text-sm leading-relaxed m-0">{guide.description}</p>
          </Link>
        ))}
      </div>

    </div>
  )
}
