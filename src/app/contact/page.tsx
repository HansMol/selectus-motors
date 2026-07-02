import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Kerb',
  description: 'Get in touch with the Kerb team — whether you\'re a dealer, a buyer, or press.',
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <div className="mb-10">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#A0714A] mb-3">Get in touch</p>
        <h1 className="text-4xl font-light text-[#0A0A0F] tracking-tight leading-snug mb-4">Contact</h1>
        <p className="text-[#6E6E73] text-lg leading-relaxed">
          Whether you&apos;re a dealer with a question, a buyer needing help, or press looking for a comment — drop us a message.
        </p>
      </div>

      <div className="border-t border-[#E5E5E7] mb-10" />

      <ContactForm />

      <div className="border-t border-[#E5E5E7] mt-10 pt-8">
        <p className="text-sm text-[#6E6E73]">
          Prefer email?{' '}
          <a href="mailto:hello@kerb.autos" className="text-[#A0714A] hover:text-[#8A6040] transition-colors">
            hello@kerb.autos
          </a>
        </p>
      </div>

    </div>
  )
}
