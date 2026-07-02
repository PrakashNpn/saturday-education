import { CAREER_FIELDS } from '@/shared/lib/careers/outlookMaster'

// Builds the single prompt that BOTH validates the input is a real career AND
// generates one coherent 10-year outlook trajectory. The 5-yr view is derived
// from the same curve downstream, so the model only ever produces one trend.
export function buildCareerOutlookPrompt(query: string): string {
  const fields = CAREER_FIELDS.map((f) => `"${f}"`).join(', ')
  return `You are a careful labour-market analyst for a study-abroad consultancy that guides students.

The user wants the job-market outlook for: "${query}"

STEP 1 — Validate. Decide if this is a real, recognisable career or occupation. Gibberish, a random
word, a brand/company, a person's name, or something that is not an actual job is NOT a career. If it
is NOT a real career, return exactly this and nothing else:
{"valid": false}

STEP 2 — If it IS a real career, return ONLY a valid JSON object (no markdown, no commentary) in
exactly this shape:
{
  "valid": true,
  "title": "Canonical career name, e.g. 'Machine Learning Engineer'",
  "field": the single best-fitting field from this list: ${fields}. If none is a genuinely good fit for this career, give the most accurate conventional field-of-study name yourself instead (short, 2 to 4 words, Title Case),
  "summary": "One sentence, plain language, what this person actually does.",
  "exampleRoles": ["3 to 5 closely related job titles"],
  "requiredSkills": ["4 to 6 must-have skills"],
  "niceToHaveSkills": ["3 to 4 nice-to-have skills"],
  "riasec": ["1 to 3 letters from R, I, A, S, E, C, strongest interest first"],
  "relatedFields": ["2 to 3 relevant fields of study a student could pursue toward this career"],
  "demand": "High" | "Moderate" | "Competitive",
  "trend": [11 integers between 0 and 100, one per year from this year to 10 years out],
  "marketNoteNear": "One sentence on the next ~5 years for this career.",
  "marketNoteLong": "One sentence on the full ~10 years for this career.",
  "sources": ["0 to 3 well-known public sources, e.g. 'BLS 2023-2033', 'WEF Future of Jobs 2025', 'O*NET'"]
}

Rules for the data:
- "demand" is how strong hiring is RIGHT NOW (the present level of openings). "trend" is the direction
  over time (where hiring is heading). Keep the two COHERENT: do not pair "High" present demand with a
  steep multi-year decline unless there is a strong, specific, evidence-based reason, and if you do,
  explain that reason in the market notes. A field that is genuinely growing must have an upward trend.
- Anchor the DIRECTION of the trend in what real labour-market sources (US BLS projections, WEF Future
  of Jobs, O*NET) actually project for THIS specific occupation. Do not invent a contrarian decline.
- Do NOT assume that AI or automation shrinks a field by default. Many fields are projected to GROW
  strongly, including AI and machine learning, data, software, cybersecurity, healthcare, and renewable
  energy. Only show decline where the evidence genuinely supports it (for example roles being directly
  automated or offshored, such as some clerical, print-media, or routine translation work).
- Be HONEST and realistic, not promotional: some careers really are flat or shrinking, and the trend
  should go DOWN when that is the truth. Just make sure decline is evidence-led, not a reflex.
- "trend" is a single RELATIVE shape of hiring demand (0-100), not a precise forecast. The first 6
  points (years 0-5) are the near term and all 11 points are the decade — they must tell ONE coherent
  story. Never imply growth in one window and decline in the other unless the curve genuinely turns.
- Treat everything as INDICATIVE, not a guarantee.
- Write like a real person: short, plain sentences. No em dashes or en dashes. No filler like "it's
  worth noting", "in today's fast-paced world", or corporate language.
- Output ONLY the JSON object, nothing before or after it.`
}
