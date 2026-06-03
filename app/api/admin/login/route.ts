import { NextRequest, NextResponse } from 'next/server'
import { createAdminToken } from '@/shared/lib/admin-auth'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const password = formData.get('password')?.toString() ?? ''

  const token = createAdminToken(password)
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login?error=1', req.url))
  }

  const res = NextResponse.redirect(new URL('/admin/countries', req.url))
  res.cookies.set('saturday-admin', token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
  return res
}
