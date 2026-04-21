import { DollarSign, UserCheck, BookOpen, Calendar, ArrowRight } from 'lucide-react'
import { FallbackImage } from '@/shared/components/common'
import { Link } from '@/i18n/navigation'
import type { UniversityListItem } from '../types/university.types'

const COVER_GRADIENTS = [
  'bg-gradient-to-br from-brand-purple to-purple-900',
  'bg-gradient-to-br from-purple-900 to-brand-purple-dark',
  'bg-gradient-to-tl from-brand-purple to-violet-900',
  'bg-gradient-to-br from-indigo-900 to-brand-purple',
]

interface Props {
  university: UniversityListItem
  translations: {
    avgCost: string
    acceptance: string
    courses: string
    intake: string
    programs: string
    viewDetails: string
    rankLabel: string
    perYear: string
  }
  index?: number
}

function formatAvgTuition(u: UniversityListItem): string | null {
  if (!u.tuitionFeeMin && !u.tuitionFeeMax) return null
  const avg = Math.round(
    ((u.tuitionFeeMin ?? u.tuitionFeeMax!) + (u.tuitionFeeMax ?? u.tuitionFeeMin!)) / 2,
  )
  return `$${(avg / 1000).toFixed(0)}k`
}

export function UniversityCard({ university: u, translations: t, index = 0 }: Props) {
  const avgTuition = formatAvgTuition(u)
  const rankLabel = u.ranking ? t.rankLabel.replace('{rank}', String(u.ranking)) : null

  const metrics = [
    avgTuition
      ? { icon: DollarSign, label: t.avgCost, value: `${avgTuition}${t.perYear}` }
      : null,
    u.acceptanceRate !== null
      ? { icon: UserCheck, label: t.acceptance, value: `${u.acceptanceRate}%` }
      : null,
    { icon: BookOpen, label: t.courses, value: `${u._count.programs}+` },
    u.intakeMonths
      ? {
          icon: Calendar,
          label: t.intake,
          value: u.intakeMonths.split(',').map((m) => m.trim().slice(0, 3)).join(', '),
        }
      : null,
  ].filter(Boolean) as { icon: React.ElementType; label: string; value: string }[]

  const initial = u.name.charAt(0).toUpperCase()

  return (
    // No overflow-hidden on outer card — lets logo break the image boundary
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">
      {/* Cover image — clipped independently */}
      <div className="relative h-40 md:h-44 flex-shrink-0 rounded-t-xl overflow-hidden">
        <FallbackImage
          src={u.coverImageUrl}
          alt={u.name}
          className="w-full h-full object-cover"
          fallbackClassName="w-full h-full"
          fallbackBg={COVER_GRADIENTS[index % COVER_GRADIENTS.length]}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {rankLabel && (
          <div className="absolute top-3 left-3 bg-brand-purple text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide shadow-sm">
            {rankLabel}
          </div>
        )}

        {/* Logo floats at bottom edge, half overflowing into card body */}
        <div className="absolute bottom-0 left-4 md:left-5 translate-y-1/2 z-10 w-11 h-11 rounded-xl bg-white shadow-md border-2 border-white overflow-hidden flex items-center justify-center flex-shrink-0">
          {u.logoUrl ? (
            <img src={u.logoUrl} alt="" className="w-full h-full object-contain p-1" />
          ) : (
            <span className="text-brand-purple font-black text-base select-none">{initial}</span>
          )}
        </div>
      </div>

      {/* Card body — extra top padding to clear the half-logo */}
      <div className="px-4 md:px-5 pt-8 pb-4 md:pb-5 flex flex-col flex-1">
        {/* University name */}
        <h3 className="font-bold text-sm text-brand-purple leading-snug mb-1 line-clamp-2">{u.name}</h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <svg className="w-3.5 h-3.5 flex-shrink-0 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{[u.city, u.country.name].filter(Boolean).join(', ')}</span>
        </div>

        {/* Metrics — flex-wrap so orphaned items expand instead of leaving empty cells */}
        <div className="flex flex-wrap gap-2 mb-5">
          {metrics.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex-1 min-w-[calc(50%-4px)] bg-white border border-gray-200 rounded-xl shadow-sm p-2.5"
            >
              <p className="text-[9px] uppercase tracking-wider font-semibold text-gray-400 mb-1.5">{label}</p>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-brand-purple-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3 h-3 text-brand-purple" />
                </div>
                <span className="text-sm font-bold text-brand-purple line-clamp-1">{value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View Details */}
        <div className="mt-auto">
          <Link
            href={`/universities/${u.slug}`}
            className="flex items-center justify-center gap-2 w-full text-center bg-brand-purple text-white rounded-full py-2.5 text-sm font-semibold hover:bg-brand-purple-dark transition-colors"
          >
            {t.viewDetails}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
