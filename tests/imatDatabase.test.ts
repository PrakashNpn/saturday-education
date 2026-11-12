import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { mapDatabasePaper, type DatabasePaper } from '../features/imat-practice-test/services/databaseCatalog'
import { createExamEngine } from '../features/imat-practice-test/services/exam'
import type { ExamCatalog } from '../features/imat-practice-test/types'
import sourceCorrections from '../features/imat-practice-test/data/sourceCorrections.json'

// Retained test data only; source PDFs and import tooling are archived outside the repository.
const draft = JSON.parse(fs.readFileSync('tests/fixtures/imat/2026-database-paper.json', 'utf8'))
// Mirrors the SELECT result, not a database connection. This suite never loads DB/env code.
function row(): DatabasePaper {
  const passages = draft.questions.filter((q: { passage: unknown }) => q.passage).map((q: { passage: { stableKey: string; text: string; attribution: string } }) => ({ id: q.passage.stableKey, reference: q.passage.stableKey, paper_id: 'paper', body: q.passage.text, attribution: q.passage.attribution, image: null }))
  return {
    id: 'paper', slug: 'imat-2026-published', exam_year: 2026, variant: 'published', is_published: false, is_development: false,
    question_count: 60, duration_minutes: 100, correct_score: 1.5, incorrect_score: -0.4, blank_score: 0,
    format_evidence: 'official call', reviewed_by: null, reviewed_at: null,
    source: { source_kind: 'official', source_url: draft.source.url, reuse_status: 'unconfirmed', reuse_evidence: null, corrections_status: 'pending' },
    sections: draft.paper.sections.map((s: { id: string; count: number },i: number)=>({ section_key: s.id, question_count: s.count, position: i+1 })),
    passages,
    questions: draft.questions.map((q: { stableKey: string; originalNumber: number; sourcePage: number; section: string; prompt: string; passage: { stableKey: string } | null; options: { sourceKey: string; text: string }[] })=>({
      id: q.stableKey, paper_id: 'paper', stable_key: q.stableKey, original_number: q.originalNumber, source_page: q.sourcePage,
      section_key: q.section, prompt: q.prompt, passage_id: q.passage?.stableKey ?? null, image: null,
      review_status: 'draft', mock_eligible: false, shuffle_options: false, reviewed_at: null, reviewed_by: null,
      options: q.options.map(o=>({ option_key: o.sourceKey, body: o.text, image: null })),
      answer: { correct_option_key: 'A', evidence_reference: 'official published key', review_status: 'draft', reviewed_by: null, reviewed_at: null, explanation: 'UNREVIEWED', explanation_reviewed_at: null, explanation_reviewed_by: null },
    })),
  } as unknown as DatabasePaper
}
function approved() {
  const value = row()
  value.is_published = true; value.reviewed_by = 'test reviewer'; value.reviewed_at = new Date()
  value.source.reuse_status = 'permitted'; value.source.reuse_evidence = 'test permission'; value.source.corrections_status = 'checked'
  for (const q of value.questions) {
    q.review_status = 'reviewed'; q.reviewed_by = 'test reviewer'; q.reviewed_at = new Date(); q.mock_eligible = true
    q.answer!.review_status = 'reviewed'; q.answer!.reviewed_by = 'test reviewer'; q.answer!.reviewed_at = new Date()
  }
  return value
}
test('unpublished papers are rejected and unreviewed explanations stay hidden',()=>{
  assert.throws(()=>mapDatabasePaper(row()))
  const mapped=mapDatabasePaper(approved())
  assert.equal(mapped.questions.length,60); assert.equal(mapped.mockQuestionIds.length,60)
  assert.ok(mapped.questions[0].passage?.text.includes('Translated from'))
  assert.equal(mapped.questions[57].options[0].text,'7/22')
  assert.ok(mapped.questions.every(q=>q.explanation === ''))
  const other=approved();other.is_published=false;assert.throws(()=>mapDatabasePaper(other))
})
test('reviewed publication requires reuse, corrections and individual answer review',()=>{
  assert.equal(mapDatabasePaper(approved()).mockQuestionIds.length,60)
  for(const mutate of [
    (p: DatabasePaper)=>{p.source.reuse_status='unconfirmed'},
    (p: DatabasePaper)=>{p.source.corrections_status='pending'},
    (p: DatabasePaper)=>{p.questions[0].answer!.review_status='draft'},
  ]) {const value=approved();mutate(value);assert.throws(()=>mapDatabasePaper(value))}
})
test('incomplete choices, section mismatches and malformed media fail closed',()=>{
  const missing=approved();missing.questions[0].options.pop();assert.throws(()=>mapDatabasePaper(missing))
  const section=approved();section.questions[0].section_key='biology';assert.throws(()=>mapDatabasePaper(section))
  const image=approved();image.questions[0].image={src:'https://external.invalid/img'};assert.throws(()=>mapDatabasePaper(image))
})
test('database catalog drives the full paper, scoring and save restoration without fixture globals',()=>{
  const mapped=mapDatabasePaper(approved())
  const catalog: ExamCatalog={ bankVersion:'database-test-1',questions:mapped.questions,papers:[mapped.paper],mockQuestionIds:[] }
  const engine=createExamEngine(catalog)
  const attempt=engine.createAttempt('paper',mapped.paper.id,1_800_000_000_000)
  assert.deepEqual(attempt.questionIds,mapped.paper.questionIds)
  assert.equal(attempt.deadline-attempt.startedAt,100*60_000)
  for(const q of mapped.questions)attempt.answers[q.id]=q.correctOptionId
  assert.equal(engine.scoreAttempt(attempt).score,90)
  assert.deepEqual(engine.restoreAttempt(JSON.stringify(attempt),attempt.startedAt),attempt)
  assert.equal(createExamEngine({...catalog,bankVersion:'database-test-2'}).restoreAttempt(JSON.stringify(attempt),attempt.startedAt),null)
  assert.throws(()=>engine.createAttempt('mock'))
})

test('2013 corrected keys and exception metadata cannot silently fall back to the nominal A key',()=>{
  const value=approved();value.exam_year=2013;value.slug='imat-2013-published'
  value.questions[13].answer!.correct_option_key='C'
  const setPolicy=(blankTreatment: string)=>{
    for(const index of [4,53]){
      value.questions[index].mock_eligible=false
      value.questions[index].review_notes=JSON.stringify({scoringPolicy:{
      kind:'all-options-accepted',acceptedOptionKeys:['A','B','C','D','E'],blankTreatment,
      evidenceUrl:'https://accessoprogrammato.mur.gov.it/2013/',
    }})
    }
  }
  assert.throws(()=>mapDatabasePaper(value))
  setPolicy('unconfirmed');assert.throws(()=>mapDatabasePaper(value))
  setPolicy('zero')
  const mapped=mapDatabasePaper(value)
  assert.equal(mapped.questions[4].scoringPolicy?.kind,'all-options-accepted')
  assert.equal(mapped.questions[13].correctOptionId,'C')
  value.questions[13].answer!.correct_option_key='A';assert.throws(()=>mapDatabasePaper(value))
})

test('malformed or unsupported scoring policies fail closed',()=>{
  for(const policy of ['{broken', JSON.stringify({scoringPolicy:{kind:'unsupported'}}), JSON.stringify({scoringPolicy:{kind:'all-options-accepted',acceptedOptionKeys:['A'],blankTreatment:'zero',evidenceUrl:'https://example.test'}})]){
    const value=approved();value.questions[0].review_notes=policy
    assert.throws(()=>mapDatabasePaper(value))
  }
})


test('unresolved key and source-data issues remain blocked even if someone flips the publication flags',()=>{
  for(const flag of ['official-answer-evidence-review-pending','possible-official-answer-inconsistency-needs-expert-review','source-power-question-missing-numerical-speed','source-unit-inconsistency-cm-versus-m']){
    const value=approved();value.questions[0].review_notes=JSON.stringify({reviewFlags:[flag]})
    assert.throws(()=>mapDatabasePaper(value))
  }
})


test('practice adjustments require an advance notice, an explanation and exclusion from mocks',()=>{
  const value=approved();const q=value.questions[54]
  q.mock_eligible=false
  q.review_notes=JSON.stringify({scoringPolicy:{kind:'all-options-accepted',acceptedOptionKeys:['A','B','C','D','E'],blankTreatment:'full-credit',basis:'practice-adjustment',evidenceUrl:draft.source.url,note:'Source error. Full credit in this practice version, including blanks.'}})
  assert.throws(()=>mapDatabasePaper(value))
  value.format_evidence=JSON.stringify({publicationNotice:'Practice scoring differs on question 55: full credit including blanks.'})
  assert.equal(mapDatabasePaper(value).paper.scoringNotice,'Practice scoring differs on question 55: full credit including blanks.')
  q.mock_eligible=true;assert.throws(()=>mapDatabasePaper(value))
})

function correctedPaper(year: number) {
  const value = approved()
  value.exam_year = year
  value.slug = `imat-${year}-published`
  value.format_evidence = JSON.stringify({ minorSourceCorrections: true })
  if (year === 2013) value.questions[13].answer!.correct_option_key = 'C'
  for (const correction of sourceCorrections.filter(c => c.year === year)) {
    const q = value.questions[correction.number - 1]
    q.prompt = correction.prompt
    q.image = correction.image
    q.mock_eligible = false
    q.options.forEach(o => { o.body = correction.options.find(c => c.key === o.option_key)!.text; o.image = null })
    q.answer!.correct_option_key = correction.correctKey
    q.review_notes = JSON.stringify({ practiceCorrection: { id: correction.id, original: { prompt: 'Retained original in review history' }, reviewedBy: 'test reviewer' } })
  }
  return value
}

test('reviewed source corrections use one normal answer, zero for blanks and a concise paper notice', () => {
  for (const year of [2013, 2024, 2025]) {
    const mapped = mapDatabasePaper(correctedPaper(year))
    assert.equal(mapped.paper.scoringNotice, 'Minor source errors have been corrected for practice.')
    const engine = createExamEngine({ bankVersion: `corrected-${year}`, papers: [mapped.paper], questions: mapped.questions, mockQuestionIds: mapped.mockQuestionIds })
    const attempt = engine.createAttempt('paper', mapped.paper.id, 1000)
    assert.equal(engine.scoreAttempt(attempt).score, 0)
    for (const q of mapped.questions) attempt.answers[q.id] = q.correctOptionId
    assert.equal(engine.scoreAttempt(attempt).score, 90)
    for (const correction of sourceCorrections.filter(c => c.year === year)) {
      const q = mapped.questions[correction.number - 1]
      assert.equal(q.scoringPolicy, undefined)
      assert.equal(q.correctOptionId, correction.correctKey)
      assert(!mapped.mockQuestionIds.includes(q.id))
      attempt.answers[q.id] = correction.correctKey === 'A' ? 'B' : 'A'
      assert.equal(engine.scoreAttempt(attempt).score, 88.1)
      attempt.answers[q.id] = q.correctOptionId
    }
  }
})

test('correction metadata cannot bypass missing edits, altered options, wrong keys or diagrams', () => {
  for (const correction of sourceCorrections) {
    for (const tamper of [
      (q: DatabasePaper['questions'][number]) => { q.prompt += ' Altered' },
      (q: DatabasePaper['questions'][number]) => { q.options[0].body = 'Unverified choice' },
      (q: DatabasePaper['questions'][number]) => { q.answer!.correct_option_key = correction.correctKey === 'A' ? 'B' : 'A' },
      (q: DatabasePaper['questions'][number]) => { q.image = { src: '/images/imat/2013/q54-figure.png', width: 879, height: 312, alt: 'Original inconsistent diagram' } },
      (q: DatabasePaper['questions'][number]) => { q.review_notes = JSON.stringify({ practiceCorrection: { id: correction.id } }) },
    ]) {
      const value = correctedPaper(correction.year)
      tamper(value.questions[correction.number - 1])
      assert.throws(() => mapDatabasePaper(value))
    }
  }
})

test('the four correction calculations give unique answers without invented source values', () => {
  assert.equal(Math.round((1.60 - 0.20) * 0.90 * 100), 126)
  const loadPositionFromSupport = (300 * 0.50 - 100 * 0.50) / 80
  assert.equal(3 - (1 + loadPositionFromSupport), 0.75)
  assert.equal(2 * (20 + 16), 72)
  assert.equal(20 / 16, 5 / 4)
  assert.equal(210 * 5, 1050) // Work in joules; time/speed is still absent, so no numeric power.
  assert.equal(sourceCorrections.find(c => c.year === 2024)!.correctKey, 'E')
})
