import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  MapPin, Gauge, Fuel, Settings, Calendar, Users, ChevronRight,
  ShieldCheck, CheckCircle, Phone, Mail, Star, AlertCircle
} from 'lucide-react'
import { getListingBySlug } from '@/lib/mock-data'
import {
  formatPrice, formatMileage, fuelTypeLabels, transmissionLabels,
  bodyTypeLabels
} from '@/lib/utils/format'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const listing = getListingBySlug(slug)
  if (!listing) return { title: 'Car not found' }
  return {
    title: listing.title,
    description: listing.description.substring(0, 155),
  }
}

export default async function ListingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const listing = getListingBySlug(slug)

  if (!listing) notFound()

  const primaryImage = listing.media.find(m => m.isPrimary) ?? listing.media[0]

  const specs = [
    { label: 'Year', value: listing.year.toString(), icon: Calendar },
    { label: 'Mileage', value: formatMileage(listing.mileage), icon: Gauge },
    { label: 'Fuel type', value: fuelTypeLabels[listing.fuelType], icon: Fuel },
    { label: 'Transmission', value: transmissionLabels[listing.transmission], icon: Settings },
    { label: 'Body type', value: bodyTypeLabels[listing.bodyType] ?? listing.bodyType, icon: null },
    { label: 'Doors', value: listing.doors.toString(), icon: null },
    { label: 'Engine', value: listing.engineSizeDisplay, icon: null },
    { label: 'Power', value: listing.powerBhp ? `${listing.powerBhp} bhp` : '—', icon: null },
    { label: 'Colour', value: listing.colourExterior, icon: null },
    { label: 'Prev. owners', value: listing.previousOwners.toString(), icon: Users },
    { label: 'Service history', value: listing.serviceHistory === 'full' ? 'Full' : listing.serviceHistory === 'partial' ? 'Partial' : 'None', icon: null },
    { label: 'MOT expiry', value: listing.motExpiry ?? '—', icon: null },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-[#6E6E73] mb-6">
        <Link href="/" className="hover:text-[#0A0A0F] transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link href="/search" className="hover:text-[#0A0A0F] transition-colors">Search</Link>
        <ChevronRight size={14} />
        <span className="text-[#0A0A0F]">{listing.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column — images + details */}
        <div className="lg:col-span-2 space-y-8">

          {/* Primary image */}
          <div className="relative aspect-[16/10] rounded-md overflow-hidden bg-[#F8F8FA]">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={listing.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#6E6E73]">No image</div>
            )}
          </div>

          {/* Title + price */}
          <div>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl md:text-3xl font-light text-[#0A0A0F] tracking-tight">{listing.title}</h1>
                <p className="text-[#6E6E73] mt-1">
                  {listing.year} · {formatMileage(listing.mileage)} · {listing.city}, {listing.county}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold text-[#0A0A0F]">{formatPrice(listing.price)}</p>
                {listing.priceOno && <p className="text-sm text-[#6E6E73]">or nearest offer</p>}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {listing.sellerType === 'private' && (
                <Badge variant="outline">Private sale</Badge>
              )}
              {listing.ulezCompliant && (
                <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-emerald-50">
                  ULEZ Compliant
                </Badge>
              )}
              {listing.deliveryAvailable && (
                <Badge variant="outline">Home delivery available</Badge>
              )}
            </div>
          </div>

          <Separator />

          {/* Key specs grid */}
          <div>
            <h2 className="font-semibold text-[#0A0A0F] mb-4">Key details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {specs.map(spec => (
                <div key={spec.label} className="bg-[#F8F8FA] rounded-md p-3 border border-[#E5E5E7]">
                  <p className="text-xs text-[#6E6E73] mb-0.5">{spec.label}</p>
                  <p className="font-medium text-[#0A0A0F] text-sm">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h2 className="font-semibold text-[#0A0A0F] mb-3">Description</h2>
            <div className="space-y-3">
              {listing.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-[#6E6E73] leading-relaxed">{para}</p>
              ))}
            </div>
          </div>

          {/* Features */}
          {listing.features.length > 0 && (
            <>
              <Separator />
              <div>
                <h2 className="font-semibold text-[#0A0A0F] mb-3">Features & equipment</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {listing.features.map(feature => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-[#6E6E73]">
                      <CheckCircle size={14} className="text-[#C4C6CC] shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* MOT history */}
          {listing.motHistory && listing.motHistory.length > 0 && (
            <>
              <Separator />
              <div>
                <h2 className="font-semibold text-[#0A0A0F] mb-3">MOT history</h2>
                <div className="space-y-3">
                  {listing.motHistory.map((mot, i) => (
                    <div key={i} className="flex items-start justify-between bg-[#F8F8FA] rounded-md p-3 text-sm border border-[#E5E5E7]">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full ${mot.result === 'pass' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          <span className="font-medium text-[#0A0A0F] capitalize">{mot.result}</span>
                          <span className="text-[#A8AAB0]">·</span>
                          <span className="text-[#6E6E73]">{mot.date}</span>
                        </div>
                        <p className="text-[#6E6E73] ml-4">{formatMileage(mot.mileage)}</p>
                        {mot.advisories.length > 0 && (
                          <div className="mt-1 ml-4">
                            {mot.advisories.map((a, j) => (
                              <p key={j} className="text-amber-600 flex items-center gap-1">
                                <AlertCircle size={12} />
                                {a}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                      {mot.expiryDate && (
                        <span className="text-xs text-[#A8AAB0] shrink-0 ml-2">Expires {mot.expiryDate}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right column — seller + enquiry */}
        <div className="space-y-5">

          {/* Enquiry card */}
          <div className="bg-white border border-[#E5E5E7] rounded-md p-5 sticky top-24">
            <h3 className="font-semibold text-[#0A0A0F] mb-4">
              {listing.sellerType === 'dealer' ? 'Enquire with dealer' : 'Contact seller'}
            </h3>

            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-[#E5E5E7] rounded-md px-3 py-2.5 text-sm text-[#0A0A0F] placeholder:text-[#A8AAB0] focus:outline-none focus:border-[#C4C6CC] transition-colors"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full border border-[#E5E5E7] rounded-md px-3 py-2.5 text-sm text-[#0A0A0F] placeholder:text-[#A8AAB0] focus:outline-none focus:border-[#C4C6CC] transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone number (optional)"
                className="w-full border border-[#E5E5E7] rounded-md px-3 py-2.5 text-sm text-[#0A0A0F] placeholder:text-[#A8AAB0] focus:outline-none focus:border-[#C4C6CC] transition-colors"
              />
              <textarea
                rows={4}
                defaultValue={`Hi, I'm interested in the ${listing.title}. Is it still available?`}
                className="w-full border border-[#E5E5E7] rounded-md px-3 py-2.5 text-sm text-[#0A0A0F] placeholder:text-[#A8AAB0] focus:outline-none focus:border-[#C4C6CC] transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-[#0A0A0F] text-white font-semibold py-3 rounded-md hover:bg-[#1C1C1E] transition-colors text-sm"
              >
                Send enquiry
              </button>
            </form>

            <p className="text-xs text-[#A8AAB0] text-center mt-3">
              Your details go directly to the seller. Selectus Motors is never in the middle.
            </p>
          </div>

          {/* Seller profile */}
          {listing.dealer && (
            <div className="bg-white border border-[#E5E5E7] rounded-md p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-[#0A0A0F]">{listing.dealer.businessName}</p>
                  <p className="text-sm text-[#6E6E73] flex items-center gap-1 mt-0.5">
                    <MapPin size={12} /> {listing.dealer.city}, {listing.dealer.county}
                  </p>
                </div>
                {listing.dealer.verified && (
                  <ShieldCheck size={18} className="text-[#C4C6CC] shrink-0" />
                )}
              </div>

              <div className="flex items-center gap-1 mb-4">
                <Star size={14} className="text-[#C4C6CC] fill-[#C4C6CC]" />
                <span className="text-sm font-medium text-[#0A0A0F]">{listing.dealer.rating}</span>
                <span className="text-sm text-[#6E6E73]">({listing.dealer.reviewCount} reviews)</span>
              </div>

              <div className="space-y-2 text-sm">
                <a href={`tel:${listing.dealer.phone}`} className="flex items-center gap-2 text-[#6E6E73] hover:text-[#0A0A0F] transition-colors">
                  <Phone size={14} className="text-[#A8AAB0]" />
                  {listing.dealer.phone}
                </a>
                <a href={`mailto:${listing.dealer.email}`} className="flex items-center gap-2 text-[#6E6E73] hover:text-[#0A0A0F] transition-colors">
                  <Mail size={14} className="text-[#A8AAB0]" />
                  {listing.dealer.email}
                </a>
              </div>

              <Link
                href={`/dealers/${listing.dealer.slug}`}
                className="block text-center text-sm font-medium text-[#6E6E73] hover:text-[#0A0A0F] mt-4 transition-colors"
              >
                View all cars from this dealer →
              </Link>
            </div>
          )}

          {/* Reference */}
          <div className="text-xs text-[#A8AAB0] text-center">
            Reference: {listing.referenceNumber}
          </div>
        </div>
      </div>
    </div>
  )
}
