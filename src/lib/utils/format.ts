export function formatPrice(pence: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(pence / 100)
}

export function formatPricePounds(pounds: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(pounds)
}

export function formatMileage(miles: number): string {
  return new Intl.NumberFormat('en-GB').format(miles) + ' miles'
}

export function formatYear(year: number): string {
  return year.toString()
}

export const fuelTypeLabels: Record<string, string> = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  hybrid: 'Hybrid',
  mild_hybrid: 'Mild Hybrid',
  plug_in_hybrid: 'Plug-in Hybrid',
  electric: 'Electric',
  lpg: 'LPG',
}

export const transmissionLabels: Record<string, string> = {
  manual: 'Manual',
  automatic: 'Automatic',
  semi_automatic: 'Semi-Auto',
  cvt: 'CVT',
}

export const bodyTypeLabels: Record<string, string> = {
  hatchback: 'Hatchback',
  saloon: 'Saloon',
  estate: 'Estate',
  suv: 'SUV / 4x4',
  coupe: 'Coupe',
  convertible: 'Convertible',
  mpv: 'MPV',
  pickup: 'Pickup',
  van: 'Van',
}

export const priceRatingLabels: Record<string, { label: string; colour: string }> = {
  great_deal: { label: 'Great Deal', colour: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  good_deal: { label: 'Good Deal', colour: 'text-green-700 bg-green-50 border-green-200' },
  fair: { label: 'Fair Price', colour: 'text-slate-600 bg-slate-50 border-slate-200' },
  high: { label: 'High', colour: 'text-amber-700 bg-amber-50 border-amber-200' },
  very_high: { label: 'Very High', colour: 'text-red-700 bg-red-50 border-red-200' },
}
