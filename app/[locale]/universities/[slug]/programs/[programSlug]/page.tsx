import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getProgramDetail, ProgramDetailPage } from '@/features/program'

type Props = { params: Promise<{ locale: string; slug: string; programSlug: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, slug, programSlug } = await params
  setRequestLocale(locale)
  const program = await getProgramDetail(slug, programSlug)
  if (!program) return {}
  return {
    title: `${program.name} | ${program.university.name} | Saturday Education`,
    description: program.description?.slice(0, 160),
  }
}

export default async function Page({ params }: Props) {
  const { locale, slug, programSlug } = await params
  setRequestLocale(locale)

  const [program, t] = await Promise.all([
    getProgramDetail(slug, programSlug),
    getTranslations('universities'),
  ])

  if (!program) notFound()

  const translations = {
    backTo: t('programDetailBackTo'),
    lastUpdated: t('programDetailLastUpdated'),
    officialPage: t('programDetailOfficialPage'),
    sectionDetails: t('programDetailSectionDetails'),
    sectionEntryRequirements: t('programEntryRequirements'),
    sectionDescription: t('programDetailSectionDescription'),
    duration: t('programDuration'),
    campus: t('programCampus'),
    intake: t('programIntake'),
    tuitionFee: t('metricTuitionFee'),
    appFee: t('metricAppFee'),
    year: t('year'),
    years: t('years'),
    applyButton: t('programDetailApplyButton'),
  }

  return <ProgramDetailPage program={program} translations={translations} />
}
