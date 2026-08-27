import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { CourseFinderPage, parseCourseFinderFilters } from '@/features/course-finder'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.courseFinder' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      siteName: 'Saturday Education',
    },
  }
}

export default async function CourseFinderRoute({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'courseFinder' })

  // country, level and field arrive from the homepage search. Absent or
  // unrecognised, the finder opens on the full catalogue.
  const filters = parseCourseFinderFilters(await searchParams)

  return (
    <CourseFinderPage
      filters={filters}
      translations={{ frameTitle: t('frameTitle') }}
    />
  )
}
