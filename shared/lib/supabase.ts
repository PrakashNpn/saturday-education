import { createClient } from '@supabase/supabase-js'

// Server-side client — uses service role key, never exposed to browser
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export const STORAGE_BUCKET = 'media'

// Private bucket for applicant documents (transcripts, passports, etc.) —
// no public read policy; every access goes through the service-role client below.
export const APPLICATIONS_BUCKET = 'applications'

export function getPublicUrl(path: string): string {
  const { data } = supabaseAdmin.storage.from(STORAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function createSignedUrl(
  path: string,
  expiresIn: number,
  options?: { download?: string | boolean }
): Promise<string | null> {
  const { data, error } = await supabaseAdmin.storage
    .from(APPLICATIONS_BUCKET)
    .createSignedUrl(path, expiresIn, options)

  if (error) {
    console.error('Supabase signed URL error:', error)
    return null
  }

  return data.signedUrl
}
