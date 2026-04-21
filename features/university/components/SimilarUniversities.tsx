'use client'

import { useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { UniversityCard } from './UniversityCard'
import type { SimilarUniversity, UniversityListItem } from '../types/university.types'

type CardTranslations = {
  avgCost: string
  acceptance: string
  courses: string
  intake: string
  programs: string
  viewDetails: string
  rankLabel: string
  perYear: string
}

type Translations = {
  title: string
  card: CardTranslations
}

interface Props {
  universities: SimilarUniversity[]
  translations: Translations
}

export function SimilarUniversities({ universities, translations: t }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return
    const card = container.firstElementChild as HTMLElement
    const amount = direction === 'left' ? -(card.offsetWidth + 24) : card.offsetWidth + 24
    container.scrollBy({ left: amount, behavior: 'smooth' })
  }, [])

  if (universities.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6">{t.title}</h2>

      <div className="flex items-center gap-4">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          aria-label="Previous universities"
          className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-brand-purple hover:text-gray-900 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex-1 min-w-0 flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-3"
        >
          {universities.map((uni) => (
            <div key={uni.id} className="flex-shrink-0 snap-start w-[85%] sm:w-[47%]">
              <UniversityCard
                university={uni as unknown as UniversityListItem}
                translations={t.card}
              />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          aria-label="Next universities"
          className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-brand-purple hover:text-gray-900 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
