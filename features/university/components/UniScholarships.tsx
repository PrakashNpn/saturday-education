import { Award, Trophy, GraduationCap } from 'lucide-react'

type Scholarship = {
  id: string
  name: string
  type: string
  description: string | null
  value: string | null
}

type Translations = {
  title: string
  subtitle: string
  fullyFunded: string
  partial: string
  meritBased: string
}

interface Props {
  scholarships: Scholarship[]
  translations: Translations
}

type BadgeConfig = {
  label: string
  icon: React.ElementType
  iconBg: string
  iconColor: string
  valueBg: string
  valueColor: string
  badgeBg: string
  badgeColor: string
}

function getBadgeConfig(type: string, t: Translations): BadgeConfig {
  if (type === 'FULL_FUNDING') return {
    label: t.fullyFunded,
    icon: Trophy,
    iconBg: 'bg-brand-purple-100',
    iconColor: 'text-brand-purple',
    valueBg: 'bg-brand-purple-50',
    valueColor: 'text-brand-purple',
    badgeBg: 'bg-brand-purple-100',
    badgeColor: 'text-brand-purple',
  }
  if (type === 'MERIT_BASED') return {
    label: t.meritBased,
    icon: GraduationCap,
    iconBg: 'bg-brand-purple-100',
    iconColor: 'text-brand-purple',
    valueBg: 'bg-brand-purple-50',
    valueColor: 'text-brand-purple',
    badgeBg: 'bg-brand-purple-100',
    badgeColor: 'text-brand-purple',
  }
  return {
    label: t.partial,
    icon: Award,
    iconBg: 'bg-brand-purple-100',
    iconColor: 'text-brand-purple',
    valueBg: 'bg-brand-purple-50',
    valueColor: 'text-brand-purple',
    badgeBg: 'bg-brand-purple-50',
    badgeColor: 'text-brand-purple',
  }
}

export function UniScholarships({ scholarships, translations: t }: Props) {
  if (scholarships.length === 0) return null

  return (
    <div className="bg-brand-purple rounded-2xl p-8 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-white">{t.title}</h2>
      <p className="text-purple-200 mt-2 text-sm md:text-base">{t.subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        {scholarships.map((s) => {
          const cfg = getBadgeConfig(s.type, t)
          const Icon = cfg.icon
          return (
            <div key={s.id} className="bg-white rounded-xl border border-gray-100 p-5 flex gap-4">
              {/* Icon column */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}>
                <Icon className={`w-5 h-5 ${cfg.iconColor}`} />
              </div>

              {/* Content column */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-sm text-brand-purple leading-snug">{s.name}</h3>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${cfg.badgeBg} ${cfg.badgeColor}`}>
                    {cfg.label}
                  </span>
                </div>

                {s.value && (
                  <div className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-lg mb-2 ${cfg.valueBg} ${cfg.valueColor}`}>
                    {s.value}
                  </div>
                )}

                {s.description && (
                  <p className="text-xs text-gray-500 leading-relaxed">{s.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
