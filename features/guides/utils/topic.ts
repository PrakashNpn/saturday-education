import { COUNTRIES } from '@/shared/constants/destinationCountries'

const DESTINATION_NAME = Object.fromEntries(COUNTRIES.map((c) => [c.slug, c.shortName ?? c.name]))

const TOPIC_BY_SLUG: Record<string, 'topicPlanning' | 'topicVisas' | 'topicWork' | 'topicFees'> = {
  'cheapest-country-to-study-abroad-myanmar': 'topicPlanning',
  'student-visa-checklist-myanmar': 'topicVisas',
  'part-time-work-minimum-wage-by-country': 'topicWork',
  'malaysia-private-university-fees': 'topicFees',
}

/** Short editorial topic for cards/headers — never the raw SEO keyword. */
export function guideTopicLabel(
  guide: { slug: string; relatedDestinationSlug: string | null },
  t: (key: string) => string,
): string {
  if (guide.relatedDestinationSlug && DESTINATION_NAME[guide.relatedDestinationSlug]) {
    return DESTINATION_NAME[guide.relatedDestinationSlug]
  }
  const key = TOPIC_BY_SLUG[guide.slug]
  return key ? t(key) : t('navLabel')
}
