'use client'

import { useRef, useState } from 'react'

interface Props {
  label: string
  name: string
  defaultValue?: string | null
  aspectRatio?: 'square' | 'wide'
  // Upload context — required for Supabase Storage path
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
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError('')

    const form = new FormData()
    form.append('file', file)
    form.append('entityType', entityType)
    form.append('slug', entitySlug)
    form.append('field', field)

    const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
    const data = await res.json()

    setUploading(false)

    if (!res.ok) {
      setUploadError(data.error ?? 'Upload failed')
    } else {
      setUrl(data.url)
    }

    // Reset input so same file can be re-uploaded
    e.target.value = ''
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* URL input row */}
      <div className="flex gap-2">
        <input
          type="url"
          name={name}
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Paste URL or upload a file →"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="shrink-0 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:border-purple-400 hover:text-purple-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading…' : '↑ Upload'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {uploadError && (
        <p className="text-xs text-red-600">{uploadError}</p>
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
        <p className="truncate text-xs text-gray-400">{url}</p>
      )}
    </div>
  )
}
