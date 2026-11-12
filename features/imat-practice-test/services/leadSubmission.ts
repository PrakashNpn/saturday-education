import * as z from 'zod'
import { LOCALE_CODES } from '@/i18n/languages'
import { isValidPhone } from '@/shared/utils/phone'
import { createExamEngine } from './exam'
import type { ExamCatalog } from '../types'

export const IMAT_CONSENT_VERSION = 'imat-results-v1'
export type LeadError = 'name' | 'email' | 'phone' | 'consent' | 'attempt' | 'rate' | 'failed'
export type LeadResponse = { success: true } | { success: false; code: LeadError }
export type ImatLeadRecord = {
  attempt_id: string; bank_version: string; full_name: string; email: string; phone: string; locale: string
  exam_mode: 'mock' | 'paper'; paper_slug: string | null; score: number; maximum_score: number
  question_count: number; correct_count: number; incorrect_count: number; unanswered_count: number
  completed_at: Date; consent_version: string
}
export type ImatSectionResult = ReturnType<ReturnType<typeof createExamEngine>['scoreAttempt']>['rows'][number]
export type LeadDependencies = {
  loadCatalog: () => Promise<ExamCatalog>
  saveLead: (record: ImatLeadRecord, sections: ImatSectionResult[]) => Promise<void>
}

const schema = z.object({
  fullName: z.string().trim().min(2).max(120).regex(/^[^\u0000-\u001f\u007f]+$/),
  email: z.string().trim().max(254).pipe(z.email()),
  phone: z.string().trim().min(6).max(40).regex(/^\+[0-9\s().-]+$/),
  consent: z.literal(true),
  locale: z.string().refine(locale => LOCALE_CODES.includes(locale as typeof LOCALE_CODES[number])),
  hp: z.string().max(0).optional(),
  attempt: z.unknown(),
})

/** Dependency injection keeps validation/scoring tests off the live database. */
export async function submitImatLead(raw: unknown, dependencies: LeadDependencies, now = Date.now()): Promise<LeadResponse> {
  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    const field = parsed.error.issues[0]?.path[0]
    const code = field === 'fullName' ? 'name' : field === 'email' || field === 'phone' || field === 'consent' ? field : 'attempt'
    return { success: false, code }
  }
  const input = parsed.data
  if (!await isValidPhone(input.phone)) return { success: false, code: 'phone' }
  try {
    const catalog = await dependencies.loadCatalog()
    const engine = createExamEngine(catalog)
    const attempt = engine.restoreAttempt(JSON.stringify(input.attempt), now)
    if (!attempt || attempt.completedAt === null || attempt.completedAt > now || !z.uuid().safeParse(attempt.id).success) return { success: false, code: 'attempt' }
    const result = engine.scoreAttempt(attempt)
    await dependencies.saveLead({
      attempt_id: attempt.id, bank_version: catalog.bankVersion, full_name: input.fullName,
      email: input.email.toLowerCase(), phone: input.phone.replace(/[\s().-]/g, ''), locale: input.locale,
      exam_mode: attempt.mode, paper_slug: attempt.paperId, score: result.score,
      maximum_score: result.maximum, question_count: attempt.questionIds.length,
      correct_count: result.correct, incorrect_count: result.incorrect, unanswered_count: result.unanswered,
      completed_at: new Date(attempt.completedAt), consent_version: IMAT_CONSENT_VERSION,
    }, result.rows)
    return { success: true }
  } catch {
    // Never log the submitted body, phone, email or answers.
    return { success: false, code: 'failed' }
  }
}

const MAX_BODY_BYTES = 250_000
const hits = new Map<string, { count: number; until: number }>()
/** Per-instance speed bump; this is not a distributed rate limiter. */
function limited(key: string, now: number) {
  for (const [client, record] of hits) if (record.until <= now) hits.delete(client)
  let record = hits.get(key)
  if (!record) {
    if (hits.size >= 2_000) return true
    record = { count: 0, until: now + 15 * 60_000 }; hits.set(key, record)
  }
  return ++record.count > 20
}

export async function processImatLeadRequest(request: Request, dependencies: LeadDependencies): Promise<Response> {
  const fail = (code: LeadError, status: number) => Response.json({ success: false, code }, { status, headers: { 'Cache-Control': 'no-store' } })
  if (request.headers.get('origin') !== new URL(request.url).origin) return fail('failed', 403)
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return fail('attempt', 415)
  const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim().slice(0,100) || 'unknown'
  if (limited(key, Date.now())) return fail('rate', 429)
  if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES) return fail('attempt', 413)
  const reader = request.body?.getReader()
  if (!reader) return fail('attempt', 400)
  let size = 0, text = ''
  const decoder = new TextDecoder()
  try {
    while (true) {
      const chunk = await reader.read()
      if (chunk.done) break
      size += chunk.value.byteLength
      if (size > MAX_BODY_BYTES) { await reader.cancel(); return fail('attempt', 413) }
      text += decoder.decode(chunk.value, { stream: true })
    }
    text += decoder.decode()
    const result = await submitImatLead(JSON.parse(text), dependencies)
    return Response.json(result, { status: result.success ? 200 : result.code === 'failed' ? 503 : 400, headers: { 'Cache-Control': 'no-store' } })
  } catch { return fail('attempt', 400) }
  finally { reader.releaseLock() }
}
