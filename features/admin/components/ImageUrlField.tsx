'use client'

import { useRef, useState } from 'react'

interface Props {
  label: string
  name: string
  defaultValue?: string | null
  aspectRatio?: 'square' | 'wide'
  entityType: 'university' | 'country'
  entitySlug: string
  field: 'logo' | 'cover' | 'card' | 'hero'
}

export default function ImageUrlField({
  label,
  name,
  defaultValue,
  aspectRatio = 'wide',
  entityType,
  entitySlug,
  field,
}: Props) {
  const [url, setUrl] = useState(defaultValue ?? '')
  const [status, setStatus] = useState<'idle' | 'uploading' | 'importing'>('idle')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Upload a local file to Supabase Storage
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setStatus('uploading')
    setError('')

    const form = new FormData()
    form.append('file', file)
    form.append('entityType', entityType)
    form.append('slug', entitySlug)
    form.append('field', field)

    const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
    const data = await res.json()
    setStatus('idle')

    if (!res.ok) setError(data.error ?? 'Upload failed')
    else setUrl(data.url)

    e.target.value = ''
  }

  // Fetch an external URL, save image to Supabase, replace URL with Supabase URL
  async function handleImport() {
    if (!url || !url.startsWith('http')) {
      setError('Paste a valid image URL first')
      return
    }
    // Skip if URL is already from our own Supabase bucket
    if (url.includes('supabase.co/storage')) {
      setError('Already saved to Supabase')
      return
    }
    setStatus('importing')
    setError('')

    const res = await fetch('/api/admin/import-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, entityType, slug: entitySlug, field }),
    })
    const data = await res.json()
    setStatus('idle')

    if (!res.ok) setError(data.error ?? 'Import failed')
    else setUrl(data.url)
  }

  const busy = status !== 'idle'

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* URL input */}
      <input
        type="url"
        name={name}
        value={url}
        onChange={e => { setUrl(e.target.value); setError('') }}
        placeholder="Paste URL or use buttons →"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
      />

      {/* Action buttons */}
      <div className="flex gap-2">
        {/* Import from URL → saves to Supabase */}
        <button
          type="button"
          onClick={handleImport}
          disabled={busy || !url}
          title="Fetch this URL and save image to Supabase Storage"
          className="flex-1 rounded-md border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-100 disabled:opacity-50"
        >
          {status === 'importing' ? 'Importing…' : '↓ Import URL → Supabase'}
        </button>

        {/* Upload local file */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={busy}
          title="Upload a file from your computer to Supabase Storage"
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:text-gray-800 disabled:opacity-50"
        >
          {status === 'uploading' ? 'Uploading…' : '↑ Upload file'}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      {/* Supabase badge */}
      {url && url.includes('supabase.co/storage') && (
        <p className="text-xs font-medium text-green-600">✓ Saved to Supabase</p>
      )}

      {/* Preview */}
      <div className={`overflow-hidden rounded-md border border-gray-200 bg-gray-50 ${aspectRatio === 'square' ? 'h-32 w-32' : 'h-40 w-full'}`}>
        {url ? (
          <img
            src={url}
            alt="Preview"
            className="h-full w-full object-cover"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">No image</div>
        )}
      </div>

      {url && (
        <p className="truncate text-xs text-gray-400" title={url}>{url}</p>
      )}
    </div>
  )
}
