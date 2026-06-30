import Stripe from 'stripe'
import { auth } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorised' }, { status: 401 })

  const key = process.env.STRIPE_SECRET_KEY
  if (!key || key === 'sk_test_REPLACE_ME') {
    return Response.json({ error: 'Stripe not configured' }, { status: 503 })
  }

  const stripe = new Stripe(key)
  const { email, name } = await req.json() as { email: string; name: string }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3001'

  const session = await stripe.identity.verificationSessions.create({
    type: 'document',
    metadata: { email, name, clerk_user_id: userId, source: 'kerb-dealer-registration' },
    options: {
      document: {
        allowed_types: ['driving_license', 'passport', 'id_card'],
        require_live_capture: true,
        require_matching_selfie: true,
      },
    },
    return_url: `${baseUrl}/dealers/register/verify/complete?session_id={VERIFICATION_SESSION_ID}`,
  })

  return Response.json({ url: session.url, sessionId: session.id })
}
