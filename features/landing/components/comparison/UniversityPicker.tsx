'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { ComparisonUniversity } from '@/features/landing/services/comparison-service'

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-3.5 z-10 size-4 -translate-y-1/2 text-muted-text"
    >
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M17 17L13.5 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/** Search field plus the result list. The design draws the field but not the
 *  list, so the list is styled from the same tokens as everything else. */
export function UniversityPicker({
  label,
  universities,
  selectedId,
  onSelect,
}: {
  label: string
  universities: ComparisonUniversity[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  const t = useTranslations('Landing.comparisonTool')
  const inputId = useId()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return universities
    return universities.filter(
      (u) => u.name.toLowerCase().includes(q) || u.country.toLowerCase().includes(q),
    )
  }, [query, universities])

  useEffect(() => {
    if (!open) return
    const onDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  return (
    <div ref={wrapRef} className="relative">
      <label className="sr-only" htmlFor={inputId}>
        {label}
      </label>
      <SearchIcon />
      <input
        id={inputId}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${inputId}-list`}
        autoComplete="off"
        placeholder={t('searchPlaceholder')}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => event.key === 'Escape' && setOpen(false)}
        className="w-full rounded-sm border border-stroke/70 bg-white/70 py-2 pr-4 pl-10 font-sans text-body font-light text-primary-text shadow-[0_1px_2px_rgba(0,51,58,0.05),0_8px_16px_-12px_rgba(0,51,58,0.25)] backdrop-blur-sm transition-colors placeholder:text-muted-text hover:border-action/40 focus:border-action focus:bg-white/90 focus:ring-2 focus:ring-action/15 focus:outline-none"
      />

      {open && (
        <ul
          id={`${inputId}-list`}
          role="listbox"
          className="absolute top-full right-0 left-0 z-30 mt-1 max-h-64 overflow-y-auto rounded-sm border border-stroke bg-surface py-1 shadow-lg"
        >
          {matches.length === 0 ? (
            <li className="px-3.5 py-2 text-label text-muted-text">{t('noResults')}</li>
          ) : (
            matches.map((u) => (
              <li key={u.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={u.id === selectedId}
                  onClick={() => {
                    onSelect(u.id)
                    setQuery('')
                    setOpen(false)
                  }}
                  className={`block w-full px-3.5 py-2 text-left text-label transition-colors hover:bg-surface-0 ${
                    u.id === selectedId ? 'font-medium text-action' : 'text-primary-text'
                  }`}
                >
                  {u.name}
                  <span className="block text-min font-normal text-muted-text">{u.country}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
