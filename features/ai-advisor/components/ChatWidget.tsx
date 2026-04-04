'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Bot, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('chatWidget')

  const suggestions = [
    t('suggestions.findUni'),
    t('suggestions.compare'),
    t('suggestions.scholarships'),
  ]

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100dvh-160px)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#590D82] to-[#6B1FA0] p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t('title')}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-white/70 text-xs">{t('status')}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat body */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {/* Welcome message bubble */}
              <div className="max-w-[80%]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#590D82] flex items-center justify-center flex-shrink-0">
                    <Bot size={12} className="text-white" />
                  </div>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-700 leading-relaxed">{t('welcomeMessage')}</p>
                  <p className="text-xs text-gray-400 mt-2">Just now</p>
                </div>
              </div>

              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-2 mt-4">
                {suggestions.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className="px-3 py-1.5 rounded-full bg-[#F3EAFA] text-[#590D82] text-xs font-medium cursor-pointer hover:bg-[#E8D5F5] transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Input bar */}
            <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0 flex items-center gap-2">
              <input
                type="text"
                disabled
                placeholder={t('inputPlaceholder')}
                className="flex-1 px-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#590D82]/30 focus:border-[#590D82] transition-colors disabled:cursor-not-allowed"
              />
              <button
                disabled
                className="w-9 h-9 rounded-full bg-[#590D82] flex items-center justify-center flex-shrink-0 opacity-50 cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating bubble */}
      <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="relative w-14 h-14 rounded-full bg-[#590D82] hover:bg-[#4A0A6E] shadow-xl flex items-center justify-center cursor-pointer transition-colors duration-300 hover:scale-105 active:scale-95"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
        {!isOpen && (
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white"
          />
        )}
      </motion.button>
      </div>
    </>
  )
}
