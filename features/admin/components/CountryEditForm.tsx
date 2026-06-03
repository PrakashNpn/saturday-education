'use client'

import { useState } from 'react'
import ImageUrlField from './ImageUrlField'

interface Country {
  slug: string
  name: string
  tagline: string | null
  shortDescription: string | null
  overview: string | null
  cardImageUrl: string | null
  heroImageUrl: string | null
  institutionCount: string | null
  tuitionFeeRange: string | null
  postStudyWorkVisa: string | null
  visaProcessingTime: string | null
  workRights: string | null
  isFeatured: boolean | null
}

export default function CountryEditForm({ country }: { country: Country }) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setError('')

    const form = new FormData(e.currentTarget)
    const body: Record<string, string | boolean | null> = {}
    for (const [key, val] of form.entries()) {
      if (key === 'isFeatured') { body[key] = val === 'true'; continue }
      body[key] = (val as string).trim() || null
    }

    const res = await fetch(`/api/admin/countries/${country.slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setSaving(false)
    if (res.ok) setSaved(true)
    else setError('Save failed — check the console')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Images */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <ImageUrlField label="Card Image" name="cardImageUrl" defaultValue={country.cardImageUrl} aspectRatio="wide" entityType="country" entitySlug={country.slug} field="card" />
        <ImageUrlField label="Hero Image" name="heroImageUrl" defaultValue={country.heroImageUrl} aspectRatio="wide" entityType="country" entitySlug={country.slug} field="hero" />
      </div>

      {/* Text fields */}
      <Field label="Tagline" name="tagline" defaultValue={country.tagline} />
      <TextareaField label="Short Description" name="shortDescription" defaultValue={country.shortDescription} rows={3} />
      <TextareaField label="Overview" name="overview" defaultValue={country.overview} rows={8} />
      <Field label="Institution Count" name="institutionCount" defaultValue={country.institutionCount} placeholder="e.g. 100+" />
      <Field label="Tuition Fee Range" name="tuitionFeeRange" defaultValue={country.tuitionFeeRange} />
      <Field label="Post-Study Work Visa" name="postStudyWorkVisa" defaultValue={country.postStudyWorkVisa} />
      <Field label="Visa Processing Time" name="visaProcessingTime" defaultValue={country.visaProcessingTime} />
      <TextareaField label="Work Rights" name="workRights" defaultValue={country.workRights} rows={2} />

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Featured</label>
        <select name="isFeatured" defaultValue={country.isFeatured ? 'true' : 'false'} className="rounded-md border border-gray-300 px-2 py-1 text-sm">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-purple-700 px-5 py-2 text-sm font-medium text-white hover:bg-purple-800 disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        {saved && <span className="text-sm text-green-600">Saved ✓</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    </form>
  )
}

function Field({ label, name, defaultValue, placeholder }: { label: string; name: string; defaultValue?: string | null; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue ?? ''}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
    </div>
  )
}

function TextareaField({ label, name, defaultValue, rows = 3 }: { label: string; name: string; defaultValue?: string | null; rows?: number }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ''}
        rows={rows}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
    </div>
  )
}
