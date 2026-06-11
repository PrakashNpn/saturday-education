// Builds the templated "evidence" section and the full counselor-brief email.
// The templated parts are always present even if the AI synthesis is unavailable.
// Email-client-safe: table-based alignment, inline styles, div bgcolor bars.

import { RIASEC_QUESTIONS } from '../data/riasecQuestions'
import { RIASEC_INFO } from '../data/riasecFieldMap'
import type {
  AnswerMap,
  AssessmentScores,
  ContactDetails,
  CounselorSynthesis,
  RecommendationTree,
  BigFiveTrait,
} from '../types'

const TRAIT_LABELS: Record<BigFiveTrait, string> = {
  O: 'Openness',
  C: 'Conscientiousness',
  E: 'Extraversion',
  A: 'Agreeableness',
  N: 'Neuroticism',
}
const TRAIT_ORDER: BigFiveTrait[] = ['O', 'C', 'E', 'A', 'N']

// Public Supabase-hosted logo — a stable absolute URL that loads in email clients.
const LOGO_URL =
  'https://yucleuhlcrbqzcrweozy.supabase.co/storage/v1/object/public/saturday%20education/logo/logo.png'

// Brand palette
const PURPLE = '#590D82'
const PURPLE_DARK = '#3D0A5A'
const PURPLE_50 = '#F5E6FF'
const PURPLE_BORDER = '#E3CCF5'
const TRACK = '#ECECF1'
const INK = '#18181B'
const GRAY = '#6b7280'
const MUTE = '#9ca3af'

// Band from a population percentile (1–99).
export function bandLabel(pct: number): string {
  if (pct > 70) return 'High'
  if (pct >= 30) return 'Average'
  return 'Low'
}

export interface InterestEvidence {
  topLiked: string[]
  disliked: string[]
}

/** Activities the student strongly liked (4–5) in their top categories, and any strongly disliked (1). */
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

function card(inner: string, bg = '#ffffff', border = TRACK): string {
  return `<div style="background:${bg};border:1px solid ${border};border-radius:14px;padding:18px 20px;margin:0 0 16px;">${inner}</div>`
}

function eyebrow(text: string): string {
  return `<p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:${PURPLE};">${esc(text)}</p>`
}

function chip(text: string, bg: string, fg: string, border: string): string {
  return `<span style="display:inline-block;background:${bg};color:${fg};border:1px solid ${border};font-size:12px;font-weight:600;padding:3px 9px;border-radius:999px;margin:0 6px 6px 0;">${text}</span>`
}

function bar(pct: number, color: string): string {
  const w = Math.max(2, Math.min(100, Math.round(pct)))
  return `<div style="background:${TRACK};border-radius:999px;height:8px;width:100%;"><div style="background:${color};border-radius:999px;height:8px;width:${w}%;"></div></div>`
}

function barRow(label: string, pct: number, value: string, color: string, bold = false): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:7px 0;"><tr>
    <td width="122" style="font-size:13px;color:${INK};font-weight:${bold ? 700 : 500};vertical-align:middle;">${esc(label)}</td>
    <td style="padding:0 10px;vertical-align:middle;">${bar(pct, color)}</td>
    <td width="78" align="right" style="font-size:12px;color:${GRAY};white-space:nowrap;vertical-align:middle;">${esc(value)}</td>
  </tr></table>`
}

function nickname(label: string): string {
  const m = label.match(/\(([^)]+)\)/)
  return m ? m[1] : label
}

function traitColor(pct: number): string {
  if (pct > 70) return PURPLE
  if (pct >= 30) return '#9D5BB8'
  return '#C9A8DD'
}

// ── main builder ─────────────────────────────────────────────────────────────

interface BuildEmailArgs {
  contact: ContactDetails
  scores: AssessmentScores
  evidence: InterestEvidence
  synthesis: CounselorSynthesis | null
  tree: RecommendationTree
}

export function buildCounselorEmailHtml(args: BuildEmailArgs): string {
  const { contact, scores, evidence, synthesis, tree } = args
  const { riasec, bigFive } = scores

  const archetype = `The ${riasec.ranked.slice(0, 2).map((c) => nickname(RIASEC_INFO[c].label)).join('-')}`
  const topField = tree.buckets[0]?.bucket ?? synthesis?.suggestedFields?.[0] ?? null

  // Flags
  const flags: string[] = []
  if (contact.preferredCountry) flags.push(chip(`📍 Prefers ${esc(contact.preferredCountry)}`, '#ffffff', PURPLE, PURPLE_BORDER))
  if (contact.educationLevel) flags.push(chip(`🎓 ${esc(contact.educationLevel)}`, '#ffffff', PURPLE, PURPLE_BORDER))
  if (bigFive.percentile.N > 70) flags.push(chip('⚠️ High stress-reactivity', '#FEF3C7', '#92400E', '#FDE68A'))
  if (bigFive.percentile.A < 30) flags.push(chip('⚠️ Low agreeableness', '#FEF3C7', '#92400E', '#FDE68A'))

  // ── Summary card
  const summary = `<div style="background:${PURPLE_50};border:1px solid ${PURPLE_BORDER};border-radius:14px;padding:18px 20px;margin:0 0 16px;">
    <p style="margin:0;font-size:20px;font-weight:800;color:${PURPLE_DARK};">${esc(contact.fullName)}</p>
    <p style="margin:4px 0 0;font-size:14px;color:${PURPLE};font-weight:600;">${esc(archetype)} · Holland ${esc(riasec.hollandCode)}</p>
    <p style="margin:6px 0 0;font-size:12.5px;color:${GRAY};">${esc(contact.email)}${contact.phone ? ` · ${esc(contact.phone)}` : ''}</p>
    ${topField ? `<p style="margin:10px 0 0;font-size:13px;color:${INK};">Best-fit field: <strong>${esc(topField)}</strong></p>` : ''}
    ${flags.length ? `<div style="margin:12px 0 0;">${flags.join('')}</div>` : ''}
  </div>`

  // ── Interests card
  const interestBars = riasec.ranked
    .map((c, i) => {
      const score = riasec.scores[c]
      return barRow(RIASEC_INFO[c].label, (score / 50) * 100, `${score} / 50`, i < 3 ? PURPLE : '#C9A8DD', i < 3)
    })
    .join('')
  const likedLine = evidence.topLiked.length
    ? `<p style="margin:12px 0 0;font-size:12px;color:${GRAY};line-height:1.5;"><strong style="color:#16a34a;">Loved:</strong> ${evidence.topLiked.map(esc).join('; ')}</p>`
    : ''
  const dislikedLine = evidence.disliked.length
    ? `<p style="margin:4px 0 0;font-size:12px;color:${GRAY};line-height:1.5;"><strong style="color:#dc2626;">Disliked:</strong> ${evidence.disliked.map(esc).join('; ')}</p>`
    : ''
  const interestsCard = card(eyebrow(`Interests · Holland Code ${riasec.hollandCode}`) + interestBars + likedLine + dislikedLine)

  // ── Personality card
  const personalityBars = TRAIT_ORDER.map((t) => {
    const p = bigFive.percentile[t]
    return barRow(TRAIT_LABELS[t], p, `${p}th · ${bandLabel(p)}`, traitColor(p))
  }).join('')
  const personalityCard = card(
    eyebrow('Personality · Big Five (percentile vs population)') +
      personalityBars +
      `<p style="margin:10px 0 0;font-size:11px;color:${MUTE};">Percentile vs the general adult population. >70 High · 30–70 Average · &lt;30 Low.</p>`,
  )

  // ── Counselor read card
  const readBlock = synthesis?.read
    ? `<div style="background:${PURPLE_50};border-left:4px solid ${PURPLE};border-radius:8px;padding:12px 14px;font-size:13px;color:${PURPLE_DARK};line-height:1.6;">${esc(synthesis.read)}</div>`
    : `<p style="margin:0;color:${MUTE};font-size:13px;">AI synthesis unavailable — use the interest & personality evidence above.</p>`
  const directions = synthesis?.careerDirections?.length
    ? synthesis.careerDirections
        .map(
          (d) => `<div style="margin:8px 0 0;padding:10px 12px;background:#FAFAFB;border:1px solid #EEE;border-radius:10px;">
            <p style="margin:0;font-size:13px;font-weight:700;color:${INK};">${esc(d.title)}</p>
            <p style="margin:3px 0 0;font-size:12.5px;color:${GRAY};line-height:1.5;">${esc(d.why)}</p>
          </div>`,
        )
        .join('')
    : ''
  const suggested = synthesis?.suggestedFields?.length
    ? `<p style="margin:12px 0 0;font-size:12px;color:${GRAY};">Suggested fields: ${synthesis.suggestedFields.map(esc).join(', ')}</p>`
    : ''
  const counselorCard = card(eyebrow('Counselor Read') + readBlock + directions + suggested)

  // ── Recommendations card
  const recsInner = tree.buckets.length
    ? tree.buckets
        .map(
          (b) => `<div style="margin:0 0 16px;">
        <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:${PURPLE_DARK};">${esc(b.bucket)}</p>
        ${b.countries
          .map(
            (c) => `<div style="margin:0 0 9px;padding:2px 0 2px 12px;border-left:3px solid ${c.preferred ? '#F59E0B' : PURPLE_BORDER};">
            <p style="margin:0 0 2px;font-size:13px;color:${INK};font-weight:600;">${esc(c.country)}${
              c.preferred ? ' <span style="color:#B45309;font-weight:700;font-size:11px;">· 📍 preferred</span>' : ''
            }</p>
            <ul style="margin:2px 0 0;padding-left:16px;color:#374151;font-size:12.5px;">${c.universities
              .map(
                (u) =>
                  `<li style="margin:1px 0;">${esc(u.program)} <span style="color:${MUTE};">(${esc(u.degreeLevel)})</span> — ${esc(u.name)}</li>`,
              )
              .join('')}</ul>
            ${c.moreCount > 0 ? `<p style="margin:3px 0 0;font-size:11px;color:${MUTE};">+${c.moreCount} more program${c.moreCount > 1 ? 's' : ''} here</p>` : ''}
          </div>`,
          )
          .join('')}
        ${b.moreCountries > 0 ? `<p style="margin:2px 0 0;font-size:11px;color:${MUTE};">+${b.moreCountries} more countr${b.moreCountries > 1 ? 'ies' : 'y'} in our database</p>` : ''}
      </div>`,
        )
        .join('')
    : `<p style="margin:0;color:${MUTE};font-size:13px;">No matching programs in our database yet.</p>`
  const recsCard = card(eyebrow('Recommended Path · Field → Country → Programs') + recsInner)

  // ── Assemble
  return `<div style="background:#F4F4F7;padding:24px 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${TRACK};">
      <div style="padding:18px 24px 14px;border-bottom:1px solid #F0EAF6;">
        <img src="${LOGO_URL}" alt="Saturday Education Consulting" height="72" style="height:72px;display:block;border:0;" />
      </div>
      <div style="background:${PURPLE};padding:10px 24px;">
        <span style="color:#ffffff;font-size:12px;font-weight:700;letter-spacing:.6px;">CAREER ASSESSMENT · NEW LEAD</span>
      </div>
      <div style="padding:22px;color:${INK};">
        ${summary}
        ${interestsCard}
        ${personalityCard}
        ${counselorCard}
        ${recsCard}
      </div>
      <div style="background:#FAF8FC;padding:16px 24px;text-align:center;border-top:1px solid #F0EAF6;">
        <p style="margin:0;font-size:11px;color:${MUTE};">Saturday Education Consulting · Auto-generated by the Career Assessment</p>
      </div>
    </div>
  </div>`
}
