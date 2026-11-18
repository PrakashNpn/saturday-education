// Offline only: creates an in-memory database. Never loads .env or opens a network connection.
// Requires the optional, locally available @electric-sql/pglite package.
import { PGlite } from '@electric-sql/pglite';
import assert from 'node:assert/strict';
import { createHash, randomUUID } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';

const root = new URL('../../prisma/manual/csca/', import.meta.url);
const read = name => readFile(new URL(name, root), 'utf8');
const manifest = JSON.parse(await read('manifest.json'));
for (const [name, hash] of Object.entries(manifest.private_files)) {
  assert.equal(createHash('sha256').update(await read('private-import/' + name)).digest('hex'), hash);
}
const schema = await read('01-schema-and-functions.sql');
assert.doesNotMatch(schema, /public\.csca_/);
const db = new PGlite();
try {
  await db.exec('CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;');
  // A sentinel from the other website must remain untouched, including by queue claims.
  await db.exec('CREATE TABLE public.csca_attempts(id integer); INSERT INTO public.csca_attempts VALUES(123);');
  await db.exec(schema);
  await db.exec('BEGIN;');
  for (const name of (await readdir(new URL('private-import/', root))).filter(n => n.endsWith('.sql')).sort()) {
    await db.exec(await read('private-import/' + name));
  }
  await db.exec(await read('02-verify.sql'));
  await db.exec('COMMIT;');
  // Reproduce Saturday's existing schema restriction and verify the owner-run fix.
  await db.exec('REVOKE USAGE ON SCHEMA public FROM PUBLIC,service_role;');
  assert.equal((await db.query("SELECT has_schema_privilege('service_role','public','USAGE') AS allowed")).rows[0].allowed, false);
  await db.exec(await read('03-server-schema-access.sql'));
  assert.equal((await db.query("SELECT has_schema_privilege('service_role','public','USAGE') AS allowed")).rows[0].allowed, true);
  const fields = (await db.query("SELECT count(*)::int AS n FROM information_schema.columns WHERE table_schema='public' AND left(table_name,14)='saturday_csca_'")).rows[0].n;
  assert.equal(fields, 88);
  await db.exec('SET ROLE service_role;');
  const rpc = async (name, args) => (await db.query(`SELECT public.saturday_csca_${name}(${args.map((_, i) => '$' + (i + 1)).join(',')}) AS value`, args)).rows[0].value;
  for (const subjects of [['chinese-stem', 'math', 'physics', 'chemistry'], ['chinese-humanities']]) {
    const id = randomUUID(), hash = createHash('sha256').update('saturday-csca-test:' + id).digest('hex');
    let view = await rpc('start_full_attempt', [id, hash, subjects, subjects.length > 1 ? 'combined' : 'subject', manifest.release]);
    assert.equal(view.phase, 'test');
    assert.equal(view.questions.length, 80);
    assert.equal(view.results, undefined);
    await assert.rejects(rpc('update_attempt', [id, '0'.repeat(64), 'resume']), /CSCA_DENIED/);
    for (let index = 0; index < subjects.length; index++) {
      const count = subjects[index].startsWith('chinese') ? 80 : 48;
      assert.equal(view.questions.length, count);
      const paper = view.token.split('.')[1];
      const answers = Array(count).fill('A');
      view = await rpc('update_attempt', [id, hash, 'save', paper, view.revision, JSON.stringify(answers), '[0]']);
      await assert.rejects(rpc('update_attempt', [id, hash, 'save', paper, view.revision - 1, JSON.stringify(answers), '[]']), /CSCA_CONFLICT/);
      view = await rpc('update_attempt', [id, hash, 'submit', paper, view.revision, JSON.stringify(answers), '[0]']);
      if (index < subjects.length - 1) {
        assert.equal(view.phase, 'break');
        view = await rpc('update_attempt', [id, hash, 'next', paper]);
        assert.equal(view.phase, 'test');
      }
    }
    assert.equal(view.phase, 'contact');
    assert.equal(view.results, undefined);
    view = await rpc('capture_contact_with_team', [id, hash, 'Offline Test', 'offline@example.invalid', null, ['team@example.invalid']]);
    assert.equal(view.phase, 'results');
    assert.equal(view.results.length, subjects.length);
    for (const report of view.results) {
      assert.equal(report.correct, report.questions.filter(q => q.answer === 'A').length);
    }
    await rpc('capture_contact_with_team', [id, hash, 'Offline Test', 'offline@example.invalid', null, ['team@example.invalid']]);
    assert.equal((await db.query('SELECT count(*)::int AS n FROM public.saturday_csca_email_deliveries WHERE attempt_id=$1', [id])).rows[0].n, 2);
    const job = await rpc('claim_notification_email', [id]);
    assert.ok(job);
    assert.ok(job.idempotencyKey.startsWith('saturday-csca-'));
    const recipient = job.kind === 'team' ? job.recipient : job.summary.email;
    const payload = {from: 'Saturday <no-reply@example.invalid>', to: recipient, reply_to: 'team@example.invalid', subject: 'Offline only', html: '<p>Test</p>', text: 'Test'};
    await rpc('prepare_result_email', [job.id, job.generation, JSON.stringify(payload)]);
    await rpc('finish_result_email', [job.id, job.generation, 'offline-' + randomUUID(), false, null]);
  }
  await db.exec('RESET ROLE;');
  assert.deepEqual((await db.query('SELECT id FROM public.csca_attempts')).rows, [{id: 123}]);
  await assert.rejects(db.exec('UPDATE public.saturday_csca_answer_keys SET correct_option=correct_option'), /immutable/);
  await db.exec(await read('04-activate-question-bank.sql'));
  const activation = (await db.query('SELECT status,activated_at FROM public.saturday_csca_question_sets WHERE id=$1', [manifest.release])).rows[0];
  assert.equal(activation.status, 'active');
  assert.ok(activation.activated_at);
  await db.exec(await read('04-activate-question-bank.sql'));
  assert.deepEqual((await db.query('SELECT status,activated_at FROM public.saturday_csca_question_sets WHERE id=$1', [manifest.release])).rows[0], activation);
  await db.exec('SET ROLE service_role;');
  const activeAttempt = await rpc('start_full_attempt', [randomUUID(), 'a'.repeat(64), ['math'], 'subject', null]);
  assert.equal(activeAttempt.phase, 'test');
  assert.equal(activeAttempt.questions.length, 48);
  await db.exec('RESET ROLE;');
  await db.exec('SET ROLE anon;');
  await assert.rejects(db.exec('SELECT * FROM public.saturday_csca_questions'), /permission denied/);
  console.log('PASS: private file hashes, SQL setup/import, 9 tables/88 fields, RLS/privileges, both Chinese tracks, full four-paper lifecycle, autosave/conflict, ownership, grading, contact gate/deduplication, isolated email queue, immutable content, Think Asia sentinel, activation/rerun and start without preview override. No network or real email.');
} finally {
  await db.close();
}
