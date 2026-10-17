'use client'
import { useState, useRef, useEffect, useMemo, type ReactNode } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import type { DropdownOption } from './CustomDropdown'

/** 'default' is the original look; 'field' matches the redesigned form
 *  controls, which read as a native select. */
type Variant = 'default' | 'field'

interface Props {
  label?: string
  value: string
  options: DropdownOption[]
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  noResultsText?: string
  className?: string
  /** Allow submitting free text that isn't in the options (passes the raw text to onChange). */
  allowCustom?: boolean
  /** Label for the free-text row; receives the typed text. Defaults to English. */
  customOptionLabel?: (query: string) => ReactNode
  variant?: Variant
  size?: 'default' | 'compact'
}

const STYLES: Record<Variant, Record<string, string>> = {
  default: {
    label: 'text-[10px] uppercase text-start tracking-wider font-semibold text-gray-500 mb-1.5',
    trigger:
      'w-full flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-gray-900 font-medium px-4 py-2.5 text-sm',
    chevron: 'w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-150',
    panel:
      'absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden',
    search:
      'w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/20',
    option: 'w-full text-left px-4 py-2.5 text-sm transition-colors',
    optionOn: 'bg-brand-purple-50 text-brand-purple font-semibold',
    optionOff: 'text-gray-700 hover:bg-gray-50',
    custom:
      'flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-brand-purple hover:bg-brand-purple-50/60',
    empty: 'px-4 py-3 text-sm text-gray-400 text-center',
  },
  field: {
    label: 'mb-1.5 block text-label font-medium text-primary-text',
    trigger:
      'flex w-full items-center justify-between gap-2 rounded-[4px] border border-stroke bg-surface text-primary-text transition-colors hover:border-stroke-strong focus:border-action focus:ring-2 focus:ring-action/15 focus:outline-none',
    chevron: 'size-4 shrink-0 text-muted-text transition-transform duration-150',
    panel:
      'absolute top-full right-0 left-0 z-50 mt-1 overflow-hidden rounded-sm border border-stroke bg-surface shadow-card',
    search:
      'w-full rounded-[4px] border border-stroke py-1.5 pr-3 pl-8 text-label outline-none focus:border-action focus:ring-2 focus:ring-action/15',
    option: 'w-full px-3.5 py-2 text-left text-label transition-colors',
    optionOn: 'bg-tint font-medium text-action',
    optionOff: 'text-secondary-text hover:bg-surface-0',
    custom:
      'flex w-full items-center gap-2 px-3.5 py-2 text-left text-label text-action hover:bg-tint/60',
    empty: 'px-3.5 py-3 text-center text-label text-muted-text',
  },
}

export function SearchableDropdown({
  label,
  value,
  options,
  onChange,
  placeholder = 'All',
  searchPlaceholder = 'Search...',
  noResultsText = 'No results found',
  className,
  allowCustom = false,
  customOptionLabel,
  variant = 'default',
  size = 'default',
}: Props) {
  const st = STYLES[variant]
  // The field variant carries no padding of its own, so the size below is the
  // only source of it and cannot be fighting a base class.
  const trigger =
    variant === 'field'
      ? `${st.trigger} ${
          size === 'compact'
            ? 'px-3 py-1.5 text-label font-normal shadow-2xs'
            : 'px-3.5 py-2 text-body font-light'
        }`
      : st.trigger
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  useEffect(() => {
    // Focus the search box on open (DOM side effect only; query is reset on toggle).
    if (isOpen) setTimeout(() => searchRef.current?.focus(), 10)
  }, [isOpen])

  const filtered = useMemo(() => {
    if (!query.trim()) return options
    return options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
  }, [options, query])

  const trimmed = query.trim()
  const hasExact = options.some((o) => o.label.toLowerCase() === trimmed.toLowerCase())
  const showCustom = allowCustom && trimmed.length > 0 && !hasExact

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? (value && allowCustom ? value : placeholder)

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      {label && (
        <p className={st.label}>{label}</p>
      )}

      <button
        type="button"
        onClick={() => { setIsOpen((v) => !v); setQuery('') }}
        className={trigger}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          className={`${st.chevron} ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className={st.panel}>
          {/* Search input */}
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className={st.search}
              />
            </div>
          </div>

          {/* Options */}
          <div className="max-h-[200px] overflow-y-auto scrollbar-thin py-1">
            {showCustom && (
              <button
                type="button"
                onClick={() => { onChange(trimmed); setIsOpen(false) }}
                className={st.custom}
              >
                <Search className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">
                  {customOptionLabel ? (
                    customOptionLabel(trimmed)
                  ) : (
                    <>
                      Get outlook for <span className="font-semibold">&ldquo;{trimmed}&rdquo;</span>
                    </>
                  )}
                </span>
              </button>
            )}
            {!query && (
              <button
                type="button"
                onClick={() => { onChange(''); setIsOpen(false) }}
                className={`${st.option} ${value === '' ? st.optionOn : st.optionOff}`}
              >
                {placeholder}
              </button>
            )}
            {filtered.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setIsOpen(false) }}
                className={`${st.option} ${value === opt.value ? st.optionOn : st.optionOff}`}
              >
                {opt.label}
              </button>
            ))}
            {filtered.length === 0 && !showCustom && (
              <p className={st.empty}>{noResultsText}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
