import { Trophy, Users, Banknote, Building2, BookOpen, Briefcase, Clock, Calendar } from 'lucide-react'
import type { ComponentType } from 'react'
import { getCurrencySymbol } from '../utils/universityUtils'

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
}

interface UniversityData {
  ranking: number | null
  totalStudents: number | null
  tuitionFeeMin: number | null
  tuitionFeeMax: number | null
  tuitionCurrency: string | null
  numberOfCampuses: number | null
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

function formatIntake(intakeMonths: string): string {
  return intakeMonths
    .split(/[,/]/)
    .map((m) => m.trim().slice(0, 3).toUpperCase())
    .join(', ')
}

function formatWorkRights(raw: string): string {
  const segment = raw.split(/\s+during\b|\s+on[-\s]campus\b|\./)[0]?.trim() ?? raw
  return segment.length > 20 ? segment.slice(0, 20).trimEnd() + '…' : segment
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

  if (university.workRights)
    metrics.push({ label: labels.workRights, value: formatWorkRights(university.workRights), Icon: Clock })

  if (university.intakeMonths)
    metrics.push({ label: labels.intake, value: formatIntake(university.intakeMonths), Icon: Calendar })

  if (metrics.length === 0) return null

  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-4">
        {labels.sectionLabel}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map(({ label, value, Icon }) => (
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
    </div>
  )
}
