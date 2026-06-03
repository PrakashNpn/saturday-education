import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/shared/lib/admin-auth'
import { updateCountry } from '@/features/admin/services/admin-service'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const token = req.cookies.get('saturday-admin')?.value
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params
  const body = await req.json()

  const country = await updateCountry(slug, body)
  return NextResponse.json(country)
}
