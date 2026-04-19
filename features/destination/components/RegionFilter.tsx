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
}

export function RegionFilter({ selected, onChange, translations: t }: Props) {
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
      <h2 className="font-bold text-gray-900 text-lg mb-3">{t.popularRegions}</h2>
      <div className="flex flex-wrap gap-2">
        {REGIONS.map((region) => {
          const labelKey = REGION_TAB_LABELS[region]
          return (
            <button
              key={region}
              type="button"
              onClick={() => onChange(region)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selected === region
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {labels[labelKey] ?? region}
            </button>
          )
        })}
      </div>
    </div>
  )
}
