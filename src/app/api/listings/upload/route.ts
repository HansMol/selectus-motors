import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorised' }, { status: 401 })

  const { filename, contentType } = await req.json() as { filename: string; contentType: string }

  const ALLOWED_TYPES: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png':  'png',
    'image/webp': 'webp',
    'image/heic': 'heic',
  }
  if (!ALLOWED_TYPES[contentType]) {
    return Response.json({ error: 'File type not allowed' }, { status: 400 })
  }

  const ext = ALLOWED_TYPES[contentType]
  const path = `${userId}/${Date.now()}.${ext}`

  const supabase = createServerClient()
  const { data, error } = await supabase.storage
    .from('listing-photos')
    .createSignedUploadUrl(path)

  if (error) return Response.json({ error: error.message }, { status: 500 })

  const { data: publicData } = supabase.storage.from('listing-photos').getPublicUrl(path)

  return Response.json({
    signedUrl: data.signedUrl,
    path,
    publicUrl: publicData.publicUrl,
  })
}
