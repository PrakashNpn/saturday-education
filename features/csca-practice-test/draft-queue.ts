import type { SessionView } from './types';
export type Draft = { answers: (string | null)[]; flags: number[] };
/** One writer per browser tab. Edits coalesce; old paper replies cannot replace a new paper. */
export class DraftQueue {
  session: SessionView | null = null;
  private pending: (Draft & { version: number }) | null = null;
  private version = 0;
  private generation = 0;
  private running: Promise<void> | null = null;
  constructor(private send: (session: SessionView, draft: Draft) => Promise<SessionView>, private saved: (session: SessionView, clean: boolean) => void) {}
  reset(session: SessionView | null) { this.generation++; this.session = session; this.pending = null; }
  change(draft: Draft) { this.pending = { answers: [...draft.answers], flags: [...draft.flags], version: ++this.version }; }
  get dirty() { return this.pending !== null; }
  async flush(): Promise<void> {
    if (this.running) { await this.running; if (this.pending) return this.flush(); return; }
    const work = async () => {
      while (this.pending && this.session?.phase === 'test') {
        const draft = this.pending, generation = this.generation, token = this.session.token;
        const next = await this.send(this.session, draft);
        if (generation !== this.generation) return;
        this.session = next;
        if (next.phase !== 'test' || next.token !== token || this.pending?.version === draft.version) this.pending = null;
        this.saved(next, !this.pending);
      }
    };
    this.running = work();
    try { await this.running; } finally { this.running = null; }
  }
}
