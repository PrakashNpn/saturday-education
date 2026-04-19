'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { CountryFAQData } from '../types'

interface Props {
  faqs: CountryFAQData[]
  title: string
}

export function CountryFAQs({ faqs, title }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)

  if (faqs.length === 0) return null

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8">{title}</h2>
      <div className="divide-y divide-gray-200 border-t border-gray-200">
        {faqs.map((faq) => (
          <div key={faq.id}>
            <button
              type="button"
              onClick={() => toggle(faq.id)}
              className="flex items-center justify-between w-full text-left py-5 gap-4"
            >
              <span className="font-medium text-neutral-900 text-sm md:text-base">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                  openId === faq.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openId === faq.id && (
              <div className="pb-5 text-gray-600 text-sm md:text-base leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
