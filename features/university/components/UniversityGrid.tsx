'use client'
import { motion } from 'framer-motion'
import type { UniversityListItem } from '../types/university.types'
import { UniversityCard } from './UniversityCard'

interface Props {
  universities: UniversityListItem[]
  noResultsText: string
  cardTranslations: {
    avgCost: string
    tuitionLabel: string
    acceptance: string
    courses: string
    intake: string
    programs: string
    viewDetails: string
    rankLabel: string
    perYear: string
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

export function UniversityGrid({ universities, noResultsText, cardTranslations }: Props) {
  if (universities.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500">
        <p>{noResultsText}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {universities.map((u, i) => (
        <motion.div
          key={u.id}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="show"
        >
          <UniversityCard university={u} translations={cardTranslations} index={i} />
        </motion.div>
      ))}
    </div>
  )
}
