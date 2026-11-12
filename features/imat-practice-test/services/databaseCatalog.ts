import type { Prisma } from '../../../generated/client'
import { SECTION_IDS, type Question, type QuestionImage, type Paper } from '../types'
import sourceCorrections from '../data/sourceCorrections.json'

export type DatabasePaper = Prisma.ImatPaperGetPayload<{ include: {
  source: true; sections: true; passages: true; questions: { include: { options: true; answer: true } }
} }>
const ensure: (value: unknown) => asserts value = (value) => { if (!value) throw new Error('Incomplete or unapproved IMAT paper') }
function image(value: unknown): QuestionImage | undefined {
  if (value === null) return undefined
  ensure(typeof value === 'object' && value !== null && !Array.isArray(value))
  const v = value as Record<string, unknown>
  ensure(typeof v.src === 'string' && /^\/images\/imat\/[a-zA-Z0-9/_-]+\.(png|jpg|jpeg|webp|svg)$/.test(v.src))
  ensure(typeof v.alt === 'string' && v.alt.trim() && Number.isInteger(v.width) && Number(v.width) > 0 && Number.isInteger(v.height) && Number(v.height) > 0)
  return { src: v.src, alt: v.alt, width: Number(v.width), height: Number(v.height) }
}
/** Review metadata is stored as text JSON by the manual import, without a schema change. */
function metadata(value: string | null | undefined): Record<string, unknown> {
  if (!value) return {}
  let parsed: unknown
  try { parsed = JSON.parse(value) } catch { throw new Error('Malformed IMAT review metadata') }
  ensure(parsed && typeof parsed === 'object' && !Array.isArray(parsed))
  return parsed as Record<string, unknown>
}
function scoringPolicy(value: unknown): Question['scoringPolicy'] {
  if (value === null || value === undefined) return undefined
  ensure(typeof value === 'object' && !Array.isArray(value))
  const policy = value as Record<string, unknown>
  ensure(policy.kind === 'all-options-accepted')
  ensure(Array.isArray(policy.acceptedOptionKeys) && [...policy.acceptedOptionKeys].sort().join('') === 'ABCDE')
  // In particular, "unconfirmed" must never silently become zero or full credit.
  ensure(policy.blankTreatment === 'zero' || policy.blankTreatment === 'full-credit')
  ensure(typeof policy.evidenceUrl === 'string' && /^https:\/\//.test(policy.evidenceUrl))
  ensure(policy.basis === undefined || policy.basis === 'official-correction' || policy.basis === 'practice-adjustment')
  ensure(policy.note === undefined || (typeof policy.note === 'string' && policy.note.trim()))
  if (policy.basis === 'practice-adjustment') ensure(typeof policy.note === 'string' && policy.note.trim())
  return { kind: 'all-options-accepted', blankTreatment: policy.blankTreatment, evidenceUrl: policy.evidenceUrl,
    ...(policy.basis && { basis: policy.basis }), ...(typeof policy.note === 'string' && { note: policy.note }) }

}
export function mapDatabasePaper(row: DatabasePaper) {
  ensure(row.exam_year && row.question_count && row.duration_minutes && row.correct_score !== null && row.incorrect_score !== null)
  ensure(row.variant === 'published' && !row.is_development && row.source.source_kind === 'official')
  ensure(row.is_published && row.reviewed_at && row.reviewed_by && row.format_evidence && row.source.reuse_status === 'permitted' && row.source.reuse_evidence && row.source.corrections_status === 'checked')
  const formatReview = row.format_evidence?.trim().startsWith('{') ? metadata(row.format_evidence) : {}
  const notice = formatReview.minorSourceCorrections === true
    ? 'Minor source errors have been corrected for practice.'
    : formatReview.publicationNotice
  ensure(notice === undefined || (typeof notice === 'string' && notice.trim()))
  const sections = [...row.sections].sort((a,b) => a.position-b.position)
  ensure(sections.length && new Set(sections.map(s=>s.section_key)).size === sections.length)
  const format = { minutes: row.duration_minutes, correct: Number(row.correct_score), incorrect: Number(row.incorrect_score), sections: sections.map(s => {
    ensure(SECTION_IDS.includes(s.section_key as typeof SECTION_IDS[number]) && s.question_count > 0)
    return { id: s.section_key as typeof SECTION_IDS[number], count: s.question_count }
  }) }
  ensure(Number.isFinite(format.correct) && format.correct > 0 && Number.isFinite(format.incorrect) && format.incorrect <= 0 && Number(row.blank_score) === 0)
  const ordered = [...row.questions].sort((a,b)=>a.original_number-b.original_number)
  ensure(ordered.length === row.question_count && format.sections.reduce((n,s)=>n+s.count,0) === ordered.length)
  const expectedSections = format.sections.flatMap(s=>Array(s.count).fill(s.id))
  const questions: Question[] = ordered.map((q,i) => {
    ensure(q.original_number === i+1 && q.section_key === expectedSections[i] && q.prompt?.trim() && q.review_status !== 'withdrawn')
    ensure(q.answer && q.options.length === 5 && [...q.options].map(o=>o.option_key).sort().join('') === 'ABCDE')
    ensure(q.options.some(o=>o.option_key === q.answer!.correct_option_key) && q.answer.evidence_reference.trim())
    ensure(q.review_status === 'reviewed' && q.reviewed_at && q.reviewed_by && q.answer.review_status === 'reviewed' && q.answer.reviewed_at && q.answer.reviewed_by)
    const review = metadata(q.review_notes)
    const policy = scoringPolicy(review.scoringPolicy)
    const correction = sourceCorrections.find(c => c.year === row.exam_year && c.number === q.original_number)
    const corrected = correction && review.practiceCorrection !== undefined
    if (corrected) {
      const audit = review.practiceCorrection as Record<string, unknown>
      ensure(audit && typeof audit === 'object' && audit.id === correction.id && audit.original && audit.reviewedBy)
      ensure(formatReview.minorSourceCorrections === true && !policy)
      ensure(q.prompt === correction.prompt && q.answer.correct_option_key === correction.correctKey)
      ensure(correction.options.every(o => q.options.some(actual => actual.option_key === o.key && actual.body === o.text && actual.image === null)))
      const actualImage = image(q.image)
      ensure(correction.image ? actualImage?.src === correction.image.src && actualImage.width === correction.image.width && actualImage.height === correction.image.height && actualImage.alt === correction.image.alt : !actualImage)
    }
    if (policy) {
      ensure(!q.mock_eligible && !q.shuffle_options)
      if (policy.basis === 'practice-adjustment') ensure(typeof notice === 'string' && notice.trim())
    }
    {
      const flags = review.reviewFlags ?? []
      ensure(Array.isArray(flags) && flags.every(flag => typeof flag === 'string'))
      const unresolved = new Set([
        'official-answer-evidence-review-pending',
        'possible-official-answer-inconsistency-needs-expert-review',
        'source-power-question-missing-numerical-speed',
        'source-unit-inconsistency-cm-versus-m',
      ])
      ensure(!flags.some(flag => unresolved.has(flag)))
    }
    if (row.exam_year === 2013 && (q.original_number === 5 || q.original_number === 54)) ensure(policy || corrected)
    if (row.exam_year === 2013 && q.original_number === 14) ensure(q.answer.correct_option_key === 'C')
    if (row.exam_year === 2012 && q.original_number === 15) ensure(q.answer.correct_option_key === 'C')
    if ((row.exam_year === 2024 && q.original_number === 55) || (row.exam_year === 2025 && q.original_number === 52)) ensure(corrected || (policy?.basis === 'practice-adjustment' && policy.blankTreatment === 'full-credit'))
    const passage = q.passage_id ? row.passages.find(p=>p.id === q.passage_id && p.paper_id === row.id) : undefined
    if (q.passage_id) ensure(passage && (passage.body?.trim() || passage.image))
    return {
      id: q.stable_key, section: q.section_key as Question['section'], prompt: q.prompt!,
      options: [...q.options].sort((a,b)=>a.option_key.localeCompare(b.option_key)).map(o=> {
        ensure(o.body?.trim() || o.image)
        return { id: o.option_key, text: o.body ?? '', image: image(o.image) }
      }),
      correctOptionId: q.answer!.correct_option_key,
      ...(policy && { scoringPolicy: policy }),
      explanation: q.answer!.explanation_reviewed_at && q.answer!.explanation_reviewed_by ? q.answer!.explanation ?? '' : '',
      image: image(q.image), shuffleOptions: q.shuffle_options,
      ...(passage && { passage: { id: `${row.slug}:${passage.reference}`, text: [passage.body, passage.attribution].filter(Boolean).join('\n\n'), image: image(passage.image) } }),
      source: { kind: 'official', reference: `IMAT ${row.exam_year}, question ${q.original_number}`, url: row.source.source_url ?? undefined,
        year: row.exam_year!, originalNumber: q.original_number,
        review: { reviewer: q.reviewed_by!, checkedAt: q.reviewed_at!.toISOString(), reuseEvidence: row.source.reuse_evidence! } },
    }
  })
  ensure(new Set(questions.map(q=>q.id)).size === questions.length)
  // Shared passages must be complete, contiguous and within a single section.
  for (const p of row.passages) {
    const indices = ordered.flatMap((q,i)=>q.passage_id === p.id ? [i] : [])
    if (!indices.length) continue
    ensure(indices.every((v,i)=>v === indices[0]+i) && new Set(indices.map(i=>questions[i].section)).size === 1)
    ensure(indices.every(i=>!ordered[i].mock_eligible) || indices.every(i=>ordered[i].mock_eligible))
  }
  const paper: Paper = { id: row.slug, year: row.exam_year!, development: false, format, questionIds: questions.map(q=>q.id), sourceUrl: row.source.source_url ?? undefined, ...(typeof notice === 'string' && { scoringNotice: notice }) }
  return { paper, questions, mockQuestionIds: ordered.filter(q=>q.mock_eligible).map(q=>q.stable_key) }
}
