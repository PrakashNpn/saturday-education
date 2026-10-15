'use client'

import { useState } from 'react'
import ImageUrlField from './ImageUrlField'

interface University {
  slug: string
  name: string
  city: string | null
  logoUrl: string | null
  coverImageUrl: string | null
  shortDescription: string | null
  ranking: number | null
  tuitionFeeMin: number | null
  tuitionFeeMax: number | null
  tuitionCurrency: string | null
  foundedYear: number | null
  totalStudents: number | null
  country: { name: string; slug: string }
}

export default function UniversityEditForm({ university }: { university: University }) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setError('')

    const form = new FormData(e.currentTarget)
    const body: Record<string, string | number | null> = {}

    for (const [key, val] of form.entries()) {
      const s = (val as string).trim()
      if (key === 'ranking') { body[key] = s ? parseInt(s, 10) : null; continue }
      body[key] = s || null
    }

    const res = await fetch(`/api/admin/universities/${university.slug}`, {
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
      {/* Read-only info */}
      <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-500">
        <div><span className="font-medium text-gray-700">Country:</span> {university.country.name}</div>
        <div><span className="font-medium text-gray-700">City:</span> {university.city}</div>
        <div><span className="font-medium text-gray-700">Founded:</span> {university.foundedYear}</div>
        <div><span className="font-medium text-gray-700">Students:</span> {university.totalStudents?.toLocaleString()}</div>
        <div><span className="font-medium text-gray-700">Tuition:</span> {university.tuitionCurrency} {university.tuitionFeeMin?.toLocaleString()} – {university.tuitionFeeMax?.toLocaleString()}/yr</div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <ImageUrlField label="Logo" name="logoUrl" defaultValue={university.logoUrl} aspectRatio="square" entityType="university" entitySlug={university.slug} field="logo" />
        <ImageUrlField label="Cover Image" name="coverImageUrl" defaultValue={university.coverImageUrl} aspectRatio="wide" entityType="university" entitySlug={university.slug} field="cover" />
      </div>

      {/* Editable fields */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">QS Ranking</label>
        <input
          type="number"
          name="ranking"
          defaultValue={university.ranking ?? ''}
          placeholder="e.g. 250"
          className="w-32 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-action focus:outline-none focus:ring-1 focus:ring-action"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Short Description</label>
        <textarea
          name="shortDescription"
          defaultValue={university.shortDescription ?? ''}
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-action focus:outline-none focus:ring-1 focus:ring-action"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-action px-5 py-2 text-sm font-medium text-white hover:bg-action-hover disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        {saved && <span className="text-sm text-green-600">Saved ✓</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    </form>
  )
}
