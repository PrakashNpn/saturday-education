'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Search } from 'lucide-react'
import * as Flags from 'country-flag-icons/react/3x2'

type FlagComponent = React.ComponentType<{ title?: string; className?: string }>

interface Option {
  value?: string
  label: string
  divider?: boolean
}

interface Props {
  name?: string
  value?: string
  onChange: (value?: string) => void
  onFocus?: () => void
  onBlur?: () => void
  options: Option[]
  disabled?: boolean
  readOnly?: boolean
  'aria-label'?: string
}

interface Placement {
  left: number
  width: number
  top: number
  bottomOffset: number
  maxHeight: number
  dropUp: boolean
}

function FlagIcon({ code }: { code?: string }) {
  const Flag = code ? (Flags as Record<string, FlagComponent>)[code] : undefined
  if (!Flag) {
    // "International" (no country selected yet) — a plain placeholder,
    // same footprint as a real flag so the trigger doesn't jump in size.
    return <span aria-hidden="true" className="block size-4 shrink-0 rounded-[2px] bg-surface-1" />
  }
  return <Flag title={code} className="size-4 shrink-0 rounded-[2px]" />
}

/**
 * Custom countrySelectComponent for react-phone-number-input's <PhoneInput>.
 * Its own default renders a native <select>, whose open dropdown is entirely
 * OS-drawn and ignores our CSS — tolerable for a handful of options, but this
 * list has ~240 countries, which is what actually looked unstyled. Portal
 * rendered (like CustomDropdown) because this sits inside the consultation
 * form's `overflow-hidden` card, where a plain absolutely positioned panel
 * would get clipped — plus a search box, since scrolling 240 entries isn't
 * practical on its own.
 */
export function PhoneCountrySelect({
  value,
  onChange,
  onFocus,
  onBlur,
  options,
  disabled,
  readOnly,
  'aria-label': ariaLabel,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [place, setPlace] = useState<Placement | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const reposition = () => {
    const el = btnRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const margin = 6
    const spaceBelow = window.innerHeight - r.bottom - margin
    const spaceAbove = r.top - margin
    const dropUp = spaceBelow < 260 && spaceAbove > spaceBelow
    setPlace({
      left: r.left,
      width: Math.max(260, r.width),
      top: r.bottom + margin,
      bottomOffset: window.innerHeight - r.top + margin,
      maxHeight: Math.max(160, Math.min(320, dropUp ? spaceAbove : spaceBelow)),
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

  useEffect(() => {
    if (isOpen) setTimeout(() => searchRef.current?.focus(), 10)
  }, [isOpen])

  // Firmli's own widget aside, this library's own "divider" rows and the
  // valueless "International" placeholder option aren't real countries.
  const countries = useMemo(() => options.filter((o) => !o.divider && o.value), [options])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return countries
    return countries.filter((o) => o.label.toLowerCase().includes(q))
  }, [countries, query])

  const selected = countries.find((o) => o.value === value)

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        disabled={disabled || readOnly}
        aria-label={ariaLabel ?? 'Select country'}
        onClick={() => {
          setIsOpen((v) => !v)
          setQuery('')
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        className="flex h-full items-center gap-1.5 rounded-sm border border-stroke/70 bg-white/70 px-2.5 shadow-[0_1px_2px_rgba(0,51,58,0.05),0_8px_16px_-12px_rgba(0,51,58,0.2)] backdrop-blur-sm transition-colors hover:border-action/40 focus:border-action focus:bg-white/90 focus:ring-2 focus:ring-action/15 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FlagIcon code={selected?.value} />
        <ChevronDown
          className={`size-3.5 shrink-0 text-muted-text transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
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
            className="overflow-hidden rounded-sm border border-stroke bg-surface shadow-card"
          >
            <div className="border-b border-stroke p-2">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-text" />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search countries"
                  className="w-full rounded-[4px] border border-stroke py-1.5 pr-3 pl-8 text-label outline-none focus:border-action focus:ring-2 focus:ring-action/15"
                />
              </div>
            </div>
            <div className="overflow-y-auto scrollbar-thin py-1" style={{ maxHeight: place.maxHeight }}>
              {filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value)
                    setIsOpen(false)
                  }}
                  className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-label transition-colors ${
                    value === opt.value
                      ? 'bg-tint font-medium text-action'
                      : 'text-secondary-text hover:bg-surface-0'
                  }`}
                >
                  <FlagIcon code={opt.value} />
                  <span className="truncate">{opt.label}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-3.5 py-3 text-center text-label text-muted-text">No countries found</p>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
