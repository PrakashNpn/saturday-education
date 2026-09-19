'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/shared/utils/cn'

interface Section {
  id: string
  label: string
}

/** A section counts as current once its top edge is within this many pixels of
 *  the viewport top, measured off the design. It sits below the sticky header
 *  so the heading you are reading is the one highlighted. */
const ACTIVE_OFFSET = 180

const LINK =
  'shrink-0 text-label font-medium whitespace-nowrap transition-colors max-tablet:border-b-2 max-tablet:pb-1 lg:border-l-2 lg:px-3 lg:py-1.5'
const ACTIVE = 'text-action lg:border-action max-tablet:border-action'
const IDLE =
  'text-muted-text hover:text-primary-text lg:border-stroke max-tablet:border-transparent hover:lg:border-stroke-strong'

/** Vertical rail beside the content on desktop, horizontal scroller above it on
 *  tablet. Dropped below tablet entirely — on a phone this sat above the
 *  content eating vertical space for a jump-list nobody asked for; the
 *  sections it links to are unaffected; a deep link to `#process` etc. still
 *  lands correctly with the nav gone. The anchors are plain fragment links,
 *  so they still work before hydration and the highlight is only ever a
 *  progressive enhancement. */
export function DetailNav({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      // The last section to have crossed the line wins, so the highlight does
      // not flicker back when two headings are on screen at once.
      let current = sections[0]?.id ?? ''
      for (const { id } of sections) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = id
      }
      setActiveId(current)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [sections])

  return (
    <nav className="flex gap-4 overflow-x-auto pb-2 max-tablet:hidden lg:sticky lg:top-36 lg:flex-col lg:gap-1 lg:self-start lg:overflow-visible lg:pb-0">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={activeId === id ? 'true' : undefined}
          className={cn(LINK, activeId === id ? ACTIVE : IDLE)}
        >
          {label}
        </a>
      ))}
    </nav>
  )
}
