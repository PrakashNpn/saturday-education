import { NextRequest, NextResponse } from 'next/server'
import { buildAndStoreShareCard, type ShareCardInput } from '@/features/career-assessment/services/shareCard'

/** Thin by design — the actual rendering lives in the feature service. This
 *  just validates the shape of what the dashboard already rendered from its
 *  own DashboardData and hands it off. */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { leadId, fullName, archetype, interests, personality, aptitude, aptitudeOverall } = body

  if (
    typeof leadId !== 'string' ||
    !leadId ||
    typeof fullName !== 'string' ||
    typeof archetype !== 'string' ||
    !Array.isArray(interests) ||
    !Array.isArray(personality) ||
    !Array.isArray(aptitude) ||
    typeof aptitudeOverall !== 'object' ||
    aptitudeOverall === null
  ) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
  }

  try {
    const result = await buildAndStoreShareCard(leadId, {
      fullName,
      archetype,
      interests,
      personality,
      aptitude,
      aptitudeOverall,
    } as ShareCardInput)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Share card generation failed:', error)
    return NextResponse.json({ error: 'Failed to generate share card' }, { status: 500 })
  }
}
