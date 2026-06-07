'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export interface DropdownOption {
  value: string
  label: string
}

interface Props {
  label?: string
  value: string
  options: DropdownOption[]
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  size?: 'default' | 'compact'
  showPlaceholderOption?: boolean
}

export function CustomDropdown({
  label,
  value,
  options,
  onChange,
  placeholder = 'All',
  className,
  size = 'default',
  showPlaceholderOption = true,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
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

  const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder

  const triggerPadding = size === 'compact' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2.5 text-sm'

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
        className={`w-full flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-gray-900 font-medium ${triggerPadding}`}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="max-h-[240px] overflow-y-auto scrollbar-thin py-1">
            {showPlaceholderOption && (
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
            {options.map((opt) => (
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
          </div>
        </div>
      )}
    </div>
  )
}
