'use client'
import { useState, useMemo } from 'react'
import { GraduationCap, Clock } from 'lucide-react'

type Program = {
  id: string
  name: string
  degreeLevel: string
  field: string | null
  durationYears: number | null
}

type Translations = {
  title: string
  degreeBachelors: string
  degreeMasters: string
  degreePhd: string
  degreeDiploma: string
  degreeCertificate: string
  degreeFoundation: string
  year: string
  years: string
}

interface Props {
  programs: Program[]
  translations: Translations
}

const DEGREE_ORDER = ['BACHELOR', 'MASTER', 'PHD', 'DIPLOMA', 'CERTIFICATE', 'FOUNDATION']

function getDegreeLabel(level: string, t: Translations): string {
  const map: Record<string, string> = {
    BACHELOR: t.degreeBachelors,
    MASTER: t.degreeMasters,
    PHD: t.degreePhd,
    DIPLOMA: t.degreeDiploma,
    CERTIFICATE: t.degreeCertificate,
    FOUNDATION: t.degreeFoundation,
  }
  return map[level] ?? level
}

export function AcademicPrograms({ programs, translations: t }: Props) {
  const grouped = useMemo(() => {
    const map = new Map<string, Program[]>()
    for (const p of programs) {
      if (!map.has(p.degreeLevel)) map.set(p.degreeLevel, [])
      map.get(p.degreeLevel)!.push(p)
    }
    return map
  }, [programs])

  const tabs = DEGREE_ORDER.filter((d) => grouped.has(d))
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

      {/* TODO: Phase 7+ — Add tuition, app fee, and "View Course" link when program data is complete */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {activePrograms.map((program) => (
          <div
            key={program.id}
            className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <GraduationCap className="w-4 h-4 text-brand-purple" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-brand-purple leading-snug">{program.name}</p>
              <div className="flex items-center flex-wrap gap-2 mt-1.5">
                {program.field && (
                  <span className="text-[10px] uppercase tracking-wider text-brand-purple bg-brand-purple-50 px-2 py-0.5 rounded-full font-semibold">
                    {program.field}
                  </span>
                )}
                {program.durationYears && (
                  <span className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                    <Clock className="w-3 h-3" />
                    {program.durationYears} {program.durationYears === 1 ? t.year : t.years}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
