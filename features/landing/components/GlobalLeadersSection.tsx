'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

// ── Data ──────────────────────────────────────────────────────────────────────

const COUNTRIES = [
  {
    slug: 'united-kingdom',
    name: 'United Kingdom',
    tagline: 'Excellence in Heritage',
    image: '/images/landing/countries/uk.jpg',
  },
  {
    slug: 'australia',
    name: 'Australia',
    tagline: 'Innovation & Lifestyle',
    image: '/images/landing/countries/australia.jpg',
  },
  {
    slug: 'usa',
    name: 'USA',
    tagline: 'Land of Global Reach',
    image: '/images/landing/countries/usa.webp',
  },
  {
    slug: 'canada',
    name: 'Canada',
    tagline: 'Multicultural & Welcoming',
    image: '/images/landing/countries/canada.jpg',
  },
  {
    slug: 'new-zealand',
    name: 'New Zealand',
    tagline: 'Nature & Quality Research',
    image: '/images/landing/countries/new-zeland.jpg', // filename has typo in original file
  },
  {
    slug: 'switzerland',
    name: 'Switzerland',
    tagline: 'Global Hub for Hospitality',
    image: '/images/landing/countries/switzerland.jpg',
  },
]

// ── Main component ─────────────────────────────────────────────────────────────

export default function GlobalLeadersSection() {
  const t = useTranslations('Landing.globalLeaders')

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <section className="bg-neutral-100 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row: heading+subtitle left, link right */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2
              className="font-extrabold text-brand-purple leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 3rem)' }}
            >
              {t('heading')}
            </h2>
            <p className="text-base sm:text-lg text-gray-500 mt-3 max-w-xl">
              {t('subtitle')}
            </p>
          </div>
          <Link
            href="/destinations"
            className="flex items-center gap-1 text-brand-purple font-bold text-sm sm:text-base hover:underline shrink-0"
          >
            {t('viewAll')}
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Cards grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {COUNTRIES.map((country, index) => (
            <motion.div
              key={country.slug}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] as const }
              }
            >
              <Link href={`/destinations/${country.slug}`} className="block group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  {/* Country image */}
                  <Image
                    src={country.image}
                    alt={`Study in ${country.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-800/30 to-transparent" />
                  {/* Text */}
                  <div className="absolute bottom-0 left-0 p-4 sm:p-5">
                    <p className="text-xl sm:text-2xl font-bold text-white leading-tight">
                      {country.name}
                    </p>
                    <p className="text-sm sm:text-base text-white/90 mt-1">
                      {country.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
