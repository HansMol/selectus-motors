type DealerRow = {
  id: string
  clerk_user_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  business_name: string
  company_number: string | null
  company_status: string | null
  city: string
  postcode: string
  website: string | null
  makes: string[]
  inventory_size: string
  price_range: string
  verified_via: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

type DealerInsert = Omit<DealerRow, 'id' | 'created_at'>
type DealerUpdate = Partial<DealerInsert>

type ListingRow = {
  id: string
  dealer_id: string
  make: string
  model: string
  year: number
  mileage: number
  colour: string
  body_type: string
  doors: string
  fuel_type: string
  transmission: string
  engine_size: string | null
  price: number
  status: 'draft' | 'live' | 'sold' | 'archived'
  description: string
  created_at: string
  updated_at: string
}

type ListingInsert = Omit<ListingRow, 'id' | 'created_at' | 'updated_at'>
type ListingUpdate = Partial<ListingInsert>

export type Database = {
  public: {
    Tables: {
      dealers: {
        Row: DealerRow
        Insert: DealerInsert
        Update: DealerUpdate
        Relationships: []
      }
      listings: {
        Row: ListingRow
        Insert: ListingInsert
        Update: ListingUpdate
        Relationships: [
          {
            foreignKeyName: 'listings_dealer_id_fkey'
            columns: ['dealer_id']
            isOneToOne: false
            referencedRelation: 'dealers'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
