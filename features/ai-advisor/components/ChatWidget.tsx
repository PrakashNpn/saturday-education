'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useChat } from '../hooks/useChat'
import ChatMessage from './ChatMessage'
import ChatTypingIndicator from './ChatTypingIndicator'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [widgetVisible, setWidgetVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setWidgetVisible(true), 1000)
    return () => clearTimeout(t)
  }, [])
  const t = useTranslations('chatWidget')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, isStreaming, sendMessage, clearHistory } = useChat(t('welcomeMessage'))

  const suggestions = [
    t('suggestions.findUni'),
    t('suggestions.compare'),
    t('suggestions.scholarships'),
  ]

  const showSuggestions = messages.length <= 1

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isStreaming])

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
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.88, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0,  scale: 1,    filter: 'blur(0px)' }}
            exit={{   opacity: 0, y: 20,  scale: 0.93, filter: 'blur(6px)' }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 32,
              opacity: { duration: 0.22 },
              filter: { duration: 0.28 },
            }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100dvh-160px)] flex flex-col"
          >
            {/* Gradient border wrapper */}
            <div className="relative flex flex-col h-full rounded-3xl p-[1.5px] bg-gradient-to-br from-purple-200/90 via-white/40 to-purple-400/80 shadow-[0_32px_80px_rgba(89,13,130,0.32),0_8px_32px_rgba(89,13,130,0.2),0_0_0_1px_rgba(89,13,130,0.08)]">

              {/* Inner panel */}
              <div className="flex flex-col h-full rounded-[calc(1.5rem-1.5px)] overflow-hidden bg-white/75 backdrop-blur-2xl">

                {/* Header */}
                <div className="relative bg-gradient-to-r from-[#4A0A6E] via-[#590D82] to-[#6B1FA0] p-4 flex items-center justify-between flex-shrink-0 overflow-hidden">
                  {/* Header gloss sheen */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                  {/* Ambient orb */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-purple-400/20 blur-2xl pointer-events-none" />

                  <div className="relative flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.2)] overflow-hidden ring-2 ring-white/30">
                      <Image src="/images/logo/logo-symbol.png" alt="Saturday Education" width={36} height={36} className="object-contain" />
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

                {/* Chat body */}
                <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-gradient-to-b from-white/40 via-purple-50/30 to-purple-100/20">
                  {messages.map((msg) =>
                    msg.content === '' ? null : <ChatMessage key={msg.id} message={msg} />
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
                          className="px-3 py-1.5 rounded-full bg-[#F3EAFA] text-[#590D82] text-xs font-medium cursor-pointer hover:bg-[#E8D5F5] transition-colors"
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
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('inputPlaceholder')}
                    disabled={isStreaming}
                    className="flex-1 px-4 py-2.5 rounded-full bg-purple-50/60 border border-purple-100 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#590D82]/20 focus:border-[#590D82]/40 transition-all disabled:cursor-not-allowed shadow-[inset_0_1px_4px_rgba(89,13,130,0.05)]"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isStreaming}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-[#590D82] to-[#8B2FC9] flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_4px_16px_rgba(89,13,130,0.5)] hover:scale-105 active:scale-95 shadow-[0_2px_10px_rgba(89,13,130,0.3)]"
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
        <AnimatePresence mode="wait">
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
              className="flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer
                bg-gradient-to-br from-white/55 via-white/40 to-purple-50/30 backdrop-blur-xl
                border border-white/50
                shadow-[0_8px_40px_rgba(89,13,130,0.28),0_2px_16px_rgba(89,13,130,0.12),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(89,13,130,0.04)]
                hover:shadow-[0_12px_52px_rgba(89,13,130,0.38),0_2px_16px_rgba(89,13,130,0.16)]
                hover:from-white/65 hover:to-purple-50/40 active:scale-95 transition-all duration-200"
            >
              {/* Logo */}
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-[0_2px_8px_rgba(89,13,130,0.2)]">
                <Image src="/images/logo/logo-symbol.png" alt="Saturday Education" width={40} height={40} className="object-contain" />
              </div>

              {/* Text */}
              <div className="text-left">
                <p className="text-gray-800 font-semibold text-sm leading-tight">Let's Chat</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
                  />
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
              </div>
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
              className="w-11 h-11 rounded-full flex items-center justify-center
                bg-gradient-to-br from-[#590D82] to-[#8B2FC9]
                shadow-[0_4px_20px_rgba(89,13,130,0.5)] cursor-pointer
                hover:shadow-[0_6px_28px_rgba(89,13,130,0.65)] active:scale-95 transition-shadow duration-200"
            >
              <X size={18} className="text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
