'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

// ── Data ──────────────────────────────────────────────────────────────────────

const TESTIMONIAL_META = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
  { id: '7' },
  { id: '8' },
  { id: '9' },
] as const

const avatarColors = [
  'bg-orange-400 text-white',
  'bg-amber-200 text-amber-800',
  'bg-rose-300 text-white',
  'bg-teal-400 text-white',
  'bg-violet-300 text-white',
  'bg-orange-300 text-white',
  'bg-amber-300 text-amber-800',
  'bg-rose-400 text-white',
  'bg-teal-300 text-white',
]

// ── Card ──────────────────────────────────────────────────────────────────────

function TestimonialCard({
  id,
  index,
}: {
  id: string
  index: number
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
        bg-white rounded-2xl border border-gray-100
        shadow-sm hover:shadow-md transition-shadow duration-300
        flex flex-col min-h-[340px] md:min-h-[380px]
        p-6 md:p-8
        w-[85%] sm:w-[47%] lg:w-[32%]
      "
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={18} fill="currentColor" className="text-yellow-400" />
        ))}
      </div>

      {/* Quote */}
      <p
        className="text-gray-900 leading-[1.7]"
        style={{ fontSize: 'clamp(1.05rem, 0.95rem + 0.5vw, 1.2rem)' }}
      >
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author — always at bottom */}
      <div className="flex items-center gap-3 mt-auto pt-6">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${avatarColors[index % avatarColors.length]}`}
        >
          {initials}
        </div>
        <div>
          <p
            className="font-semibold text-brand-purple"
            style={{ fontSize: 'clamp(0.95rem, 0.85rem + 0.3vw, 1.05rem)' }}
          >
            {name}
          </p>
          <p className="text-gray-500 text-sm">{program}</p>
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
      container.scrollBy({ left: cardWidth + 24, behavior: 'smooth' })
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused])

  const scroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return
    const cardWidth =
      (container.firstElementChild as HTMLElement)?.offsetWidth ?? 300
    const amount = direction === 'left' ? -(cardWidth + 24) : cardWidth + 24
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
            style={{ fontSize: 'clamp(2rem, 1.4rem + 3vw, 3rem)' }}
          >
            {t('heading')}
          </h2>
          <div className="w-16 h-1 bg-[#2D2B55] mx-auto mt-4 mb-12 rounded-full" />
        </motion.div>

        {/* Carousel */}
        <div className="relative">

          {/* Left arrow */}
          <button
            onClick={() => scroll('left')}
            aria-label="Previous testimonials"
            className="hidden md:flex absolute -left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-brand-purple hover:text-gray-900 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            role="region"
            aria-label="Customer testimonials"
            aria-live="polite"
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-3"
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
                index={index % TESTIMONIAL_META.length}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll('right')}
            aria-label="Next testimonials"
            className="hidden md:flex absolute -right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-brand-purple hover:text-gray-900 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
          >
            <ChevronRight size={20} />
          </button>

        </div>
      </div>
    </section>
  )
}
