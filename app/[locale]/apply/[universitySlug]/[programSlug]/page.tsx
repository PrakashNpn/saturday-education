import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getProgramForApply, ApplyForm } from '@/features/application'

type Props = { params: Promise<{ locale: string; universitySlug: string; programSlug: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, universitySlug, programSlug } = await params
  setRequestLocale(locale)
  const program = await getProgramForApply(universitySlug, programSlug)
  if (!program) return {}
  return { title: `Apply — ${program.name} | ${program.universityName} | Saturday Education` }
}

export default async function Page({ params }: Props) {
  const { locale, universitySlug, programSlug } = await params
  setRequestLocale(locale)

  const program = await getProgramForApply(universitySlug, programSlug)
  if (!program) notFound()

  return (
    <ApplyForm
      universitySlug={universitySlug}
      programSlug={programSlug}
      programName={program.name}
      universityName={program.universityName}
      documents={program.documents}
    />
  )
}
