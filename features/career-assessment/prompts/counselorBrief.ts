// Builds the prompt that asks Claude for a counselor-facing synthesis of a
// student's assessment. Output is strict JSON so it can be parsed and stored.

import { RIASEC_INFO } from '../data/riasecFieldMap'
import type { AssessmentScores, RecommendationTree } from '../types'

const TRAIT_LABELS: Record<string, string> = {
  O: 'Openness',
  C: 'Conscientiousness',
  E: 'Extraversion',
  A: 'Agreeableness',
  N: 'Neuroticism (emotional sensitivity)',
}

function band(pct: number): string {
  if (pct > 70) return 'High'
  if (pct >= 30) return 'Average'
  return 'Low'
}

export function buildCounselorPrompt(
  scores: AssessmentScores,
  tree: RecommendationTree,
  preferredCountry?: string,
): string {
  const { riasec, bigFive } = scores

  const interestLines = riasec.ranked
    .map((c) => `- ${RIASEC_INFO[c].label}: ${riasec.scores[c]}/50`)
    .join('\n')

  const personalityLines = (Object.keys(TRAIT_LABELS) as Array<keyof typeof TRAIT_LABELS>)
    .map((t) => {
      const p = bigFive.percentile[t as keyof typeof bigFive.percentile]
      return `- ${TRAIT_LABELS[t]}: ${p}th percentile (${band(p)})`
    })
    .join('\n')

  const pathLines = tree.buckets.length
    ? tree.buckets
        .map((b) => {
          const cs = b.countries
            .map((c) => `${c.country}${c.strongFit ? ' (strong)' : ''}`)
            .join(', ')
          return `- ${b.bucket}: ${cs || '—'}`
        })
        .join('\n')
    : '(no matching programs currently in our database)'

  return `You are an expert career counselor at a study-abroad consultancy helping Asian students (mostly recent high-school graduates) choose a degree and career direction. A student has completed a RIASEC interest inventory and a Big Five personality assessment. Write a concise, practical briefing for the human counselor who will guide this student.

INTEREST PROFILE (RIASEC, each out of 50, higher = stronger interest):
${interestLines}
Holland code (top 3): ${riasec.hollandCode}

PERSONALITY PROFILE (Big Five, percentile vs the general adult population):
${personalityLines}

FIELDS & DESTINATIONS WE CAN ACTUALLY OFFER (field → countries we have partner universities in; "strong" = country is known for that field):
${pathLines}
${preferredCountry ? `\nThe student's preferred study destination is ${preferredCountry}. If it appears above, acknowledge it; if not, gently suggest the closest available alternatives.\n` : ''}
Write for the counselor, not the student. Tie interests and personality together (e.g. how their conscientiousness or extraversion shapes which version of a field would suit them). When you mention degree fields, countries, or study destinations, use ONLY the fields and countries from the list above — do not invent options we cannot offer.

Return ONLY valid JSON, no markdown, in exactly this shape:
{
  "read": "2-4 sentence counselor read connecting interests + personality into a clear direction.",
  "careerDirections": [
    { "title": "Career or role", "why": "One sentence on why it fits this profile." }
  ],
  "suggestedFields": ["Field 1", "Field 2", "Field 3"]
}
Provide 3 to 5 careerDirections. suggestedFields must be drawn from the fields we can offer above.`
}
