export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'mild_hybrid' | 'plug_in_hybrid' | 'electric'
export type Transmission = 'manual' | 'automatic' | 'semi_automatic'
export type BodyType = 'hatchback' | 'saloon' | 'estate' | 'suv' | 'coupe' | 'convertible' | 'mpv' | 'pickup' | 'van'
export type SellerType = 'private' | 'dealer'
export type ListingStatus = 'draft' | 'active' | 'sold' | 'paused' | 'expired'
export type ListingTier = 'standard' | 'enhanced' | 'premium'
export type PriceRating = 'great_deal' | 'good_deal' | 'fair' | 'high' | 'very_high'
export type ServiceHistory = 'full' | 'partial' | 'none' | 'digital'
export type ConditionGrade = 'excellent' | 'good' | 'fair' | 'poor'

export interface Dealer {
  id: string
  slug: string
  businessName: string
  city: string
  county: string
  postcode: string
  phone: string
  email: string
  rating: number
  reviewCount: number
  verified: boolean
  tier: 'starter' | 'growth' | 'pro' | 'enterprise'
  logoUrl?: string
}

export interface MotRecord {
  date: string
  result: 'pass' | 'fail'
  mileage: number
  advisories: string[]
  failures: string[]
  expiryDate?: string
}

export interface ListingMedia {
  id: string
  url: string
  thumbnailUrl: string
  isPrimary: boolean
  order: number
}

export interface Listing {
  id: string
  referenceNumber: string
  slug: string
  title: string
  description: string

  makeName: string
  modelName: string
  variantName?: string
  year: number
  registration?: string

  price: number // pence
  priceOno: boolean
  priceRating: PriceRating

  mileage: number
  fuelType: FuelType
  transmission: Transmission
  bodyType: BodyType
  doors: number
  seats: number
  engineSizeDisplay: string
  powerBhp?: number
  colourExterior: string

  serviceHistory: ServiceHistory
  previousOwners: number
  motExpiry?: string
  conditionGrade: ConditionGrade

  features: string[]
  ulezCompliant: boolean

  sellerType: SellerType
  dealer?: Dealer

  media: ListingMedia[]
  motHistory?: MotRecord[]

  postcode: string
  city: string
  county: string
  deliveryAvailable: boolean

  tier: ListingTier
  status: ListingStatus
  publishedAt: string
  expiresAt: string
}

export interface SearchFilters {
  make?: string
  model?: string
  yearMin?: number
  yearMax?: number
  priceMin?: number
  priceMax?: number
  mileageMax?: number
  fuelType?: FuelType[]
  transmission?: Transmission[]
  bodyType?: BodyType[]
  sellerType?: SellerType
  postcode?: string
  radius?: number
}
