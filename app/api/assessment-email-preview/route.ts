// DEV-ONLY: renders the counsellor "new lead" notification EMAIL with sample data so we
// can review the layout in the browser without running a full submit. 404 in production.
// Add ?pdf=0 to preview the rare "report not attached" fallback state.

import { buildCounselorEmailHtml } from '@/features/career-assessment/services/brief'
import type { InterestEvidence } from '@/features/career-assessment/services/brief'
import type { AssessmentScores, ContactDetails, CounselorSynthesis, RecommendationTree } from '@/features/career-assessment/types'

export async function GET(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Not found', { status: 404 })
  }

  const pdfAttached = new URL(req.url).searchParams.get('pdf') !== '0'

  const contact: ContactDetails = {
    fullName: 'Sample Student',
    email: 'sample.student@example.com',
    phone: '+95 9 123 456 789',
    educationLevel: 'Undergraduate',
    preferredCountry: 'Germany',
  }

  const scores: AssessmentScores = {
    riasec: {
      scores: { R: 38, I: 44, A: 30, S: 28, E: 41, C: 35 },
      ranked: ['I', 'E', 'R', 'C', 'A', 'S'],
      hollandCode: 'IER',
    },
    bigFive: {
      raw: { O: 40, C: 38, E: 42, A: 30, N: 33 },
      percent: { O: 75, C: 70, E: 80, A: 50, N: 58 },
      percentile: { O: 78, C: 64, E: 82, A: 28, N: 72 }, // A<30 + N>70 → both warning flags show
    },
    aptitude: {
      areas: [
        { area: 'numerical', label: 'Numerical reasoning', correct: 8, total: 10, percent: 80, band: 'Strong' },
        { area: 'verbal', label: 'Verbal reasoning', correct: 6, total: 10, percent: 60, band: 'Proficient' },
        { area: 'logical', label: 'Logical reasoning', correct: 7, total: 10, percent: 70, band: 'Proficient' },
        { area: 'spatial', label: 'Spatial reasoning', correct: 4, total: 10, percent: 40, band: 'Developing' },
      ],
      overallCorrect: 25,
      overallTotal: 40,
      overallPercent: 63,
      overallBand: 'Proficient',
      strengthAreas: ['numerical'],
      directions: [],
    },
  }

  // The notification email does not render these, but BuildEmailArgs requires them.
  const evidence: InterestEvidence = { topLiked: [], disliked: [] }
  const synthesis: CounselorSynthesis | null = null
  const tree: RecommendationTree = { fields: [], buckets: [] }

  const html = buildCounselorEmailHtml({ contact, scores, evidence, synthesis, tree }, { pdfAttached })

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
