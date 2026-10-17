'use server'

import { after } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/shared/lib/db/prisma'
import { resend } from '@/shared/lib/email'
import { deDash } from '@/shared/utils/dashes'
import { countryNameFor } from '@/shared/constants/destinationCountries'
import { computeScores } from './scoring'
import { scoreAptitude } from './aptitudeScoring'
import { getRecommendationTree } from './universityRecs'
import { matchCareers } from './careerMatch'
import { extractInterestEvidence, buildCounselorEmailHtml } from './brief'
import { buildAssessmentPdf } from './pdf/ReportDocument'
import { buildDashboard } from './dashboardBuilder'
import { educationLevelName } from '../utils/educationLevels'
import { buildCounselorPrompt } from '../prompts/counselorBrief'
import { candidateBuckets } from '../data/fieldTaxonomy'
import type {
  AnswerMap,
  ContactDetails,
  CounselorSynthesis,
  AssessmentScores,
  RecommendationTree,
  SubmitResult,
  MatchedCareer,
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
  matched: MatchedCareer[],
  preferredCountry?: string,
  locale?: string,
): Promise<CounselorSynthesis | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null
  try {
    // Bound the server→Anthropic call. The student no longer waits on this (it runs in
    // after()), but the whole background chain — synthesis, then PDF, then email — still
    // has to finish inside the route's maxDuration of 60s. 45s plus a retry could reach
    // ~90s and lose the counsellor email entirely, so this is capped at 30s with no retry:
    // worst case ~30s here plus PDF and send still fits. A timeout is caught below and
    // yields a null synthesis, which the email and PDF already handle.
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 0, timeout: 30_000 })
    const res = await client.messages.create({
      model: 'claude-sonnet-4-6',
      // The prompt asks for a counselor read + 3 directions + suggested fields + 5
      // ranked careerPaths + a student read + a whyFit per matched career — a full
      // response is ~1.5k tokens. Keep generous headroom so the JSON is never
      // truncated (truncation breaks JSON.parse and nulls the synthesis).
      max_tokens: 3200,
      messages: [{ role: 'user', content: buildCounselorPrompt(scores, tree, matched, preferredCountry, locale) }],
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
      studentRead: typeof parsed.studentRead === 'string' ? deDash(parsed.studentRead) : undefined,
      careerFit: Array.isArray(parsed.careerFit)
        ? parsed.careerFit
            .filter((c) => c && typeof c.id === 'string' && typeof c.whyFit === 'string')
            .map((c) => ({ id: String(c.id), whyFit: deDash(String(c.whyFit)) }))
        : undefined,
    }
  } catch (error) {
    console.error('Assessment synthesis (AI) failed:', error)
    return null
  }
}

export async function submitAssessment(
  contact: ContactDetails,
  answers: AnswerMap,
  locale?: string,
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
    educationLevel: contact.educationLevel?.trim() ? educationLevelName(contact.educationLevel.trim()) : undefined,
    // The form sends a country key; counsellors, the PDF and the AI prompt use the English name.
    preferredCountry: contact.preferredCountry?.trim() ? countryNameFor(contact.preferredCountry.trim()) : undefined,
  }

  try {
    const scores: AssessmentScores = { ...computeScores(answers), aptitude: scoreAptitude(answers) }
    const topCategories = scores.riasec.ranked.slice(0, 3)
    const buckets = candidateBuckets(topCategories, 3)

    // Deterministic career matches from the frozen catalog (drives the dashboard
    // breakdown and grounds the AI's personal "why it fits you").
    const matched = matchCareers(scores)

    // Recommendation tree (grounds the AI synthesis in real programs we can offer).
    const tree = await getRecommendationTree(buckets, {
      preferredCountry: cleanContact.preferredCountry,
      educationLevel: cleanContact.educationLevel,
    })
    const evidence = extractInterestEvidence(answers, topCategories)

    // 1. Persist the lead FIRST (source of truth) — independent of the AI, so a slow or
    //    failed synthesis can never lose the lead. This is the only step that must succeed.
    const lead = await prisma.assessmentLead.create({
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
        aiBrief: null,
      },
    })

    // 2. The counsellor pipeline (AI synthesis → PDF → email) runs AFTER the response is
    //    sent. It used to run inline, holding the student's request open for 30-90s, which
    //    on a mobile connection frequently dropped before it finished — losing the result,
    //    the email, and the student's 25 minutes of work. None of it is needed to render
    //    their dashboard, so it no longer blocks them.
    after(async () => {
      try {
        const synthesis = await generateSynthesis(scores, tree, matched, cleanContact.preferredCountry, locale)
        if (synthesis) {
          try {
            await prisma.assessmentLead.update({
              where: { id: lead.id },
              data: { aiBrief: JSON.stringify(synthesis) },
            })
          } catch (error) {
            console.error('Assessment aiBrief update failed:', error)
          }
        }

        // Merge the AI's per-career "why it fits you" into the matches — for the counsellor
        // PDF only (the student's dashboard no longer receives the career matches).
        const whyById = new Map((synthesis?.careerFit ?? []).map((c) => [c.id, c.whyFit]))
        const careers = matched.map((m) => ({ ...m, whyFit: whyById.get(m.slug) }))

        let pdf: Buffer | null = null
        try {
          pdf = await buildAssessmentPdf({ contact: cleanContact, scores, synthesis, tree, careers })
        } catch (error) {
          console.error('Assessment PDF generation failed:', error)
        }
        await sendBriefEmail({ contact: cleanContact, scores, evidence, synthesis, tree }, pdf)
      } catch (error) {
        // The lead is already saved, so the student is unaffected by anything failing here.
        console.error('Assessment background pipeline failed:', error)
      }
    })

    // Return the visual profile immediately. Only `studentRead` comes from the AI and it
    // falls back to `archetypeSummary`; the dashboard fetches the real one via
    // getStudentRead() once the background work lands.
    return {
      success: true,
      leadId: lead.id,
      dashboard: {
        ...buildDashboard(scores, null, tree),
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

/**
 * The student-facing paragraph, once the background AI synthesis has landed.
 *
 * Returns ONLY `studentRead` — never the rest of the synthesis. The counsellor read,
 * career directions and university shortlist stay gated to the counsellor email/report,
 * which is the same boundary the dashboard has always respected.
 *
 * Returns null while the background work is still running, so the caller can simply keep
 * showing the deterministic `archetypeSummary` fallback.
 */
export async function getStudentRead(leadId: string): Promise<string | null> {
  if (!leadId) return null
  try {
    const lead = await prisma.assessmentLead.findUnique({
      where: { id: leadId },
      select: { aiBrief: true },
    })
    if (!lead?.aiBrief) return null
    const parsed = JSON.parse(lead.aiBrief) as Partial<CounselorSynthesis>
    return typeof parsed.studentRead === 'string' && parsed.studentRead.trim()
      ? parsed.studentRead
      : null
  } catch (error) {
    console.error('getStudentRead failed:', error)
    return null
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
