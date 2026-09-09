import { prisma } from '@/shared/lib/db/prisma'
import type { CountryCardData, CountryDetailData } from '../types'

export async function getAllCountries(): Promise<CountryCardData[]> {
  const rows = await prisma.country.findMany({
    where: { isPublished: true },
    orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
    select: {
      id: true,
      name: true,
      slug: true,
      region: true,
      cardImageUrl: true,
      tagline: true,
      shortDescription: true,
      institutionCount: true,
      isFeatured: true,
      isPublished: true,
      _count: { select: { universities: true } },
    },
  })
  return rows as unknown as CountryCardData[]
}

export async function getCountryBySlug(slug: string): Promise<CountryDetailData | null> {
  const row = await prisma.country.findUnique({
    where: { slug },
    include: {
      advantages: { orderBy: { order: 'asc' } },
      processSteps: { orderBy: { stepNumber: 'asc' } },
      faqs: { orderBy: { order: 'asc' } },
      universities: {
        // Partners we have a signed contract with. The rest stay hidden until
        // they are published.
        where: { isPublished: true },
        select: {
          id: true,
          slug: true,
          name: true,
          city: true,
          ranking: true,
          tuitionFeeMin: true,
          tuitionFeeMax: true,
          tuitionCurrency: true,
          coverImageUrl: true,
          logoUrl: true,
          isFeatured: true,
          shortDescription: true,
        },
        // Featured first, then by rank, with a name tie-break so the order is
        // stable for the many partners that carry no ranking.
        orderBy: [{ isFeatured: 'desc' }, { ranking: 'asc' }, { name: 'asc' }],
      },
    },
  })
  return row as unknown as CountryDetailData | null
}

export async function getAllCountrySlugs() {
  return prisma.country.findMany({
    where: { isPublished: true },
    select: { slug: true },
  })
}
