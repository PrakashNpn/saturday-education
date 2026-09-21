'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { useChat } from '../hooks/useChat'
import ChatMessage from './ChatMessage'
import ChatTypingIndicator from './ChatTypingIndicator'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [widgetVisible, setWidgetVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setWidgetVisible(true), 1000)
    return () => clearTimeout(t)
  }, [])

  // Collapses the closed widget to just its logo, but only once scrolling
  // has been going on for a while — a quick flick past one section never
  // collapses it at all. Two timers: collapseTimer arms once per burst and
  // only actually collapses the widget if scrolling is still happening
  // SUSTAINED_SCROLL_MS later; stopTimer refreshes on every scroll event and,
  // once scrolling has gone quiet for STOP_GAP_MS, cancels collapseTimer
  // (covers a short burst that never collapsed) and re-expands the widget
  // (covers a long scroll that did).
  useEffect(() => {
    const SUSTAINED_SCROLL_MS = 2000
    const STOP_GAP_MS = 1000
    let collapseTimer: ReturnType<typeof setTimeout> | undefined
    let stopTimer: ReturnType<typeof setTimeout>
    const handleScroll = () => {
      if (!collapseTimer) {
        collapseTimer = setTimeout(() => setIsScrolling(true), SUSTAINED_SCROLL_MS)
      }
      clearTimeout(stopTimer)
      stopTimer = setTimeout(() => {
        clearTimeout(collapseTimer)
        collapseTimer = undefined
        setIsScrolling(false)
      }, STOP_GAP_MS)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(collapseTimer)
      clearTimeout(stopTimer)
    }
  }, [])

  // Below the site's own tablet breakpoint (860px — same one every
  // max-tablet: class in this codebase uses), the expanded "Let's Chat /
  // Online" card is wide enough relative to the screen that it sits over
  // page content rather than beside it. So on a phone it just stays
  // collapsed to the logo permanently, instead of expanding once scrolling
  // pauses. JS rather than a max-tablet: class because the scroll-collapse
  // logic above already has to pick the same className in JS — this folds
  // into that one decision instead of fighting it with CSS.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 859px)')
    setIsMobile(mq.matches)
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  const showCollapsed = isScrolling || isMobile
  const t = useTranslations('chatWidget')
  const locale = useLocale()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, isStreaming, sendMessage, clearHistory } = useChat(t('welcomeMessage'), locale)

  const suggestions = [
    t('suggestions.whatToStudy'),
    t('suggestions.compare'),
    t('suggestions.scholarships'),
  ]

  const showSuggestions = messages.length <= 1

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isStreaming])

  // Auto-focus the input when the panel opens and after each reply finishes, so the
  // user can keep typing without clicking back into the field. The input is disabled
  // while streaming, so we (re)focus once it is enabled again.
  useEffect(() => {
    if (isOpen && !isStreaming) {
      inputRef.current?.focus({ preventScroll: true })
    }
  }, [isOpen, isStreaming])

  function handleSend() {
    const text = inputValue.trim()
    if (!text || isStreaming) return
    setInputValue('')
    sendMessage(text)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Mobile backdrop — same duration/ease as the panel below, so the two
          finish settling at the same instant instead of the dim landing
          before (or after) the panel does. */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
            className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat Panel — no blur() animation (animating filter forces a
          re-rasterise most frames, unlike opacity/transform which the
          compositor can handle alone — the single heaviest thing this
          transition was doing), and one tween for every property instead of
          spring for y/scale plus separate fixed durations for opacity and
          filter, which used to finish at three different moments. */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 12,  scale: 0.96  }}
            transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100dvh-160px)] flex flex-col"
          >
            {/* Gradient border wrapper */}
            <div className="relative flex flex-col h-full rounded-3xl p-[1.5px] bg-gradient-to-br from-action/30 via-white/40 to-action/60 shadow-[0_32px_80px_rgba(99,45,139,0.32),0_8px_32px_rgba(99,45,139,0.2),0_0_0_1px_rgba(99,45,139,0.08)]">

              {/* Inner panel */}
              <div className="flex flex-col h-full rounded-[calc(1.5rem-1.5px)] overflow-hidden bg-white/75 backdrop-blur-2xl">

                {/* Header */}
                <div className="relative bg-gradient-to-r from-action-hover to-action p-4 flex items-center justify-between flex-shrink-0 overflow-hidden">
                  {/* Header gloss sheen */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                  {/* Ambient orb */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-action/20 blur-2xl pointer-events-none" />

                  <div className="relative flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.2)] overflow-hidden ring-2 ring-white/30">
                      <Image src="/images/logo/logo-symbol.webp" alt="Saturday Education" fill unoptimized sizes="36px" className="object-contain p-1" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{t('title')}</p>
                      <div className="flex items-center gap-1.5">
                        <motion.span
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ repeat: Infinity, duration: 2.5 }}
                          className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                        />
                        <span className="text-white/70 text-xs">{t('status')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-3">
                    {messages.length > 1 && (
                      <button
                        onClick={clearHistory}
                        className="text-white/50 hover:text-white/90 text-xs transition-colors"
                        aria-label="Clear chat history"
                      >
                        Clear
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-white/60 hover:text-white transition-colors"
                      aria-label="Close chat"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Chat body — purple stops toned down (30%/20% → 15%/10%),
                    white anchor raised (40% → 55%): the message bubbles are
                    already white, so a strong tint behind them was reading
                    as a purple wash across the whole body rather than a
                    subtle one. */}
                <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-gradient-to-b from-white/55 via-tint/40 to-tint/25">
                  {messages.map((msg) =>
                    msg.content === '' ? null : <ChatMessage key={msg.id} message={msg} onNavigate={() => setIsOpen(false)} />
                  )}

                  {isStreaming && messages[messages.length - 1]?.content === '' && (
                    <ChatTypingIndicator />
                  )}

                  {showSuggestions && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {suggestions.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => sendMessage(chip)}
                          className="px-3 py-1.5 rounded-full bg-tint text-action text-xs font-medium cursor-pointer hover:bg-action/15 transition-colors"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input bar */}
                <div className="p-3 border-t border-white/40 bg-white/50 backdrop-blur-xl flex-shrink-0 flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('inputPlaceholder')}
                    disabled={isStreaming}
                    className="flex-1 px-4 py-2.5 rounded-full bg-tint/60 border border-action/15 text-sm placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-action/20 focus:border-action/40 transition-all disabled:cursor-not-allowed shadow-[inset_0_1px_4px_rgba(99,45,139,0.05)]"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isStreaming}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-action-hover to-action flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_4px_16px_rgba(99,45,139,0.5)] hover:scale-105 active:scale-95 shadow-[0_2px_10px_rgba(99,45,139,0.3)]"
                    aria-label="Send message"
                  >
                    <Send size={15} className="text-white" />
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* No mode="wait": that made the card fully finish exiting before
            the X even started entering — a visible gap right as the panel
            above is already animating in. Without it the two cross-fade at
            the same time, which is what actually reads as one open motion. */}
        <AnimatePresence>
          {widgetVisible && !isOpen && (
            /* Mini card — closed state */
            <motion.button
              key="card"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0,  scale: 1   }}
              exit={{   opacity: 0, y: 12,  scale: 0.93 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              onClick={() => setIsOpen(true)}
              aria-label="Open chat"
              // absolute + anchored to the parent's own corner: without this,
              // the brief moment both this and the X button exist together
              // (now that they cross-fade instead of waiting their turn)
              // would stack them in normal flow instead of overlapping.
              //
              // Padding and border-radius change together as plain CSS
              // classes on one transition (not framer-motion) deliberately —
              // the browser guarantees they stay in perfect sync since it's
              // one native transition, not two independently-animated values
              // that can drift apart mid-morph (tried that, got uneven
              // corners; tried framer's `layout` prop instead, which fixed
              // the corners but fought the scale() from the entrance
              // animation above and threw off the final size).
              className={`absolute right-0 bottom-0 flex items-center cursor-pointer
                bg-gradient-to-br from-white/55 via-white/40 to-tint/40 backdrop-blur-xl
                border border-white/50
                shadow-[0_8px_40px_rgba(99,45,139,0.28),0_2px_16px_rgba(99,45,139,0.12),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(99,45,139,0.04)]
                hover:shadow-[0_12px_52px_rgba(99,45,139,0.38),0_2px_16px_rgba(99,45,139,0.16)]
                hover:from-white/65 hover:to-tint/60 active:scale-95 transition-all duration-300 ease-out
                ${showCollapsed ? (isMobile ? 'rounded-full p-2' : 'rounded-full p-3') : 'rounded-2xl px-4 py-3'}`}
            >
              {/* Logo, plus a small pulsing green status dot while
                  collapsed — same dot and pulse the expanded card already
                  uses next to "Online", just moved onto the logo itself as a
                  presence indicator (the bottom-right corner every chat app
                  puts one) rather than trying to icon-badge "this is chat". */}
              <div className="relative w-10 h-10 shrink-0">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-[0_2px_8px_rgba(99,45,139,0.2)]">
                  <Image src="/images/logo/logo-symbol.webp" alt="Saturday Education" fill unoptimized sizes="40px" className="object-contain" />
                </div>
                {showCollapsed && (
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="absolute right-0 bottom-0 h-1.5 w-1.5 rounded-full bg-emerald-400 ring-2 ring-white shadow-[0_1px_4px_rgba(0,0,0,0.25)]"
                  />
                )}
              </div>

              {/* Text — collapses away while showCollapsed is true (either
                  mid-scroll, or permanently on mobile), taking its own
                  margin with it (via framer, not CSS gap, so this isn't
                  betting on gap being animatable) rather than relying on the
                  parent's spacing. */}
              <AnimatePresence initial={false}>
                {!showCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                    animate={{ opacity: 1, width: 'auto', marginLeft: 12 }}
                    exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    className="overflow-hidden text-left whitespace-nowrap"
                  >
                    <p className="text-primary-text font-semibold text-sm leading-tight">Let&apos;s Chat</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
                      />
                      <span className="text-secondary-text text-xs">Online</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          {isOpen && (
            /* Close button — open state */
            <motion.button
              key="close"
              initial={{ opacity: 0, scale: 0.7, rotate: -90 }}
              animate={{ opacity: 1, scale: 1,   rotate: 0   }}
              exit={{   opacity: 0, scale: 0.7, rotate:  90  }}
              transition={{ type: 'spring', stiffness: 400, damping: 26 }}
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="absolute right-0 bottom-0 w-11 h-11 rounded-full flex items-center justify-center
                bg-gradient-to-br from-action-hover to-action
                shadow-[0_4px_20px_rgba(99,45,139,0.5)] cursor-pointer
                hover:shadow-[0_6px_28px_rgba(99,45,139,0.65)] active:scale-95 transition-shadow duration-200"
            >
              <X size={18} className="text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
