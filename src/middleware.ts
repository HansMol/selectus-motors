import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Lightweight edge-compatible route guard.
// Clerk's clerkMiddleware crashes on Cloudflare Workers at module init time.
// Real JWT verification happens in the dashboard page via auth().
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/dashboard')) {
    const hasSession =
      req.cookies.has('__session') || req.cookies.has('__client_uat')

    if (!hasSession) {
      const signIn = new URL('/sign-in', req.url)
      signIn.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signIn)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}
