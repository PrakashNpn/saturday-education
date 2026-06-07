import { getTranslations } from 'next-intl/server'
import { GraduationCap, Banknote, BadgeCheck, Star, Users, TrendingUp } from 'lucide-react'
import type { ComponentType } from 'react'
import type { CountryDetailData } from '../types'
import { ExpandableOverviewText } from './ExpandableOverviewText'

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
  const parts = visa.split(/\s[–—]\s/)
  if (parts.length > 1) return parts[parts.length - 1].split(',')[0].split('(')[0].trim()
  return visa
}

export async function CountryOverview({ country }: Props) {
  const t = await getTranslations('destinations')

  const stats: StatItem[] = []

  if (country.institutionCount)
    stats.push({ label: t('institutions'), value: country.institutionCount, Icon: GraduationCap })

  if (country.tuitionFeeRange)
    stats.push({ label: t('tuitionFees'), value: country.tuitionFeeRange, Icon: Banknote })

  const duration = extractDuration(country.postStudyWorkVisa)
  if (duration)
    stats.push({ label: t('workRightsLabel'), value: duration, Icon: BadgeCheck })

  if (country.studentSatisfaction !== null && country.studentSatisfaction !== undefined)
    stats.push({ label: t('studentLife'), value: `${country.studentSatisfaction}%`, Icon: Star })

  if (country.internationalStudents !== null && country.internationalStudents !== undefined)
    stats.push({ label: t('internationalStudents').toUpperCase(), value: `${country.internationalStudents.toLocaleString()}+`, Icon: Users })

  if (country.graduateEmployability !== null && country.graduateEmployability !== undefined)
    stats.push({ label: t('employability'), value: `${country.graduateEmployability}%`, Icon: TrendingUp })

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
        <ExpandableOverviewText
          text={country.overview}
          wordLimit={100}
          seeMoreLabel={t('seeMore')}
          seeLessLabel={t('seeLess')}
        />
      )}

      {stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {stats.map(({ label, value, Icon }) => (
            <div
              key={label}
              className="relative rounded-2xl p-[1px] bg-gradient-to-br from-purple-200/70 via-white/20 to-purple-300/50
                shadow-[0_2px_16px_rgba(89,13,130,0.08)] hover:shadow-[0_8px_32px_rgba(89,13,130,0.16)]
                hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="relative rounded-[calc(1rem-1px)] bg-gradient-to-br from-purple-50/80 to-white px-4 py-4 h-full overflow-hidden">
                {/* Shine line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

                <p className="text-[9px] uppercase tracking-widest text-purple-400/80 font-semibold mb-2.5 whitespace-nowrap">
                  {label}
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#590D82] to-[#8B2FC9]
                    flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(89,13,130,0.35)]">
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="text-base md:text-lg font-bold text-brand-purple leading-none truncate">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
