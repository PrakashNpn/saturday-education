'use client'
import { Globe } from 'lucide-react'

interface Props {
  searchValue: string
  onSearchChange: (v: string) => void
  translations: {
    heroLabel: string
    heroTitle: string
    heroSubtitle: string
    searchPlaceholder: string
    searchButton: string
  }
}

export function DestinationsHero({ searchValue, onSearchChange, translations: t }: Props) {
  return (
    <div className="relative bg-gradient-to-b from-brand-purple via-purple-900 to-purple-950 pt-16 pb-10 text-center overflow-visible">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <p className="text-white/70 text-xs font-semibold tracking-[0.25em] uppercase mb-5">
          {t.heroLabel}
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
          {t.heroTitle}
        </h1>
        <p className="text-white/70 text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </p>
      </div>

      {/* Search bar — sits at the bottom edge of the hero, half overlapping the body */}
      <div className="absolute bottom-0 translate-y-1/2 left-0 right-0 z-20 px-4">
        <div className="flex items-center bg-white rounded-full shadow-xl max-w-5xl mx-auto px-4 py-3 gap-2">
          <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="flex-1 py-1.5 text-gray-700 bg-transparent focus:outline-none text-sm min-w-0"
          />
          <button
            type="button"
            className="bg-brand-purple text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-brand-purple-dark transition-colors flex-shrink-0 whitespace-nowrap"
          >
            ✦ {t.searchButton}
          </button>
        </div>
      </div>
    </div>
  )
}
