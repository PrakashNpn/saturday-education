import { prisma } from '@/shared/lib/db/prisma'
import { getFirmliInstitutionCountsByName } from '@/shared/lib/courseFinder/firmliClient'
import type { CountryCardData, CountryDetailData } from '../types'

/** The translated columns for one piece of text, keyed by locale. */
type Translations = Partial<Record<'th' | 'my' | 'vi' | 'fil' | 'id', string | null>>

/**
 * Picks the translated value for `locale`, falling back to the English
 * `base` when that field hasn't been translated for this country yet (the
 * translation columns are null until someone fills them in). English itself
 * has no override column, so it always resolves to `base`. An empty string
 * counts as untranslated, so a blank cell never blanks the page. Generic so a
 * non-nullable base (e.g. a FAQ's `question`) still types as non-nullable
 * coming out, not widened to `string | null`.
 */
function localize<T extends string | null>(base: T, translations: Translations, locale: string): T {
  const value = (translations as Record<string, string | null | undefined>)[locale]
  return value != null && value !== '' ? (value as T) : base
}

/** The six translation columns every translated field carries. */
const columns = (th: string | null, my: string | null, vi: string | null, fil: string | null, idn: string | null): Translations => ({
  th,
  my,
  vi,
  fil,
  id: idn,
})

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
      taglineVi: true,
      taglineFil: true,
      taglineIdn: true,
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
    tagline: localize(row.tagline, columns(row.taglineTh, row.taglineMy, row.taglineVi, row.taglineFil, row.taglineIdn), locale),
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
    tagline: localize(row.tagline, columns(row.taglineTh, row.taglineMy, row.taglineVi, row.taglineFil, row.taglineIdn), locale),
    overview: localize(row.overview, columns(row.overviewTh, row.overviewMy, row.overviewVi, row.overviewFil, row.overviewIdn), locale),
    workRights: localize(row.workRights, columns(row.workRightsTh, row.workRightsMy, row.workRightsVi, row.workRightsFil, row.workRightsIdn), locale),
    advantages: row.advantages.map((advantage) => ({
      ...advantage,
      title: localize(advantage.title, columns(advantage.titleTh, advantage.titleMy, advantage.titleVi, advantage.titleFil, advantage.titleIdn), locale),
      description: localize(advantage.description, columns(advantage.descriptionTh, advantage.descriptionMy, advantage.descriptionVi, advantage.descriptionFil, advantage.descriptionIdn), locale),
    })),
    processSteps: row.processSteps.map((step) => ({
      ...step,
      title: localize(step.title, columns(step.titleTh, step.titleMy, step.titleVi, step.titleFil, step.titleIdn), locale),
      description: localize(step.description, columns(step.descriptionTh, step.descriptionMy, step.descriptionVi, step.descriptionFil, step.descriptionIdn), locale),
    })),
    faqs: row.faqs.map((faq) => ({
      ...faq,
      question: localize(faq.question, columns(faq.questionTh, faq.questionMy, faq.questionVi, faq.questionFil, faq.questionIdn), locale),
      answer: localize(faq.answer, columns(faq.answerTh, faq.answerMy, faq.answerVi, faq.answerFil, faq.answerIdn), locale),
    })),
  } as unknown as CountryDetailData
}

export async function getAllCountrySlugs() {
  return prisma.country.findMany({
    where: { isPublished: true },
    select: { slug: true },
  })
}
