'use client'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { FallbackImage } from '@/shared/components/common'
import type { UniversityCardData } from '../types'

interface Props {
  universities: UniversityCardData[]
  eyebrow: string
  title: string
  subtitle: string
  exploreLabel: string
}

export function PartnerUniversities({ universities, eyebrow, title, subtitle, exploreLabel }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardW = el.querySelector('[data-card]')?.clientWidth ?? 280
    el.scrollBy({ left: dir === 'left' ? -(cardW + 16) : cardW + 16, behavior: 'smooth' })
  }

  if (universities.length === 0) return null

  return (
    <div>
      {/* Section header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 bg-brand-purple-50 text-brand-purple text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
          {eyebrow}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{title}</h2>
        <p className="text-gray-500 text-sm md:text-base">{subtitle}</p>
      </div>

      <div className="relative overflow-x-clip">
        {/* Left arrow — overlaps left edge of track */}
        <button
          type="button"
          onClick={() => scroll('left')}
          aria-label="Previous universities"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-brand-purple hover:shadow-lg hover:border-gray-300 transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-3"
        >
          {universities.map((uni) => (
            <div
              key={uni.id}
              data-card
              className="snap-start flex-none w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-h-[220px]"
            >
              {/* Logo + name/city */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <FallbackImage
                    src={uni.logoUrl}
                    alt={uni.name}
                    className="w-full h-full object-contain"
                    fallbackClassName="w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-neutral-900 text-sm leading-snug mb-0.5">{uni.name}</h3>
                  {uni.city && (
                    <p className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      {uni.city}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-1">
                {uni.shortDescription && (
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {uni.shortDescription}
                  </p>
                )}
              </div>
              <Link
                href={`/universities/${uni.slug}`}
                className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-brand-purple border border-brand-purple/30 rounded-full px-4 py-1.5 hover:bg-brand-purple-50 transition-colors mt-auto w-fit"
              >
                {exploreLabel} →
              </Link>
            </div>
          ))}
        </div>

        {/* Right arrow — overlaps right edge of track */}
        <button
          type="button"
          onClick={() => scroll('right')}
          aria-label="Next universities"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-brand-purple hover:shadow-lg hover:border-gray-300 transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
