'use client'
import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'

interface Section {
  id: string
  label: string
}

interface Props {
  sections: Section[]
  sidebarTitle: string
  ctaLabel: string
  ctaName: string
  ctaButton: string
}

export function UniDetailSidebar({ sections, sidebarTitle, ctaLabel, ctaName, ctaButton }: Props) {
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
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-4 bg-brand-purple rounded-full" />
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              {sidebarTitle}
            </p>
          </div>
          <nav className="space-y-1">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={`w-full text-left text-sm px-3 py-2.5 rounded-lg transition-all ${
                  activeId === id
                    ? 'bg-brand-purple text-white font-semibold shadow-sm'
                    : 'text-gray-500 hover:text-brand-purple hover:border-l-2 hover:border-brand-purple hover:pl-2.5'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="rounded-2xl bg-gradient-to-b from-brand-purple to-purple-900 p-5 text-center">
          <p className="text-purple-200 text-[10px] font-bold uppercase tracking-widest mb-1">
            {ctaLabel}
          </p>
          <p className="text-white font-bold text-sm leading-snug mb-4 line-clamp-2">
            {ctaName}
          </p>
          <Link
            href="/#consultation"
            className="block w-full text-center bg-white text-brand-purple text-xs font-bold px-4 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            {ctaButton}
          </Link>
        </div>
      </div>
    </aside>
  )
}
