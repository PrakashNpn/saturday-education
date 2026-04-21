'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { CountryFAQData } from '../types'

interface Props {
  faqs: CountryFAQData[]
  eyebrow: string
  title: string
  subtitle: string
}

export function CountryFAQs({ faqs, eyebrow, title, subtitle }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)

  if (faqs.length === 0) return null

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <div>
      {/* Section header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 bg-brand-purple-50 text-brand-purple text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
          {eyebrow}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{title}</h2>
        <p className="text-gray-500 text-sm md:text-base">{subtitle}</p>
      </div>

      {/* Accordion */}
      <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id
          return (
            <div
              key={faq.id}
              className={`relative transition-colors duration-200 ${
                isOpen ? 'bg-brand-purple-50/40' : 'hover:bg-gray-50'
              }`}
            >
              {isOpen && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-purple rounded-full" />
              )}
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                className="flex items-center justify-between w-full text-left px-4 py-5 gap-4"
              >
                <span
                  className={`font-medium text-sm md:text-base transition-colors duration-200 ${
                    isOpen ? 'text-brand-purple' : 'text-neutral-900'
                  }`}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-brand-purple' : 'text-gray-400'
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-5 text-gray-600 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}
