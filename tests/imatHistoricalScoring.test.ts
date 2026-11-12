import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createExamEngine } from '../features/imat-practice-test/services/exam'
import { isCorrectOption } from '../features/imat-practice-test/services/scoring'
import type { ExamCatalog, Question } from '../features/imat-practice-test/types'

function catalog(blankTreatment?: 'zero' | 'full-credit'): ExamCatalog {
  const questions: Question[] = Array.from({length:80}, (_,i)=>({
    id:`q${i+1}`, section:'reasoning', prompt:'Question',
    options:'ABCDE'.split('').map(id=>({id,text:id})), correctOptionId: i === 13 ? 'C' : 'A',
    explanation:'', source:{kind:'official',reference:'Historical scoring test'},
    ...(blankTreatment && (i===4 || i===53) && {scoringPolicy:{kind:'all-options-accepted',blankTreatment,evidenceUrl:'https://accessoprogrammato.mur.gov.it/2013/'}}),
  }))
  return {bankVersion:'historical-test', questions, mockQuestionIds:[], papers:[{
    id:'historical', development:false, format:{minutes:120,correct:1,incorrect:-.25,sections:[{id:'reasoning',count:80}]},
    questionIds:questions.map(q=>q.id),
  }]}
}

test('historical quarter-point penalties are exact across a complete 80-question attempt',()=>{
  const data=catalog(), engine=createExamEngine(data), attempt=engine.createAttempt('paper','historical',1000)
  assert.equal(attempt.deadline,1000+120*60_000)
  for(const q of data.questions)attempt.answers[q.id]=q.correctOptionId==='A'?'B':'A'
  assert.equal(engine.scoreAttempt(attempt).score,-20)
  attempt.answers.q1='A'
  assert.equal(engine.scoreAttempt(attempt).score,-18.75)
  delete attempt.answers.q2
  assert.equal(engine.scoreAttempt(attempt).score,-18.5)
  assert.equal(engine.scoreAttempt(attempt).unanswered,1)
  assert.deepEqual(engine.restoreAttempt(JSON.stringify(attempt),1000),attempt)
})

test('annulled questions accept every actual choice; the corrected single-key answer stays C',()=>{
  const data=catalog('zero'), engine=createExamEngine(data), attempt=engine.createAttempt('paper','historical',1000)
  const exception=data.questions[4]
  for(const option of 'ABCDE'){
    attempt.answers.q5=option
    assert.equal(isCorrectOption(exception,option),true)
    assert.equal(engine.scoreAttempt(attempt).score,1)
    assert.equal(engine.scoreAttempt(attempt).correct,1)
  }
  assert.equal(isCorrectOption(exception,'invalid'),false)
  delete attempt.answers.q5
  assert.equal(engine.scoreAttempt(attempt).score,0)
  attempt.answers.q14='A'
  assert.equal(engine.scoreAttempt(attempt).score,-.25)
  attempt.answers.q14='C'
  assert.equal(engine.scoreAttempt(attempt).score,1)
})

test('blank exception policy is explicit; awarded blank credit does not invent an answered question',()=>{
  const zero=createExamEngine(catalog('zero')), full=createExamEngine(catalog('full-credit'))
  assert.equal(zero.scoreAttempt(zero.createAttempt('paper','historical')).score,0)
  const result=full.scoreAttempt(full.createAttempt('paper','historical'))
  assert.equal(result.score,2)
  assert.equal(result.correct,0)
  assert.equal(result.unanswered,80)
})
