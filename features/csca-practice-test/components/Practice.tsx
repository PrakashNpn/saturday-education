'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { practiceKind } from '../config';
import { DraftQueue } from '../draft-queue';
import { SUBJECT_IDS, type CatalogItem, type PracticeMode, type SessionView, type SubjectId } from '../types';
import { Setup, Paper, Review, Break, Action } from './Screens';
import styles from './practice.module.css';
import { Home } from './Screens';
import { ResultContactGate } from './ResultContactGate';
import type { ResultContact } from '../contact';
import { STUDY_DIRECTIONS, type StudyDirection } from './Screens';
import { InstructionsModal } from './InstructionsModal';
import { ExitTestDialog, TestHeader } from './TestChrome';
import { ResultsHeader, ResultsReport } from './ResultsReport';

type Page = 'home' | 'setup' | 'instructions' | 'test' | 'review' | 'break' | 'contact' | 'results';
const STORAGE_KEY = 'saturday-csca-v2';
const START_KEY = 'saturday-csca-start-v2';
const emptyAnswers = () => Array<string | null>();
async function requestSession(body: Record<string, unknown>): Promise<SessionView> {
  let response: Response;
  try { response = await fetch('/api/csca', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), cache: 'no-store', signal: AbortSignal.timeout(20000) }); }
  catch { throw new Error('network'); }
  const data = await response.json().catch(() => { throw new Error('unavailable'); });
  if (!response.ok) throw new Error(data.code || 'unavailable');
  return data as SessionView;
}

export function Practice() {
  const t = useTranslations('csca');
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  useEffect(() => { let active = true; void fetch('/api/csca/catalog', { cache: 'no-store' }).then(r => r.json()).then(data => { if (active && Array.isArray(data)) setCatalog(data); }).catch(() => {}); return () => { active = false; }; }, []);
  const [page, setPage] = useState<Page>('home');
  const [selected, setSelected] = useState<SubjectId[]>([]);
  const [direction, setDirection] = useState<StudyDirection | null>(null);
  const [track, setTrack] = useState<SubjectId>('chinese-stem');
  const [mode, setMode] = useState<PracticeMode>('timed');
  const [session, setSession] = useState<SessionView | null>(null);
  const [answers, setAnswers] = useState<(string | null)[]>(emptyAnswers);
  const [flags, setFlags] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [resultPaper, setResultPaper] = useState(0);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState('');
  const [leave, setLeave] = useState(false);
  const [now, setNow] = useState(0);
  const [offset, setOffset] = useState(0);
  const storageReady = useRef(false);
  const startId = useRef<{ id: string; fingerprint: string } | null>(null);
  const restoring = useRef<Promise<SessionView | null> | null>(null);
  const queue = useRef<DraftQueue | null>(null);
  const acceptedToken = useRef<string | null>(null);
  const draft = useRef({ answers: emptyAnswers(), flags: [] as number[] });
  const inFlight = useRef(false);
  const autoSubmitted = useRef<string | null>(null);
  const heading = useRef<HTMLDivElement>(null);
  const previousPage = useRef<Page>('home');
  const selectedSubjects = SUBJECT_IDS.filter(id => selected.includes(id));
  const kind = practiceKind(selectedSubjects);
  const activeExam = !!session && ['test', 'review', 'break'].includes(page);
  const remaining = session?.deadline ? Math.max(0, Math.ceil((session.deadline - (now + offset)) / 1000)) : null;
  const locked = remaining !== null && remaining <= 0;

  const acceptSession = useCallback((next: SessionView) => {
    try { sessionStorage.removeItem(START_KEY); } catch { /* Optional recovery cache. */ }
    startId.current = null;
    acceptedToken.current = next.token;
    queue.current?.reset(next);
    draft.current = { answers: next.answers, flags: next.flags };
    setSaveStatus('saved');
    setSession(next);
    setOffset(next.serverNow - Date.now());
    setNow(Date.now());
    setSelected(next.subjects);
    const chinese = next.subjects.find(id => id.startsWith('chinese'));
    if (chinese) setTrack(chinese);
    setMode(next.mode);
    setPage(next.phase);
    setIndex(0);
    setAnswers(next.answers);
    setFlags(next.flags);
    setLeave(false);
    setResultPaper(0);
    autoSubmitted.current = null;
  }, []);

  useEffect(() => {
    let alive = true;
    const restore = async () => {
      try {
        restoring.current ??= (async () => {
          const response = await fetch('/api/csca', { cache: 'no-store' });
          const data = await response.json();
          if (!response.ok) throw new Error(data.code || 'unavailable');
          let pending;
          try { pending = JSON.parse(sessionStorage.getItem(START_KEY) ?? 'null'); } catch { /* Use server progress. */ }
          return pending ? requestSession(pending) : data.session as SessionView | null;
        })();
        const next = await restoring.current;
        if (!alive || !next) return;
        acceptSession(next);
        // Only overlay an unsent local draft if no newer server revision exists.
        let saved;
        try { saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null'); } catch { /* Use server progress. */ }
        if (next.phase === 'test' && saved?.token === next.token && saved.revision === next.revision && (!next.deadline || next.deadline > next.serverNow)) {
          const validAnswers = Array.isArray(saved.answers) && saved.answers.length === next.answers.length && saved.answers.every((v: unknown) => v === null || ['A','B','C','D'].includes(String(v)));
          if (validAnswers) {
            const flags = Array.isArray(saved.flags) ? saved.flags.filter((i: unknown) => Number.isInteger(i) && Number(i)>=0 && Number(i)<next.answers.length) : [];
            draft.current = { answers: saved.answers, flags };
            setAnswers(saved.answers); setFlags(flags);
            queue.current?.change(draft.current);
            setSaveStatus('waiting');
          }
          setIndex(Number.isInteger(saved.index) && saved.index >= 0 && saved.index < next.answers.length ? saved.index : 0);
          if (saved.page === 'review') setPage('review');
        }
      } catch {
        if (alive) setError('restore');
      } finally {
        if (alive) { storageReady.current = true; setBusy(false); }
      }
    };
    if (!queue.current) queue.current = new DraftQueue(
      (current, draft) => requestSession({ action: 'save', token: current.token, revision: current.revision, ...draft }),
      (next, clean) => {
        if (next.phase !== 'test' || next.token !== acceptedToken.current) { acceptSession(next); return; }
        setSession(next); setOffset(next.serverNow - Date.now()); setNow(Date.now());
        setSaveStatus(clean ? 'saved' : 'saving');
      },
    );
    void restore();
    return () => { alive = false; };
  }, [acceptSession]);

  useEffect(() => {
    if (!storageReady.current) return;
    try {
      if (session) sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ token: session.token, revision: session.revision, page, answers, flags, index }));
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch { /* Practice remains usable if storage is blocked. */ }
  }, [session, page, answers, flags, index]);

  useEffect(() => {
    if (!session || session.phase !== 'test' || busy || error || !queue.current?.dirty) return;
    const timer = setTimeout(() => {
      setSaveStatus('saving');
      void queue.current?.flush().catch(err => { setSaveStatus('notSaved'); setError(err instanceof Error ? err.message : 'network'); });
    }, 300);
    return () => clearTimeout(timer);
  }, [answers, flags, session, busy, error]);

  function changeDraft(next: typeof draft.current) {
    setError(null); draft.current = next; setAnswers(next.answers); setFlags(next.flags);
    queue.current?.change(next); setSaveStatus('waiting');
  }

  useEffect(() => {
    if (!session?.deadline || !['test', 'review'].includes(page)) return;
    const tick = () => setNow(Date.now());
    const interval = setInterval(tick, 500);
    window.addEventListener('focus', tick);
    document.addEventListener('visibilitychange', tick);
    const unload = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener('beforeunload', unload);
    return () => { clearInterval(interval); window.removeEventListener('focus', tick); document.removeEventListener('visibilitychange', tick); window.removeEventListener('beforeunload', unload); };
  }, [session?.deadline, page]);

  useEffect(() => {
    const returningToSetup = page === 'setup' && previousPage.current === 'instructions';
    previousPage.current = page;
    if (page !== 'home' && page !== 'instructions' && !returningToSetup) heading.current?.scrollIntoView({ block: 'start' });
  }, [page, session?.paper]);

  const submit = useCallback(async () => {
    if (!session || inFlight.current) return;
    inFlight.current = true;
    setBusy(true); setError(null);
    try {
      await queue.current?.flush();
      const current = queue.current?.session;
      if (!current || current.phase !== 'test' || current.token !== session.token) return;
      acceptSession(await requestSession({ action: 'submit', token: current.token, revision: current.revision, ...draft.current }));
    }
    catch (err) { setError(err instanceof Error ? err.message : 'network'); }
    finally { inFlight.current = false; setBusy(false); }
  }, [session, acceptSession]);

  useEffect(() => {
    if (!locked || !session || session.phase !== 'test' || !['test', 'review'].includes(page) || autoSubmitted.current === session.token) return;
    autoSubmitted.current = session.token;
    // Queue submission outside the effect's synchronous render cycle.
    void Promise.resolve().then(submit);
  }, [locked, session, page, submit]);

  async function begin() {
    if (inFlight.current) return;
    inFlight.current = true; setBusy(true); setError(null);
    try {
      const fingerprint = JSON.stringify([selectedSubjects, mode, kind]);
      if (startId.current?.fingerprint !== fingerprint) startId.current = { id: crypto.randomUUID(), fingerprint };
      const body = { action: 'start', startId: startId.current.id, subjects: selectedSubjects, mode: 'timed', kind };
      try { sessionStorage.setItem(START_KEY, JSON.stringify(body)); } catch { /* Retry still works in this tab. */ }
      acceptSession(await requestSession(body));
    }
    catch (err) { setError(err instanceof Error ? err.message : 'unavailable'); }
    finally { inFlight.current = false; setBusy(false); }
  }
  async function saveContact(contact: ResultContact) {
    if (!session || inFlight.current) return;
    inFlight.current = true; setBusy(true); setError(null);
    try { acceptSession(await requestSession({ action: 'contact', token: session.token, contact: { ...contact, phone: contact.phone ?? '' } })); }
    catch (err) { setError(err instanceof Error ? err.message : 'network'); }
    finally { inFlight.current = false; setBusy(false); }
  }
  async function nextPaper() {
    if (!session || inFlight.current) return;
    inFlight.current = true; setBusy(true); setError(null);
    try { acceptSession(await requestSession({ action: 'next', token: session.token })); }
    catch (err) { setError(err instanceof Error ? err.message : 'network'); }
    finally { inFlight.current = false; setBusy(false); }
  }
  async function home() {
    if (inFlight.current) return;
    inFlight.current = true; setBusy(true);
    try { await requestSession({ action: 'forget' }); }
    catch (err) { setError(err instanceof Error ? err.message : 'network'); return; }
    finally { inFlight.current = false; setBusy(false); }
    queue.current?.reset(null); startId.current = null; try { sessionStorage.removeItem(START_KEY); } catch { /* Optional recovery cache. */ } setSaveStatus(''); setSession(null); setPage('home'); setError(null); setLeave(false); setAnswers(emptyAnswers()); setFlags([]); }
  function toggleSubject(id: SubjectId) { setDirection('custom'); setSelected(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]); }
  function changeTrack(id: SubjectId) { setDirection('custom'); setTrack(id); setSelected(prev => prev.map(v => v.startsWith('chinese') ? id : v)); }
  function chooseDirection(id: StudyDirection) {
    const preset = STUDY_DIRECTIONS.find(item => item.id === id)!;
    setDirection(id);
    if (id !== 'custom') { setTrack(preset.track); setSelected([...preset.subjects]); }
    setError(null);
  }
  function again() {
    setDirection('custom');
    setMode('timed');
    if (session) {
      setSelected(session.subjects);
      const chinese = session.subjects.find(id => id.startsWith('chinese'));
      if (chinese) setTrack(chinese);
    }
    queue.current?.reset(null); setSession(null); setPage('setup'); setError(null);
  }

  return (
    <div data-exam-active={activeExam || ['contact','results'].includes(page) ? '' : undefined} className={`${styles.root} ${['setup', 'instructions'].includes(page) ? styles.compactSetup : ''} ${activeExam ? styles.examActive : ''} ${['contact','results'].includes(page) ? styles.reportActive : ''}`}>
      {activeExam && session && <TestHeader session={session} remaining={remaining} onBreak={page === 'break'} busy={busy || locked} onExit={() => setLeave(true)} />}
      {['contact','results'].includes(page) && <ResultsHeader onHome={home} onAgain={again} />}
      {page !== 'home' && <div className={styles.breadcrumb}><Link href="/">Saturday Education</Link><span aria-hidden="true">/</span><button type="button" onClick={() => session && ['test', 'review', 'break'].includes(page) ? setLeave(true) : home()}>{t('title')}</button><span aria-hidden="true">/</span><span>{page === 'setup' || page === 'instructions' ? t('setupTitle') : t('title')}</span></div>}
      <div className={`${styles.content} ${page === 'home' ? styles.homeContent : ''}`} ref={heading}>
        {error && page !== 'instructions' && page !== 'contact' && <div className={styles.error} role="alert"><p>{t.has(`errors.${error}`) ? t(`errors.${error}`) : t('errors.unavailable')}</p>{session && <button type="button" className={styles.textButton} disabled={busy} onClick={() => { setBusy(true); void requestSession({ action: 'resume', token: session.token }).then(next => { acceptSession(next); setError(null); }).catch(err => setError(err.message)).finally(() => setBusy(false)); }}>{t('loadSaved')}</button>}{session?.phase === 'test' && <button type="button" className={styles.textButton} disabled={busy} onClick={() => { setBusy(true); void queue.current?.flush().then(() => setError(null)).catch(err => setError(err.message)).finally(() => setBusy(false)); }}>{t('retrySave')}</button>}{locked && <Action onClick={() => void submit()} disabled={busy}>{t('retrySubmit')}</Action>}<button type="button" className={styles.textButton} onClick={home}>{t('newPractice')}</button></div>}
        {<>
          {page === 'home' && <Home onCsca={() => { setMode('timed'); setTrack('chinese-stem'); setSelected([]); setDirection(null); setPage('setup'); setError(null); }} />}
          {(page === 'setup' || page === 'instructions') && <Setup direction={direction} onDirection={chooseDirection} catalog={catalog} subjects={selectedSubjects} track={track} onTrack={changeTrack} onToggle={toggleSubject} onHome={home} onContinue={() => { setError(null); setPage('instructions'); }} />}
          {page === 'instructions' && <InstructionsModal subjects={selectedSubjects} busy={busy} error={error ? (t.has(`errors.${error}`) ? t(`errors.${error}`) : t('errors.unavailable')) : null} onClose={() => { setError(null); setPage('setup'); }} onBegin={() => void begin()} />}
          {session && <>
            {leave && <ExitTestDialog timed={page !== 'break' && remaining !== null} onKeep={() => setLeave(false)} onExit={home} />}
            {['test', 'review'].includes(page) && <p role="status" aria-live="polite" className={styles.saveStatus}>{saveStatus ? t(`save.${saveStatus}`) : ''}</p>}
            {page === 'test' && <Paper session={session} answers={answers} flags={flags} index={index} disabled={busy || locked} onAnswer={value => changeDraft({ ...draft.current, answers: draft.current.answers.map((v, i) => i === index ? value : v) })} onFlag={() => changeDraft({ ...draft.current, flags: draft.current.flags.includes(index) ? draft.current.flags.filter(i => i !== index) : [...draft.current.flags, index] })} onIndex={setIndex} onReview={() => setPage('review')} />}
            {page === 'review' && <Review session={session} answers={answers} flags={flags} busy={busy} locked={locked} onRevisit={i => { setIndex(i); setPage('test'); }} onSubmit={() => void submit()} />}
            {page === 'break' && <Break session={session} busy={busy} onNext={() => void nextPaper()} />}
            {page === 'contact' && <ResultContactGate busy={busy} error={error ? (t.has(`errors.${error}`) ? t(`errors.${error}`) : t('errors.unavailable')) : null} onSubmit={contact => void saveContact(contact)} onExit={() => void home()} />}
            {page === 'results' && <ResultsReport session={session} selected={resultPaper} onSelect={setResultPaper} />}
          </>}
        </>}
      </div>
      <div className={styles.footnote}><span>{t('independent')}</span><span>{t('practiceOnly')}</span></div>
    </div>
  );
}
