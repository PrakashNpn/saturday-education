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
  const { riasec, bigFive, aptitude } = scores

  const interestLines = riasec.ranked
    .map((c) => `- ${RIASEC_INFO[c].label}: ${riasec.scores[c]}/50`)
    .join('\n')

  const aptitudeLines = aptitude.areas
    .map((a) => `- ${a.label}: ${a.percent}% (${a.band})`)
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
          return `- ${b.bucket}: ${cs || 'none'}`
        })
        .join('\n')
    : '(no matching programs currently in our database)'

  return `You are an expert career counselor at a study-abroad consultancy helping Asian students (mostly recent high-school graduates) choose a degree and career direction. A student has completed a RIASEC interest inventory and a Big Five personality assessment. Write a concise, practical briefing for the human counselor who will guide this student.

INTEREST PROFILE (RIASEC, each out of 50, higher = stronger interest):
${interestLines}
Holland code (top 3): ${riasec.hollandCode}

PERSONALITY PROFILE (Big Five, percentile vs the general adult population):
${personalityLines}

APTITUDE PROFILE (short, indicative ability check, % correct per area, treat as a rough signal only):
${aptitudeLines}

FIELDS & DESTINATIONS WE CAN ACTUALLY OFFER (field → countries we have partner universities in; "strong" = country is known for that field):
${pathLines}
${preferredCountry ? `\nThe student's preferred study destination is ${preferredCountry}. If it appears above, acknowledge it; if not, gently suggest the closest available alternatives.\n` : ''}
Write for the counselor, not the student. Tie interests, personality and aptitude together (e.g. how their conscientiousness or extraversion shapes which version of a field would suit them, and whether their strongest ability area reinforces or stretches their interests). When you mention degree fields, countries, or study destinations, use ONLY the fields and countries from the list above; do not invent options we cannot offer.
IMPORTANT writing style: write in plain, professional prose. Do NOT use em dashes ("—") or en dashes ("–") anywhere in any field of your output (read, careerDirections, careerPaths titles/roles, suggestedFields). Use commas, semicolons, full stops, parentheses or colons instead. Heavy dash use reads as machine-generated; avoid it.

Return ONLY valid JSON, no markdown, in exactly this shape:
{
  "read": "A concise ~60-word read.",
  "careerDirections": [
    { "title": "Career or role", "why": "One sentence on why it fits this profile." }
  ],
  "suggestedFields": ["Field 1", "Field 2", "Field 3"],
  "careerPaths": [
    { "title": "Field or career area", "roles": "2-3 example job titles", "psychFit": 88, "skillsFit": 80 }
  ]
}
"read": a concise, specific briefing of about 60 words (2-3 sentences) tying interests, personality and aptitude into a clear direction for the counselor. No filler, and do not restate the raw scores.
Provide exactly 3 careerDirections. suggestedFields must be drawn from the fields we can offer above.
Provide exactly the 5 STRONGEST careerPaths, RANKED from best fit to least (highest first). For each:
- "psychFit" (0-100) = how well it matches their interests + personality.
- "skillsFit" (0-100) = how well it matches their aptitude strengths.
Be realistic (a mix of strong and moderate fits); use whole numbers, mostly in the 55-95 range. Prefer careers connected to the fields we can offer.`
}
