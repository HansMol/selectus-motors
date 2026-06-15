'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useAuth, SignInButton, UserButton } from '@clerk/nextjs'

export function Nav() {
  const [open, setOpen]   = useState(false)
  const { isSignedIn }    = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-[rgba(10,10,15,0.88)] backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="text-[13px] font-semibold tracking-[0.18em] uppercase text-white no-underline">
            SELECTUS MOTORS
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/search" className="text-sm font-medium text-[#6E6E73] hover:text-white transition-colors">
              Search Cars
            </Link>
            <Link href="/search?sellerType=dealer" className="text-sm font-medium text-[#6E6E73] hover:text-white transition-colors">
              Dealers
            </Link>
            <Link href="/sell" className="text-sm font-medium text-[#6E6E73] hover:text-white transition-colors">
              Sell Your Car
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-[13px] font-medium text-[#6E6E73] hover:text-white transition-colors"
                >
                  My dashboard
                </Link>
                <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
              </>
            ) : (
              <>
                <SignInButton mode="redirect">
                  <button className="text-sm font-medium text-[#6E6E73] hover:text-white transition-colors">
                    Sign in
                  </button>
                </SignInButton>
                <Link
                  href="/dealers/register"
                  className="text-[13px] font-semibold text-[#C4C6CC] border border-[#1C1C1E] hover:border-[#C4C6CC] hover:text-white px-5 py-2 rounded-md transition-colors"
                >
                  List a car
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-[#6E6E73] hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[rgba(255,255,255,0.05)] bg-[#0A0A0F] px-4 py-4 space-y-3">
          <Link href="/search" className="block text-sm font-medium text-[#6E6E73] hover:text-white py-2 transition-colors">Search Cars</Link>
          <Link href="/search?sellerType=dealer" className="block text-sm font-medium text-[#6E6E73] hover:text-white py-2 transition-colors">Dealers</Link>
          <Link href="/sell" className="block text-sm font-medium text-[#6E6E73] hover:text-white py-2 transition-colors">Sell Your Car</Link>
          <div className="pt-2 border-t border-[#1C1C1E] flex gap-3">
            {isSignedIn ? (
              <>
                <Link href="/dashboard" className="flex-1 text-center text-sm font-medium border border-[#1C1C1E] rounded-md py-2 text-[#6E6E73] hover:text-white hover:border-[#C4C6CC] transition-colors">My dashboard</Link>
                <UserButton />
              </>
            ) : (
              <>
                <SignInButton mode="redirect">
                  <button className="flex-1 text-center text-sm font-medium border border-[#1C1C1E] rounded-md py-2 text-[#6E6E73] hover:text-white hover:border-[#C4C6CC] transition-colors">
                    Sign in
                  </button>
                </SignInButton>
                <Link href="/dealers/register" className="flex-1 text-center text-[13px] font-semibold text-[#C4C6CC] border border-[#C4C6CC] rounded-md py-2 hover:text-white hover:border-white transition-colors">List a car</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
