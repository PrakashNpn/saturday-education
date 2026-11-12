'use client'
import { useId, useState, useRef, useEffect, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown } from 'lucide-react'

export interface DropdownOption {
  value: string
  label: string
}

/** 'default' is the original look; 'field' matches the redesigned form
 *  controls, which read as a native select; 'field-glass' is 'field' restyled
 *  as a full pill for the liquid-glass course finder card. */
type Variant = 'default' | 'field' | 'field-glass' | 'rounded-field'

interface Props {
  label?: string
  value: string
  options: DropdownOption[]
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  /** 'form' matches the height and type of a text field in a form grid. */
  size?: 'default' | 'compact' | 'form'
  showPlaceholderOption?: boolean
  variant?: Variant
  required?: boolean
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
  required = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [place, setPlace] = useState<Placement | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const [activeIndex, setActiveIndex] = useState(0)
  const isRounded = variant === 'rounded-field'
  const entries = showPlaceholderOption ? [{ value: '', label: placeholder }, ...options] : options
  const selectedIndex = Math.max(0, entries.findIndex(option => option.value === value))

  function handleKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (!isRounded || !entries.length) return
    let next = activeIndex
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault()
      next = event.key === 'Home' ? 0 : event.key === 'End' ? entries.length - 1 : !isOpen ? selectedIndex
        : Math.max(0, Math.min(entries.length - 1, activeIndex + (event.key === 'ArrowDown' ? 1 : -1)))
      setActiveIndex(next)
      setIsOpen(true)
      requestAnimationFrame(() => document.getElementById(`${menuId}-${next}`)?.scrollIntoView({ block: 'nearest' }))
    } else if (isOpen && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      onChange(entries[activeIndex].value)
      setIsOpen(false)
    } else if (event.key === 'Tab' || event.key === 'Escape') {
      setIsOpen(false)
    }
  }

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
  const isField = variant === 'field' || variant === 'field-glass' || isRounded
  const isGlass = variant === 'field-glass'
  const triggerPadding = size === 'compact' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2.5 text-sm'

  const labelCls = isRounded ? 'mb-1.5 block text-label font-medium text-primary-text' : isField
    ? 'mb-1.5 block text-label font-medium text-primary-text'
    : 'text-[10px] uppercase text-start tracking-wider font-semibold text-gray-500 mb-1.5'

  const fieldBox =
    'flex w-full items-center justify-between gap-2 rounded-[4px] border border-stroke bg-surface text-primary-text transition-colors hover:border-stroke-strong focus:border-action focus:ring-2 focus:ring-action/15 focus:outline-none'
  // Translucent full pill so the card's own glass wash still shows through,
  // rather than a flat white box sitting on top of it.
  const glassBox =
    'flex w-full items-center justify-between gap-2 rounded-sm border border-stroke/70 bg-white/70 text-primary-text shadow-[0_1px_2px_rgba(0,51,58,0.05),0_8px_16px_-12px_rgba(0,51,58,0.25)] backdrop-blur-sm transition-colors hover:border-action/40 focus:border-action focus:ring-2 focus:ring-action/15 focus:outline-none'
  const triggerCls = isRounded
    ? 'flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-stroke-strong/75 bg-canvas/60 px-3 py-2 text-left text-body font-normal leading-6 text-primary-text outline-none transition-colors hover:border-action/40 focus:border-action focus:bg-surface focus:ring-2 focus:ring-action/15'
    : isGlass
    ? `${glassBox} ${
        size === 'compact'
          ? 'px-3.5 py-1.5 text-label font-normal'
          : size === 'form'
          ? 'px-3.5 py-2 text-body font-light'
          : 'px-4 py-2.5 text-body font-normal'
      }`
    : isField
    ? `${fieldBox} ${
        size === 'compact'
          ? 'px-3 py-1.5 text-label font-normal shadow-2xs'
          : 'px-3.5 py-2 text-body font-light'
      }`
    : `w-full flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-gray-900 font-medium ${triggerPadding}`

  const chevronCls = isField
    ? 'size-4 shrink-0 text-muted-text transition-transform duration-150'
    : 'w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-150'

  const panelCls = isRounded
    ? 'overflow-hidden rounded-2xl border border-stroke bg-surface p-1.5 shadow-[0_12px_32px_-10px_rgba(0,51,58,0.25)]'
    : isGlass
    ? 'overflow-hidden rounded-md border border-stroke bg-surface shadow-card'
    : isField
    ? 'overflow-hidden rounded-sm border border-stroke bg-surface shadow-card'
    : 'bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden'

  const rowCls = (active: boolean) =>
    isRounded
      ? `flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-label transition-colors ${active ? 'bg-tint font-semibold text-action' : 'text-secondary-text hover:bg-tint/70'}`
      : isField
      ? `w-full px-3.5 py-2 text-left text-label transition-colors ${
          active ? 'bg-tint font-medium text-action' : 'text-secondary-text hover:bg-surface-0'
        }`
      : `w-full text-left px-4 py-2.5 text-sm transition-colors ${
          active ? 'bg-brand-purple-50 text-brand-purple font-semibold' : 'text-gray-700 hover:bg-gray-50'
        }`

  return (
    <div className={`relative ${className ?? ''}`}>
      {label && (
        <p id={`${menuId}-label`} className={labelCls}>
          {label}{required && <span aria-hidden="true" className="ml-1 text-action">*</span>}
        </p>
      )}

      <button
        ref={btnRef}
        type="button"
        onClick={() => { setActiveIndex(selectedIndex); setIsOpen((v) => !v) }}
        onKeyDown={handleKeyDown}
        role={isRounded ? 'combobox' : undefined}
        aria-labelledby={isRounded && label ? `${menuId}-label` : undefined}
        aria-haspopup={isRounded ? 'listbox' : undefined}
        aria-expanded={isRounded ? isOpen : undefined}
        aria-controls={isRounded ? menuId : undefined}
        aria-activedescendant={isRounded && isOpen ? `${menuId}-${activeIndex}` : undefined}
        aria-required={isRounded ? required : undefined}
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
            <div id={menuId} role={isRounded ? 'listbox' : undefined} aria-labelledby={isRounded && label ? `${menuId}-label` : undefined} className="overflow-y-auto scrollbar-thin py-1" style={{ maxHeight: place.maxHeight }}>
              {entries.map((opt,index) => (
                <button key={opt.value} id={`${menuId}-${index}`} type="button" role={isRounded ? 'option' : undefined} aria-selected={isRounded ? value === opt.value : undefined} tabIndex={isRounded ? -1 : undefined}
                  onMouseDown={event => { if (isRounded) event.preventDefault() }}
                  onClick={() => { onChange(opt.value); setIsOpen(false); if (isRounded) btnRef.current?.focus() }}
                  className={`${rowCls(value === opt.value)} ${isRounded && activeIndex === index ? 'outline -outline-offset-2 outline-action/40' : ''}`}>
                  <span>{opt.label}</span>{isRounded && value === opt.value && <Check size={16} className="shrink-0" aria-hidden="true" />}
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
