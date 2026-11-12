import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildImatNotification, counsellorNotificationEmail, deliverImatNotification, type ImatNotification, type NotificationMessage } from '../features/imat-practice-test/services/leadNotification'
import { saveImatLeadAndNotify } from '../features/imat-practice-test/services/leadPersistence'
import { submitImatLead, type ImatSectionResult } from '../features/imat-practice-test/services/leadSubmission'
import { createExamEngine } from '../features/imat-practice-test/services/exam'
import { FIXTURE_CATALOG } from '../features/imat-practice-test/data/catalog'

function notification(): ImatNotification {
  return {
    lead: { attempt_id: '11111111-1111-4111-8111-111111111111', bank_version: 'test-bank', full_name: 'Local Test', email: 'imat.test@example.com', phone: '+14155552671', locale: 'en', exam_mode: 'paper', paper_slug: 'imat-2012-published', score: 0.75, maximum_score: 80, question_count: 80, correct_count: 1, incorrect_count: 1, unanswered_count: 78, completed_at: new Date('2026-11-10T00:00:00Z'), consent_version: 'imat-results-v1' },
    sections: [{ id:'reasoning', total:40, correct:1, incorrect:1, unanswered:38, score:0.75 },{ id:'biology',total:18,correct:0,incorrect:0,unanswered:18,score:0 },{ id:'chemistry',total:11,correct:0,incorrect:0,unanswered:11,score:0 },{ id:'physicsMath',total:11,correct:0,incorrect:0,unanswered:11,score:0 }],
  }
}

test('IMAT notifications use the existing consultation recipient and preserve contact/results details', () => {
  assert.equal(counsellorNotificationEmail({CONSULTATION_NOTIFICATION_EMAIL:'counsellor@example.com'}),'counsellor@example.com')
  assert.equal(counsellorNotificationEmail({}),'saturdayeducationconsulting@gmail.com')
  const message=buildImatNotification(notification(),'counsellor@example.com')
  assert.equal(message.to,'counsellor@example.com'); assert.equal(message.replyTo,'imat.test@example.com')
  for(const text of ['Local Test','imat.test@example.com','+14155552671','IMAT 2012 past paper','0.75 / 80','Bangkok','07:00','Logical reasoning and general knowledge','Biology','Chemistry','Physics and mathematics']) {
    assert(message.text.includes(text),text);assert(message.html.includes(text),text)
  }
  assert(!message.html.includes('rawAnswers'))
  assert(message.subject.includes('0.75/80'))
  const mock=notification();mock.lead.exam_mode='mock';mock.lead.paper_slug=null
  assert(buildImatNotification(mock,'counsellor@example.com').text.includes('Random mock exam'))
})

test('student text is escaped in HTML and cannot inject subject header lines', () => {
  const input=notification();input.lead.full_name='<img src=x onerror="alert(1)">\r\nBcc: bad@example.com'
  const message=buildImatNotification(input,'counsellor@example.com')
  assert(!message.html.includes('<img src=x'))
  assert(message.html.includes('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;'))
  assert(!/[\r\n]/.test(message.subject))
})

test('delivery retries errors once using the identical message and idempotency key', async () => {
  const calls: {message:NotificationMessage;key:string}[]=[],warnings:string[]=[]
  await deliverImatNotification(notification(),{recipient:'counsellor@example.com',apiKeyAvailable:true,warn:code=>warnings.push(code),send:async(message,options)=>{
    calls.push({message,key:options.idempotencyKey})
    return calls.length===1 ? {data:null,error:{message:'temporary'}} : {data:{id:'local-email'},error:null}
  }})
  assert.equal(calls.length,2);assert.strictEqual(calls[0].message,calls[1].message)
  assert.equal(calls[0].key,'imat-result-11111111-1111-4111-8111-111111111111')
  assert.equal(calls[0].key,calls[1].key);assert.deepEqual(warnings,[])
})

test('missing email configuration never sends, while thrown/time-out failures are bounded and do not escape', async () => {
  let calls=0;const warnings:string[]=[]
  await deliverImatNotification(notification(),{recipient:'counsellor@example.com',apiKeyAvailable:false,warn:code=>warnings.push(code),send:async()=>{calls++;return{error:null,data:{id:'unused'}}}})
  assert.equal(calls,0);assert.deepEqual(warnings,['missing-email-key'])
  await deliverImatNotification(notification(),{recipient:'counsellor@example.com',apiKeyAvailable:true,warn:code=>warnings.push(code),send:async()=>{calls++;throw new Error('temporary')}})
  assert.equal(calls,2);assert.equal(warnings.at(-1),'email-delivery-failed')
  calls=0
  await deliverImatNotification(notification(),{recipient:'counsellor@example.com',apiKeyAvailable:true,timeoutMs:2,warn:code=>warnings.push(code),send:()=>{calls++;return new Promise(()=>{})}})
  assert.equal(calls,2);assert.equal(warnings.at(-1),'email-delivery-failed')
})

test('storage is completed before queueing, and duplicate/concurrent lead submissions queue only one email', async () => {
  const stored=new Set<string>(),jobs:(()=>Promise<void>)[]=[],events:string[]=[]
  const dependencies={
    insert:async(lead:ImatNotification['lead'])=>{if(stored.has(lead.attempt_id))return false;stored.add(lead.attempt_id);events.push('saved');return true},
    exists:async(id:string)=>stored.has(id),schedule:(job:()=>Promise<void>)=>{events.push('queued');jobs.push(job)},
    notify:async()=>{events.push('sent')},warn:()=>{events.push('warning')},
  }
  const {lead,sections}=notification()
  await Promise.all([saveImatLeadAndNotify(lead,sections,dependencies),saveImatLeadAndNotify(lead,sections,dependencies)])
  assert.deepEqual(events,['saved','queued']);assert.equal(jobs.length,1)
  await jobs[0]();assert.deepEqual(events,['saved','queued','sent'])
})

test('storage failure does not queue mail; queue/delivery failures do not fail a saved submission', async () => {
  const {lead,sections}=notification();let schedules=0,warnings=0
  const dependencies={insert:async()=>true,exists:async()=>false,schedule:()=>{schedules++;throw new Error('queue unavailable')},notify:async()=>{},warn:()=>{warnings++}}
  await assert.rejects(()=>saveImatLeadAndNotify(lead,sections,{...dependencies,insert:async()=>{throw new Error('storage unavailable')}}))
  assert.equal(schedules,0)
  await saveImatLeadAndNotify(lead,sections,dependencies);assert.equal(warnings,1)
  const jobs:(()=>Promise<void>)[]=[]
  await saveImatLeadAndNotify(lead,sections,{...dependencies,schedule:job=>{jobs.push(job)},notify:async()=>{throw new Error('email unavailable')}})
  await jobs[0]();assert.equal(warnings,2)
})

test('the contact endpoint keeps success even if scheduling fails and hands mail only server-scored sections', async () => {
  const engine=createExamEngine(FIXTURE_CATALOG),now=Date.now()
  const attempt=engine.finishAttempt(engine.createAttempt('mock',undefined,now-1000),now)
  const received:ImatSectionResult[][]=[]
  const result=await submitImatLead({fullName:'Local Test',email:'imat.test@example.com',phone:'+14155552671',locale:'en',consent:true,attempt,sections:[{id:'biology',score:9000}]},{
    loadCatalog:async()=>FIXTURE_CATALOG,
    saveLead:async(lead,sections)=>{received.push(sections);await saveImatLeadAndNotify(lead,sections,{insert:async()=>true,exists:async()=>false,schedule:()=>{throw new Error('queue unavailable')},notify:async()=>{},warn:()=>{}})},
  },now)
  assert.deepEqual(result,{success:true});assert.equal(received[0].length,5)
  assert(received[0].every(row=>row.score===0));assert.equal(received[0].reduce((sum,row)=>sum+row.total,0),60)
})
