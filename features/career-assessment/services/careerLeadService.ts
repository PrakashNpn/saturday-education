'use server'

import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/shared/lib/db/prisma'
import { resend } from '@/shared/lib/email'
import { computeScores } from './scoring'
import { getRecommendationTree } from './universityRecs'
import { extractInterestEvidence, buildCounselorEmailHtml } from './brief'
import { buildCounselorPrompt } from '../prompts/counselorBrief'
import { candidateBuckets } from '../data/fieldTaxonomy'
import type {
  AnswerMap,
  ContactDetails,
  CounselorSynthesis,
  AssessmentScores,
  RecommendationTree,
  SubmitResult,
} from '../types'

const LEADS_EMAIL =
  process.env.CAREER_LEADS_EMAIL ??
  process.env.CONSULTATION_NOTIFICATION_EMAIL ??
  'saturdayeducationconsulting@gmail.com'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
      max_tokens: 900,
      messages: [{ role: 'user', content: buildCounselorPrompt(scores, tree, preferredCountry) }],
    })
    const text = res.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim()

    const jsonStart = text.indexOf('{')
    const jsonEnd = text.lastIndexOf('}')
    if (jsonStart === -1 || jsonEnd === -1) return null
    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as CounselorSynthesis

    return {
      read: typeof parsed.read === 'string' ? parsed.read : '',
      careerDirections: Array.isArray(parsed.careerDirections) ? parsed.careerDirections.slice(0, 5) : [],
      suggestedFields: Array.isArray(parsed.suggestedFields) ? parsed.suggestedFields.slice(0, 6) : [],
    }
  } catch (error) {
    console.error('Career synthesis (AI) failed:', error)
    return null
  }
}

export async function submitCareerAssessment(
  contact: ContactDetails,
  answers: AnswerMap,
): Promise<SubmitResult> {
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
    const scores = computeScores(answers)
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
    await prisma.careerLead.create({
      data: {
        fullName: cleanContact.fullName,
        email: cleanContact.email,
        phone: cleanContact.phone || null,
        educationLevel: cleanContact.educationLevel || null,
        preferredCountry: cleanContact.preferredCountry || null,
        hollandCode: scores.riasec.hollandCode,
        riasecScores: scores.riasec.scores,
        bigFiveScores: { raw: scores.bigFive.raw, percentile: scores.bigFive.percentile },
        recommendedFields: tree.fields,
        recommendedUniversities: tree as unknown as object,
        rawAnswers: answers,
        aiBrief: synthesis ? JSON.stringify(synthesis) : null,
      },
    })

    // 2. Email the counselor brief (best-effort).
    await sendBriefEmail({ contact: cleanContact, scores, evidence, synthesis, tree })

    return { success: true }
  } catch (error) {
    console.error('Career assessment submission error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}

async function sendBriefEmail(args: Parameters<typeof buildCounselorEmailHtml>[0]) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set — skipping career-lead notification email.')
    return
  }
  try {
    await resend.emails.send({
      from: 'Saturday Education <consultations@saturdayeducation.com>',
      to: LEADS_EMAIL,
      replyTo: args.contact.email,
      subject: `New Career Assessment Lead — ${args.contact.fullName}`,
      html: buildCounselorEmailHtml(args),
    })
  } catch (error) {
    console.error('Career-lead notification email error:', error)
  }
}
