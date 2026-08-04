import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getApplicationSummary, ApplicationSummaryPage } from '@/features/application'

type Props = { params: Promise<{ locale: string; id: string }> }

// Reached only via the emailed link — never linked from the public site, so keep it out of
// search results even if a link somehow gets crawled.
export async function generateMetadata() {
  return { robots: { index: false, follow: false } }
}

export default async function Page({ params }: Props) {
  const { locale, id } = await params
  setRequestLocale(locale)

  const application = await getApplicationSummary(id)
  if (!application) notFound()

  return <ApplicationSummaryPage application={application} />
}
