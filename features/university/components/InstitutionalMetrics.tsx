import { Trophy, Users, Banknote, Building2, BookOpen, Briefcase, Clock, Calendar, Percent, Check } from 'lucide-react'
import type { ComponentType } from 'react'
import { getIntakeDisplay, getCurrencySymbol } from '../utils/universityUtils'
import { splitIntoBullets } from '@/shared/utils/text'

type MetricLabels = {
  sectionLabel: string
  globalRank: string
  totalStudents: string
  tuitionFees: string
  programs: string
  employability: string
  intlStudents: string
  intake: string
  campus: string
  workRights: string
  acceptanceRate: string
}

interface UniversityData {
  ranking: number | null
  totalStudents: number | null
  tuitionFeeMin: number | null
  tuitionFeeMax: number | null
  tuitionCurrency: string | null
  numberOfCampuses: number | null
  acceptanceRate: number | null
  graduateEmployability: number | null
  internationalStudents: number | null
  intakeMonths: string | null
  workRights: string | null
  programs: unknown[]
}

interface Props {
  university: UniversityData
  labels: MetricLabels
}

type MetricItem = {
  label: string
  value: string
  Icon: ComponentType<{ className?: string }>
  bullets?: string[]
  // Long free-text metrics (Work Rights, Intake) get their own row below the
  // compact stats, so their extra height doesn't stretch short-value tiles
  // that happen to share a grid row with them.
  wide?: boolean
}

function formatTuition(min: number | null, max: number | null, currency: string | null): string | null {
  if (min === null && max === null) return null
  const symbol = getCurrencySymbol(currency)
  const fmt = (n: number) => `${symbol} ${Math.round(n / 1000)}k`
  if (min !== null && max !== null) {
    if (min === max) return `${fmt(min)}/yr`
    return `${fmt(min)} – ${fmt(max)}`
  }
  if (min !== null) return `${fmt(min)}+`
  return max !== null ? `up to ${fmt(max)}` : null
}

function MetricTile({ label, value, Icon, bullets }: MetricItem) {
  const isLong = value.length > 24
  const isList = (bullets?.length ?? 0) > 1

  return (
    <div
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
        <div className={`flex gap-2.5 ${isLong ? 'items-start' : 'items-center'}`}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#590D82] to-[#8B2FC9]
            flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(89,13,130,0.35)]">
            <Icon className="w-3.5 h-3.5 text-white" />
          </div>
          {isList ? (
            <ul className="space-y-1 min-w-0">
              {bullets!.map((bullet) => (
                <li key={bullet} className="flex items-start gap-1.5 text-[10px] sm:text-xs font-bold text-brand-purple leading-snug">
                  <Check className="w-3 h-3 text-brand-purple-light flex-shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p
              className={`font-bold text-brand-purple leading-snug ${isLong ? 'text-[10px] sm:text-xs' : 'text-base md:text-lg'}`}
              title={value}
            >
              {value}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export function InstitutionalMetrics({ university, labels }: Props) {
  const metrics: MetricItem[] = []

  if (university.ranking !== null)
    metrics.push({ label: labels.globalRank, value: `#${university.ranking}`, Icon: Trophy })

  if (university.totalStudents !== null)
    metrics.push({ label: labels.totalStudents, value: `${university.totalStudents.toLocaleString()}+`, Icon: Users })

  const tuition = formatTuition(university.tuitionFeeMin, university.tuitionFeeMax, university.tuitionCurrency)
  if (tuition) metrics.push({ label: labels.tuitionFees, value: tuition, Icon: Banknote })

  if (university.numberOfCampuses !== null)
    metrics.push({ label: labels.campus, value: String(university.numberOfCampuses), Icon: Building2 })

  if (university.programs.length > 0)
    metrics.push({ label: labels.programs, value: `${university.programs.length}+`, Icon: BookOpen })

  if (university.graduateEmployability !== null)
    metrics.push({ label: labels.employability, value: `${university.graduateEmployability}%`, Icon: Briefcase })

  if (university.acceptanceRate !== null)
    metrics.push({ label: labels.acceptanceRate, value: `${university.acceptanceRate}%`, Icon: Percent })

  if (university.workRights) {
    const bullets = splitIntoBullets(university.workRights)
    metrics.push({
      label: labels.workRights,
      value: university.workRights,
      Icon: Clock,
      bullets: bullets.length > 1 ? bullets : undefined,
      wide: true,
    })
  }

  if (university.intakeMonths) {
    const { value, bullets } = getIntakeDisplay(university.intakeMonths)
    metrics.push({ label: labels.intake, value, Icon: Calendar, bullets, wide: true })
  }

  if (metrics.length === 0) return null

  const compactMetrics = metrics.filter((m) => !m.wide)
  const wideMetrics = metrics.filter((m) => m.wide)

  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-4">
        {labels.sectionLabel}
      </p>
      {compactMetrics.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {compactMetrics.map((metric) => (
            <MetricTile key={metric.label} {...metric} />
          ))}
        </div>
      )}
      {wideMetrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {wideMetrics.map((metric) => (
            <MetricTile key={metric.label} {...metric} />
          ))}
        </div>
      )}
    </div>
  )
}
