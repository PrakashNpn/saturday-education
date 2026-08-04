import { NextRequest, NextResponse } from 'next/server'
import { submitApplication } from '@/features/application'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const result = await submitApplication(formData)
  return NextResponse.json(result, { status: result.success ? 200 : 400 })
}
