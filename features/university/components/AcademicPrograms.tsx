'use client'
import { useState, useMemo } from 'react'
import { GraduationCap, Clock, MapPin, CalendarDays, Banknote, Receipt, ArrowRight, type LucideIcon } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { ALL_DEGREE_LEVELS, DEGREE_DISPLAY } from '../utils/universityUtils'

type Program = {
  id: string
  slug: string
  name: string
  degreeLevel: string
  field: string | null
  durationYears: number | null
  campus: string | null
  intakeMonths: string | null
  tuitionFeePerYear: string | null
  applicationFee: string | null
  learnMoreUrl: string | null
}

type Translations = {
  title: string
  degreeBachelors: string
  degreeMasters: string
  degreePhd: string
  degreeDiploma: string
  degreeAssociate: string
  degreeCertificate: string
  degreeFoundation: string
  year: string
  years: string
  duration: string
  campus: string
  intake: string
  tuitionFee: string
  appFee: string
  programDetails: string
}

type Stat = { key: string; icon: LucideIcon; label: string; value: string }

function getProgramStats(program: Program, t: Translations): Stat[] {
  const stats: Stat[] = []
  if (program.durationYears) {
    stats.push({
      key: 'duration',
      icon: Clock,
      label: t.duration,
      value: `${program.durationYears} ${program.durationYears === 1 ? t.year : t.years}`,
    })
  }
  if (program.campus) {
    stats.push({ key: 'campus', icon: MapPin, label: t.campus, value: program.campus })
  }
  if (program.intakeMonths) {
    stats.push({ key: 'intake', icon: CalendarDays, label: t.intake, value: program.intakeMonths })
  }
  if (program.tuitionFeePerYear) {
    stats.push({ key: 'tuition', icon: Banknote, label: t.tuitionFee, value: program.tuitionFeePerYear })
  }
  if (program.applicationFee) {
    stats.push({ key: 'appFee', icon: Receipt, label: t.appFee, value: program.applicationFee })
  }
  return stats
}

interface Props {
  programs: Program[]
  translations: Translations
  universitySlug: string
}

function getDegreeLabel(level: string, t: Translations): string {
  const key = DEGREE_DISPLAY[level] as keyof Translations | undefined
  return key ? t[key] : level
}

export function AcademicPrograms({ programs, translations: t, universitySlug }: Props) {
  const grouped = useMemo(() => {
    const map = new Map<string, Program[]>()
    for (const p of programs) {
      if (!map.has(p.degreeLevel)) map.set(p.degreeLevel, [])
      map.get(p.degreeLevel)!.push(p)
    }
    return map
  }, [programs])

  const tabs = ALL_DEGREE_LEVELS.filter((d) => grouped.has(d))
  const [activeTab, setActiveTab] = useState(tabs[0] ?? '')

  if (tabs.length === 0) return null

  const activePrograms = grouped.get(activeTab) ?? []

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6">{t.title}</h2>

      {/* Degree-level tabs with count */}
      <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map((level) => {
          const count = grouped.get(level)?.length ?? 0
          return (
            <button
              key={level}
              type="button"
              onClick={() => setActiveTab(level)}
              className={`flex items-center gap-1.5 text-sm font-medium pb-3 whitespace-nowrap shrink-0 transition-colors ${
                activeTab === level
                  ? 'text-brand-purple font-semibold border-b-2 border-brand-purple'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {getDegreeLabel(level, t).toUpperCase()}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === level
                  ? 'bg-brand-purple text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {activePrograms.map((program) => {
          const stats = getProgramStats(program, t)
          return (
          <div
            key={program.id}
            className="h-full flex flex-col p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start gap-3 pb-3">
              <div className="w-9 h-9 rounded-lg bg-brand-purple-100 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-4 h-4 text-brand-purple" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-brand-purple leading-snug">{program.name}</p>
                {program.field && (
                  <span className="inline-block mt-1.5 text-[10px] uppercase tracking-wider text-brand-purple bg-brand-purple-50 px-2 py-0.5 rounded-full font-semibold">
                    {program.field}
                  </span>
                )}
              </div>
            </div>

            {/* Stats — last item spans full width when the count is odd, so it never looks
                like an empty slot is missing next to it */}
            {stats.length > 0 && (
              <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5 py-3 border-t border-gray-100">
                {stats.map((stat, i) => {
                  const Icon = stat.icon
                  const isLastOdd = stats.length % 2 === 1 && i === stats.length - 1
                  return (
                    <div key={stat.key} className={isLastOdd ? 'col-span-2' : undefined}>
                      <dt className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                        <Icon className="w-3 h-3" />
                        {stat.label}
                      </dt>
                      <dd className="text-xs font-semibold text-neutral-900 mt-0.5">{stat.value}</dd>
                    </div>
                  )
                })}
              </dl>
            )}

            {/* CTA — pinned to the bottom so cards in the same row line up */}
            <div className="mt-auto pt-3 border-t border-gray-100">
              <Link
                href={`/universities/${universitySlug}/programs/${program.slug}`}
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-brand-purple-50 text-xs font-semibold text-brand-purple hover:bg-brand-purple-100 transition-colors"
              >
                {t.programDetails}
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
