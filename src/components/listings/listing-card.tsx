import Link from 'next/link'
import { Gauge, Fuel, Settings, Car } from 'lucide-react'
import type { ListingRow } from '@/lib/supabase/types'

export function ListingCard({ listing }: { listing: ListingRow }) {
  const photo = listing.photos?.[0]
  const title = `${listing.year} ${listing.make} ${listing.model}`

  return (
    <Link
      href={`/cars/${listing.id}`}
      className="group block bg-white border border-[#E5E5E7] rounded-md overflow-hidden hover:border-[#C4C6CC] hover:shadow-sm transition-all duration-200"
    >
      <div className="relative aspect-[4/3] bg-[#F8F8FA] overflow-hidden flex items-center justify-center">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Car size={40} className="text-[#E5E5E7]" />
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-[#0A0A0F] text-base leading-snug mb-1 group-hover:text-[#1C1C1E]">
          {title}
        </h3>

        <p className="text-2xl font-semibold text-[#0A0A0F] mb-3">
          £{listing.price.toLocaleString('en-GB')}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#6E6E73]">
          <span className="flex items-center gap-1">
            <Gauge size={13} className="text-[#A8AAB0]" />
            {listing.mileage.toLocaleString('en-GB')} miles
          </span>
          <span className="flex items-center gap-1">
            <Fuel size={13} className="text-[#A8AAB0]" />
            {listing.fuel_type}
          </span>
          <span className="flex items-center gap-1">
            <Settings size={13} className="text-[#A8AAB0]" />
            {listing.transmission}
          </span>
        </div>
      </div>
    </Link>
  )
}
