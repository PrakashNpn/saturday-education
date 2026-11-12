import { test } from 'node:test'
import assert from 'node:assert/strict'
import { FIXTURE_CATALOG } from '../features/imat-practice-test/data/catalog'
import { createExamEngine } from '../features/imat-practice-test/services/exam'
import { processImatLeadRequest, submitImatLead, type ImatLeadRecord, type LeadDependencies } from '../features/imat-practice-test/services/leadSubmission'

function fixture() {
  const engine = createExamEngine(FIXTURE_CATALOG)
  const now = Date.now(), attempt = engine.createAttempt('mock', undefined, now - 10_000)
  const questions = new Map(FIXTURE_CATALOG.questions.map(q => [q.id,q]))
  attempt.answers[attempt.questionIds[0]] = questions.get(attempt.questionIds[0])!.correctOptionId
  attempt.answers[attempt.questionIds[1]] = questions.get(attempt.questionIds[1])!.options.find(o => o.id !== questions.get(attempt.questionIds[1])!.correctOptionId)!.id
  const body = { fullName: '  Local Test  ', email: ' IMAT.TEST@example.com ', phone: '+1 (415) 555-2671', consent: true, locale: 'en', hp: '', attempt: engine.finishAttempt(attempt, now - 1000) }
  const records: ImatLeadRecord[] = []
  let loads = 0
  const dependencies: LeadDependencies = { loadCatalog: async () => { loads++; return FIXTURE_CATALOG }, saveLead: async record => { records.push(record) } }
  return { engine, body, records, dependencies, loads: () => loads, now }
}

test('IMAT contact storage validates all fields and recomputes the summary instead of trusting client scores', async () => {
  const f = fixture()
  const result = await submitImatLead({ ...f.body, score: 99999, correct_count: 60 }, f.dependencies, f.now)
  assert.deepEqual(result, { success: true })
  assert.equal(f.records.length, 1)
  const record = f.records[0]
  assert.equal(record.full_name, 'Local Test'); assert.equal(record.email, 'imat.test@example.com')
  assert.equal(record.phone, '+14155552671'); assert.equal(record.score, 1.1)
  assert.deepEqual([record.correct_count,record.incorrect_count,record.unanswered_count],[1,1,58])
  assert.equal(record.attempt_id,f.body.attempt.id); assert.equal(record.paper_slug,null)
  assert.equal(record.consent_version,'imat-results-v1')
})

test('missing/invalid name, email, international phone or consent never accesses storage', async () => {
  for (const [patch,code] of [
    [{fullName:' '},'name'],[{fullName:'A'},'name'],[{email:'invalid'},'email'],
    [{phone:''},'phone'],[{phone:'4155552671'},'phone'],[{phone:'+111111111'},'phone'],
    [{consent:false},'consent'],[{hp:'bot'},'attempt'],[{locale:'invalid'},'attempt'],
  ] as const) {
    const f=fixture()
    assert.deepEqual(await submitImatLead({...f.body,...patch},f.dependencies,f.now),{success:false,code})
    assert.equal(f.records.length,0);assert.equal(f.loads(),0)
  }
})

test('running, mismatched, malformed and future-completed tests cannot submit leads', async () => {
  for (const patch of [{completedAt:null},{bankVersion:'old'},{questionIds:[]},{id:'not-a-uuid'},{completedAt:Date.now()+60_000}]) {
    const f=fixture()
    assert.deepEqual(await submitImatLead({...f.body,attempt:{...f.body.attempt,...patch}},f.dependencies,f.now),{success:false,code:'attempt'})
    assert.equal(f.records.length,0)
  }
})

test('expired tests can be captured with zero answers and no client credit override', async () => {
  const f=fixture(),attempt=f.engine.createAttempt('mock',undefined,f.now-7_000_000)
  assert.deepEqual(await submitImatLead({...f.body,attempt},f.dependencies,f.now),{success:true})
  assert.equal(f.records[0].score,0);assert.equal(f.records[0].unanswered_count,60)
})

test('a failed save does not mutate the completed attempt or unlock flag, and can be retried', async () => {
  const f=fixture(),before=JSON.stringify(f.body.attempt)
  assert.deepEqual(await submitImatLead(f.body,{...f.dependencies,saveLead:async()=>{throw new Error('storage unavailable')}},f.now),{success:false,code:'failed'})
  assert.equal(JSON.stringify(f.body.attempt),before)
  assert.deepEqual(await submitImatLead(f.body,f.dependencies,f.now),{success:true})
  assert.equal(f.records.length,1)
})

test('result-unlock marker persists per completed attempt, while every new attempt starts gated', () => {
  const f=fixture(),saved={...f.body.attempt,leadCaptured:true}
  assert.equal(f.engine.restoreAttempt(JSON.stringify(saved),f.now)!.leadCaptured,true)
  assert.equal(f.engine.createAttempt('mock').leadCaptured,false)
  assert.equal(f.engine.restoreAttempt(JSON.stringify({...saved,leadCaptured:'yes'}),f.now),null)
  const legacy={...saved} as Partial<typeof saved>;delete legacy.leadCaptured
  assert.equal(f.engine.restoreAttempt(JSON.stringify(legacy),f.now)!.leadCaptured,undefined)
})

function request(body: unknown, headers: Record<string,string> = {}) {
  return new Request('http://localhost/api/imat/lead',{method:'POST',headers:{'Content-Type':'application/json',origin:'http://localhost','x-forwarded-for':crypto.randomUUID(),...headers},body:JSON.stringify(body)})
}

test('HTTP handler rejects cross-origin, unsupported, malformed and oversized requests before any save', async () => {
  const f=fixture()
  assert.equal((await processImatLeadRequest(request(f.body,{origin:'https://other.example'}),f.dependencies)).status,403)
  assert.equal((await processImatLeadRequest(request(f.body,{'Content-Type':'text/plain'}),f.dependencies)).status,415)
  assert.equal((await processImatLeadRequest(request('x'.repeat(250_001)),f.dependencies)).status,413)
  const malformed=new Request('http://localhost/api/imat/lead',{method:'POST',headers:{origin:'http://localhost','Content-Type':'application/json'},body:'{bad'})
  assert.equal((await processImatLeadRequest(malformed,f.dependencies)).status,400)
  assert.equal(f.records.length,0)
})

test('HTTP success is non-cacheable; persistence errors return retryable failure instead of fake success', async () => {
  const f=fixture(),result=await processImatLeadRequest(request(f.body),f.dependencies)
  assert.equal(result.status,200);assert.equal(result.headers.get('Cache-Control'),'no-store')
  assert.deepEqual(await result.json(),{success:true})
  assert.equal((await processImatLeadRequest(request(f.body),{...f.dependencies,saveLead:async()=>{throw new Error('offline')}})).status,503)
})

test('HTTP abuse limit bounds repeated invalid submissions without loading the database', async () => {
  const f=fixture(),ip=crypto.randomUUID()
  for(let i=0;i<20;i++) assert.equal((await processImatLeadRequest(request({}, {'x-forwarded-for':ip}),f.dependencies)).status,400)
  const result=await processImatLeadRequest(request({}, {'x-forwarded-for':ip}),f.dependencies)
  assert.equal(result.status,429);assert.deepEqual(await result.json(),{success:false,code:'rate'})
  assert.equal(f.loads(),0)
})
