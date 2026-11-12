import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CANADA_EVENT, EVENT_CAMPAIGN } from '../features/education-event/config'
import { registerAttendee, processRegistrationRequest, type Attendee, type RegistrationDependencies } from '../features/education-event/services/registration'

const valid = { fullName: 'Aye Chan', email: 'aye@example.com', phone: '+959765929492', locale: 'en', consent: true, noticeVersion: CANADA_EVENT.consentVersion }
function harness() {
  const rows = new Map<string, Attendee>()
  const jobs: (() => Promise<void>)[] = []
  const statuses: string[] = []
  const destinations: string[] = []
  let sent = 0, alerts = 0
  const dependencies: RegistrationDependencies = {
    insert: async attendee => {
      const key = `${attendee.eventKey}:${attendee.email}`
      if (rows.has(key)) return null
      rows.set(key, attendee)
      return 'registration-id'
    },
    exists: async (key,email) => rows.has(`${key}:${email}`),
    schedule: job => { jobs.push(job) },
    sync: async attendee => { sent++; destinations.push(attendee.destination); return { status: 'synced' } },
    record: async (_id, outcome) => { statuses.push(outcome.status) },
    alert: async () => { alerts++ },
    warn: () => {},
  }
  return { dependencies, rows, jobs, statuses, destinations, sent: () => sent, alerts: () => alerts }
}

test('stores event identity and campaign server-side before CRM, ignoring spoofed identity', async () => {
  const h = harness()
  assert.deepEqual(await registerAttendee({ ...valid, email: ' AYE@EXAMPLE.COM ', eventKey: 'other-event', destination: 'uk', firmliUtmNumber: 'spoofed' },h.dependencies), { success: true })
  const row = [...h.rows.values()][0]
  assert.equal(row.email,'aye@example.com')
  assert.equal(row.eventKey,CANADA_EVENT.key)
  assert.equal(row.destination,'uk')
  assert.equal(row.firmliUtmNumber,EVENT_CAMPAIGN.utmNumber)
  assert.equal(row.consentVersion,CANADA_EVENT.consentVersion)
  assert.equal(h.sent(),0)
  assert.equal(h.jobs.length,1)
  await h.jobs[0]()
  assert.equal(h.sent(),1)
  assert.deepEqual(h.statuses,['synced'])
  assert.deepEqual(h.destinations,['uk'])
})

test('validates required fields, consent, phone, locale and bot input before saving', async () => {
  for (const [patch, code] of [
    [{ fullName: 'A' },'name'], [{ fullName: 'A\nB' },'name'], [{ email: 'bad' },'email'],
    [{ phone: '09765929492' },'phone'], [{ phone: '+9591' },'phone'], [{ destination: 'not-a-country' },'destination'], [{ destination: '' },'destination'],
    [{ consent: false },'consent'], [{ noticeVersion: 'event-registration-v1' },'invalid'], [{ locale: 'xx' },'invalid'], [{ hp: 'bot' },'invalid'],
  ] as const) {
    const h = harness()
    assert.deepEqual(await registerAttendee({...valid,...patch},h.dependencies),{success:false,code})
    assert.equal(h.rows.size,0)
    assert.equal(h.jobs.length,0)
  }
})

test('Canada is the default for older clients and other known destinations are accepted', async () => {
  for (const destination of [undefined, 'canada', 'singapore', 'hungary', 'other']) {
    const h = harness()
    assert.deepEqual(await registerAttendee({...valid,destination},h.dependencies),{success:true})
    assert.equal([...h.rows.values()][0].destination,destination ?? 'canada')
  }
})

test('duplicate and concurrent requests create one registration and queue one sync', async () => {
  const h = harness()
  const results = await Promise.all([registerAttendee(valid,h.dependencies),registerAttendee({...valid,email:'AYE@EXAMPLE.COM'},h.dependencies)])
  assert.ok(results.every(result=>result.success))
  assert.equal(h.rows.size,1)
  assert.equal(h.jobs.length,1)
})

test('storage failures remain retryable and never pretend to save a registration', async () => {
  const h = harness()
  const failed = { ...h.dependencies, insert: async () => { throw new Error('DB unavailable') } }
  assert.deepEqual(await registerAttendee(valid,failed),{success:false,code:'failed'})
  assert.equal(h.jobs.length,0)
  assert.deepEqual(await registerAttendee(valid,h.dependencies),{success:true})
})

test('CRM, scheduling, status and alert failures never discard a saved registration', async () => {
  for (const failure of ['crm','schedule','record','alert'] as const) {
    const h = harness()
    if (failure === 'schedule') h.dependencies.schedule = () => { throw new Error('Unavailable') }
    else h.dependencies.sync = async () => ({status:'failed',error:'CRM unavailable'})
    if (failure === 'record') h.dependencies.record = async () => { throw new Error('Status unavailable') }
    if (failure === 'alert') h.dependencies.alert = async () => { throw new Error('Mail unavailable') }
    assert.deepEqual(await registerAttendee(valid,h.dependencies),{success:true})
    for (const job of h.jobs) await job()
    assert.equal(h.rows.size,1)
    if (failure !== 'alert') assert.equal(h.alerts(),1)
  }
})

const request = (body: unknown, extra: Record<string,string> = {}) => new Request('https://www.saturdayeducation.com/api/events/register',{
  method:'POST',headers:{origin:'https://www.saturdayeducation.com','content-type':'application/json','x-forwarded-for':'event-test',...extra},body:JSON.stringify(body),
})
test('HTTP handler enforces origin, content type, body size and non-cacheable responses', async () => {
  const h=harness()
  assert.equal((await processRegistrationRequest(request(valid,{origin:'https://elsewhere.example'}),h.dependencies)).status,403)
  assert.equal((await processRegistrationRequest(request(valid,{'content-type':'text/plain'}),h.dependencies)).status,415)
  assert.equal((await processRegistrationRequest(request({large:'x'.repeat(9_000)}),h.dependencies)).status,413)
  const result=await processRegistrationRequest(request(valid),h.dependencies)
  assert.equal(result.status,200)
  assert.equal(result.headers.get('cache-control'),'no-store')
  assert.deepEqual(await result.json(),{success:true})
})

test('event times are Yangon local time rather than the server or Bangkok timezone', () => {
  const format = new Intl.DateTimeFormat('en-GB',{timeZone:CANADA_EVENT.timeZone,hour:'2-digit',minute:'2-digit'})
  assert.equal(format.format(new Date(CANADA_EVENT.startsAt)),'13:00')
  assert.equal(format.format(new Date(CANADA_EVENT.endsAt)),'16:00')
})
