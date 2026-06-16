import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { EditForm } from './edit-form'

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const { id } = await params
  const supabase = createServerClient()

  const { data: dealer } = await supabase
    .from('dealers')
    .select('id')
    .eq('clerk_user_id', userId)
    .single()

  if (!dealer) redirect('/dealers/register')

  const { data: listing } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .eq('dealer_id', dealer.id)
    .single()

  if (!listing) notFound()

  return <EditForm listing={listing} />
}
