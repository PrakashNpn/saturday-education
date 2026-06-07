import { MapPin, ArrowRight } from 'lucide-react'
import { FallbackImage } from '@/shared/components/common'
import { Link } from '@/i18n/navigation'
import type { UniversityListItem } from '../types/university.types'
import { getCurrencySymbol } from '../utils/universityUtils'

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
  const symbol = getCurrencySymbol(u.tuitionCurrency)
  return `${symbol} ${(avg / 1000).toFixed(0)}k`
}

export function UniversityCard({ university: u, translations: t, index = 0 }: Props) {
  const avgTuition = formatAvgTuition(u)
  const rankLabel = u.ranking ? t.rankLabel.replace('{rank}', String(u.ranking)) : null
  const initial = u.name.charAt(0).toUpperCase()

  const stats = [
    avgTuition
      ? { label: t.avgCost, value: `${avgTuition}${t.perYear}` }
      : null,
    u.acceptanceRate !== null
      ? { label: t.acceptance, value: `${u.acceptanceRate}%` }
      : null,
    { label: t.courses, value: `${u._count.programs}+` },
    u.intakeMonths
      ? { label: t.intake, value: u.intakeMonths.split(',').map((m) => m.trim().slice(0, 3)).join(', ') }
      : null,
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div className="group relative rounded-[1.375rem] p-[1.5px] bg-gradient-to-br from-purple-200/80 via-white/30 to-purple-400/70 shadow-[0_4px_24px_rgba(89,13,130,0.10),0_1px_4px_rgba(89,13,130,0.06)] hover:shadow-[0_16px_48px_rgba(89,13,130,0.22),0_4px_16px_rgba(89,13,130,0.10)] hover:-translate-y-1 transition-all duration-300">

      {/* Inner card — no overflow-hidden so logo can float out of image */}
      <div className="bg-white rounded-[1.25rem] flex flex-col h-full">

        {/* Image — clips independently */}
        <div className="relative h-52 flex-shrink-0 overflow-hidden rounded-t-[1.25rem]">
          <FallbackImage
            src={u.coverImageUrl}
            alt={u.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            fallbackClassName="w-full h-full"
            fallbackBg={COVER_GRADIENTS[index % COVER_GRADIENTS.length]}
          />
          {/* Deep bottom-weighted overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          {/* Top-right subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-bl from-black/20 to-transparent" />

          {/* Rank badge — frosted glass */}
          {rankLabel && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/30 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20 uppercase tracking-wide">
              <span className="w-1 h-1 rounded-full bg-amber-400" />
              {rankLabel}
            </div>
          )}

          {/* Name + location — bottom of image, pb clears the logo overlap */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pt-4 pb-9">
            <h3 className="font-bold text-white text-sm leading-snug line-clamp-2 mb-1 drop-shadow-sm">
              {u.name}
            </h3>
            <div className="flex items-center gap-1 text-white/65 text-xs">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{[u.city, u.country.name].filter(Boolean).join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Card body — logo is positioned here so image overflow-hidden can't clip it */}
        <div className="relative flex flex-col flex-1 px-4 pt-11 pb-4">

          {/* Logo — left-aligned, straddles image/body boundary */}
          <div className="absolute -top-8 left-4 z-10
            w-16 h-16 rounded-xl bg-white
            shadow-[0_4px_16px_rgba(89,13,130,0.18),0_1px_4px_rgba(0,0,0,0.08)]
            border-2 border-white overflow-hidden flex items-center justify-center flex-shrink-0">
            {u.logoUrl ? (
              <img src={u.logoUrl} alt="" className="w-full h-full object-contain p-1.5" />
            ) : (
              <span className="text-brand-purple font-black text-base select-none">{initial}</span>
            )}
          </div>

          {/* Stats — purple-tinted glass pills */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {stats.map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-gradient-to-br from-purple-50 to-purple-50/40 border border-purple-100/60 rounded-xl px-3 py-2"
                >
                  <p className="text-[9px] uppercase tracking-widest text-purple-400/80 font-semibold mb-0.5 whitespace-nowrap">
                    {label}
                  </p>
                  <p className="text-sm font-bold text-brand-purple leading-tight truncate">{value}</p>
                </div>
              ))}
            </div>
          )}

          {/* View Details — gradient button */}
          <div className="mt-auto">
            <Link
              href={`/universities/${u.slug}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white
                bg-gradient-to-r from-[#590D82] to-[#8B2FC9]
                shadow-[0_2px_12px_rgba(89,13,130,0.3)]
                hover:shadow-[0_4px_20px_rgba(89,13,130,0.5)]
                hover:from-[#4A0A6E] hover:to-[#7B2AB5]
                active:scale-[0.98] transition-all duration-200"
            >
              {t.viewDetails}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
