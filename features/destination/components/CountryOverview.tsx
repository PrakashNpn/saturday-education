import { getTranslations } from 'next-intl/server'
import { Building2, Banknote, Clock, Star, Users, Briefcase } from 'lucide-react'
import type { ComponentType } from 'react'
import type { CountryDetailData } from '../types'

interface Props {
  country: CountryDetailData
}

type StatItem = {
  label: string
  value: string
  Icon: ComponentType<{ className?: string }>
}

function extractDuration(visa: string | null): string | null {
  if (!visa) return null
  const parts = visa.split(' – ')
  if (parts.length > 1) return parts[parts.length - 1].split(',')[0].split('(')[0].trim()
  return visa
}

export async function CountryOverview({ country }: Props) {
  const t = await getTranslations('destinations')

  const stats: StatItem[] = []

  if (country.institutionCount)
    stats.push({ label: t('institutions'), value: country.institutionCount, Icon: Building2 })

  if (country.tuitionFeeRange)
    stats.push({ label: t('tuitionFees'), value: country.tuitionFeeRange, Icon: Banknote })

  const duration = extractDuration(country.postStudyWorkVisa)
  if (duration)
    stats.push({ label: t('workRightsLabel'), value: duration, Icon: Clock })

  if (country.studentSatisfaction !== null && country.studentSatisfaction !== undefined)
    stats.push({ label: t('studentLife'), value: `${country.studentSatisfaction}%`, Icon: Star })

  if (country.internationalStudents !== null && country.internationalStudents !== undefined)
    stats.push({ label: t('internationalStudents').toUpperCase(), value: country.internationalStudents.toLocaleString(), Icon: Users })

  if (country.graduateEmployability !== null && country.graduateEmployability !== undefined)
    stats.push({ label: t('employability'), value: `${country.graduateEmployability}%`, Icon: Briefcase })

  return (
    <div>
      {/* Section header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 bg-brand-purple-50 text-brand-purple text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
          {t('overviewEyebrow')}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
          {t('about')} {country.name}
        </h2>
      </div>

      {country.overview && (
        <p className="text-gray-600 leading-relaxed mb-8">{country.overview}</p>
      )}

      {stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map(({ label, value, Icon }) => (
            <div
              key={label}
              className="border border-gray-200 rounded-xl p-4 md:p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2">
                {label}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-purple-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-brand-purple" />
                </div>
                <p className="text-lg md:text-xl font-bold text-brand-purple leading-none">{value}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
