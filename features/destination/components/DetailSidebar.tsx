'use client'
import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'

interface Section {
  id: string
  label: string
}

interface Props {
  sections: Section[]
  guideName: string
  ctaTitle: string
  ctaLabel: string
}

export function DetailSidebar({ sections, guideName, ctaTitle, ctaLabel }: Props) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 flex flex-col gap-6">
        {/* Section navigation */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5">
            {guideName}
          </p>
          <nav className="space-y-0.5">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={`flex items-center gap-2.5 w-full text-left text-sm py-2 px-1 rounded transition-colors ${
                  activeId === id
                    ? 'text-brand-purple font-semibold'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                    activeId === id ? 'bg-brand-purple' : 'bg-gray-300'
                  }`}
                />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Compact CTA card */}
        <div className="rounded-2xl bg-gradient-to-b from-brand-purple to-purple-900 p-5 text-center">
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-base">✦</span>
          </div>
          <p className="text-white font-semibold text-sm leading-snug mb-4">{ctaTitle}</p>
          <Link
            href="/#consultation"
            className="block w-full text-center bg-white text-brand-purple text-xs font-bold px-4 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </aside>
  )
}
