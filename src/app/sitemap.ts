import { MetadataRoute } from 'next'
import { createServerClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient()

  const { data: listings } = await supabase
    .from('listings')
    .select('id, updated_at')
    .eq('status', 'live')
    .not('photos', 'eq', '{}')

  const listingUrls: MetadataRoute.Sitemap = (listings ?? []).map((l) => ({
    url: `https://kerb.autos/cars/${l.id}`,
    lastModified: new Date(l.updated_at),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  return [
    { url: 'https://kerb.autos', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://kerb.autos/search', lastModified: new Date(), changeFrequency: 'always', priority: 0.9 },
    { url: 'https://kerb.autos/dealers', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://kerb.autos/terms', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://kerb.autos/privacy', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ...listingUrls,
  ]
}
