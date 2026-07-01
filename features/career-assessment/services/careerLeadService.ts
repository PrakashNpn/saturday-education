'use server'

import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/shared/lib/db/prisma'
import { resend } from '@/shared/lib/email'
import { computeScores } from './scoring'
import { scoreAptitude } from './aptitudeScoring'
import { getRecommendationTree } from './universityRecs'
import { matchCareers } from './careerMatch'
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
  MatchedCareer,
  UniversityTeaser,
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
  matched: MatchedCareer[],
  preferredCountry?: string,
): Promise<CounselorSynthesis | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null
  try {
    // Bound the server→Anthropic call: 45s is ample for the ~3.2k-token response, and
    // one retry (not the SDK default 2) rescues a transient overload without ballooning
    // the student's "Submitting…" wait. A timeout/error is caught below → graceful null.
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 1, timeout: 45_000 })
    const res = await client.messages.create({
      model: 'claude-sonnet-4-6',
      // The prompt asks for a counselor read + 3 directions + suggested fields + 5
      // ranked careerPaths + a student read + a whyFit per matched career — a full
      // response is ~1.5k tokens. Keep generous headroom so the JSON is never
      // truncated (truncation breaks JSON.parse and nulls the synthesis).
      max_tokens: 3200,
      messages: [{ role: 'user', content: buildCounselorPrompt(scores, tree, matched, preferredCountry) }],
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

/** The student's visual profile (scores) for the dashboard charts. Deliberately
 *  excludes the interpretation (career directions / university matches / AI read),
 *  which stays gated in the counselor email/report. */
/** A real, personalised teaser of the recommendation tree (counts + countries +
 *  a few blurred sample rows). The full shortlist stays gated. */
function buildUniversityTeaser(tree: RecommendationTree): UniversityTeaser | undefined {
  const countries = new Set<string>()
  const sample: string[] = []
  let totalCount = 0

  for (const bucket of tree.buckets) {
    for (const c of bucket.countries) {
      countries.add(c.country)
      totalCount += c.universities.length + (c.moreCount ?? 0)
      for (const u of c.universities) {
        if (sample.length < 3) sample.push(`${u.program} · ${c.country} · ${u.name}`)
      }
    }
  }

  if (totalCount === 0) return undefined
  return {
    totalCount,
    countries: Array.from(countries).slice(0, 4),
    fields: tree.fields.slice(0, 3),
    sample,
  }
}

function buildDashboard(
  scores: AssessmentScores,
  matched: MatchedCareer[],
  synthesis: CounselorSynthesis | null,
  tree: RecommendationTree,
): Omit<DashboardData, 'fullName' | 'email' | 'phone'> {
  const { riasec, bigFive, aptitude } = scores

  const mainLabel = (c: RiasecCategory) => RIASEC_INFO[c].label.replace(/\s*\(.*\)\s*/, '').trim()

  const top2 = riasec.ranked.slice(0, 2)
  const archetype = buildArchetype(scores)
  const archetypeSummary =
    top2.length > 1
      ? `You're drawn most to ${mainLabel(top2[0])} and ${mainLabel(top2[1])} activities.`
      : `You're drawn most to ${mainLabel(top2[0])} activities.`

  // Merge the AI's personal "why it fits you" (keyed by career slug) into the matches.
  const whyById = new Map((synthesis?.careerFit ?? []).map((c) => [c.id, c.whyFit]))
  const careers = matched.map((m) => ({ ...m, whyFit: whyById.get(m.slug) }))

  return {
    archetype,
    archetypeSummary,
    studentRead: synthesis?.studentRead || archetypeSummary,
    hollandCode: riasec.hollandCode,
    interests: RIASEC_ORDER.map((c) => ({
      category: c,
      label: RIASEC_SHORT[c],
      value: Math.round((riasec.scores[c] / 50) * 100),
    })),
    personality: BIG_FIVE_BARS.map((b) => ({ ...b, percentile: bigFive.percentile[b.trait] })),
    aptitude: aptitude.areas.map((a) => ({ area: a.area, label: a.label, percent: a.percent, band: a.band })),
    aptitudeOverall: { percent: aptitude.overallPercent, band: aptitude.overallBand },
    careers,
    universityTeaser: buildUniversityTeaser(tree),
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

    // 2. AI synthesis (bounded) — nice-to-have. Persist it onto the saved lead best-effort;
    //    a failure here must never fail the submission.
    const synthesis = await generateSynthesis(scores, tree, matched, cleanContact.preferredCountry)
    if (synthesis) {
      try {
        await prisma.assessmentLead.update({ where: { id: lead.id }, data: { aiBrief: JSON.stringify(synthesis) } })
      } catch (error) {
        console.error('Assessment aiBrief update failed:', error)
      }
    }

    // 3. Generate the PDF report (best-effort), then email the counselor brief.
    let pdf: Buffer | null = null
    try {
      pdf = await buildAssessmentPdf({ contact: cleanContact, scores, synthesis, tree })
    } catch (error) {
      console.error('Assessment PDF generation failed:', error)
    }
    await sendBriefEmail({ contact: cleanContact, scores, evidence, synthesis, tree }, pdf)

    // Return the visual profile for the student dashboard (with their identity).
    return {
      success: true,
      dashboard: {
        ...buildDashboard(scores, matched, synthesis, tree),
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
