import { prisma } from '@/shared/lib/db/prisma'

// ─── COUNTRIES ────────────────────────────────────────────────────────────────

export async function getAllCountries() {
  return prisma.country.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      slug: true,
      name: true,
      region: true,
      cardImageUrl: true,
      heroImageUrl: true,
      isFeatured: true,
      _count: { select: { universities: true } },
    },
  })
}

export async function getCountryBySlug(slug: string) {
  return prisma.country.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      region: true,
      tagline: true,
      shortDescription: true,
      overview: true,
      cardImageUrl: true,
      heroImageUrl: true,
      institutionCount: true,
      tuitionFeeRange: true,
      postStudyWorkVisa: true,
      visaProcessingTime: true,
      workRights: true,
      isFeatured: true,
    },
  })
}

export async function updateCountry(slug: string, data: {
  cardImageUrl?: string | null
  heroImageUrl?: string | null
  tagline?: string
  shortDescription?: string
  overview?: string
  institutionCount?: string
  tuitionFeeRange?: string
  postStudyWorkVisa?: string
  visaProcessingTime?: string
  workRights?: string
  isFeatured?: boolean
}) {
  return prisma.country.update({ where: { slug }, data })
}

// ─── UNIVERSITIES ─────────────────────────────────────────────────────────────

export async function getAllUniversities(search?: string, countrySlug?: string) {
  return prisma.university.findMany({
    where: {
      ...(search ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } },
        ],
      } : {}),
      ...(countrySlug ? { country: { slug: countrySlug } } : {}),
    },
    orderBy: [{ country: { name: 'asc' } }, { name: 'asc' }],
    select: {
      id: true,
      slug: true,
      name: true,
      city: true,
      logoUrl: true,
      coverImageUrl: true,
      ranking: true,
      country: { select: { name: true, slug: true } },
    },
  })
}

export async function getUniversityBySlug(slug: string) {
  return prisma.university.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      city: true,
      logoUrl: true,
      coverImageUrl: true,
      shortDescription: true,
      ranking: true,
      tuitionFeeMin: true,
      tuitionFeeMax: true,
      tuitionCurrency: true,
      foundedYear: true,
      totalStudents: true,
      country: { select: { name: true, slug: true } },
    },
  })
}

export async function updateUniversity(slug: string, data: {
  logoUrl?: string | null
  coverImageUrl?: string | null
  shortDescription?: string
  ranking?: number | null
  city?: string
}) {
  return prisma.university.update({ where: { slug }, data })
}
