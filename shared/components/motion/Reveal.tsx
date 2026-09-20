'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const EASE = [0, 0, 0.2, 1] as const

interface Props {
  children: ReactNode
  /** Extra delay in seconds, for sequencing several Reveals close together. */
  delay?: number
  className?: string
}

/**
 * Generic scroll-reveal wrapper: fades up once when scrolled into view, using
 * the same motion language already established on the homepage (WhySaturday,
 * Faq, GlobalLeaders — 0.5s, one shared ease curve, `once: true`).
 *
 * Exists so a server component that fetches its own data (via
 * `next-intl/server`, Prisma, etc.) can still get the site's standard
 * entrance animation without becoming a client component itself — a server
 * component's rendered output can be passed as `children` into this client
 * wrapper without issue, so only the call site needs to change.
 */
export function Reveal({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
