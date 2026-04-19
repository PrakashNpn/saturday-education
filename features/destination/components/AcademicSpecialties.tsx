import { getTranslations } from 'next-intl/server'
import {
  Scale,
  TrendingUp,
  Monitor,
  Stethoscope,
  Cog,
  Palette,
  Building2,
  Brain,
  BarChart3,
  Mountain,
  Heart,
  Plane,
  Fish,
  BookOpen,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Props {
  specialties: string[]
}

function getIcon(specialty: string): LucideIcon {
  const s = specialty.toLowerCase()
  if (s.includes('law') || s.includes('juris')) return Scale
  if (s.includes('business') || s.includes('finance') || s.includes('mba')) return TrendingUp
  // arts/humanities checked BEFORE computer to avoid 'humanITies'.includes('it') false positive
  if (s.includes('arts') || s.includes('humanit') || s.includes('liberal')) return Palette
  if (s.includes('nurs')) return Heart
  if (s.includes('hospitality') || s.includes('tourism')) return Plane
  if (s.includes('marine') || s.includes('ocean')) return Fish
  if (s.includes('mining') || s.includes('geology')) return Mountain
  if (s.includes('computer') || s.includes('software') || s.includes('information tech')) return Monitor
  if (s.includes('medicine') || s.includes('medical') || s.includes('health')) return Stethoscope
  if (s.includes('engineer')) return Cog
  if (s.includes('architect')) return Building2
  if (s.includes('psych')) return Brain
  if (s.includes('data')) return BarChart3
  return BookOpen
}

export async function AcademicSpecialties({ specialties }: Props) {
  const t = await getTranslations('destinations')

  if (specialties.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
        {t('academicSpecialties')}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {specialties.map((specialty) => {
          const Icon = getIcon(specialty)
          return (
            <div
              key={specialty}
              className="flex flex-col items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-5 text-center hover:border-brand-purple/30 hover:bg-brand-purple-50/30 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center">
                <Icon className="w-5 h-5 text-brand-purple" />
              </div>
              <span className="text-sm font-medium text-neutral-800 leading-tight">{specialty}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
