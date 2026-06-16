'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

interface Props {
  dealer_id: string
  listing_id: string
  listing_title: string
}

export default function EnquiryForm({ dealer_id, listing_id, listing_title }: Props) {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [phone, setPhone]     = useState('')
  const [message, setMessage] = useState(`Hi, I'm interested in the ${listing_title}. Is it still available?`)
  const [status, setStatus]   = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending' || status === 'sent') return
    setStatus('sending')

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dealer_id, listing_id, listing_title, name, email, phone, message }),
      })

      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full border border-[#E5E5E7] rounded-md px-3 py-2.5 text-sm text-[#0A0A0F] placeholder:text-[#A8AAB0] focus:outline-none focus:border-[#C4C6CC] transition-colors'

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
        <CheckCircle size={36} className="text-[#0A0A0F]" />
        <p className="font-semibold text-[#0A0A0F]">Enquiry sent</p>
        <p className="text-sm text-[#6E6E73]">The dealer will be in touch shortly. Check your inbox for a copy.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Your name"
        required
        value={name}
        onChange={e => setName(e.target.value)}
        className={inputClass}
      />
      <input
        type="email"
        placeholder="Email address"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        className={inputClass}
      />
      <input
        type="tel"
        placeholder="Phone number (optional)"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className={inputClass}
      />
      <textarea
        rows={4}
        required
        value={message}
        onChange={e => setMessage(e.target.value)}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#0A0A0F] text-white font-semibold py-3 rounded-md hover:bg-[#1C1C1E] transition-colors text-sm disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-600 text-center">Something went wrong — please try again.</p>
      )}
    </form>
  )
}
