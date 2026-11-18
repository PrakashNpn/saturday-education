import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { NextRequest } from 'next/server'
import fs from 'node:fs'
import { sessionService, accessHash, SessionError } from '../features/csca-practice-test/server/session'
import { createHandlers } from '../features/csca-practice-test/server/http'
import { emailWorker } from '../features/csca-practice-test/server/email-worker'
import { renderResultEmail, renderTeamResultEmail } from '../features/csca-practice-test/server/result-email'
import { validateDiagramSvg } from '../features/csca-practice-test/server/diagrams'
import { contactInput } from '../features/csca-practice-test/contact'
import { DraftQueue } from '../features/csca-practice-test/draft-queue'
import type { SessionView } from '../features/csca-practice-test/types'

const attempt = '12345678-1234-4123-8123-123456789012', paper = '12345678-1234-4123-8123-123456789013'
const question = { id: 'q1', text: 'Unchanged source question', topic: '1', options: ['A', 'B', 'C', 'D'].map(key => ({ key, text: key })) }
const view = (): SessionView => ({ token: `${attempt}.${paper}`, revision: 0, answers: Array(48).fill(null), flags: [], kind: 'subject', mode: 'timed', subjects: ['math'], paper: 0, papers: [{ subject: 'math', questionCount: 48, timeLimitSeconds: 3600 }], phase: 'test', expired: false, deadline: Date.now() + 3600000, serverNow: Date.now(), questions: Array.from({ length: 48 }, (_, i) => ({ ...question, id: `q${i}` })) })
const contact = { name: 'Test Student', email: 'STUDENT@example.com', phone: '+14155552671', consent: true }

test('CSCA contact requires all fields, valid international phone and consent', async () => {
  assert.equal((await contactInput.parseAsync(contact)).email, 'student@example.com')
  for (const patch of [{ phone: '' }, { phone: '+951' }, { name: 'A' }, { email: 'bad' }, { consent: false }]) {
    assert.equal((await contactInput.safeParseAsync({ ...contact, ...patch })).success, false)
  }
})
test('CSCA uses only Saturday RPCs and a different ownership hash', async () => {
  const calls: { name: string; args: Record<string, unknown> }[] = []
  const service = sessionService(async (name, args) => { calls.push({ name, args }); return { data: view(), error: null } })
  await service.start('owner', attempt, ['math'], 'timed', 'subject')
  assert.equal(calls[0].name, 'saturday_csca_start_full_attempt')
  assert.notEqual(accessHash('owner', attempt), createHash('sha256').update(`csca-attempt-v2:owner:${attempt}`).digest('hex'))
  const malformed = sessionService(async () => ({ data: { ...view(), answers: [null] }, error: null }))
  await assert.rejects(malformed.start('owner', attempt, ['math'], 'timed', 'subject'), SessionError)
})
test('CSCA suppresses early answer keys and fails closed before contact', async () => {
  const result = [{ subject: 'math', correct: 0, answered: 0, total: 48, score: 0, expired: false, questions: [] }]
  const service = sessionService(async () => ({ data: { ...view(), phase: 'results', contactSaved: false, results: result }, error: null }))
  const returned = await service.update('owner', attempt, 'resume')
  assert.equal(returned.phase, 'contact'); assert.equal(returned.results, undefined)
  const running = sessionService(async () => ({ data: { ...view(), results: result }, error: null }))
  assert.equal((await running.update('owner', attempt, 'resume')).results, undefined)
})
test('CSCA HTTP enforces origin, cookie ownership, input validation and no-store without real I/O', async () => {
  let writes = 0
  const handlers = createHandlers({ service: { start: async () => { writes++; return view() }, update: async () => { writes++; return view() }, contact: async () => { writes++; return view() } }, schedule: () => { throw Error('Unexpected scheduling') }, deliver: async () => { throw Error('Unexpected delivery') } })
  const request = (body: unknown, origin = 'https://saturday.test', cookie = 'saturday-csca-owner-v1=' + 'a'.repeat(64)) => new NextRequest('https://saturday.test/api/csca', { method: 'POST', headers: { origin, cookie, 'content-type': 'application/json' }, body: JSON.stringify(body) })
  const start = { action: 'start', startId: attempt, subjects: ['math'], mode: 'timed', kind: 'subject' }
  assert.equal((await handlers.handlePost(request(start, 'https://thinkasia.test'))).status, 403)
  assert.equal((await handlers.handlePost(request(start, undefined, 'csca-owner-v2=' + 'a'.repeat(64)))).status, 403)
  assert.equal((await handlers.handlePost(request({ action: 'start', subjects: ['unknown'] }))).status, 400)
  const oversized = new NextRequest('https://saturday.test/api/csca', { method: 'POST', headers: { origin: 'https://saturday.test', 'content-type': 'application/json' }, body: JSON.stringify({ padding: 'x'.repeat(13000) }) })
  assert.equal((await handlers.handlePost(oversized)).status, 400)
  assert.equal(writes, 0)
  const bootstrap = await handlers.handleGet(new NextRequest('https://saturday.test/api/csca'))
  assert.match(bootstrap.headers.get('set-cookie')!, /saturday-csca-owner-v1=.*HttpOnly/i)
  assert.match(bootstrap.headers.get('cache-control')!, /no-store/)
  assert.equal(writes, 0)
  assert.equal((await handlers.handlePost(request(start))).status, 200)
  assert.equal(writes, 1)
})
test('CSCA draft queue coalesces edits and ignores replies for an abandoned paper', async () => {
  let resolve!: (v: SessionView) => void, callbacks = 0
  const queue = new DraftQueue(() => new Promise(r => { resolve = r }), () => { callbacks++ })
  queue.reset(view()); queue.change({ answers: Array(48).fill('A'), flags: [0] })
  const flush = queue.flush(); queue.reset(null); resolve(view()); await flush
  assert.equal(queue.session, null); assert.equal(callbacks, 0)
})
test('CSCA diagrams reject scripts, foreign markup and mismatched hashes', () => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3" fill="#177E8D"/></svg>'
  const hash = (text: string) => createHash('sha256').update(text).digest('hex')
  assert.equal(validateDiagramSvg(svg, hash(svg)), true)
  for (const bad of [svg.replace('<circle', '<script>bad</script><circle'), svg.replace('<circle', '<foreignObject/><circle')]) assert.equal(validateDiagramSvg(bad, hash(bad)), false)
  assert.equal(validateDiagramSvg(svg, '0'.repeat(64)), false)
})
test('CSCA emails use Saturday branding and separate student/team recipients, with retry state mocked', async () => {
  const summary = { name: '<Student>', email: 'student@example.com', phone: '+14155552671', completedAt: '2026-11-16T01:00:00Z', papers: [{ subject: 'math' as const, correct: 30, incorrect: 10, skipped: 8, total: 48, score: 63 }] }
  const student = renderResultEmail(summary, 'Saturday <test@example.com>'), team = renderTeamResultEmail(summary, 'Saturday <test@example.com>', 'team@example.com')
  assert.equal(student.to, summary.email); assert.equal(student.bcc, undefined); assert.equal(team.to, 'team@example.com'); assert.equal(team.reply_to, summary.email)
  assert.match(student.html, /&lt;Student&gt;/); assert.doesNotMatch(student.html, /Think Asia|thinkasiaeducation/); assert.match(student.html, /saturdayeducation/)
  const calls: string[] = []
  const run = emailWorker(async (name, args) => {
    calls.push(name)
    if (name.endsWith('claim_notification_email')) return { data: { id: attempt, generation: 1, idempotencyKey: 'saturday-csca-result/test', kind: 'student', summary, payload: null }, error: null }
    if (name.endsWith('prepare_result_email')) return { data: args.p_payload, error: null }
    assert.equal(args.p_retry, true); return { data: true, error: null }
  }, async () => { throw Error('Simulated network failure') }, () => 'Saturday <test@example.com>')
  assert.equal((await run(attempt)).processed, 1)
  assert.ok(calls.every(name => name.startsWith('saturday_csca_')))
})
test('CSCA routes are thin, translations page-scoped and private imports are not runtime dependencies', () => {
  for (const path of ['route.ts', 'email-worker/route.ts', 'diagrams/[questionId]/route.ts']) assert.ok(fs.readFileSync('app/api/csca/' + path, 'utf8').split('\n').length < 7)
  assert.match(fs.readFileSync('app/[locale]/csca/page.tsx', 'utf8'), /setRequestLocale/)
  assert.match(fs.readFileSync('app/[locale]/layout.tsx', 'utf8'), /PAGE_ONLY_NAMESPACES.*'csca'/)
  assert.match(fs.readFileSync('app/[locale]/csca/layout.tsx', 'utf8'), /phoneSelect: messages.phoneSelect/)
  assert.match(fs.readFileSync('shared/components/common/PhoneCountrySelect.tsx', 'utf8'), /closest\('dialog'\) \?\? document.body/)
  for (const file of ['bank.ts', 'session.ts', 'diagrams.ts', 'email-worker.ts']) {
    const source = fs.readFileSync('features/csca-practice-test/server/' + file, 'utf8')
    assert.doesNotMatch(source, /['"]csca_(?:questions|attempts|answer_keys|claim|start|update)/)
    assert.doesNotMatch(source, /private-import|content\.PRIVATE/)
  }
})
