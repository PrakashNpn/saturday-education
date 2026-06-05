import { prisma } from '@/shared/lib/db/prisma'

export type ComparisonUniversity = {
  id: string
  name: string
  country: string
  tuition: { min: number; max: number; currency: string; scale: number } | null
  visaProcessing: string
  workRights: string
  scholarships: string
  globalRanking: number | null
  acceptanceRate: number | null
  popularCourses: string[]
}

function getCurrencySymbol(code: string): string {
  const symbols: Record<string, string> = {
    GBP: '£',    EUR: '€',    USD: '$',
    CAD: 'C$',   AUD: 'A$',   NZD: 'NZ$',
    SGD: 'S$',   MYR: 'RM ',  THB: '฿',
    AED: 'AED ', CHF: 'CHF ',
  }
  return symbols[code] ?? `${code} `
}

export async function getComparisonUniversities(): Promise<ComparisonUniversity[]> {
  const rows = await prisma.university.findMany({
    where: { isPublished: true },
    select: {
      slug: true,
      name: true,
      ranking: true,
      acceptanceRate: true,
      tuitionFeeMin: true,
      tuitionFeeMax: true,
      tuitionCurrency: true,
      country: {
        select: { name: true, visaProcessingTime: true, workRights: true },
      },
      programs: {
        select: { name: true, slug: true, field: true },
      },
      scholarships: {
        select: { value: true },
        take: 1,
      },
    },
    orderBy: [
      { ranking: { sort: 'asc', nulls: 'last' } },
      { name: 'asc' },
    ],
  })

  // Build a per-currency scale from real data: max fee in that currency × 1.2, rounded to nearest 5k.
  // This makes bars directly comparable for same-currency pairs.
  const currencyMaxes: Record<string, number> = {}
  for (const u of rows) {
    if (u.tuitionFeeMax && u.tuitionCurrency) {
      currencyMaxes[u.tuitionCurrency] = Math.max(
        currencyMaxes[u.tuitionCurrency] ?? 0,
        u.tuitionFeeMax,
      )
    }
  }
  function getScale(code: string): number {
    const max = currencyMaxes[code]
    if (!max) return 80000
    return Math.ceil((max * 1.2) / 5000) * 5000
  }

  return rows.map((u) => {
    const currencyCode = u.tuitionCurrency ?? 'USD'
    const currencySymbol = getCurrencySymbol(currencyCode)
    const popularCourses = [...new Set(u.programs.map((p) => p.field))].slice(0, 4)

    const workRights = u.country.workRights ?? 'N/A'

    return {
      id: u.slug,
      name: u.name,
      country: u.country.name,
      tuition:
        u.tuitionFeeMin != null && u.tuitionFeeMax != null
          ? { min: u.tuitionFeeMin, max: u.tuitionFeeMax, currency: currencySymbol, scale: getScale(currencyCode) }
          : null,
      visaProcessing: (u.country.visaProcessingTime ?? 'N/A').split('(')[0].trim(),
      workRights: workRights.split(';')[0].split('.')[0].trim(),
      scholarships: u.scholarships[0]?.value ?? 'None listed',
      globalRanking: u.ranking,
      acceptanceRate: u.acceptanceRate,
      popularCourses,
    }
  })
}
