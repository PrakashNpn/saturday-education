import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/shared/lib/admin-auth'
import { supabaseAdmin, STORAGE_BUCKET, getPublicUrl } from '@/shared/lib/supabase'

export async function POST(req: NextRequest) {
  const token = req.cookies.get('saturday-admin')?.value
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const entityType = formData.get('entityType') as string // 'university' | 'country'
  const slug = formData.get('slug') as string
  const field = formData.get('field') as string // 'logo' | 'cover' | 'card' | 'hero'

  if (!file || !entityType || !slug || !field) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const folder = entityType === 'university' ? 'universities' : 'countries'
  const path = `${folder}/${slug}/${field}.${ext}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const { error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true, // overwrite if exists
    })

  if (error) {
    console.error('Supabase upload error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const publicUrl = getPublicUrl(path)
  return NextResponse.json({ url: publicUrl })
}
