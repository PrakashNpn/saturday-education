'use client'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'

export interface DropdownOption {
  value: string
  label: string
}

/** 'default' is the original look; 'field' matches the redesigned form
 *  controls, which read as a native select. */
type Variant = 'default' | 'field'

interface Props {
  label?: string
  value: string
  options: DropdownOption[]
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  size?: 'default' | 'compact'
  showPlaceholderOption?: boolean
  variant?: Variant
}

interface Placement {
  left: number
  width: number
  top: number
  bottomOffset: number
  maxHeight: number
  dropUp: boolean
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
  variant = 'default',
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [place, setPlace] = useState<Placement | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Position the panel relative to the trigger in viewport coordinates. Rendered in
  // a portal (fixed) so it can never be clipped by an ancestor's overflow, and it
  // flips above the trigger only when there genuinely isn't room below.
  const reposition = () => {
    const el = btnRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const margin = 6
    const spaceBelow = window.innerHeight - r.bottom - margin
    const spaceAbove = r.top - margin
    const dropUp = spaceBelow < 200 && spaceAbove > spaceBelow
    setPlace({
      left: r.left,
      width: r.width,
      top: r.bottom + margin,
      bottomOffset: window.innerHeight - r.top + margin,
      maxHeight: Math.max(140, Math.min(280, dropUp ? spaceAbove : spaceBelow)),
      dropUp,
    })
  }

  useEffect(() => {
    if (!isOpen) return
    reposition()
    const onMove = () => reposition()
    window.addEventListener('scroll', onMove, true)
    window.addEventListener('resize', onMove)
    return () => {
      window.removeEventListener('scroll', onMove, true)
      window.removeEventListener('resize', onMove)
    }
  }, [isOpen])

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      const t = e.target as Node
      if (btnRef.current?.contains(t) || panelRef.current?.contains(t)) return
      setIsOpen(false)
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
  const field = variant === 'field'
  const triggerPadding = size === 'compact' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2.5 text-sm'

  const labelCls = field
    ? 'mb-1.5 block text-label font-medium text-primary-text'
    : 'text-[10px] uppercase text-start tracking-wider font-semibold text-gray-500 mb-1.5'

  const fieldBox =
    'flex w-full items-center justify-between gap-2 rounded-[4px] border border-stroke bg-surface text-primary-text transition-colors hover:border-stroke-strong focus:border-action focus:ring-2 focus:ring-action/15 focus:outline-none'
  const triggerCls = field
    ? `${fieldBox} ${
        size === 'compact'
          ? 'px-3 py-1.5 text-label font-normal shadow-2xs'
          : 'px-3.5 py-2 text-body font-light'
      }`
    : `w-full flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-gray-900 font-medium ${triggerPadding}`

  const chevronCls = field
    ? 'size-4 shrink-0 text-muted-text transition-transform duration-150'
    : 'w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-150'

  const panelCls = field
    ? 'overflow-hidden rounded-sm border border-stroke bg-surface shadow-card'
    : 'bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden'

  const rowCls = (active: boolean) =>
    field
      ? `w-full px-3.5 py-2 text-left text-label transition-colors ${
          active ? 'bg-tint font-medium text-action' : 'text-secondary-text hover:bg-surface-0'
        }`
      : `w-full text-left px-4 py-2.5 text-sm transition-colors ${
          active ? 'bg-brand-purple-50 text-brand-purple font-semibold' : 'text-gray-700 hover:bg-gray-50'
        }`

  return (
    <div className={`relative ${className ?? ''}`}>
      {label && (
        <p className={labelCls}>
          {label}
        </p>
      )}

      <button
        ref={btnRef}
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={triggerCls}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          className={`${chevronCls} ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen &&
        place &&
        createPortal(
          <div
            ref={panelRef}
            style={{
              position: 'fixed',
              left: place.left,
              width: place.width,
              zIndex: 100,
              ...(place.dropUp ? { bottom: place.bottomOffset } : { top: place.top }),
            }}
            className={panelCls}
          >
            <div className="overflow-y-auto scrollbar-thin py-1" style={{ maxHeight: place.maxHeight }}>
              {showPlaceholderOption && (
                <button type="button" onClick={() => { onChange(''); setIsOpen(false) }} className={rowCls(value === '')}>
                  {placeholder}
                </button>
              )}
              {options.map((opt) => (
                <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setIsOpen(false) }} className={rowCls(value === opt.value)}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
