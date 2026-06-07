'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Props {
  text: string
  wordLimit?: number
  seeMoreLabel: string
  seeLessLabel: string
}

export function ExpandableOverviewText({ text, wordLimit = 100, seeMoreLabel, seeLessLabel }: Props) {
  const [expanded, setExpanded] = useState(false)
  const words = text.trim().split(/\s+/)
  const isLong = words.length > wordLimit
  const preview = words.slice(0, wordLimit).join(' ')

  return (
    <div className="mb-8">
      <p className="text-gray-600 leading-relaxed">
        {expanded || !isLong ? text : `${preview}…`}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1 mt-2 text-sm font-semibold text-brand-purple hover:text-brand-purple-dark transition-colors"
        >
          {expanded ? seeLessLabel : seeMoreLabel}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  )
}
