'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'

// A styled single-select.
//
// A native <select> was the first attempt and it is the right call in a lot of
// places, but its option list is drawn by the operating system: the blue
// highlight, the system font and the scrollbar cannot be themed at all, so it
// broke the look of the card it sits in. This is the listbox pattern instead,
// which is ours to style, and it keeps the keyboard behaviour a select has:
// Enter, Space or arrow keys to open, arrows to move, Home and End to jump,
// type a letter to skip ahead, Enter to choose, Escape to dismiss.

export type SelectOption = { value: string; label: string }

interface Props {
  label: string
  /** Shown when nothing is chosen, and offered as the first option to clear. */
  placeholder: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
}

export function SelectMenu({ label, placeholder, options, value, onChange }: Props) {
  const prefersReducedMotion = useReducedMotion()

  const baseId = useId()
  const labelId = `${baseId}-label`
  const listboxId = `${baseId}-listbox`

  const [isOpen, setIsOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const typeahead = useRef({ query: '', at: 0 })

  // The placeholder is a real row so the choice can be undone with the keyboard
  // alone, the way a select's empty option behaves.
  const rows: SelectOption[] = [{ value: '', label: placeholder }, ...options]
  const selectedIndex = Math.max(rows.findIndex((row) => row.value === value), 0)
  const selectedLabel = rows[selectedIndex]?.label ?? placeholder

  function open(startAt = selectedIndex) {
    setHighlighted(startAt)
    setIsOpen(true)
  }

  function commit(index: number) {
    const row = rows[index]
    if (row) onChange(row.value)
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  // Close on an outside press. Pointerdown rather than click so the menu is gone
  // before the next element reacts.
  useEffect(() => {
    if (!isOpen) return
    function handle(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener('pointerdown', handle)
    return () => document.removeEventListener('pointerdown', handle)
  }, [isOpen])

  // Keep the active row in view while arrowing through a long list.
  useEffect(() => {
    if (!isOpen) return
    listRef.current
      ?.querySelector(`[data-index="${highlighted}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [isOpen, highlighted])

  function handleKeyDown(event: React.KeyboardEvent) {
    const { key } = event

    if (!isOpen) {
      if (key === 'Enter' || key === ' ' || key === 'ArrowDown' || key === 'ArrowUp') {
        event.preventDefault()
        open()
      }
      return
    }

    if (key === 'Escape' || key === 'Tab') {
      setIsOpen(false)
      return
    }
    if (key === 'Enter' || key === ' ') {
      event.preventDefault()
      commit(highlighted)
      return
    }
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      event.preventDefault()
      const step = key === 'ArrowDown' ? 1 : -1
      setHighlighted((current) => Math.min(Math.max(current + step, 0), rows.length - 1))
      return
    }
    if (key === 'Home' || key === 'End') {
      event.preventDefault()
      setHighlighted(key === 'Home' ? 0 : rows.length - 1)
      return
    }

    // Typeahead: repeated presses of one letter cycle through its matches,
    // different letters build up a prefix.
    if (key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      const now = Date.now()
      const state = typeahead.current
      state.query = now - state.at > 800 ? key : state.query + key
      state.at = now

      const query = state.query.toLowerCase()
      const repeated = query.length > 1 && query.split('').every((char) => char === query[0])
      const needle = repeated ? query[0] : query

      const offset = repeated || query.length === 1 ? highlighted + 1 : 0
      const match = rows.findIndex((row, index) =>
        index >= offset && row.label.toLowerCase().startsWith(needle),
      )
      const wrapped = match >= 0
        ? match
        : rows.findIndex((row) => row.label.toLowerCase().startsWith(needle))

      if (wrapped >= 0) setHighlighted(wrapped)
    }
  }

  return (
    <div className="flex flex-col gap-2" ref={wrapperRef}>
      <span id={labelId} className="text-sm font-medium text-gray-600">
        {label}
      </span>

      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={labelId}
          aria-activedescendant={isOpen ? `${baseId}-option-${highlighted}` : undefined}
          onClick={() => (isOpen ? setIsOpen(false) : open())}
          onKeyDown={handleKeyDown}
          className={`w-full flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left cursor-pointer transition-colors duration-150 outline-none ${
            isOpen
              ? 'bg-white border-brand-purple ring-2 ring-brand-purple/15'
              : 'bg-gray-100 border-transparent hover:bg-gray-200/70 focus-visible:bg-white focus-visible:border-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/15'
          }`}
        >
          <span className={`truncate ${value ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
            {selectedLabel}
          </span>
          <motion.span
            aria-hidden
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
            className="shrink-0 text-gray-400"
          >
            <ChevronDown size={18} />
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              aria-labelledby={labelId}
              tabIndex={-1}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="scrollbar-thin absolute z-40 top-full left-0 right-0 mt-2 max-h-64 overflow-y-auto overscroll-contain rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl shadow-gray-900/10"
            >
              {rows.map((row, index) => {
                const isSelected = row.value === value
                const isActive = index === highlighted
                return (
                  <li key={row.value || 'all'}>
                    <button
                      type="button"
                      id={`${baseId}-option-${index}`}
                      data-index={index}
                      role="option"
                      aria-selected={isSelected}
                      // The trigger keeps focus, so hover only paints.
                      onPointerEnter={() => setHighlighted(index)}
                      onClick={() => commit(index)}
                      className={`w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm cursor-pointer transition-colors duration-100 ${
                        isActive ? 'bg-brand-purple-50' : ''
                      } ${
                        isSelected ? 'text-brand-purple font-semibold' : 'text-gray-700'
                      } ${!row.value && !isSelected ? 'text-gray-400' : ''}`}
                    >
                      <span className="truncate">{row.label}</span>
                      {isSelected && <Check size={16} className="shrink-0 text-brand-purple" />}
                    </button>
                  </li>
                )
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
