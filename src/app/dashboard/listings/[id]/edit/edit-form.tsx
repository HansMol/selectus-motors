'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Trash2 } from 'lucide-react'
import type { ListingRow } from '@/lib/supabase/types'

const MAKES = [
  'Audi', 'BMW', 'Citroën', 'Ferrari', 'Ford', 'Honda', 'Hyundai',
  'Jaguar', 'Kia', 'Lamborghini', 'Land Rover', 'Lexus', 'Mazda',
  'Mercedes-Benz', 'Mini', 'Nissan', 'Peugeot', 'Porsche', 'Range Rover',
  'Renault', 'SEAT', 'Skoda', 'Tesla', 'Toyota', 'Vauxhall', 'Volkswagen',
  'Volvo', 'Other',
]
const BODY_TYPES = ['Hatchback', 'Saloon', 'Estate', 'SUV', 'Coupe', 'Convertible', 'MPV', 'Van', 'Pickup']
const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Plug-in Hybrid', 'Electric', 'LPG']
const TRANSMISSIONS = ['Manual', 'Automatic', 'Semi-Automatic']
const STATUSES = [
  { value: 'live', label: 'Live — visible to buyers' },
  { value: 'draft', label: 'Draft — hidden' },
  { value: 'sold', label: 'Sold' },
  { value: 'archived', label: 'Archived' },
]

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-[#0A0A0F] mb-1.5">{label}</label>
      {children}
    </div>
  )
}

const inputCls = 'w-full border border-[#E5E5E7] rounded-md px-3 py-2.5 text-sm text-[#0A0A0F] focus:outline-none focus:border-[#C4C6CC] transition-colors bg-white'
const selectCls = inputCls

export function EditForm({ listing }: { listing: ListingRow }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    make: listing.make,
    model: listing.model,
    year: listing.year.toString(),
    colour: listing.colour,
    body_type: listing.body_type,
    doors: listing.doors,
    fuel_type: listing.fuel_type,
    transmission: listing.transmission,
    engine_size: listing.engine_size ?? '',
    mileage: listing.mileage.toString(),
    price: listing.price.toString(),
    status: listing.status,
    description: listing.description,
  })

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/listings/${listing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          year: parseInt(form.year),
          mileage: parseInt(form.mileage),
          price: parseFloat(form.price),
          engine_size: form.engine_size || null,
        }),
      })
      if (!res.ok) throw new Error('Save failed')
      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this listing? This cannot be undone.')) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/listings/${listing.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('Delete failed. Please try again.')
      setDeleting(false)
    }
  }

  return (
    <div className="bg-[#F8F8FA] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 rounded-md hover:bg-white border border-transparent hover:border-[#E5E5E7] transition-colors">
            <ArrowLeft size={18} className="text-[#6E6E73]" />
          </Link>
          <div>
            <h1 className="text-[20px] font-semibold text-[#0A0A0F]">Edit listing</h1>
            <p className="text-[13px] text-[#6E6E73]">{listing.year} {listing.make} {listing.model}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">

          {/* Status */}
          <div className="bg-white border border-[#E5E5E7] rounded-xl p-6">
            <h2 className="text-[14px] font-semibold text-[#0A0A0F] mb-4">Status</h2>
            <Field label="Listing status">
              <select className={selectCls} value={form.status} onChange={e => set('status', e.target.value)}>
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </Field>
          </div>

          {/* Vehicle details */}
          <div className="bg-white border border-[#E5E5E7] rounded-xl p-6 space-y-4">
            <h2 className="text-[14px] font-semibold text-[#0A0A0F] mb-4">Vehicle details</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Make">
                <select className={selectCls} value={form.make} onChange={e => set('make', e.target.value)}>
                  {MAKES.map(m => <option key={m}>{m}</option>)}
                </select>
              </Field>
              <Field label="Model">
                <input className={inputCls} value={form.model} onChange={e => set('model', e.target.value)} required />
              </Field>
              <Field label="Year">
                <input className={inputCls} type="number" min="1990" max="2025" value={form.year} onChange={e => set('year', e.target.value)} required />
              </Field>
              <Field label="Colour">
                <input className={inputCls} value={form.colour} onChange={e => set('colour', e.target.value)} required />
              </Field>
              <Field label="Body type">
                <select className={selectCls} value={form.body_type} onChange={e => set('body_type', e.target.value)}>
                  {BODY_TYPES.map(b => <option key={b}>{b}</option>)}
                </select>
              </Field>
              <Field label="Doors">
                <select className={selectCls} value={form.doors} onChange={e => set('doors', e.target.value)}>
                  {['2', '3', '4', '5'].map(d => <option key={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Fuel type">
                <select className={selectCls} value={form.fuel_type} onChange={e => set('fuel_type', e.target.value)}>
                  {FUEL_TYPES.map(f => <option key={f}>{f}</option>)}
                </select>
              </Field>
              <Field label="Transmission">
                <select className={selectCls} value={form.transmission} onChange={e => set('transmission', e.target.value)}>
                  {TRANSMISSIONS.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Engine size (optional)">
                <input className={inputCls} placeholder="e.g. 2.0L" value={form.engine_size} onChange={e => set('engine_size', e.target.value)} />
              </Field>
            </div>
          </div>

          {/* Pricing & mileage */}
          <div className="bg-white border border-[#E5E5E7] rounded-xl p-6 space-y-4">
            <h2 className="text-[14px] font-semibold text-[#0A0A0F] mb-4">Pricing &amp; mileage</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Price (£)">
                <input className={inputCls} type="number" min="0" value={form.price} onChange={e => set('price', e.target.value)} required />
              </Field>
              <Field label="Mileage">
                <input className={inputCls} type="number" min="0" value={form.mileage} onChange={e => set('mileage', e.target.value)} required />
              </Field>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-[#E5E5E7] rounded-xl p-6">
            <h2 className="text-[14px] font-semibold text-[#0A0A0F] mb-4">Description</h2>
            <textarea
              className={`${inputCls} resize-none`}
              rows={8}
              value={form.description}
              onChange={e => set('description', e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-4 py-3">{error}</p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 text-[13px] font-medium text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 rounded-lg px-4 py-2.5 transition-colors disabled:opacity-50"
            >
              <Trash2 size={14} />
              {deleting ? 'Deleting…' : 'Delete listing'}
            </button>
            <div className="flex gap-3">
              <Link
                href="/dashboard"
                className="text-[13px] font-medium text-[#6E6E73] hover:text-[#0A0A0F] border border-[#E5E5E7] rounded-lg px-5 py-2.5 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="text-[13px] font-semibold bg-[#0A0A0F] hover:bg-[#1C1C1E] text-white rounded-lg px-6 py-2.5 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
