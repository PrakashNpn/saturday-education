import 'server-only';
import { createHash } from 'node:crypto';
import { SaxesParser } from 'saxes';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseAdmin } from './db';
import { accessHash } from './session';

export const MAX_SVG_BYTES = 128 * 1024;
const NS = 'http://www.w3.org/2000/svg';
const elements = new Set(['svg', 'g', 'line', 'polyline', 'polygon', 'path', 'circle', 'ellipse', 'rect', 'text', 'tspan', 'title', 'desc']);
const numeric = new Set(['x','y','x1','x2','y1','y2','cx','cy','r','rx','ry','width','height','stroke-width','font-size']);
const attributes = new Set([...numeric, 'xmlns','viewBox','role','aria-label','fill','stroke','opacity','fill-opacity','stroke-opacity','points','d','transform','stroke-dasharray','stroke-linecap','stroke-linejoin','text-anchor','font-family','font-weight']);
const number = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;
function numbers(value: string): number[] {
  const parts = value.trim().split(/[\s,]+/);
  if (!parts.length || parts.some(x => !number.test(x) || !Number.isFinite(Number(x)) || Math.abs(Number(x)) > 100000)) throw new Error('Invalid geometry');
  return parts.map(Number);
}

/** Strict SVG subset, not a general SVG sanitizer. Reject unsupported input intact. */
export function validateDiagramSvg(svg: string, expectedHash: string): boolean {
  if (!/^[a-f0-9]{64}$/.test(expectedHash) || Buffer.byteLength(svg, 'utf8') > MAX_SVG_BYTES || !svg.trim()
    || /<\?|<!/i.test(svg) || createHash('sha256').update(svg).digest('hex') !== expectedHash) return false;
  try {
    let nodes = 0;
    const stack: string[] = [];
    const parser = new SaxesParser({ xmlns: true });
    parser.on('error', () => { throw new Error('Invalid XML'); });
    parser.on('doctype', () => { throw new Error('DTD forbidden'); });
    parser.on('processinginstruction', () => { throw new Error('PI forbidden'); });
    parser.on('opentag', tag => {
      if (++nodes > 5000 || stack.length >= 16 || tag.prefix || tag.uri !== NS || !elements.has(tag.local)
        || (stack.length === 0 ? tag.local !== 'svg' : tag.local === 'svg') || Object.keys(tag.attributes).length > 32) throw new Error('Invalid element');
      if (!stack.length && !tag.attributes.viewBox) throw new Error('Missing viewBox');
      for (const attribute of Object.values(tag.attributes)) {
        const { name, value, prefix } = attribute;
        if (!attributes.has(name) || prefix || value.length > 64000) throw new Error('Invalid attribute');
        if (name === 'xmlns') {
          if (stack.length || value !== NS) throw new Error('Invalid namespace');
        } else if (attribute.uri) throw new Error('Unexpected namespace');
        else if (numeric.has(name)) {
          const values = numbers(value);
          if (values.length !== 1 || (['width','height'].includes(name) && (values[0] <= 0 || values[0] > 4096))
            || (['r','rx','ry','stroke-width','font-size'].includes(name) && values[0] < 0)) throw new Error('Invalid dimension');
        } else if (name === 'viewBox') {
          const v = numbers(value);
          if (stack.length || v.length !== 4 || v[2] <= 0 || v[3] <= 0 || v[2] > 4096 || v[3] > 4096) throw new Error('Invalid viewBox');
        } else if (['fill','stroke'].includes(name) && !/^(?:none|currentColor|#[a-fA-F0-9]{3,8})$/.test(value)) throw new Error('Invalid paint');
        else if (name.endsWith('opacity') && (!number.test(value) || Number(value) < 0 || Number(value) > 1)) throw new Error('Invalid opacity');
        else if (name === 'points' && numbers(value).length % 2 !== 0) throw new Error('Invalid points');
        else if (name === 'd' && !/^[MmZzLlHhVvCcSsQqTtAa0-9eE+.,\s-]+$/.test(value)) throw new Error('Invalid path');
        else if (name === 'transform' && !/^(?:(?:matrix|translate|scale|rotate|skewX|skewY)\(\s*[0-9eE+.,\s-]+\)\s*)+$/.test(value)) throw new Error('Invalid transform');
        else if (name === 'stroke-dasharray' && value !== 'none' && numbers(value).some(x => x < 0)) throw new Error('Invalid dashes');
        else if (name === 'role' && value !== 'img') throw new Error('Invalid role');
        else if (name === 'aria-label' && value.length > 2000) throw new Error('Invalid label');
        else if (name === 'font-family' && !/^[a-zA-Z ,'-]{1,100}$/.test(value)) throw new Error('Invalid font');
        else if (name === 'font-weight' && !/^(?:normal|bold|[1-9]00)$/.test(value)) throw new Error('Invalid weight');
        else if (name === 'text-anchor' && !['start','middle','end'].includes(value)) throw new Error('Invalid anchor');
        else if (name === 'stroke-linecap' && !['butt','round','square'].includes(value)) throw new Error('Invalid cap');
        else if (name === 'stroke-linejoin' && !['miter','round','bevel'].includes(value)) throw new Error('Invalid join');
      }
      stack.push(tag.local);
    });
    parser.on('closetag', () => { stack.pop(); });
    parser.on('text', text => {
      if (text.trim() && (!['text','tspan','title','desc'].includes(stack.at(-1) ?? '') || text.length > 4000)) throw new Error('Unexpected text');
    });
    parser.write(svg).close();
    return nodes > 0 && stack.length === 0;
  } catch { return false; }
}

export class DiagramUnavailableError extends Error {}
type DiagramRequest = { owner: string; attempt: string; question: string; version: string };

/** All queries are SELECTs. Loading an image never resumes, grades or saves a test. */
export async function loadDiagram(input: DiagramRequest, db: SupabaseClient = getSupabaseAdmin()): Promise<string | null> {
  const { owner, attempt, question, version } = input;
  const a = await db.from('saturday_csca_attempts').select('question_set_id,status,expires_at')
    .eq('id', attempt).eq('access_token_sha256', accessHash(owner, attempt)).maybeSingle();
  if (a.error) throw new DiagramUnavailableError();
  if (!a.data || !['in_progress','completed'].includes(a.data.status) || !Number.isFinite(Date.parse(a.data.expires_at)) || Date.parse(a.data.expires_at) <= Date.now()) return null;
  const completed = a.data.status === 'completed';
  if (completed) {
    const contact = await db.from('saturday_csca_attempt_contacts').select('attempt_id').eq('attempt_id', attempt).maybeSingle();
    if (contact.error) throw new DiagramUnavailableError();
    if (!contact.data) return null;
  }
  const papers = await db.from('saturday_csca_attempt_papers').select('id').eq('attempt_id', attempt)
    .in('status', completed ? ['submitted','timed_out'] : ['in_progress']);
  if (papers.error) throw new DiagramUnavailableError();
  if (!papers.data?.length) return null;
  const assigned = await db.from('saturday_csca_attempt_responses').select('question_id').eq('question_set_id', a.data.question_set_id)
    .eq('question_id', question).in('paper_id', papers.data.map(p => p.id)).maybeSingle();
  if (assigned.error) throw new DiagramUnavailableError();
  if (!assigned.data) return null;
  const q = await db.from('saturday_csca_questions').select('diagram_svg,diagram_sha256').eq('question_set_id', a.data.question_set_id).eq('question_id', question).maybeSingle();
  if (q.error) throw new DiagramUnavailableError();
  if (!q.data || typeof q.data.diagram_svg !== 'string' || q.data.diagram_sha256 !== version || !validateDiagramSvg(q.data.diagram_svg, version)) return null;
  return q.data.diagram_svg;
}
