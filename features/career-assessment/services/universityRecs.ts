import { prisma } from '@/shared/lib/db/prisma'
import { classifyToBucket, type Bucket } from '../data/fieldTaxonomy'
import type { RecommendationTree, RecBucket, RecCountry, RecUniversity } from '../types'

const DEGREE_LABELS: Record<string, string> = {
  BACHELOR: "Bachelor's",
  MASTER: "Master's",
  PHD: 'PhD',
  DIPLOMA: 'Diploma',
  ASSOCIATE: 'Associate',
  CERTIFICATE: 'Certificate',
  FOUNDATION: 'Foundation',
}

const MAX_COUNTRIES_PER_BUCKET = 3
const MAX_UNIS_PER_COUNTRY = 3
const NO_RANK = 99999

export interface RecOptions {
  preferredCountry?: string | null
  educationLevel?: string | null
}

/** Map a student's education level (stored as a label) to the degree levels that fit their stage. */
function targetDegreeLevels(educationLevel?: string | null): Set<string> | null {
  if (!educationLevel) return null
  const e = educationLevel.toLowerCase()
  if (e.includes('high school') || e.includes('foundation') || e.includes('undergraduate')) {
    return new Set(['BACHELOR', 'FOUNDATION', 'ASSOCIATE', 'DIPLOMA'])
  }
  if (e.includes('graduate')) return new Set(['MASTER', 'PHD'])
  return null // "Other" / unknown → no preference
}

/**
 * Build the recommendation tree for the given candidate buckets (ordered by fit):
 * bucket → countries (preferred destination first, then by university ranking) →
 * education-appropriate programs in our DB, trimmed with "+N more" overflow counts.
 * Published countries/universities only. DB reads only.
 */
export async function getRecommendationTree(
  buckets: Bucket[],
  opts: RecOptions = {},
): Promise<RecommendationTree> {
  if (buckets.length === 0) return { buckets: [], fields: [] }

  const targetLevels = targetDegreeLevels(opts.educationLevel)
  const preferred = opts.preferredCountry?.trim().toLowerCase() || null

  try {
    const countries = await prisma.country.findMany({
      where: { isPublished: true },
      select: {
        name: true,
        academicSpecialties: true,
        universities: {
          where: { isPublished: true },
          select: {
            name: true,
            ranking: true,
            programs: { select: { name: true, field: true, degreeLevel: true } },
          },
        },
      },
    })

    const recBuckets: RecBucket[] = []

    for (const bucket of buckets) {
      const recCountries: RecCountry[] = []

      for (const c of countries) {
        const strongFit = c.academicSpecialties.some((s) => classifyToBucket(s) === bucket)
        const isPreferred = preferred !== null && c.name.toLowerCase() === preferred

        // Collect this country's matching programs across its universities.
        type Prog = { name: string; uniName: string; ranking: number; level: string }
        const progs: Prog[] = []
        const seen = new Set<string>()
        for (const u of c.universities) {
          for (const p of u.programs) {
            if (classifyToBucket(p.field) !== bucket) continue
            const key = `${u.name}::${p.name}`
            if (seen.has(key)) continue
            seen.add(key)
            progs.push({ name: p.name, uniName: u.name, ranking: u.ranking ?? NO_RANK, level: p.degreeLevel })
          }
        }
        if (progs.length === 0) continue

        // Sort: education-appropriate level first, then better ranking, then name.
        progs.sort((a, b) => {
          const at = targetLevels ? (targetLevels.has(a.level) ? 0 : 1) : 0
          const bt = targetLevels ? (targetLevels.has(b.level) ? 0 : 1) : 0
          if (at !== bt) return at - bt
          if (a.ranking !== b.ranking) return a.ranking - b.ranking
          return a.name.localeCompare(b.name)
        })

        const shown = progs.slice(0, MAX_UNIS_PER_COUNTRY)
        const universities: RecUniversity[] = shown.map((p) => ({
          name: p.uniName,
          program: p.name,
          degreeLevel: DEGREE_LABELS[p.level] ?? p.level,
          ranking: p.ranking === NO_RANK ? undefined : p.ranking,
        }))

        recCountries.push({
          country: c.name,
          strongFit,
          preferred: isPreferred,
          moreCount: Math.max(0, progs.length - shown.length),
          bestRank: Math.min(...progs.map((p) => p.ranking)),
          universities,
        })
      }

      if (recCountries.length === 0) continue

      // Order: preferred destination first, then strong-fit, then best ranking, then breadth.
      recCountries.sort(
        (a, b) =>
          Number(b.preferred) - Number(a.preferred) ||
          Number(b.strongFit) - Number(a.strongFit) ||
          (a.bestRank ?? NO_RANK) - (b.bestRank ?? NO_RANK) ||
          b.universities.length - a.universities.length,
      )

      recBuckets.push({
        bucket,
        countries: recCountries.slice(0, MAX_COUNTRIES_PER_BUCKET),
        moreCountries: Math.max(0, recCountries.length - MAX_COUNTRIES_PER_BUCKET),
      })
    }

    return { buckets: recBuckets, fields: recBuckets.map((b) => b.bucket) }
  } catch (error) {
    console.error('Recommendation tree query failed:', error)
    return { buckets: [], fields: [] }
  }
}
