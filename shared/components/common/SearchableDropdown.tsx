'use client'
import { useState, useRef, useEffect, useMemo } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import type { DropdownOption } from './CustomDropdown'

interface Props {
  label?: string
  value: string
  options: DropdownOption[]
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  noResultsText?: string
  className?: string
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
}: Props) {
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
    if (isOpen) {
      setTimeout(() => searchRef.current?.focus(), 10)
    } else {
      setQuery('')
    }
  }, [isOpen])

  const filtered = useMemo(() => {
    if (!query.trim()) return options
    return options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
  }, [options, query])

  const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      {label && (
        <p className="text-[10px] uppercase text-start tracking-wider font-semibold text-gray-500 mb-1.5">
          {label}
        </p>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-gray-900 font-medium px-4 py-2.5 text-sm"
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
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
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/20"
              />
            </div>
          </div>

          {/* Options */}
          <div className="max-h-[200px] overflow-y-auto scrollbar-thin py-1">
            {!query && (
              <button
                type="button"
                onClick={() => { onChange(''); setIsOpen(false) }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  value === '' ? 'bg-brand-purple-50 text-brand-purple font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {placeholder}
              </button>
            )}
            {filtered.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setIsOpen(false) }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  value === opt.value ? 'bg-brand-purple-50 text-brand-purple font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-4 py-3 text-sm text-gray-400 text-center">{noResultsText}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
