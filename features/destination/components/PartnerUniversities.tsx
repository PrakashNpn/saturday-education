'use client'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { FallbackImage } from '@/shared/components/common'
import type { UniversityCardData } from '../types'

interface Props {
  universities: UniversityCardData[]
  title: string
  exploreLabel: string
}

export function PartnerUniversities({ universities, title, exploreLabel }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (el) el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el?.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [universities])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardW = el.querySelector('[data-card]')?.clientWidth ?? 280
    el.scrollBy({ left: dir === 'left' ? -(cardW + 16) : cardW + 16, behavior: 'smooth' })
  }

  if (universities.length === 0) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">{title}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-brand-purple hover:text-brand-purple disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-brand-purple hover:text-brand-purple disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2"
      >
        {universities.map((uni) => (
          <div
            key={uni.id}
            data-card
            className="snap-start flex-none w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3"
          >
            {/* Logo */}
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <FallbackImage
                src={uni.logoUrl}
                alt={uni.name}
                className="w-full h-full object-contain"
                fallbackClassName="w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-neutral-900 text-sm leading-snug mb-1">{uni.name}</h3>
              {uni.city && (
                <p className="text-xs text-gray-400 mb-2">{uni.city}</p>
              )}
              {uni.shortDescription && (
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {uni.shortDescription}
                </p>
              )}
            </div>
            <Link
              href={`/universities/${uni.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-purple hover:underline mt-auto"
            >
              {exploreLabel} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
