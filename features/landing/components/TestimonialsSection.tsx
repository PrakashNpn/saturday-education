'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

// ── Data ──────────────────────────────────────────────────────────────────────

const TESTIMONIAL_META = [
  { id: '1', avatarColor: '#E8A87C' },
  { id: '2', avatarColor: '#D4B896' },
  { id: '3', avatarColor: '#DEB8A0' },
  { id: '4', avatarColor: '#C4A882' },
  { id: '5', avatarColor: '#E0C4A8' },
  { id: '6', avatarColor: '#D1A68C' },
  { id: '7', avatarColor: '#C9A07A' },
  { id: '8', avatarColor: '#D6B494' },
  { id: '9', avatarColor: '#E2BFA6' },
] as const

// ── Card ──────────────────────────────────────────────────────────────────────

function TestimonialCard({
  id,
  avatarColor,
}: {
  id: string
  avatarColor: string
}) {
  const t = useTranslations('Landing.testimonials')
  const name = t(`reviews.${id}.name` as Parameters<typeof t>[0])
  const quote = t(`reviews.${id}.quote` as Parameters<typeof t>[0])
  const program = t(`reviews.${id}.program` as Parameters<typeof t>[0])
  const initials = name
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className="
        flex-shrink-0 snap-start
        bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100
        flex flex-col justify-between min-h-[300px]
        w-[72vw] sm:w-[calc(42%-10px)] lg:w-[calc(24%-10px)]
        hover:scale-[1.03] hover:shadow-xl transition-all duration-300 ease-out
      "
    >
      {/* Stars */}
      <div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
          ))}
        </div>
        <p className="text-gray-700 text-sm leading-relaxed mt-4">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto pt-6 border-t border-gray-50">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: avatarColor }}
        >
          {initials}
        </div>
        <div>
          <p className="font-bold text-brand-purple text-sm">{name}</p>
          <p className="text-gray-500 text-xs">{program}</p>
        </div>
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  const t = useTranslations('Landing.testimonials')
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Infinite right-loop: silently jump back when we cross the midpoint of the
  // duplicated list — the two halves are identical so the jump is invisible.
  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const half = el.scrollWidth / 2
    if (el.scrollLeft >= half) {
      el.scrollLeft -= half
    }
  }, [])

  // Auto-slide — always scrolls right; infinite loop handled by handleScroll
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      const container = scrollRef.current
      if (!container) return
      const cardWidth =
        (container.firstElementChild as HTMLElement)?.offsetWidth ?? 300
      container.scrollBy({ left: cardWidth + 20, behavior: 'smooth' })
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused])

  const scroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return
    const cardWidth =
      (container.firstElementChild as HTMLElement)?.offsetWidth ?? 300
    const amount = direction === 'left' ? -(cardWidth + 20) : cardWidth + 20
    container.scrollBy({ left: amount, behavior: 'smooth' })
  }, [])

  const handleInteractionStart = () => setIsPaused(true)
  const handleInteractionEnd = () => {
    setTimeout(() => setIsPaused(false), 3000)
  }

  return (
    <section className="bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">

        {/* Heading */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="font-extrabold text-brand-purple"
            style={{ fontSize: 'clamp(2rem, 1.4rem + 3vw, 3.25rem)' }}
          >
            {t('heading')}
          </h2>
          <div className="w-16 h-1 bg-[#2D2B55] mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Carousel */}
        <div className="relative">

          {/* Left arrow */}
          <button
            onClick={() => scroll('left')}
            aria-label="Previous testimonials"
            className="hidden md:flex absolute -left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 md:px-8 py-3"
            onMouseEnter={handleInteractionStart}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            onScroll={handleScroll}
          >
            {/* Render list twice — second copy enables seamless right-loop */}
            {[...TESTIMONIAL_META, ...TESTIMONIAL_META].map((item, index) => (
              <TestimonialCard
                key={`${item.id}-${index}`}
                id={item.id}
                avatarColor={item.avatarColor}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll('right')}
            aria-label="Next testimonials"
            className="hidden md:flex absolute -right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>

        </div>
      </div>
    </section>
  )
}
