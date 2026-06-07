'use client'
import { REGIONS, REGION_TAB_LABELS } from '../utils/constants'

type RegionTranslations = {
  popularRegions: string
  regionAll: string
  regionEurope: string
  regionAsia: string
  regionAmericas: string
  regionOceania: string
  regionAfrica: string
}

interface Props {
  selected: string
  onChange: (region: string) => void
  translations: RegionTranslations
  counts: Record<string, number>
}

export function RegionFilter({ selected, onChange, translations: t, counts }: Props) {
  const labels: Record<string, string> = {
    regionAll: t.regionAll,
    regionEurope: t.regionEurope,
    regionAsia: t.regionAsia,
    regionAmericas: t.regionAmericas,
    regionOceania: t.regionOceania,
    regionAfrica: t.regionAfrica,
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
        {t.popularRegions}
      </p>
      <div className="flex gap-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-gray-200">
        {REGIONS.map((region) => {
          const labelKey = REGION_TAB_LABELS[region]
          const label = labels[labelKey] ?? region
          const count = region === 'All' ? counts._total : (counts[region] ?? 0)
          if (region !== 'All' && count === 0) return null
          const isActive = selected === region

          return (
            <button
              key={region}
              type="button"
              onClick={() => onChange(region)}
              className={`flex-none flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'border-brand-purple text-brand-purple'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              {label}
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                  isActive
                    ? 'bg-brand-purple-50 text-brand-purple'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
