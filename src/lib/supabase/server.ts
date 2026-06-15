import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Server-side only — uses service role key to bypass Row Level Security.
// Only call this from API routes after verifying Clerk auth.
export function createServerClient() {
  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  })
}
