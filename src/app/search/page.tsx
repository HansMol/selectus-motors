export const runtime = 'edge'

import { Suspense } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { ListingCard } from '@/components/listings/listing-card'
import { SearchFilters } from '@/components/search/search-filters'
import { searchListings } from '@/lib/mock-data'

export const metadata = {
  title: 'Search Cars',
  description: 'Search thousands of used cars across the UK. Filter by make, model, price, and more.',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const params = await searchParams
  const { q, ...filters } = params

  const listings = searchListings(q, filters)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {q ? `Results for "${q}"` : 'Search Results'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {listings.length} {listings.length === 1 ? 'car' : 'cars'} found
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <SlidersHorizontal size={16} />
          <span>Sort: Newest first</span>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <Suspense fallback={<div className="h-96 bg-white rounded-xl border border-slate-200 animate-pulse" />}>
              <SearchFilters />
            </Suspense>
          </div>
        </div>

        {/* Results grid */}
        <div className="flex-1 min-w-0">
          {listings.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
              <p className="text-slate-500 text-lg font-medium">No cars found</p>
              <p className="text-slate-400 text-sm mt-1">Try adjusting your search or clearing some filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {listings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
