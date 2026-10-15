'use client'

import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { parseAssistantReply } from '../utils/formatReply'
import LeadCard from './LeadCard'

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant'
    content: string
  }
  onNavigate?: () => void
  /** True only for the newest unanswered form, so older ones don't pile up. */
  showLeadForm?: boolean
  /** What the student has asked so far, sent with the form as context. */
  said?: string[]
  onLeadSent?: () => void
}

export default function ChatMessage({
  message,
  onNavigate,
  showLeadForm = false,
  said = [],
  onLeadSent,
}: ChatMessageProps) {
  const isUser = message.role === 'user'
  const t = useTranslations('chatWidget')

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="
            max-w-[78%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm text-white leading-relaxed
            bg-gradient-to-br from-action-hover to-action
            shadow-[0_4px_18px_rgba(23,126,141,0.38)]
          "
        >
          {message.content}
        </div>
      </div>
    )
  }

  const { text, cta, lead } = parseAssistantReply(message.content)

  return (
    <div className="flex items-start gap-2.5">
      {/* Bot avatar */}
      <div className="relative shrink-0 w-7 h-7 rounded-full bg-white shadow-[0_2px_10px_rgba(23,126,141,0.2)] mt-0.5 overflow-hidden">
        <Image src="/images/logo/logo-symbol.webp" alt="Saturday Education" fill unoptimized sizes="28px" className="object-contain p-0.5" />
      </div>

      {/* Glass bubble + optional CTA */}
      <div className="flex-1 min-w-0">
        <div
          className="
            px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-secondary-text leading-relaxed
            bg-white/70 backdrop-blur-sm
            border border-action/15
            shadow-[0_2px_16px_rgba(23,126,141,0.07),inset_0_1px_0_rgba(255,255,255,0.8)]
          "
        >
          {text}
        </div>

        {cta && (
          <Link
            href={cta.href}
            onClick={onNavigate}
            className="
              mt-2 inline-flex items-center gap-1.5 rounded-full px-4 py-2
              bg-gradient-to-br from-action-hover to-action
              text-xs font-semibold text-white
              shadow-[0_2px_10px_rgba(23,126,141,0.3)]
              transition-all hover:shadow-[0_4px_16px_rgba(23,126,141,0.5)] hover:scale-[1.02] active:scale-95
            "
          >
            {t(cta.labelKey)}
            <ArrowRight size={13} />
          </Link>
        )}

        {lead?.status === 'open' && showLeadForm && (
          <LeadCard
            initialCountry={lead.country}
            said={said}
            onSent={() => onLeadSent?.()}
          />
        )}

        {lead?.status === 'saved' && (
          <div
            role="status"
            className="mt-2 flex items-start gap-2.5 rounded-2xl border border-action/15 bg-white/85 p-3.5 shadow-[0_2px_16px_rgba(23,126,141,0.07)]"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-action text-white">
              <Check size={14} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-primary-text">{t('lead.sentTitle')}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-text">{t('lead.sentBody')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
