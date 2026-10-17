import { NextRequest, NextResponse } from 'next/server'
import { submitLeadForm } from '@/features/ai-advisor/services/leadCapture'
import { saveConsultationLead } from '@/features/consultation'

export async function POST(req: NextRequest) {
  const body: unknown = await req.json().catch(() => null)
  const clientKey = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  // notify: false: chat leads go to the database and Firmli only, so they don't
  // spend notification email quota. channel: 'chat' sends them to Firmli's own
  // "AI Chatbot" form and UTM source, so they can be told apart from the
  // consultation form's leads.
  const result = await submitLeadForm(
    body,
    (lead) => saveConsultationLead(lead, { notify: false, channel: 'chat' }),
    clientKey,
  )

  const status = result.success ? 200 : result.code === 'rate' ? 429 : result.code === 'failed' ? 502 : 400
  return NextResponse.json(result, { status })
}
