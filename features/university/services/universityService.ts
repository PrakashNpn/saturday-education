import { prisma } from '@/shared/lib/db/prisma'
import { ALL_DEGREE_LEVELS } from '../utils/universityUtils'
import type { UniversityFinderData, UniversityListItem } from '../types/university.types'

export async function getAllUniversitiesWithFilters(): Promise<UniversityFinderData> {
  const [rawUniversities, countries, programFields] = await Promise.all([
    prisma.university.findMany({
      include: {
        country: { select: { name: true, slug: true } },
        programs: { select: { field: true, degreeLevel: true, name: true } },
        _count: { select: { programs: true } },
      },
      orderBy: { ranking: 'asc' },
    }),
    prisma.country.findMany({
      select: { id: true, name: true, slug: true },
      orderBy: { name: 'asc' },
    }),
    prisma.program.findMany({
      select: { field: true },
      distinct: ['field'],
      orderBy: { field: 'asc' },
    }),
  ])

  return {
    universities: rawUniversities as unknown as UniversityListItem[],
    countries,
    programFields: programFields.map((p) => p.field).filter(Boolean),
    degreeLevels: ALL_DEGREE_LEVELS,
  }
}

export async function getUniversityBySlug(slug: string) {
  return prisma.university.findUnique({
    where: { slug },
    include: {
      country: true,
      programs: { orderBy: { name: 'asc' } },
      admissionSteps: { orderBy: { stepNumber: 'asc' } },
      scholarships: true,
    },
  })
}

export async function getFinderDropdownOptions() {
  const [countries, programFields, degreeLevels] = await Promise.all([
    prisma.country.findMany({
      where: { universities: { some: {} } },
      select: { id: true, name: true, slug: true },
      orderBy: { name: 'asc' },
    }),
    prisma.program.findMany({
      select: { field: true },
      distinct: ['field'],
      orderBy: { field: 'asc' },
    }),
    prisma.program.findMany({
      select: { degreeLevel: true },
      distinct: ['degreeLevel'],
    }),
  ])

  return {
    countries,
    programFields: programFields.map((p) => p.field).filter(Boolean),
    degreeLevels: degreeLevels.map((d) => d.degreeLevel),
  }
}

export async function getAllUniversitySlugs() {
  return prisma.university.findMany({ select: { slug: true } })
}

export async function getSimilarUniversities(universityId: string, countryId: string, limit = 4) {
  return prisma.university.findMany({
    where: { countryId, id: { not: universityId } },
    select: {
      id: true,
      slug: true,
      name: true,
      city: true,
      ranking: true,
      acceptanceRate: true,
      tuitionFeeMin: true,
      tuitionFeeMax: true,
      tuitionCurrency: true,
      intakeMonths: true,
      coverImageUrl: true,
      logoUrl: true,
      country: { select: { name: true, slug: true } },
      _count: { select: { programs: true } },
    },
    orderBy: { ranking: 'asc' },
    take: limit,
  })
}
