import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/shared/lib/admin-auth'
import { supabaseAdmin, STORAGE_BUCKET, getPublicUrl } from '@/shared/lib/supabase'

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('saturday-admin')?.value
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { url, entityType, slug, field } = await req.json()

  if (!url || !entityType || !slug || !field) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Fetch the image from the source URL
  let response: Response
  try {
    response = await fetch(url, {
      headers: {
        // Mimic a real browser to avoid hotlink blocks
        'User-Agent': 'Mozilla/5.0 (compatible; Saturday Education Admin/1.0)',
        'Accept': 'image/*,*/*;q=0.8',
        'Referer': url,
      },
      signal: AbortSignal.timeout(15000), // 15s timeout
    })
  } catch (err) {
    return NextResponse.json({ error: `Failed to fetch image: ${(err as Error).message}` }, { status: 400 })
  }

  if (!response.ok) {
    return NextResponse.json({ error: `Source returned ${response.status}` }, { status: 400 })
  }

  const contentType = response.headers.get('content-type')?.split(';')[0].trim() ?? 'image/jpeg'

  // Try to get extension from content-type, fall back to URL path
  let ext = MIME_TO_EXT[contentType]
  if (!ext) {
    const urlPath = new URL(url).pathname
    const urlExt = urlPath.split('.').pop()?.toLowerCase()
    ext = urlExt && MIME_TO_EXT[`image/${urlExt}`] ? urlExt : 'jpg'
  }

  const folder = entityType === 'university' ? 'universities' : 'countries'
  const path = `${folder}/${slug}/${field}.${ext}`

  const arrayBuffer = await response.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const { error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .upload(path, buffer, {
      contentType,
      upsert: true,
    })

  if (error) {
    console.error('Supabase upload error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const publicUrl = getPublicUrl(path)
  return NextResponse.json({ url: publicUrl })
}
