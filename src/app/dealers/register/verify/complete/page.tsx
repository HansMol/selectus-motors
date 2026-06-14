'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Clock, ShieldCheck, Phone } from 'lucide-react'
import Link from 'next/link'

function VerifyCompleteContent() {
  const params    = useSearchParams()
  const sessionId = params.get('session_id')

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0A0A0F] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">

        <div className="w-16 h-16 rounded-full bg-[#C4C6CC]/10 border border-[#C4C6CC]/25 flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={28} className="text-[#C4C6CC]" />
        </div>

        <h1 className="text-[28px] font-light text-white tracking-tight mb-3">
          Identity submitted.
        </h1>
        <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-10">
          We&apos;ve received your identity documents. Verification typically completes within a few minutes — we&apos;ll email you as soon as your dealership is approved.
        </p>

        <div className="bg-[#111113] border border-[#1C1C1E] rounded-xl p-6 text-left space-y-5 mb-8">
          {[
            {
              icon: Clock,
              title: 'Verification in progress',
              body: 'Our identity checks run automatically. Most dealers are approved within minutes.',
            },
            {
              icon: ShieldCheck,
              title: 'You\'ll get an email',
              body: 'Once approved, you\'ll receive a link to access your dealer dashboard and add your inventory.',
            },
            {
              icon: Phone,
              title: 'Need help?',
              body: 'If your verification fails or you have questions, email hans@selectusmotors.com or call us directly.',
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#C4C6CC]/10 border border-[#C4C6CC]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <item.icon size={14} className="text-[#C4C6CC]" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white mb-0.5">{item.title}</p>
                <p className="text-[12px] text-[#6E6E73] leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {sessionId && (
          <p className="text-[11px] text-[#2A2A2E] font-mono mb-6">ref: {sessionId}</p>
        )}

        <Link
          href="/"
          className="text-[13px] text-[#6E6E73] hover:text-white transition-colors"
        >
          Return to Selectus Motors
        </Link>

      </div>
    </div>
  )
}

export default function VerifyCompletePage() {
  return (
    <Suspense>
      <VerifyCompleteContent />
    </Suspense>
  )
}
