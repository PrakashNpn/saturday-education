import { createHmac } from 'crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

function computeToken(password: string): string {
  const secret = process.env.ADMIN_SECRET ?? 'fallback-secret'
  return createHmac('sha256', secret).update(password).digest('hex')
}

export function createAdminToken(password: string): string | null {
  if (password !== process.env.ADMIN_PASSWORD) return null
  return computeToken(password)
}

export function verifyAdminToken(token: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  return token === computeToken(adminPassword)
}

export async function requireAdmin(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get('saturday-admin')?.value
  if (!token || !verifyAdminToken(token)) {
    redirect('/admin/login')
  }
}
