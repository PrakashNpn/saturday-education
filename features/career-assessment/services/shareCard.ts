import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { supabaseAdmin, STORAGE_BUCKET, getPublicUrl } from '@/shared/lib/supabase'
import type { DashboardData } from '../types'

/**
 * Renders a single, personal results card the student can post to a Story or
 * Reel — their own name, archetype and the three charts, nothing else. No
 * branding, no call to action: this is deliberately just theirs to share, not
 * ours to promote with. The counsellor's full report is a completely separate
 * pipeline (careerLeadService's background PDF/email) and is untouched by
 * this — see the note there.
 *
 * Visual language is deliberately NOT a cropped copy of the dashboard: a flat
 * white page reads as an exported report, not something worth posting. This
 * leads with a full-bleed brand-gradient background and puts the archetype —
 * the actual payoff, "I'm The Independent Builder" — front and centre as the
 * hero, with the three charts living in floating white "stat cards" rather
 * than sitting flush on the page. Same real numbers throughout, just framed
 * the way a shareable result graphic actually looks.
 */

const CANVAS_W = 1080
const CANVAS_H = 1920
const MARGIN_X = 64
const CONTENT_W = CANVAS_W - MARGIN_X * 2
const CARD_PAD = 36
// Shared between the cursor math in buildSvg and personalityBars itself —
// keeping this in one place was the fix for an earlier bug where the two
// disagreed (a hardcoded row height inside personalityBars, independent of
// the value buildSvg was reserving space for) and later sections quietly
// overlapped each other.
const PERSONALITY_ROW_H = 108

// Design tokens, inlined: raw SVG rasterization (sharp/librsvg) does not
// resolve CSS custom properties, so these are copied from app/globals.css
// rather than referenced.
const COLOR = {
  action: '#632D8B',
  actionDeep: '#2B0F4A',
  actionTint: '#F3EDFA',
  white: '#FFFFFF',
  primaryText: '#141414',
  secondaryText: '#454045',
  mutedText: '#8A7B95',
  track: '#EEE6F5',
}

const FONT = 'Noto Sans'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function truncate(s: string, max: number): string {
  return s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s
}

/**
 * Greedy word-wrap capped at `maxLines`. Unlike a naive version, overflow
 * past the line cap is merged into the last line and ellipsized rather than
 * silently dropped — the archetype is 60 possible noun/adjective
 * combinations (see archetype.ts) and the longest, "The Collaborative
 * Strategist" at 28 characters, has to come out looking right too, not lose
 * a word off the end.
 */
function wrapLines(s: string, maxCharsPerLine: number, maxLines: number): string[] {
  const words = s.split(' ')
  const allLines: string[] = []
  let cur = ''
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w
    if (test.length > maxCharsPerLine && cur) {
      allLines.push(cur)
      cur = w
    } else {
      cur = test
    }
  }
  if (cur) allLines.push(cur)

  if (allLines.length <= maxLines) return allLines
  const kept = allLines.slice(0, maxLines - 1)
  const rest = allLines.slice(maxLines - 1).join(' ')
  kept.push(truncate(rest, maxCharsPerLine))
  return kept
}

// Fonts embedded as base64 data URIs directly in the SVG, so rendering never
// depends on the host having Noto Sans installed — a bare serverless
// container will not. Same OFL font already used site-wide via
// next/font/google, vendored as raw files (public/fonts/) for this one
// server-side path. Read once per server lifetime, not per request.
let fontFaceCss: string | null = null
function getFontFaceCss(): string {
  if (fontFaceCss) return fontFaceCss
  const dir = path.join(process.cwd(), 'public', 'fonts')
  const regular = fs.readFileSync(path.join(dir, 'NotoSans-Regular.ttf')).toString('base64')
  const bold = fs.readFileSync(path.join(dir, 'NotoSans-Bold.ttf')).toString('base64')
  fontFaceCss = `
    @font-face { font-family: '${FONT}'; font-weight: 400; src: url(data:font/ttf;base64,${regular}) format('truetype'); }
    @font-face { font-family: '${FONT}'; font-weight: 700; src: url(data:font/ttf;base64,${bold}) format('truetype'); }
  `
  return fontFaceCss
}

// ── Background: full-bleed brand gradient with two soft light blobs for
// texture, rather than a flat fill — this is what reads as "designed
// graphic" instead of "plain page." ─────────────────────────────────────────
function background(): string {
  return `
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0.15" y2="1">
        <stop offset="0" stop-color="${COLOR.action}"/>
        <stop offset="1" stop-color="${COLOR.actionDeep}"/>
      </linearGradient>
      <radialGradient id="blob" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.10"/>
        <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${CANVAS_W}" height="${CANVAS_H}" fill="url(#bg)"/>
    <circle cx="${CANVAS_W - 60}" cy="120" r="340" fill="url(#blob)"/>
    <circle cx="40" cy="${CANVAS_H - 260}" r="300" fill="url(#blob)"/>
  `
}

// ── Stat card shell: a white rounded panel with a soft fake shadow (a
// second, darker, offset copy of the same rect behind it — cheap and
// reliable across SVG rasterizers, rather than relying on feGaussianBlur
// filter support). ────────────────────────────────────────────────────────
function cardShell(x: number, y: number, w: number, h: number, r = 40): string {
  return `
    <rect x="${x}" y="${y + 10}" width="${w}" height="${h}" rx="${r}" fill="#000000" opacity="0.16"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${COLOR.white}"/>
  `
}

function cardLabel(text: string, x: number, y: number): string {
  return `<text x="${x}" y="${y}" font-size="27" font-weight="700" letter-spacing="1.5" fill="${COLOR.action}" font-family="${FONT}">${escapeXml(text.toUpperCase())}</text>`
}

// ── Interests hexagon — same placement math as DashboardCharts' HollandHexagon. ──
function interestsHexagon(interests: DashboardData['interests'], cx: number, cy: number, maxR: number): string {
  const point = (i: number, r: number): [number, number] => {
    const a = ((-90 + i * 60) * Math.PI) / 180
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }
  const ring = (r: number) => Array.from({ length: 6 }, (_, i) => point(i, r).join(',')).join(' ')
  const dataPts = interests
    .map((it, i) => point(i, (Math.max(0, Math.min(100, it.value)) / 100) * maxR).join(','))
    .join(' ')

  const spokes = interests
    .map((_, i) => {
      const [x, y] = point(i, maxR)
      return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#EDEDED" stroke-width="2"/>`
    })
    .join('')

  const badges = interests
    .map((it, i) => {
      const [x, y] = point(i, maxR + 38)
      return `
        <circle cx="${x}" cy="${y}" r="25" fill="${COLOR.actionTint}"/>
        <text x="${x}" y="${y + 1}" text-anchor="middle" dominant-baseline="central" font-size="28" font-weight="700" fill="${COLOR.action}" font-family="${FONT}">${escapeXml(it.category)}</text>
      `
    })
    .join('')

  return `
    <polygon points="${ring(maxR)}" fill="none" stroke="#E5E5E5" stroke-width="2"/>
    <polygon points="${ring(maxR * 0.66)}" fill="none" stroke="#F1F1F1" stroke-width="1.5"/>
    <polygon points="${ring(maxR * 0.33)}" fill="none" stroke="#F1F1F1" stroke-width="1.5"/>
    ${spokes}
    <polygon points="${dataPts}" fill="${COLOR.action}33" stroke="${COLOR.action}" stroke-width="5" stroke-linejoin="round"/>
    ${badges}
  `
}

// ── Personality bars — same shape as DashboardCharts' BipolarBar, static. ────
function personalityBars(
  personality: DashboardData['personality'],
  x: number,
  y: number,
  width: number,
  rowH: number,
): string {
  return personality
    .map((p, i) => {
      const rowY = y + i * rowH
      const pct = Math.max(0, Math.min(100, p.percentile))
      const barY = rowY + 40
      const barH = 16
      const fillW = Math.max(barH, (pct / 100) * width)
      return `
        <text x="${x}" y="${rowY + 6}" font-size="29" font-weight="700" fill="${COLOR.primaryText}" font-family="${FONT}">${escapeXml(p.label)}</text>
        <text x="${x + width}" y="${rowY + 6}" text-anchor="end" font-size="26" font-weight="700" fill="${COLOR.action}" font-family="${FONT}">${pct}%</text>
        <rect x="${x}" y="${barY}" width="${width}" height="${barH}" rx="${barH / 2}" fill="${COLOR.track}"/>
        <rect x="${x}" y="${barY}" width="${fillW}" height="${barH}" rx="${barH / 2}" fill="${COLOR.action}"/>
        <text x="${x}" y="${barY + barH + 26}" font-size="21" fill="${COLOR.mutedText}" font-family="${FONT}">${escapeXml(p.low)}</text>
        <text x="${x + width}" y="${barY + barH + 26}" text-anchor="end" font-size="21" fill="${COLOR.mutedText}" font-family="${FONT}">${escapeXml(p.high)}</text>
      `
    })
    .join('')
}

// ── Aptitude rings — same construction as DashboardCharts' ScoreRing, static,
// with an on-brand purple ramp rather than the dashboard's own colour bands
// (those are still on the pre-redesign palette). ─────────────────────────────
function ringColorFor(percent: number): string {
  if (percent >= 80) return '#632D8B'
  if (percent >= 60) return '#8B4FB8'
  if (percent >= 40) return '#B98FD6'
  return '#DFC7EE'
}

function scoreRing(cx: number, cy: number, size: number, stroke: number, percent: number, label?: string): string {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, percent))
  const offset = circ * (1 - pct / 100)
  const color = ringColorFor(pct)
  const fontSize = size >= 200 ? 56 : 30

  // Long two-word labels ("Numerical reasoning") wrap to two lines — the
  // same way ResultsDashboard's own ScoreRing wraps them in the dashboard —
  // rather than overflowing past the ring and, at this card's tighter
  // margins, off the edge of the card itself.
  const labelLines = label ? (() => {
    const words = label.split(' ')
    return words.length > 1 ? [words.slice(0, -1).join(' '), words[words.length - 1]] : [label]
  })() : []
  const labelSvg = labelLines
    .map((line, i) => {
      const labelY = cy + size / 2 + 34 + i * 26
      return `<text x="${cx}" y="${labelY}" text-anchor="middle" font-size="22" font-weight="500" fill="${COLOR.secondaryText}" font-family="${FONT}">${escapeXml(line)}</text>`
    })
    .join('')

  return `
    <g>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${COLOR.track}" stroke-width="${stroke}"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"
        stroke-dasharray="${circ}" stroke-dashoffset="${offset}" transform="rotate(-90 ${cx} ${cy})"/>
      <text x="${cx}" y="${cy + 1}" text-anchor="middle" dominant-baseline="central" font-size="${fontSize}" font-weight="700" fill="${COLOR.primaryText}" font-family="${FONT}">${pct}%</text>
      ${labelSvg}
    </g>
  `
}

export type ShareCardInput = Pick<
  DashboardData,
  'fullName' | 'archetype' | 'interests' | 'personality' | 'aptitude' | 'aptitudeOverall'
>

/**
 * Stacked with a running cursor rather than hand-picked absolute Y values —
 * five sections of very different shapes (hero text, radar, five bars, a
 * ring cluster) are too easy to mis-space by eye, and a cursor makes each
 * section's height self-contained instead of a number that has to stay in
 * sync with its neighbours by hand.
 */
export function buildSvg(data: ShareCardInput): string {
  const name = truncate(data.fullName.trim(), 26)
  const archetypeLines = wrapLines(data.archetype, 17, 2)
  let cursor = 0

  // ── Hero header on the gradient (no card — this is the moment, not a panel). ──
  cursor += 60
  const eyebrowY = cursor
  cursor += 54
  const nameY = cursor
  cursor += 78
  const heroFontSize = archetypeLines.length > 1 ? 78 : 92
  const heroLineH = heroFontSize + 8
  const archetypeStartY = cursor + heroFontSize * 0.8
  const archetypeText = archetypeLines
    .map((line, i) => `<tspan x="${CANVAS_W / 2}" y="${archetypeStartY + i * heroLineH}">${escapeXml(line)}</tspan>`)
    .join('')
  cursor += archetypeLines.length * heroLineH
  cursor += 34 // gap to first card

  const header = `
    <text x="${CANVAS_W / 2}" y="${eyebrowY}" text-anchor="middle" font-size="25" font-weight="700" letter-spacing="3" fill="#FFFFFFB3" font-family="${FONT}">CAREER PROFILE</text>
    <text x="${CANVAS_W / 2}" y="${nameY}" text-anchor="middle" font-size="34" font-weight="400" fill="#FFFFFFE0" font-family="${FONT}">${escapeXml(name)}</text>
    <text text-anchor="middle" font-size="${heroFontSize}" font-weight="700" fill="${COLOR.white}" font-family="${FONT}">${archetypeText}</text>
  `

  // ── Card 1: interests. Vertical half-extent of the hexagon = ring radius +
  // badge offset + badge radius (the vertices at top and bottom are the
  // widest points). ──────────────────────────────────────────────────────────
  const cardX = MARGIN_X
  const cardW = CONTENT_W
  const hexR = 104
  const hexHalfExtent = hexR + 38 + 25
  const card1H = CARD_PAD + 30 + hexHalfExtent * 2 + CARD_PAD - 10
  const card1Y = cursor
  const hexCy = card1Y + CARD_PAD + 30 + hexHalfExtent
  const card1 = `
    ${cardShell(cardX, card1Y, cardW, card1H)}
    ${cardLabel('Your interests', cardX + CARD_PAD, card1Y + CARD_PAD + 6)}
    ${interestsHexagon(data.interests, CANVAS_W / 2, hexCy, hexR)}
  `
  cursor += card1H + 20

  // ── Card 2: personality. ────────────────────────────────────────────────
  const card2Y = cursor
  const barsY = card2Y + CARD_PAD + 30
  const card2H = CARD_PAD + 30 + data.personality.length * PERSONALITY_ROW_H + CARD_PAD - 24
  const card2 = `
    ${cardShell(cardX, card2Y, cardW, card2H)}
    ${cardLabel('Your personality', cardX + CARD_PAD, card2Y + CARD_PAD + 6)}
    ${personalityBars(data.personality, cardX + CARD_PAD, barsY, cardW - CARD_PAD * 2, PERSONALITY_ROW_H)}
  `
  cursor += card2H + 20

  // ── Card 3: aptitude — one big overall ring, then the four area rings in a
  // row, matching the dashboard's own overall-then-breakdown layout. ─────────
  const overallSize = 140
  const smallRingSize = 96
  const card3Y = cursor
  const overallCy = card3Y + CARD_PAD + 30 + overallSize / 2
  const smallRingsCy = overallCy + overallSize / 2 + 32 + smallRingSize / 2
  const card3H = CARD_PAD + 30 + overallSize + 32 + smallRingSize + 80 + CARD_PAD - 20
  const innerW = cardW - CARD_PAD * 2
  const smallGap = (innerW - data.aptitude.length * smallRingSize) / (data.aptitude.length - 1)
  const smallRings = data.aptitude
    .map((a, i) => {
      const cx = cardX + CARD_PAD + smallRingSize / 2 + i * (smallRingSize + smallGap)
      return scoreRing(cx, smallRingsCy, smallRingSize, 13, a.percent, a.label)
    })
    .join('')

  const aptitude = `
    ${cardShell(cardX, card3Y, cardW, card3H)}
    ${cardLabel('Your aptitude', cardX + CARD_PAD, card3Y + CARD_PAD + 6)}
    ${scoreRing(CANVAS_W / 2, overallCy, overallSize, 16, data.aptitudeOverall.percent)}
    ${smallRings}
  `
  cursor += card3H

  return `
<svg width="${CANVAS_W}" height="${CANVAS_H}" viewBox="0 0 ${CANVAS_W} ${CANVAS_H}" xmlns="http://www.w3.org/2000/svg">
  <defs><style>${getFontFaceCss()}</style></defs>
  ${background()}
  ${header}
  ${card1}
  ${card2}
  ${aptitude}
</svg>
  `.trim()
}

/** Deterministic per-lead path, so repeat clicks reuse the same public URL
 *  instead of minting a new one every time. */
function storagePath(leadId: string): string {
  return `career-assessment/share/${leadId}.png`
}

/** Builds the card, uploads it, and returns the public URL. Regenerates and
 *  overwrites on every call rather than checking for an existing file first —
 *  the render itself is cheap (no AI calls, no network I/O beyond the
 *  upload), so the simplicity is worth the small redundant re-encode on a
 *  repeat click. */
export async function buildAndStoreShareCard(leadId: string, data: ShareCardInput): Promise<string> {
  const svg = buildSvg(data)
  const png = await sharp(Buffer.from(svg)).png().toBuffer()

  const targetPath = storagePath(leadId)
  const { error } = await supabaseAdmin.storage.from(STORAGE_BUCKET).upload(targetPath, png, {
    contentType: 'image/png',
    upsert: true,
  })
  if (error) throw new Error(`Share card upload failed: ${error.message}`)

  return getPublicUrl(targetPath)
}
