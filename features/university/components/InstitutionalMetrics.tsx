import { Trophy, Users, Banknote, Building2, BookOpen, Briefcase, Clock, Calendar } from 'lucide-react'
import type { ComponentType } from 'react'

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

function formatTuition(min: number | null, max: number | null): string | null {
  if (min === null && max === null) return null
  const fmt = (n: number) => `$${Math.round(n / 1000)}k`
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

  const tuition = formatTuition(university.tuitionFeeMin, university.tuitionFeeMax)
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map(({ label, value, Icon }) => (
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
    </div>
  )
}
