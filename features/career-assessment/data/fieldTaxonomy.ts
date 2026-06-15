// Canonical "specialty buckets" that unify two messy free-text sources:
//   • Program.field         (granular, e.g. "Software Engineering", "Marketing")
//   • Country.academicSpecialties (broad, e.g. "Engineering & Technology")
// A single keyword classifier maps either kind of string to one bucket, so we can
// match a student's interest profile → buckets → countries strong in them → programs.

import type { RiasecCategory } from './riasecQuestions'

export const BUCKETS = [
  'Computer Science & IT',
  'Engineering',
  'Business & Management',
  'Finance & Economics',
  'Medicine & Health',
  'Natural Sciences',
  'Social Sciences & Psychology',
  'Arts, Design & Media',
  'Law',
  'Education',
  'Humanities & Languages',
  'Hospitality & Tourism',
] as const

export type Bucket = (typeof BUCKETS)[number]

// Ordered rules — first matching keyword wins. Order matters: more specific /
// higher-priority buckets are checked before broader ones.
const RULES: Array<{ bucket: Bucket | null; keywords: string[] }> = [
  // Excluded — not a degree field of study (pre-university / language prep)
  { bucket: null, keywords: ['foundation', 'pathway', 'academic preparation', 'pre-master', 'pre-sessional', 'english language'] },

  { bucket: 'Law', keywords: ['law', 'legal'] },
  { bucket: 'Medicine & Health', keywords: ['medicin', 'nurs', 'health', 'pharmac', 'dental', 'dentist', 'biomed', 'clinical', 'physiother', 'midwif'] },
  { bucket: 'Social Sciences & Psychology', keywords: ['psycholog', 'social science', 'sociolog', 'political', 'international relation', 'social work', 'criminolog'] },
  { bucket: 'Computer Science & IT', keywords: ['computer', 'computing', 'information technology', 'software', 'data science', 'data analyt', 'business analyt', 'cyber', 'artificial intelligence', 'machine learning', 'informatics'] },
  { bucket: 'Engineering', keywords: ['engineer', 'mechanical', 'aerospace', 'aviation', 'architect', 'biotechnolog', 'electrical', 'electronic', 'civil', 'robotic'] },
  { bucket: 'Finance & Economics', keywords: ['financ', 'econom', 'account', 'banking', 'investment'] },
  { bucket: 'Hospitality & Tourism', keywords: ['hospitality', 'tourism', 'culinary', 'gastronom', 'hotel', 'event', 'travel'] },
  { bucket: 'Education', keywords: ['education', 'teaching', 'pedagog'] },
  { bucket: 'Business & Management', keywords: ['business', 'management', 'marketing', 'entrepreneur', 'human resource', 'logistic', 'supply chain', 'project management', 'sports management', 'commerce', 'retail', 'administration'] },
  { bucket: 'Arts, Design & Media', keywords: ['design', 'creative', 'media', 'film', 'communication', 'journalism', 'fashion', 'graphic', 'animation', 'music', 'photograph', 'art &', '& art', 'fine art'] },
  { bucket: 'Humanities & Languages', keywords: ['liberal arts', 'humanities', 'literature', 'philosophy', 'history', 'language', 'culture', 'linguistic'] },
  { bucket: 'Natural Sciences', keywords: ['natural science', 'biolog', 'chemis', 'physic', 'mathematic', 'statistic', 'environmental', 'agricultur', 'food science', 'life science', 'geolog', 'research', 'science'] },
]

const cache = new Map<string, Bucket | null>()

/** Map any free-text field / specialty string to a canonical bucket (or null if excluded). */
export function classifyToBucket(text: string | null | undefined): Bucket | null {
  if (!text) return null
  if (cache.has(text)) return cache.get(text) ?? null
  const lower = text.toLowerCase()
  let result: Bucket | null = null
  for (const rule of RULES) {
    if (rule.keywords.some((k) => lower.includes(k))) {
      result = rule.bucket
      break
    }
  }
  cache.set(text, result)
  return result
}

// RIASEC interest category → ranked list of matching buckets (strongest first).
export const RIASEC_BUCKETS: Record<RiasecCategory, Bucket[]> = {
  R: ['Engineering', 'Computer Science & IT', 'Natural Sciences'],
  I: ['Computer Science & IT', 'Natural Sciences', 'Medicine & Health', 'Engineering'],
  A: ['Arts, Design & Media', 'Humanities & Languages'],
  S: ['Education', 'Medicine & Health', 'Social Sciences & Psychology', 'Humanities & Languages'],
  E: ['Business & Management', 'Law', 'Finance & Economics', 'Hospitality & Tourism'],
  C: ['Finance & Economics', 'Business & Management', 'Computer Science & IT'],
}

/**
 * Build an ordered, deduped list of candidate buckets from the student's top
 * interest categories (strongest category's buckets ranked first).
 */
export function candidateBuckets(topCategories: RiasecCategory[], limit = 5): Bucket[] {
  const seen = new Set<Bucket>()
  const out: Bucket[] = []
  for (const c of topCategories) {
    for (const b of RIASEC_BUCKETS[c]) {
      if (!seen.has(b)) {
        seen.add(b)
        out.push(b)
      }
      if (out.length >= limit) return out
    }
  }
  return out
}
