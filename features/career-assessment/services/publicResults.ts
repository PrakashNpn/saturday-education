'use server'

// The gated read path for a shared results link. Deliberately selects only
// the columns needed to redraw the visual profile — email, phone, rawAnswers
// (beyond re-scoring), recommendedUniversities and aiBrief's non-studentRead
// fields are never pulled into memory here, so there's no code path by which
// they could leak into this page later by accident.

import { prisma } from '@/shared/lib/db/prisma'
import { computeScores } from './scoring'
import { scoreAptitude } from './aptitudeScoring'
import { buildDashboard } from './dashboardBuilder'
import type { AnswerMap, AssessmentScores, CounselorSynthesis, DashboardData, RecommendationTree } from '../types'

export type PublicResultsData = Omit<DashboardData, 'email' | 'phone'>

// No buckets in an empty tree means buildUniversityTeaser (inside
// buildDashboard) resolves totalCount to 0 and returns undefined — the public
// page never shows the university-shortlist teaser at all, so there's no
// reason to fetch or compute the real recommendation tree for it.
const EMPTY_TREE: RecommendationTree = { buckets: [], fields: [] }

export async function getPublicResults(leadId: string): Promise<PublicResultsData | null> {
  if (!leadId) return null
  try {
    const lead = await prisma.assessmentLead.findUnique({
      where: { id: leadId },
      select: { fullName: true, rawAnswers: true, aiBrief: true },
    })
    if (!lead) return null

    const answers = lead.rawAnswers as AnswerMap
    const scores: AssessmentScores = { ...computeScores(answers), aptitude: scoreAptitude(answers) }

    // Reuse the already-generated studentRead paragraph if the background
    // synthesis has landed by now — no new AI call from this read path.
    let synthesis: CounselorSynthesis | null = null
    if (lead.aiBrief) {
      try {
        const parsed = JSON.parse(lead.aiBrief) as Partial<CounselorSynthesis>
        if (typeof parsed.studentRead === 'string' && parsed.studentRead.trim()) {
          synthesis = { studentRead: parsed.studentRead } as CounselorSynthesis
        }
      } catch {
        /* stored aiBrief was malformed — fall back to the deterministic summary below */
      }
    }

    return {
      ...buildDashboard(scores, synthesis, EMPTY_TREE),
      fullName: lead.fullName,
    }
  } catch (error) {
    console.error('getPublicResults failed:', error)
    return null
  }
}
