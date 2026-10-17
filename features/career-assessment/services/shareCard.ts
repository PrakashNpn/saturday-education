import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import sharp from 'sharp'
import QRCode from 'qrcode'
import { supabaseAdmin, STORAGE_BUCKET, getPublicUrl } from '@/shared/lib/supabase'
import { SITE_URL } from '@/shared/constants/site'
import type { DashboardData } from '../types'

/**
 * Renders a single, personal results card the student can post to a Story or
 * Reel — their name, archetype, the three charts, a QR back to their own
 * results page, and a small logo mark. Visual language is deliberately NOT a
 * cropped copy of the dashboard: floating "stat cards" with their own
 * borders and shadow rather than sitting flush on the page, on white — the
 * real brand tokens (app/globals.css), not a bespoke palette, so the teal
 * logo mark in the footer reads clearly instead of fighting a tinted or
 * gradient ground.
 */

const CANVAS_W = 1080
const CANVAS_H = 1920
const MARGIN_X = 64
const CONTENT_W = CANVAS_W - MARGIN_X * 2
const CARD_PAD = 32
// Shared between the cursor math in buildSvg and personalityBars itself —
// keeping this in one place was the fix for an earlier bug where the two
// disagreed (a hardcoded row height inside personalityBars, independent of
// the value buildSvg was reserving space for) and later sections quietly
// overlapped each other.
const PERSONALITY_ROW_H = 112
// Shared height for both footer marks (logo and QR) — declared once so the
// QR is generated at this exact pixel size up front rather than guessed at
// generation time and then displayed at a different size in the footer.
const FOOTER_MARK_H = 100

// Design tokens, inlined: raw SVG rasterization (sharp/librsvg) does not
// resolve CSS custom properties, so these are copied from app/globals.css
// rather than referenced. Matches the site's real tokens exactly (previously
// secondaryText/mutedText/track carried a lilac tint that no other on-brand
// surface uses — AGENTS.md is explicit that neutrals stay true neutrals).
const COLOR = {
  action: '#177E8D',
  actionHover: '#115F6B',
  tint: '#F0FBFD',
  white: '#FFFFFF',
  primaryText: '#141414',
  secondaryText: '#404040',
  mutedText: '#737373',
  stroke: '#E5E5E5',
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

// Rough average character width for bold Noto Sans at a given size — no
// real text-measurement available in raw SVG. Used to decide where a line
// actually needs to break (wrapLinesByWidth) and to place a leader line's
// endpoint (interestsLegend); neither use is precision-critical; a few px
// either way just shifts where a line breaks or a leader starts.
function estimateTextWidth(s: string, fontSize: number): number {
  return s.length * fontSize * 0.58
}

/**
 * Greedy word-wrap capped at `maxLines`, breaking on estimated pixel width
 * at the given font size rather than a hand-picked character count. The
 * archetype title is always "The [Adjective] [Noun]" from archetype.ts's
 * fixed catalog (60 combinations, longest 28 characters), and heroFontSize
 * below is deliberately sized to fit that longest one on a single line — so
 * in practice this never actually wraps today. Tying the decision to real
 * width instead of a character count means it stays correct on its own if
 * the font size, margins, or the catalog's word list ever change, rather
 * than silently overflowing the canvas edge until someone re-tunes a magic
 * number by hand.
 *
 * Unlike a naive version, overflow past the line cap is merged into the
 * last line and ellipsized rather than silently dropped.
 */
function wrapLinesByWidth(s: string, fontSize: number, maxWidth: number, maxLines: number): string[] {
  const words = s.split(' ')
  const allLines: string[] = []
  let cur = ''
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w
    if (estimateTextWidth(test, fontSize) > maxWidth && cur) {
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
  // Char-count truncation is fine here: this only runs if wrapLinesByWidth's
  // own fallback is exceeded, an already-defensive path with no live case.
  const maxChars = Math.floor(maxWidth / (fontSize * 0.58))
  kept.push(truncate(rest, maxChars))
  return kept
}

// Fonts embedded as base64 data URIs directly in the SVG. Kept even though it
// does nothing for librsvg (see ensureFontconfig below) — real browsers (a
// share-card SVG opened directly, or any other consumer that isn't this
// sharp/librsvg pipeline) do honour @font-face data URIs, so this keeps the
// SVG correct on its own terms. Same OFL font already used site-wide via
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

// librsvg renders <text> through Pango, and Pango resolves a font-family
// NAME through fontconfig — it does not read @font-face src: url(data:...)
// at all (that's a browser-only CSS feature). So the embedding above never
// actually supplied the font to librsvg; every deploy has silently depended
// on "Noto Sans" already being installed as a system font. That happens to
// be true on a full desktop/dev Linux box, which is why this worked in
// local testing, but Vercel's serverless container ships with no system
// fonts at all — fontconfig can't resolve "Noto Sans" to anything there, so
// every glyph rasterizes as empty (confirmed by reproducing this locally
// with fontconfig pointed at an empty font directory: same tofu-box output
// as the broken production image).
//
// Fix: register the already-vendored public/fonts/ directory with
// fontconfig at runtime via FONTCONFIG_PATH, pointed at a small generated
// fonts.conf, before the first sharp() call each cold start. /tmp is the
// one writable path in a serverless function. Own cachedir for the same
// reason — the default cache location may not be writable there either.
let fontconfigReady = false
function ensureFontconfig(): void {
  if (fontconfigReady) return
  const confDir = path.join(os.tmpdir(), 'share-card-fontconfig')
  const cacheDir = path.join(confDir, 'cache')
  fs.mkdirSync(cacheDir, { recursive: true })
  const fontsDir = path.join(process.cwd(), 'public', 'fonts')
  fs.writeFileSync(
    path.join(confDir, 'fonts.conf'),
    `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${fontsDir}</dir>
  <cachedir>${cacheDir}</cachedir>
</fontconfig>
`,
  )
  process.env.FONTCONFIG_PATH = confDir
  fontconfigReady = true
}

// The real logo (public/images/logo/logo.webp), converted to PNG once and
// cached as a data URI. Embedded SVG <image> support for WebP varies by
// rasterizer backend; PNG inside SVG is universally supported, so this
// re-encodes through sharp (already a dependency) rather than risk it.
let logoDataUriPromise: Promise<string> | null = null
function getLogoDataUri(): Promise<string> {
  if (!logoDataUriPromise) {
    logoDataUriPromise = (async () => {
      const p = path.join(process.cwd(), 'public', 'images', 'logo', 'logo.webp')
      const png = await sharp(fs.readFileSync(p)).png().toBuffer()
      return `data:image/png;base64,${png.toString('base64')}`
    })()
  }
  return logoDataUriPromise
}
// Real aspect ratio of logo.webp (846×311), used to size the footer mark
// from a single height value without distorting it.
const LOGO_ASPECT = 846 / 311

/** The public results page this card's QR code points to. No locale prefix
 *  yet — the share-card pipeline doesn't currently thread the student's
 *  locale through this far, so every QR opens the English results page
 *  regardless of which locale the assessment was taken in. */
function getResultsUrl(leadId: string): string {
  return `${SITE_URL}/career-assessment/results/${leadId}`
}

/** A real, scannable QR — not a placeholder — encoding the student's public
 *  results URL. Returns a self-contained `<svg width height viewBox>...`
 *  string already sized to `size`, so the caller just positions it. */
async function buildQrSnippet(url: string, size: number): Promise<string> {
  return QRCode.toString(url, {
    type: 'svg',
    margin: 1,
    width: size,
    color: { dark: '#177E8Dff', light: '#FFFFFFff' },
  })
}

// ── Background: plain white, with one very soft tint wash in the corner for
// depth — the point of white is for the teal logo mark to read clearly, so
// this stays subtle rather than competing with it. ──────────────────────────
function background(): string {
  return `
    <defs>
      <radialGradient id="wash" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="${COLOR.tint}" stop-opacity="0.7"/>
        <stop offset="1" stop-color="${COLOR.tint}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${CANVAS_W}" height="${CANVAS_H}" fill="${COLOR.white}"/>
    <circle cx="${CANVAS_W - 40}" cy="60" r="360" fill="url(#wash)"/>
  `
}

// ── Stat card shell: a white rounded panel with a hairline border and a
// soft fake shadow (a second, lighter, offset copy of the same rect behind
// it — cheap and reliable across SVG rasterizers, rather than relying on
// feGaussianBlur filter support). ────────────────────────────────────────
function cardShell(x: number, y: number, w: number, h: number, r = 32): string {
  return `
    <rect x="${x}" y="${y + 6}" width="${w}" height="${h}" rx="${r}" fill="#141414" opacity="0.06"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${COLOR.white}" stroke="${COLOR.stroke}" stroke-width="2"/>
  `
}

function cardLabel(text: string, x: number, y: number): string {
  return `<text x="${x}" y="${y}" font-size="25" font-weight="700" letter-spacing="1.5" fill="${COLOR.action}" font-family="${FONT}">${escapeXml(text.toUpperCase())}</text>`
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
      return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${COLOR.stroke}" stroke-width="2"/>`
    })
    .join('')

  const badges = interests
    .map((it, i) => {
      const [x, y] = point(i, maxR + 32)
      return `
        <circle cx="${x}" cy="${y}" r="22" fill="${COLOR.tint}"/>
        <text x="${x}" y="${y + 1}" text-anchor="middle" dominant-baseline="central" font-size="24" font-weight="700" fill="${COLOR.action}" font-family="${FONT}">${escapeXml(it.category)}</text>
      `
    })
    .join('')

  return `
    <polygon points="${ring(maxR)}" fill="none" stroke="${COLOR.stroke}" stroke-width="2"/>
    <polygon points="${ring(maxR * 0.66)}" fill="none" stroke="#F1F1F1" stroke-width="1.5"/>
    <polygon points="${ring(maxR * 0.33)}" fill="none" stroke="#F1F1F1" stroke-width="1.5"/>
    ${spokes}
    <polygon points="${dataPts}" fill="${COLOR.action}2E" stroke="${COLOR.action}" stroke-width="5" stroke-linejoin="round"/>
    ${badges}
  `
}

/** Names the top 3 interests in full, ranked — the hexagon alone only labels
 *  its axes with single Holland-code letters (R/I/A/S/E/C), which means
 *  nothing without already knowing that system. */
function interestsLegend(interests: DashboardData['interests'], x: number, y: number, width: number, rowH: number): string {
  const ranked = [...interests].sort((a, b) => b.value - a.value).slice(0, 3)
  const valueColW = 56 // reserved for up to a 3-digit value, right-aligned
  return ranked
    .map((it, i) => {
      const rowY = y + i * rowH
      const label = `${i + 1}. ${it.label}`
      const lineX1 = x + estimateTextWidth(label, 24) + 14
      const lineX2 = x + width - valueColW
      const lineY = rowY - 8
      const leader = lineX2 > lineX1
        ? `<line x1="${lineX1}" y1="${lineY}" x2="${lineX2}" y2="${lineY}" stroke="${COLOR.stroke}" stroke-width="2"/>`
        : ''
      return `
        <text x="${x}" y="${rowY}" font-size="24" font-weight="700" fill="${COLOR.primaryText}" font-family="${FONT}">${escapeXml(label)}</text>
        ${leader}
        <text x="${x + width}" y="${rowY}" text-anchor="end" font-size="24" font-weight="700" fill="${COLOR.action}" font-family="${FONT}">${it.value}</text>
      `
    })
    .join('')
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
      const barY = rowY + 26
      const barH = 16
      const fillW = Math.max(barH, (pct / 100) * width)
      return `
        <text x="${x}" y="${rowY + 4}" font-size="27" font-weight="700" fill="${COLOR.primaryText}" font-family="${FONT}">${escapeXml(p.label)}</text>
        <text x="${x + width}" y="${rowY + 4}" text-anchor="end" font-size="24" font-weight="700" fill="${COLOR.action}" font-family="${FONT}">${pct}%</text>
        <rect x="${x}" y="${barY}" width="${width}" height="${barH}" rx="${barH / 2}" fill="${COLOR.stroke}"/>
        <rect x="${x}" y="${barY}" width="${fillW}" height="${barH}" rx="${barH / 2}" fill="${COLOR.action}"/>
        <text x="${x}" y="${barY + barH + 24}" font-size="20" fill="${COLOR.mutedText}" font-family="${FONT}">${escapeXml(p.low)}</text>
        <text x="${x + width}" y="${barY + barH + 24}" text-anchor="end" font-size="20" fill="${COLOR.mutedText}" font-family="${FONT}">${escapeXml(p.high)}</text>
      `
    })
    .join('')
}

// ── Aptitude rings — same construction as DashboardCharts' ScoreRing, static,
// with an on-brand teal ramp (all four stops are the one action teal at
// different tints, not a separate colour system). ───────────────────────────
function ringColorFor(percent: number): string {
  if (percent >= 80) return '#177E8D'
  if (percent >= 60) return '#4DA3AF'
  if (percent >= 40) return '#85C4CD'
  return '#BFE3E8'
}

function scoreRing(cx: number, cy: number, size: number, stroke: number, percent: number, label?: string): string {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, percent))
  const offset = circ * (1 - pct / 100)
  const color = ringColorFor(pct)
  const fontSize = size >= 200 ? 52 : 28

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
      const labelY = cy + size / 2 + 32 + i * 24
      return `<text x="${cx}" y="${labelY}" text-anchor="middle" font-size="20" font-weight="500" fill="${COLOR.secondaryText}" font-family="${FONT}">${escapeXml(line)}</text>`
    })
    .join('')

  return `
    <g>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${COLOR.stroke}" stroke-width="${stroke}"/>
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
 * six sections of very different shapes (masthead, title, radar+legend, five
 * bars, a ring cluster, footer) are too easy to mis-space by eye, and a
 * cursor makes each section's height self-contained instead of a number
 * that has to stay in sync with its neighbours by hand.
 */
export async function buildSvg(data: ShareCardInput, leadId: string): Promise<string> {
  const name = truncate(data.fullName.trim(), 26)
  // Title font is fixed, not derived from whether the text wraps — verified
  // by rendering all 60 real archetype combinations at this size, and the
  // longest one on its own, that none of them actually need a second line.
  // wrapLinesByWidth still estimates against this same size and the canvas's
  // real content width, so if that ever stops being true (a longer word
  // added to archetype.ts, say) this degrades to a second line instead of
  // silently overflowing the canvas edge.
  const TITLE_FONT_SIZE = 50
  const TITLE_FONT_SIZE_WRAPPED = 42
  const titleMaxWidth = CANVAS_W - MARGIN_X * 2
  const archetypeLines = wrapLinesByWidth(data.archetype, TITLE_FONT_SIZE, titleMaxWidth, 2)
  const [logoDataUri, qrSnippet] = await Promise.all([
    getLogoDataUri(),
    buildQrSnippet(getResultsUrl(leadId), FOOTER_MARK_H),
  ])
  let cursor = 0

  // ── Masthead: one line, eyebrow left / name right, matching the dashboard's
  // own "CAREER PROFILE ⟷ name" pairing rather than a centred stack — the
  // stacked version spent nearly 200px just reaching the archetype text. ──────
  cursor += 100
  const mastheadY = cursor
  cursor += 24
  const mastheadRuleY = cursor
  cursor += 44 // gap to title

  const masthead = `
    <text x="${MARGIN_X}" y="${mastheadY}" font-size="23" font-weight="700" letter-spacing="2.5" fill="${COLOR.mutedText}" font-family="${FONT}">CAREER PROFILE</text>
    <text x="${CANVAS_W - MARGIN_X}" y="${mastheadY}" text-anchor="end" font-size="30" font-weight="700" letter-spacing="1" fill="${COLOR.action}" font-family="${FONT}">${escapeXml(name.toUpperCase())}</text>
    <line x1="${MARGIN_X}" y1="${mastheadRuleY}" x2="${CANVAS_W - MARGIN_X}" y2="${mastheadRuleY}" stroke="${COLOR.stroke}" stroke-width="2"/>
  `

  // ── Archetype title, left-aligned under the masthead rather than centred —
  // matches the masthead's own left edge instead of sitting on its own axis.
  // Kept in one consistent colour rather than highlighting the final word
  // (the mockup's italic-purple treatment): SVG text has no layout engine to
  // measure a mixed-colour line against, and every one of the 60 archetype
  // combinations has to render correctly, not just the one used while
  // designing this. ────────────────────────────────────────────────────────
  const heroFontSize = archetypeLines.length > 1 ? TITLE_FONT_SIZE_WRAPPED : TITLE_FONT_SIZE
  const heroLineH = heroFontSize + 8
  const archetypeStartY = cursor + heroFontSize * 0.8
  const archetypeText = archetypeLines
    .map((line, i) => `<tspan x="${MARGIN_X}" y="${archetypeStartY + i * heroLineH}">${escapeXml(line)}</tspan>`)
    .join('')
  cursor += archetypeLines.length * heroLineH
  cursor += 34 // gap to first card

  const title = `
    <text text-anchor="start" font-size="${heroFontSize}" font-weight="700" fill="${COLOR.action}" font-family="${FONT}">${archetypeText}</text>
  `

  // ── Card 1: interests. Hexagon on the left, the ranked top-3 legend on the
  // right rather than stacked beneath it — side by side uses the card's full
  // width instead of its full height, which is what actually saves space on
  // a canvas this narrow. The hexagon's own axis labels are bare Holland-code
  // letters, which mean nothing without the legend naming what they are. ─────
  const cardX = MARGIN_X
  const cardW = CONTENT_W
  const card1InnerW = cardW - CARD_PAD * 2
  const hexR = 78
  const hexHalfExtent = hexR + 32 + 22
  const hexColW = card1InnerW * 0.42
  const legendRowH = 40
  const legendRows = Math.min(3, data.interests.length)
  const card1H = CARD_PAD + 28 + hexHalfExtent * 2 + CARD_PAD
  const card1Y = cursor
  const hexCy = card1Y + CARD_PAD + 28 + hexHalfExtent
  const hexCx = cardX + CARD_PAD + hexColW / 2
  const legendX = cardX + CARD_PAD + hexColW + 32
  const legendW = card1InnerW - hexColW - 32
  const legendY = hexCy - ((legendRows - 1) * legendRowH) / 2
  const card1 = `
    ${cardShell(cardX, card1Y, cardW, card1H)}
    ${cardLabel('Your interests', cardX + CARD_PAD, card1Y + CARD_PAD + 14)}
    ${interestsHexagon(data.interests, hexCx, hexCy, hexR)}
    ${interestsLegend(data.interests, legendX, legendY, legendW, legendRowH)}
  `
  cursor += card1H + 22

  // ── Card 2: personality. ────────────────────────────────────────────────
  const card2Y = cursor
  const barsY = card2Y + CARD_PAD + 42
  const card2H = CARD_PAD + 42 + data.personality.length * PERSONALITY_ROW_H + CARD_PAD - 22
  const card2 = `
    ${cardShell(cardX, card2Y, cardW, card2H)}
    ${cardLabel('Your personality', cardX + CARD_PAD, card2Y + CARD_PAD + 14)}
    ${personalityBars(data.personality, cardX + CARD_PAD, barsY, cardW - CARD_PAD * 2, PERSONALITY_ROW_H)}
  `
  cursor += card2H + 22

  // ── Card 3: aptitude — one big overall ring, then the four area rings in a
  // row, matching the dashboard's own overall-then-breakdown layout. ─────────
  const overallSize = 124
  const smallRingSize = 86
  const card3Y = cursor
  const overallCy = card3Y + CARD_PAD + 26 + overallSize / 2
  const smallRingsCy = overallCy + overallSize / 2 + 28 + smallRingSize / 2
  const card3H = CARD_PAD + 26 + overallSize + 28 + smallRingSize + 72 + CARD_PAD - 16
  const innerW = cardW - CARD_PAD * 2
  const smallGap = (innerW - data.aptitude.length * smallRingSize) / (data.aptitude.length - 1)
  const smallRings = data.aptitude
    .map((a, i) => {
      const cx = cardX + CARD_PAD + smallRingSize / 2 + i * (smallRingSize + smallGap)
      return scoreRing(cx, smallRingsCy, smallRingSize, 12, a.percent, a.label)
    })
    .join('')

  const aptitude = `
    ${cardShell(cardX, card3Y, cardW, card3H)}
    ${cardLabel('Your aptitude', cardX + CARD_PAD, card3Y + CARD_PAD + 14)}
    ${scoreRing(CANVAS_W / 2, overallCy, overallSize, 15, data.aptitudeOverall.percent)}
    ${smallRings}
  `
  cursor += card3H + 30

  // ── Footer: the real logo pinned left, a QR back to the student's own
  // public results page pinned right — no caption, just the two marks. Same
  // height for both, so neither reads as an afterthought next to the other;
  // previously the QR (130) was well over double the logo's height (58),
  // which also pushed its vertical-centring offset enough to overlap the
  // rule above it. ─────────────────────────────────────────────────────────
  const footerRuleY = cursor
  const footerContentY = footerRuleY + 48
  const logoW = FOOTER_MARK_H * LOGO_ASPECT
  const footer = `
    <line x1="${MARGIN_X}" y1="${footerRuleY}" x2="${CANVAS_W - MARGIN_X}" y2="${footerRuleY}" stroke="${COLOR.stroke}" stroke-width="2"/>
    <image href="${logoDataUri}" x="${MARGIN_X}" y="${footerContentY}" width="${logoW}" height="${FOOTER_MARK_H}"/>
    <g transform="translate(${CANVAS_W - MARGIN_X - FOOTER_MARK_H}, ${footerContentY})">${qrSnippet}</g>
  `
  cursor = footerContentY + FOOTER_MARK_H

  return `
<svg width="${CANVAS_W}" height="${CANVAS_H}" viewBox="0 0 ${CANVAS_W} ${CANVAS_H}" xmlns="http://www.w3.org/2000/svg">
  <defs><style>${getFontFaceCss()}</style></defs>
  ${background()}
  ${masthead}
  ${title}
  ${card1}
  ${card2}
  ${aptitude}
  ${footer}
</svg>
  `.trim()
}

/** Deterministic per-lead path, so repeat clicks reuse the same public URL
 *  instead of minting a new one every time. Exported so the public results
 *  page can point its Open Graph image at the same PNG without duplicating
 *  the path string. */
export function storagePath(leadId: string): string {
  return `career-assessment/share/${leadId}.png`
}

/** Builds the card, uploads it, and returns the public URL. Regenerates and
 *  overwrites on every call rather than checking for an existing file first —
 *  the render itself is cheap (no AI calls, no network I/O beyond the
 *  upload), so the simplicity is worth the small redundant re-encode on a
 *  repeat click. */
export interface ShareCardResult {
  imageUrl: string
  /** The same public results page the card's own QR code points to — reused
   *  here so the share modal's "copy link" and social buttons send people to
   *  the page with a real Open Graph preview, not a bare image file, and so
   *  there is exactly one place (getResultsUrl) that builds this URL. */
  resultsUrl: string
}

export async function buildAndStoreShareCard(leadId: string, data: ShareCardInput): Promise<ShareCardResult> {
  ensureFontconfig()
  const svg = await buildSvg(data, leadId)
  const png = await sharp(Buffer.from(svg)).png().toBuffer()

  const targetPath = storagePath(leadId)
  const { error } = await supabaseAdmin.storage.from(STORAGE_BUCKET).upload(targetPath, png, {
    contentType: 'image/png',
    upsert: true,
  })
  if (error) throw new Error(`Share card upload failed: ${error.message}`)

  return { imageUrl: getPublicUrl(targetPath), resultsUrl: getResultsUrl(leadId) }
}
