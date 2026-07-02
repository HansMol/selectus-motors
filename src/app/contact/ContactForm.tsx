'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', role: 'Buyer', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[#F8F8FA] border border-[#E5E5E7] rounded-md p-8 text-center">
        <p className="text-[#0A0A0F] font-medium mb-2">Message sent</p>
        <p className="text-[#6E6E73] text-sm">We&apos;ll get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[#0A0A0F] mb-1.5">I am a</label>
        <select
          value={form.role}
          onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
          className="w-full border border-[#E5E5E7] rounded px-3 py-2.5 text-sm text-[#0A0A0F] bg-white focus:outline-none focus:border-[#A0714A]"
        >
          <option>Buyer</option>
          <option>Dealer</option>
          <option>Press</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0A0A0F] mb-1.5">Name</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full border border-[#E5E5E7] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#A0714A]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0A0A0F] mb-1.5">Email</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full border border-[#E5E5E7] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#A0714A]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0A0A0F] mb-1.5">Message</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className="w-full border border-[#E5E5E7] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#A0714A] resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-sm">Something went wrong. Please try again or email us directly.</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-[#A0714A] hover:bg-[#8A6040] disabled:opacity-50 text-white px-6 py-2.5 rounded text-sm font-medium transition-colors"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
