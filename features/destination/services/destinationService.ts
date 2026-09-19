import { prisma } from '@/shared/lib/db/prisma'
import { getFirmliInstitutionCountsByName } from '@/shared/lib/courseFinder/firmliClient'
import type { CountryCardData, CountryDetailData } from '../types'

/**
 * Picks the translated value for `locale`, falling back to the English
 * `base` when that field hasn't been translated for this country yet (the
 * `th`/`my` columns are null until someone fills them in via the admin
 * dashboard). English itself has no override column, so it always resolves
 * to `base`. Generic so a non-nullable base (e.g. a FAQ's `question`) still
 * types as non-nullable coming out, not widened to `string | null`.
 */
function localize<T extends string | null>(base: T, th: string | null, my: string | null, locale: string): T {
  if (locale === 'th' && th !== null) return th as T
  if (locale === 'my' && my !== null) return my as T
  return base
}

/**
 * `locale` defaults to English so the admin dashboard's calls (which don't
 * pass one) keep seeing the plain source `tagline`, unchanged from before
 * this was translatable.
 */
export async function getAllCountries(locale: string = 'en'): Promise<CountryCardData[]> {
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
      taglineTh: true,
      taglineMy: true,
      shortDescription: true,
      institutionCount: true,
      isFeatured: true,
      isPublished: true,
    },
  })

  // The card's institution count comes from Firmli's course-finder catalogue
  // rather than our own signed-partner list, which for most countries is
  // still too small to be worth showing on its own. See firmliClient.ts.
  const counts = await getFirmliInstitutionCountsByName(rows.map((r) => r.name))

  return rows.map((row) => ({
    ...row,
    tagline: localize(row.tagline, row.taglineTh, row.taglineMy, locale),
    firmliInstitutionCount: counts.get(row.name) ?? null,
  })) as unknown as CountryCardData[]
}

/**
 * `locale` resolves every translatable field (the country's own overview,
 * plus each advantage/step/FAQ's title-and-body) to that language, falling
 * back to English piece by piece — so a country that's only half-translated
 * still reads as a complete page, just partly in English, rather than
 * showing blanks.
 */
export async function getCountryBySlug(slug: string, locale: string): Promise<CountryDetailData | null> {
  const row = await prisma.country.findUnique({
    where: { slug },
    include: {
      advantages: { orderBy: { order: 'asc' } },
      processSteps: { orderBy: { stepNumber: 'asc' } },
      faqs: { orderBy: { order: 'asc' } },
    },
  })
  if (!row) return null

  return {
    ...row,
    tagline: localize(row.tagline, row.taglineTh, row.taglineMy, locale),
    overview: localize(row.overview, row.overviewTh, row.overviewMy, locale),
    advantages: row.advantages.map((advantage) => ({
      ...advantage,
      title: localize(advantage.title, advantage.titleTh, advantage.titleMy, locale),
      description: localize(advantage.description, advantage.descriptionTh, advantage.descriptionMy, locale),
    })),
    processSteps: row.processSteps.map((step) => ({
      ...step,
      title: localize(step.title, step.titleTh, step.titleMy, locale),
      description: localize(step.description, step.descriptionTh, step.descriptionMy, locale),
    })),
    faqs: row.faqs.map((faq) => ({
      ...faq,
      question: localize(faq.question, faq.questionTh, faq.questionMy, locale),
      answer: localize(faq.answer, faq.answerTh, faq.answerMy, locale),
    })),
  } as unknown as CountryDetailData
}

export async function getAllCountrySlugs() {
  return prisma.country.findMany({
    where: { isPublished: true },
    select: { slug: true },
  })
}
