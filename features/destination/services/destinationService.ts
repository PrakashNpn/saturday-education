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
        orderBy: { ranking: 'asc' },
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
