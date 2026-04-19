import { getTranslations } from 'next-intl/server'
import type { ScholarshipData } from '../types'

interface Props {
  scholarships: ScholarshipData[]
}

const BADGE: Record<string, string> = {
  FULL_FUNDING: 'bg-amber-100 text-amber-700',
  PARTIAL: 'bg-gray-100 text-gray-600',
  MERIT_BASED: 'bg-blue-100 text-blue-700',
}

export async function CountryScholarships({ scholarships }: Props) {
  const t = await getTranslations('destinations')

  if (scholarships.length === 0) return null

  function badgeLabel(type: string): string {
    if (type === 'FULL_FUNDING') return t('fullFunding')
    if (type === 'PARTIAL') return t('partialFunding')
    return t('meritFunding')
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">{t('fundingTitle')}</h2>
      <div className="grid md:grid-cols-2 gap-5">
        {scholarships.map((s) => (
          <div
            key={s.id}
            className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-brand-purple leading-snug">{s.name}</h3>
              <span
                className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full flex-shrink-0 ${BADGE[s.type] ?? BADGE.PARTIAL}`}
              >
                {badgeLabel(s.type)}
              </span>
            </div>
            {s.value && (
              <p className="text-xs font-medium text-gray-500">{s.value}</p>
            )}
            {s.description && (
              <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
            )}
            {s.learnMoreUrl && (
              <a
                href={s.learnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-purple hover:underline mt-auto"
              >
                {t('learnMore')} →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
