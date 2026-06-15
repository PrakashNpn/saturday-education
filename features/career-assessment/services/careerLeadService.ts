'use server'

import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/shared/lib/db/prisma'
import { resend } from '@/shared/lib/email'
import { computeScores } from './scoring'
import { scoreAptitude } from './aptitudeScoring'
import { getRecommendationTree } from './universityRecs'
import { extractInterestEvidence, buildCounselorEmailHtml } from './brief'
import { buildArchetype } from './archetype'
import { buildAssessmentPdf } from './pdf/ReportDocument'
import { buildCounselorPrompt } from '../prompts/counselorBrief'
import { candidateBuckets } from '../data/fieldTaxonomy'
import { RIASEC_INFO } from '../data/riasecFieldMap'
import type {
  AnswerMap,
  ContactDetails,
  CounselorSynthesis,
  AssessmentScores,
  RecommendationTree,
  SubmitResult,
  DashboardData,
  RiasecCategory,
  BigFiveTrait,
} from '../types'

const LEADS_EMAIL =
  process.env.CAREER_LEADS_EMAIL ??
  process.env.CONSULTATION_NOTIFICATION_EMAIL ??
  'saturdayeducationconsulting@gmail.com'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const RIASEC_ORDER: RiasecCategory[] = ['R', 'I', 'A', 'S', 'E', 'C']
const RIASEC_SHORT: Record<RiasecCategory, string> = {
  R: 'Realistic',
  I: 'Investigative',
  A: 'Artistic',
  S: 'Social',
  E: 'Enterprising',
  C: 'Conventional',
}
// Bipolar pole labels for the personality bars (low ↔ high of each trait).
const BIG_FIVE_BARS: { trait: BigFiveTrait; label: string; low: string; high: string }[] = [
  { trait: 'O', label: 'Openness', low: 'Practical', high: 'Curious' },
  { trait: 'C', label: 'Conscientiousness', low: 'Flexible', high: 'Organised' },
  { trait: 'E', label: 'Extraversion', low: 'Reserved', high: 'Outgoing' },
  { trait: 'A', label: 'Agreeableness', low: 'Direct', high: 'Compassionate' },
  { trait: 'N', label: 'Emotional sensitivity', low: 'Calm', high: 'Sensitive' },
]

/** Calls Claude for a counselor-facing synthesis. Returns null on any failure. */
async function generateSynthesis(
  scores: AssessmentScores,
  tree: RecommendationTree,
  preferredCountry?: string,
): Promise<CounselorSynthesis | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const res = await client.messages.create({
      model: 'claude-sonnet-4-6',
      // The prompt asks for a read + 3-5 directions + suggested fields + 8-12 ranked
      // careerPaths — a full response is ~1.2k tokens. Keep generous headroom so the
      // JSON is never truncated (truncation breaks JSON.parse and nulls the synthesis).
      max_tokens: 2500,
      messages: [{ role: 'user', content: buildCounselorPrompt(scores, tree, preferredCountry) }],
    })
    const text = res.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim()

    if (res.stop_reason === 'max_tokens') {
      console.warn('Assessment synthesis: AI response hit max_tokens and was truncated — raise max_tokens.')
    }

    const jsonStart = text.indexOf('{')
    const jsonEnd = text.lastIndexOf('}')
    if (jsonStart === -1 || jsonEnd === -1) return null
    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as CounselorSynthesis
    const clampFit = (n: unknown) => Math.max(0, Math.min(100, Math.round(Number(n) || 0)))
    // Safety net: the prompt asks the model not to use em/en dashes, but strip any
    // that slip through so the output never reads as machine-generated.
    const deDash = (s: string) =>
      s.replace(/\s*[—–]\s*/g, ', ').replace(/,\s*,/g, ',').replace(/\s{2,}/g, ' ').trim()

    return {
      read: typeof parsed.read === 'string' ? deDash(parsed.read) : '',
      careerDirections: Array.isArray(parsed.careerDirections)
        ? parsed.careerDirections.slice(0, 3).map((d) => ({
            title: deDash(String(d?.title ?? '')),
            why: deDash(String(d?.why ?? '')),
          }))
        : [],
      suggestedFields: Array.isArray(parsed.suggestedFields)
        ? parsed.suggestedFields.slice(0, 6).map((f) => deDash(String(f)))
        : [],
      careerPaths: Array.isArray(parsed.careerPaths)
        ? parsed.careerPaths
            .filter((p) => p && typeof p.title === 'string')
            .map((p) => ({
              title: deDash(String(p.title)),
              roles: typeof p.roles === 'string' ? deDash(p.roles) : undefined,
              psychFit: clampFit(p.psychFit),
              skillsFit: clampFit(p.skillsFit),
            }))
            .sort((a, b) => b.psychFit + b.skillsFit - (a.psychFit + a.skillsFit))
            .slice(0, 5)
        : [],
    }
  } catch (error) {
    console.error('Assessment synthesis (AI) failed:', error)
    return null
  }
}

/** The student's visual profile (scores) for the dashboard charts. Deliberately
 *  excludes the interpretation (career directions / university matches / AI read),
 *  which stays gated in the counselor email/report. */
function buildDashboard(scores: AssessmentScores): Omit<DashboardData, 'fullName' | 'email' | 'phone'> {
  const { riasec, bigFive, aptitude } = scores

  const mainLabel = (c: RiasecCategory) => RIASEC_INFO[c].label.replace(/\s*\(.*\)\s*/, '').trim()

  const top2 = riasec.ranked.slice(0, 2)
  const archetype = buildArchetype(scores)
  const archetypeSummary =
    top2.length > 1
      ? `You're drawn most to ${mainLabel(top2[0])} and ${mainLabel(top2[1])} activities.`
      : `You're drawn most to ${mainLabel(top2[0])} activities.`

  return {
    archetype,
    archetypeSummary,
    hollandCode: riasec.hollandCode,
    interests: RIASEC_ORDER.map((c) => ({
      category: c,
      label: RIASEC_SHORT[c],
      value: Math.round((riasec.scores[c] / 50) * 100),
    })),
    personality: BIG_FIVE_BARS.map((b) => ({ ...b, percentile: bigFive.percentile[b.trait] })),
    aptitude: aptitude.areas.map((a) => ({ area: a.area, label: a.label, percent: a.percent, band: a.band })),
    aptitudeOverall: { percent: aptitude.overallPercent, band: aptitude.overallBand },
  }
}

export async function submitAssessment(contact: ContactDetails, answers: AnswerMap): Promise<SubmitResult> {
  if (!contact?.fullName?.trim() || !contact?.email?.trim()) {
    return { success: false, error: 'Name and email are required.' }
  }
  if (!EMAIL_REGEX.test(contact.email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }
  if (!answers || Object.keys(answers).length === 0) {
    return { success: false, error: 'No assessment answers were submitted.' }
  }

  const cleanContact: ContactDetails = {
    fullName: contact.fullName.trim(),
    email: contact.email.trim(),
    phone: contact.phone?.trim() ?? '',
    educationLevel: contact.educationLevel?.trim() || undefined,
    preferredCountry: contact.preferredCountry?.trim() || undefined,
  }

  try {
    const scores: AssessmentScores = { ...computeScores(answers), aptitude: scoreAptitude(answers) }
    const topCategories = scores.riasec.ranked.slice(0, 3)
    const buckets = candidateBuckets(topCategories, 3)

    // Recommendation tree first (it grounds the AI synthesis in real programs).
    const tree = await getRecommendationTree(buckets, {
      preferredCountry: cleanContact.preferredCountry,
      educationLevel: cleanContact.educationLevel,
    })
    const synthesis = await generateSynthesis(scores, tree, cleanContact.preferredCountry)
    const evidence = extractInterestEvidence(answers, topCategories)

    // 1. Persist the lead (source of truth) — must succeed.
    await prisma.assessmentLead.create({
      data: {
        fullName: cleanContact.fullName,
        email: cleanContact.email,
        phone: cleanContact.phone || null,
        educationLevel: cleanContact.educationLevel || null,
        preferredCountry: cleanContact.preferredCountry || null,
        hollandCode: scores.riasec.hollandCode,
        riasecScores: scores.riasec.scores,
        bigFiveScores: { raw: scores.bigFive.raw, percentile: scores.bigFive.percentile },
        aptitudeScores: scores.aptitude as unknown as object,
        aptitudeOverall: scores.aptitude.overallPercent,
        recommendedFields: tree.fields,
        recommendedUniversities: tree as unknown as object,
        rawAnswers: answers,
        aiBrief: synthesis ? JSON.stringify(synthesis) : null,
      },
    })

    // 2. Generate the PDF report (best-effort), then email the counselor brief.
    let pdf: Buffer | null = null
    try {
      pdf = await buildAssessmentPdf({ contact: cleanContact, scores, evidence, synthesis, tree })
    } catch (error) {
      console.error('Assessment PDF generation failed:', error)
    }
    await sendBriefEmail({ contact: cleanContact, scores, evidence, synthesis, tree }, pdf)

    // Return the visual profile for the student dashboard (with their identity).
    return {
      success: true,
      dashboard: {
        ...buildDashboard(scores),
        fullName: cleanContact.fullName,
        email: cleanContact.email,
        phone: cleanContact.phone || undefined,
      },
    }
  } catch (error) {
    console.error('Assessment submission error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}

async function sendBriefEmail(args: Parameters<typeof buildCounselorEmailHtml>[0], pdf?: Buffer | null) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set — skipping assessment-lead notification email.')
    return
  }
  const safeName = args.contact.fullName.replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '') || 'student'
  try {
    await resend.emails.send({
      from: 'Saturday Education <consultations@saturdayeducation.com>',
      to: LEADS_EMAIL,
      replyTo: args.contact.email,
      subject: `New Assessment Lead: ${args.contact.fullName}`,
      html: buildCounselorEmailHtml(args, { pdfAttached: !!pdf }),
      attachments: pdf ? [{ filename: `Career-Assessment-${safeName}.pdf`, content: pdf }] : undefined,
    })
  } catch (error) {
    console.error('Assessment-lead notification email error:', error)
  }
}
