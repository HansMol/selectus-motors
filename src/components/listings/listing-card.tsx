import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Gauge, Fuel, Settings } from 'lucide-react'
import type { Listing } from '@/types/listings'
import { formatPrice, formatMileage, fuelTypeLabels, transmissionLabels } from '@/lib/utils/format'

interface ListingCardProps {
  listing: Listing
}

export function ListingCard({ listing }: ListingCardProps) {
  const primaryImage = listing.media.find(m => m.isPrimary) ?? listing.media[0]

  return (
    <Link
      href={`/cars/${listing.slug}`}
      className="group block bg-white border border-[#E5E5E7] rounded-md overflow-hidden hover:border-[#C4C6CC] hover:shadow-sm transition-all duration-200"
    >
      <div className="relative aspect-[4/3] bg-[#F8F8FA] overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.thumbnailUrl}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#6E6E73] text-sm">No image</div>
        )}

        {listing.sellerType === 'private' && (
          <div className="absolute top-3 left-3">
            <span className="text-xs font-medium bg-white/90 text-[#0A0A0F] px-2 py-0.5 rounded border border-[#E5E5E7]">Private</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-[#0A0A0F] text-base leading-snug mb-1 group-hover:text-[#1C1C1E]">
          {listing.title}
        </h3>

        <p className="text-2xl font-semibold text-[#0A0A0F] mb-3">
          {formatPrice(listing.price)}
          {listing.priceOno && <span className="text-sm font-normal text-[#6E6E73] ml-1">o.n.o.</span>}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#6E6E73] mb-3">
          <span className="flex items-center gap-1">
            <Gauge size={13} className="text-[#A8AAB0]" />
            {formatMileage(listing.mileage)}
          </span>
          <span className="flex items-center gap-1">
            <Fuel size={13} className="text-[#A8AAB0]" />
            {fuelTypeLabels[listing.fuelType]}
          </span>
          <span className="flex items-center gap-1">
            <Settings size={13} className="text-[#A8AAB0]" />
            {transmissionLabels[listing.transmission]}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-[#6E6E73]">
            <MapPin size={13} className="text-[#A8AAB0]" />
            {listing.city}
          </span>
          {listing.dealer && (
            <span className="text-[#6E6E73] truncate max-w-[140px]">{listing.dealer.businessName}</span>
          )}
          <span className="text-[#A8AAB0] text-xs">{listing.year}</span>
        </div>
      </div>
    </Link>
  )
}
