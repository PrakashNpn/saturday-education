// Interest-evidence extraction + a short counsellor "new lead" notification email.
// The full breakdown now lives in the attached PDF report — this email is just a heads-up.
// Email-client-safe: inline styles only.

import { RIASEC_QUESTIONS } from '../data/riasecQuestions'
import { buildArchetype } from './archetype'
import type {
  AnswerMap,
  AssessmentScores,
  ContactDetails,
  CounselorSynthesis,
  RecommendationTree,
} from '../types'

// The site's own email-safe PNG logo (many mail clients do not render WebP). An
// absolute URL, so it loads in email clients, and it ships with the site, so it
// changes with the brand instead of living in a separate bucket.
const LOGO_URL = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://saturdayeducation.com'}/images/logo/logo-email.png`

// Brand palette
const BRAND = '#177E8D'
const BRAND_DARK = '#00333A'
const BRAND_50 = '#F0FBFD'
const BRAND_BORDER = '#C5F8FF'
const TRACK = '#ECECF1'
const INK = '#18181B'
const GRAY = '#6b7280'
const MUTE = '#9ca3af'

// Band from a population percentile (1–99). Exported — used by the PDF report.
export function bandLabel(pct: number): string {
  if (pct > 70) return 'High'
  if (pct >= 30) return 'Average'
  return 'Low'
}

export interface InterestEvidence {
  topLiked: string[]
  disliked: string[]
}

/** Activities the student strongly liked (4–5) in their top categories, and any strongly disliked (1).
 *  Still consumed by the PDF report (the email no longer renders it). */
export function extractInterestEvidence(answers: AnswerMap, topCategories: string[]): InterestEvidence {
  const topSet = new Set(topCategories.slice(0, 3))
  const topLiked: string[] = []
  const disliked: string[] = []

  for (const q of RIASEC_QUESTIONS) {
    const v = answers[q.id]
    if (typeof v !== 'number') continue
    if (topSet.has(q.category) && v >= 4) topLiked.push(q.text)
    if (v === 1) disliked.push(q.text)
  }

  return { topLiked: topLiked.slice(0, 6), disliked: disliked.slice(0, 4) }
}

// ── small HTML helpers ───────────────────────────────────────────────────────

function esc(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function chip(text: string, bg: string, fg: string, border: string): string {
  return `<span style="display:inline-block;background:${bg};color:${fg};border:1px solid ${border};font-size:12px;font-weight:600;padding:3px 9px;border-radius:999px;margin:0 6px 6px 0;">${text}</span>`
}

// ── main builder ─────────────────────────────────────────────────────────────

interface BuildEmailArgs {
  contact: ContactDetails
  scores: AssessmentScores
  evidence: InterestEvidence
  synthesis: CounselorSynthesis | null
  tree: RecommendationTree
}

/** A short "new lead" notification for the counsellor. The full breakdown is the
 *  attached PDF report, so the body is kept to identity + flags + an attachment call-out. */
export function buildCounselorEmailHtml(
  args: BuildEmailArgs,
  { pdfAttached }: { pdfAttached: boolean },
): string {
  const { contact, scores } = args
  const { riasec, bigFive } = scores

  const archetype = buildArchetype(scores)

  // Flags — high-signal context for triaging the lead at a glance.
  const flags: string[] = []
  if (contact.preferredCountry) flags.push(chip(`📍 Prefers ${esc(contact.preferredCountry)}`, '#ffffff', BRAND, BRAND_BORDER))
  if (contact.educationLevel) flags.push(chip(`🎓 ${esc(contact.educationLevel)}`, '#ffffff', BRAND, BRAND_BORDER))
  if (bigFive.percentile.N > 70) flags.push(chip('⚠️ High stress-reactivity', '#FEF3C7', '#92400E', '#FDE68A'))
  if (bigFive.percentile.A < 30) flags.push(chip('⚠️ Low agreeableness', '#FEF3C7', '#92400E', '#FDE68A'))

  // ── Lead card (identity + flags)
  const leadCard = `<div style="background:${BRAND_50};border:1px solid ${BRAND_BORDER};border-radius:14px;padding:18px 20px;margin:0 0 16px;">
    <p style="margin:0;font-size:20px;font-weight:800;color:${BRAND_DARK};">${esc(contact.fullName)}</p>
    <p style="margin:4px 0 0;font-size:14px;color:${BRAND};font-weight:600;">${esc(archetype)} · Holland ${esc(riasec.hollandCode)}</p>
    <p style="margin:6px 0 0;font-size:12.5px;color:${GRAY};">${esc(contact.email)}${contact.phone ? ` · ${esc(contact.phone)}` : ''}</p>
    ${flags.length ? `<div style="margin:12px 0 0;">${flags.join('')}</div>` : ''}
  </div>`

  // ── Attachment call-out (honest about whether the PDF actually generated)
  const attachment = pdfAttached
    ? `<div style="background:#ffffff;border:1px solid ${TRACK};border-left:4px solid ${BRAND};border-radius:12px;padding:14px 18px;">
        <p style="margin:0 0 3px;font-size:13px;font-weight:700;color:${BRAND};">📎 Full report attached (PDF)</p>
        <p style="margin:0;font-size:12.5px;color:${GRAY};line-height:1.55;">The complete report (interests, personality, aptitude, ranked career paths and university matches) is attached. Open the PDF for the full breakdown.</p>
      </div>`
    : `<div style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:12px;padding:14px 18px;">
        <p style="margin:0 0 3px;font-size:13px;font-weight:700;color:#92400E;">⚠️ Report not attached</p>
        <p style="margin:0;font-size:12.5px;color:#92400E;line-height:1.55;">The full report couldn't be generated for this lead. The submission is saved; open the lead record for the complete data.</p>
      </div>`

  // ── Assemble
  return `<div style="background:#F4F4F7;padding:24px 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${TRACK};">
      <div style="padding:18px 24px 14px;border-bottom:1px solid #DCEEF1;">
        <img src="${LOGO_URL}" alt="Saturday Education Consulting" height="72" style="height:72px;display:block;border:0;" />
      </div>
      <div style="background:${BRAND};padding:10px 24px;">
        <span style="color:#ffffff;font-size:12px;font-weight:700;letter-spacing:.6px;">CAREER ASSESSMENT · NEW LEAD</span>
      </div>
      <div style="padding:22px;color:${INK};">
        ${leadCard}
        ${attachment}
      </div>
      <div style="background:#F7FCFD;padding:16px 24px;text-align:center;border-top:1px solid #DCEEF1;">
        <p style="margin:0;font-size:11px;color:${MUTE};">Saturday Education Consulting · Auto-generated by the Career Assessment</p>
      </div>
    </div>
  </div>`
}
