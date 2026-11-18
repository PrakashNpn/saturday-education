import 'server-only';
import { getSupabaseAdmin } from './db';
import { SUBJECTS } from '../config';
import { SUBJECT_IDS, type CatalogItem } from '../types';

/** Draft preview is a server-only development setting, never a request parameter. */
export function previewSet(): string | null {
  return process.env.NODE_ENV === 'development' ? process.env.SATURDAY_CSCA_PREVIEW_QUESTION_SET_ID || null : null;
}
export async function getCatalog(): Promise<CatalogItem[]> {
  const empty = SUBJECT_IDS.map(id => ({ id, ...SUBJECTS[id], count: 0 }));
  try {
    const db = getSupabaseAdmin(), preview = previewSet();
    const query = db.from('saturday_csca_question_sets').select('id');
    const { data, error } = await (preview ? query.eq('id', preview).eq('status', 'draft') : query.eq('status', 'active')).maybeSingle();
    if (error || !data) {
      if (error) console.warn('[CSCA] Catalogue query unavailable:', error.code || 'query-failed');
      return empty;
    }
    return await Promise.all(empty.map(async item => {
      const { count, error } = await db.from('saturday_csca_questions').select('question_id', { head: true, count: 'exact' }).eq('question_set_id', data.id).eq('subject_id', item.id);
      return { ...item, count: error ? 0 : count ?? 0 };
    }));
  } catch { return empty; }
}
