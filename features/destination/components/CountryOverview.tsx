import { getTranslations } from 'next-intl/server'
import type { CountryDetailData } from '../types'

interface Props {
  country: CountryDetailData
}

// Extract the duration from a visa string like "Graduate Route – 2 years (3 years for PhD)"
function extractDuration(visa: string | null): string | null {
  if (!visa) return null
  const parts = visa.split(' – ')
  if (parts.length > 1) {
    return parts[parts.length - 1].split(',')[0].split('(')[0].trim()
  }
  return visa
}

function fmt(value: string | number | null): string {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'string') return value
  return value.toLocaleString()
}

function fmtPercent(value: number | null): string | null {
  if (value === null || value === undefined) return null
  return `${value}%`
}

export async function CountryOverview({ country }: Props) {
  const t = await getTranslations('destinations')

  const all = [
    {
      label: t('institutions'),
      value: fmt(country.institutionCount),
      sub: t('worldClassUniversities'),
    },
    {
      label: t('tuitionFees'),
      value: fmt(country.tuitionFeeRange),
      sub: t('averagePerAnnum'),
    },
    {
      label: t('workRightsLabel'),
      value: fmt(extractDuration(country.postStudyWorkVisa)),
      sub: t('postStudyWorkVisa'),
    },
    country.studentSatisfaction !== null && {
      label: t('studentLife'),
      value: fmtPercent(country.studentSatisfaction)!,
      sub: t('satisfactionRate'),
    },
    {
      label: t('internationalStudents').toUpperCase(),
      value: fmt(country.internationalStudents),
      sub: t('internationalStudents'),
    },
    country.graduateEmployability !== null && {
      label: t('employability'),
      value: fmtPercent(country.graduateEmployability)!,
      sub: t('graduateSuccessRate'),
    },
  ].filter(Boolean).filter((s) => typeof s === 'object' && s.value !== '—') as {
    label: string
    value: string
    sub: string
  }[]

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-5">{t('overview')}</h2>
      {country.overview && (
        <p className="text-gray-600 leading-relaxed mb-8">{country.overview}</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {all.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-50 border border-gray-200 rounded-xl p-4"
          >
            <p className="text-xs font-semibold tracking-wider uppercase text-gray-400 mb-1">
              {stat.label}
            </p>
            <p className="text-lg md:text-xl font-bold text-neutral-900 leading-tight line-clamp-2">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
