'use client'
import { useState } from 'react'
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
  const [draft, setDraft] = useState(searchValue)

  const submit = () => onSearchChange(draft)

  return (
    <div className="relative bg-gradient-to-b from-brand-purple via-purple-800 to-purple-900 pt-16 pb-8 md:pb-14 px-4 text-center overflow-visible">

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Centered radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Decorative rings — clipped to prevent horizontal scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-80 h-80 rounded-full border border-white/10" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-52 h-52 rounded-full border border-white/10" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-80 h-80 rounded-full border border-white/10" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-52 h-52 rounded-full border border-white/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto mb-6 md:mb-10">
        <div className="flex items-center justify-center gap-2 w-fit mx-auto bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
          <Globe className="w-3.5 h-3.5" />
          {t.heroLabel}
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          {t.heroTitle}
        </h1>
        <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
          {t.heroSubtitle}
        </p>
      </div>

      {/* Search bar — inline on mobile, overlaps on desktop */}
      <div className="relative z-20 px-0 md:absolute md:bottom-0 md:translate-y-1/2 md:left-0 md:right-0 md:px-4">
        <form
          onSubmit={(e) => { e.preventDefault(); submit() }}
          className="flex items-center bg-white rounded-2xl shadow-xl max-w-5xl mx-auto p-4 md:p-5 gap-3"
        >
          <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="flex-1 py-1.5 text-gray-700 bg-transparent focus:outline-none text-sm min-w-0"
          />
          <button
            type="submit"
            className="bg-brand-purple text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-brand-purple-dark transition-colors flex-shrink-0 whitespace-nowrap"
          >
            ✦ {t.searchButton}
          </button>
        </form>
      </div>
    </div>
  )
}
