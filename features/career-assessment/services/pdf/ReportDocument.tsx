/* eslint-disable jsx-a11y/alt-text -- @react-pdf/renderer's <Image> is not an HTML img and has no alt prop */
// Server-only: the counsellor PDF report (~6 pages) for a completed assessment.
// Built with @react-pdf/renderer primitives. English-only (built-in Helvetica).

import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Svg,
  Polygon,
  Line,
  Circle,
  Path,
  renderToBuffer,
} from '@react-pdf/renderer'
import { RIASEC_INFO } from '../../data/riasecFieldMap'
import { aptitudeBandFor } from '../../data/aptitudeBands'
import { APTITUDE_AREA_BLURB } from '../../data/aptitudeFieldDirections'
import { bandLabel } from '../brief'
import { buildArchetype } from '../archetype'
import type {
  AssessmentScores,
  ContactDetails,
  CounselorSynthesis,
  RecommendationTree,
  BigFiveTrait,
  RiasecCategory,
  MatchedCareer,
} from '../../types'
import { LOGO_DATA_URI } from './logoAsset'

// Palette. PDF rendering has no CSS engine behind it (react-pdf writes PDF
// content streams directly), so these are plain hex literals rather than the
// var()/color-mix() the rest of the site uses — but they're still meant to
// track the same tokens: PURPLE is --color-brand (Electric Purple),
// PURPLE_DARK is --color-action-hover, PURPLE_50 is --color-tint. The old
// values here (#590D82 etc.) were the deprecated pre-rebrand brand-purple.
const PURPLE = '#7F02EB'
const PURPLE_DARK = '#5806C9'
const PURPLE_50 = '#F1EBFD'
const PURPLE_BORDER = '#E5CCFB'
const GOLD = '#F59E0B'
const INK = '#18181B'
const GRAY = '#6B7280'
const MUTE = '#9CA3AF'
const TRACK = '#ECECF1'
const BORDER = '#E8E8EE'
const GREEN = '#16A34A'
const BLUE = '#2E6F9E'

const RIASEC_ORDER: RiasecCategory[] = ['R', 'I', 'A', 'S', 'E', 'C']
const RIASEC_COLOR: Record<RiasecCategory, string> = {
  R: '#2E6F9E',
  I: '#E8833A',
  A: '#1FA39B',
  S: '#7E57A0',
  E: '#2FA876',
  C: '#8A9A4B',
}
const BIG_FIVE_BARS: { trait: BigFiveTrait; label: string; low: string; high: string; color: string }[] = [
  { trait: 'O', label: 'Openness', low: 'Practical', high: 'Curious', color: '#7B1FA2' },
  { trait: 'C', label: 'Conscientiousness', low: 'Flexible', high: 'Organised', color: '#2E6F9E' },
  { trait: 'E', label: 'Extraversion', low: 'Reserved', high: 'Outgoing', color: '#E8833A' },
  { trait: 'A', label: 'Agreeableness', low: 'Direct', high: 'Compassionate', color: '#7E57A0' },
  { trait: 'N', label: 'Emotional sensitivity', low: 'Calm', high: 'Sensitive', color: '#2FA876' },
]
// Short "what it means" reads for each Big Five trait (high vs low end).
const BIG_FIVE_INFO: Record<BigFiveTrait, { high: string; low: string }> = {
  O: { high: 'Curious and open to new ideas and methods; suits varied, creative or research-led study.', low: 'Practical and grounded; prefers proven methods and concrete, applied learning.' },
  C: { high: 'Organised, dependable and goal-directed; thrives with structure, deadlines and clear plans.', low: 'Flexible and spontaneous; works best with variety and freedom rather than rigid routine.' },
  E: { high: 'Outgoing and energised by people; suits team-facing, client-facing or leadership roles.', low: 'Reserved and reflective; does their best work independently or in small groups.' },
  A: { high: 'Warm and cooperative; fits collaborative, people-centred environments.', low: 'Direct and objective; comfortable with debate, negotiation and tough calls.' },
  N: { high: 'Feels pressure keenly; benefits from supportive settings and stress-management habits.', low: 'Calm and steady under pressure; handles stress and setbacks well.' },
}

function fitLabel(n: number): string {
  if (n >= 85) return 'Very High'
  if (n >= 70) return 'High'
  if (n >= 55) return 'Good'
  return 'Moderate'
}
function fitColor(n: number): string {
  if (n >= 80) return GREEN
  if (n >= 65) return BLUE
  return MUTE
}
const s = StyleSheet.create({
  page: { paddingTop: 42, paddingBottom: 50, paddingHorizontal: 40, fontFamily: 'Helvetica', color: INK, fontSize: 10 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  headerTitle: { fontSize: 8.5, color: MUTE, fontFamily: 'Helvetica-Bold', letterSpacing: 1 },
  footer: { position: 'absolute', bottom: 22, left: 40, right: 40, flexDirection: 'row', justifyContent: 'space-between', fontSize: 8, color: MUTE },
  band: { backgroundColor: PURPLE, borderRadius: 6, paddingVertical: 6, paddingHorizontal: 12, marginBottom: 12, marginTop: 4 },
  bandText: { color: '#fff', fontSize: 11, fontFamily: 'Helvetica-Bold', letterSpacing: 0.5 },
  card: { borderWidth: 1, borderColor: BORDER, borderRadius: 10, padding: 12, marginBottom: 10 },
  small: { fontSize: 9, color: GRAY, lineHeight: 1.45 },
  muted: { fontSize: 8.5, color: MUTE },
  bullet: { fontSize: 9, color: INK, lineHeight: 1.4, marginBottom: 2 },
  chip: { borderWidth: 1, borderColor: PURPLE_BORDER, color: PURPLE, fontSize: 8.5, fontFamily: 'Helvetica-Bold', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 999, marginRight: 6, marginBottom: 6 },
  flagWarn: { borderWidth: 1, borderColor: '#FDE68A', backgroundColor: '#FEF3C7', color: '#92400E', fontSize: 8.5, fontFamily: 'Helvetica-Bold', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 999, marginRight: 6, marginBottom: 6 },
  eyebrow: { fontSize: 8.5, color: PURPLE, fontFamily: 'Helvetica-Bold', letterSpacing: 0.8, marginBottom: 6, textTransform: 'uppercase' },
})

// ── charts / ui ──────────────────────────────────────────────────────────────
function hexPoint(i: number, r: number): [number, number] {
  const a = ((-90 + i * 60) * Math.PI) / 180
  return [100 + r * Math.cos(a), 100 + r * Math.sin(a)]
}
function hexStr(r: number): string {
  return Array.from({ length: 6 }, (_, i) => hexPoint(i, r).join(',')).join(' ')
}
function Hexagon({ values, size = 140 }: { values: number[]; size?: number }) {
  const MAXR = 78
  const data = values.map((v, i) => hexPoint(i, (Math.max(0, Math.min(100, v)) / 100) * MAXR).join(',')).join(' ')
  return (
    <Svg viewBox="0 0 200 200" style={{ width: size, height: size }}>
      <Polygon points={hexStr(MAXR)} fill="none" stroke={BORDER} strokeWidth={1} />
      <Polygon points={hexStr(MAXR * 0.66)} fill="none" stroke="#F1F1F4" strokeWidth={1} />
      <Polygon points={hexStr(MAXR * 0.33)} fill="none" stroke="#F1F1F4" strokeWidth={1} />
      {RIASEC_ORDER.map((_, i) => {
        const [x, y] = hexPoint(i, MAXR)
        return <Line key={i} x1={100} y1={100} x2={x} y2={y} stroke="#F1F1F4" strokeWidth={1} />
      })}
      <Polygon points={data} fill={PURPLE} fillOpacity={0.18} stroke={PURPLE} strokeWidth={2} />
    </Svg>
  )
}

function Ring({ percent, size = 64, color }: { percent: number; size?: number; color?: string }) {
  const pct = Math.max(0, Math.min(100, percent))
  const stroke = size > 90 ? 9 : 7
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const col = color ?? aptitudeBandFor(pct).color
  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      <Svg width={size} height={size}>
        <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={TRACK} strokeWidth={stroke} />
        {/* Only draw the progress arc when there's something to fill — a 0% (or NaN)
            dash length is rejected by pdfkit and crashes the whole render. */}
        {pct > 0 && (
          <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={col} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${(circ * pct) / 100} ${circ}`} />
        )}
      </Svg>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: size > 90 ? 16 : 11, fontFamily: 'Helvetica-Bold', color: INK }}>{pct}%</Text>
      </View>
    </View>
  )
}

// Interest bar (label + filled bar + value)
function BarRow({ label, pct, color }: { label: string; pct: number; color: string }) {
  const w = Math.max(2, Math.min(100, pct))
  return (
    <View style={{ marginBottom: 7 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
        <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: INK }}>{label}</Text>
        <Text style={{ fontSize: 8.5, color: GRAY }}>{Math.round(pct)}%</Text>
      </View>
      <View style={{ height: 7, backgroundColor: TRACK, borderRadius: 3.5 }}>
        <View style={{ height: 7, width: `${w}%`, backgroundColor: color, borderRadius: 3.5 }} />
      </View>
    </View>
  )
}

// Bipolar slider with a knob
function SliderBar({ label, low, high, percentile, color }: { label: string; low: string; high: string; percentile: number; color: string }) {
  const pct = Math.max(0, Math.min(100, percentile))
  return (
    <View style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
        <Text style={{ fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: INK }}>{label}</Text>
        <Text style={{ fontSize: 8.5, color: GRAY }}>{pct}th · {bandLabel(pct)}</Text>
      </View>
      <View style={{ height: 8, backgroundColor: TRACK, borderRadius: 4, position: 'relative' }}>
        <View style={{ height: 8, width: `${pct}%`, backgroundColor: color, borderRadius: 4 }} />
        <View style={{ position: 'absolute', top: -2, left: `${pct}%`, marginLeft: -6, width: 12, height: 12, borderRadius: 6, backgroundColor: '#fff', borderWidth: 2, borderColor: color }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
        <Text style={s.muted}>{low}</Text>
        <Text style={s.muted}>{high}</Text>
      </View>
    </View>
  )
}

// Coloured letter panel + bullet card
function AnalysisCard({ letter, label, color, bullets }: { letter: string; label: string; color: string; bullets: string[] }) {
  return (
    <View style={{ flexDirection: 'row', borderRadius: 10, marginBottom: 8 }}>
      <View style={{ width: 78, backgroundColor: color, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, alignItems: 'center', justifyContent: 'center', padding: 8 }}>
        <Text style={{ fontSize: 26, color: '#fff', fontFamily: 'Helvetica-Bold' }}>{letter}</Text>
        <Text style={{ fontSize: 7.5, color: '#fff', textAlign: 'center', marginTop: 2 }}>{label}</Text>
      </View>
      <View style={{ flex: 1, borderWidth: 1, borderColor: BORDER, borderLeftWidth: 0, borderTopRightRadius: 10, borderBottomRightRadius: 10, paddingVertical: 9, paddingHorizontal: 11 }}>
        {bullets.map((b, i) => (
          <Text key={i} style={s.bullet}>• {b}</Text>
        ))}
      </View>
    </View>
  )
}

function Header() {
  return (
    <View style={s.header} fixed>
      <Image src={LOGO_DATA_URI} style={{ width: 120, objectFit: 'contain' }} />
      <Text style={s.headerTitle}>CAREER ASSESSMENT REPORT</Text>
    </View>
  )
}
function Footer({ name }: { name: string }) {
  return (
    <View style={s.footer} fixed>
      <Text>Confidential · {name}</Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  )
}

// ── Career match profile (counsellor-facing: fit + why + outlook + skills + gap) ──
const DEMAND_COLOR: Record<string, string> = { High: GREEN, Moderate: BLUE, Competitive: GRAY }
function growthColor(g: number): string {
  if (g <= -8) return '#DC2626'
  if (g < 8) return GRAY
  return GREEN
}

function FitCol({ label, value }: { label: string; value: number }) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <View style={{ flex: 1, paddingRight: 10 }}>
      <Text style={{ fontSize: 8, color: GRAY }}>
        {label} · {fitLabel(v)} ({v})
      </Text>
      <View style={{ height: 5, backgroundColor: TRACK, borderRadius: 3, marginTop: 2 }}>
        <View style={{ height: 5, width: `${v}%`, backgroundColor: fitColor(v), borderRadius: 3 }} />
      </View>
    </View>
  )
}

const CHIP_TONE = {
  req: { color: PURPLE, bg: PURPLE_50, border: PURPLE_BORDER },
  nice: { color: GRAY, bg: '#F3F4F6', border: BORDER },
  strength: { color: '#15803D', bg: '#F0FDF4', border: '#BBF7D0' },
  focus: { color: '#B45309', bg: '#FFFBEB', border: '#FDE68A' },
} as const
function Chip({ text, tone }: { text: string; tone: keyof typeof CHIP_TONE }) {
  const c = CHIP_TONE[tone]
  return (
    <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: c.color, backgroundColor: c.bg, borderWidth: 1, borderColor: c.border, borderRadius: 999, paddingVertical: 2.5, paddingHorizontal: 7, marginRight: 4, marginBottom: 4 }}>
      {text}
    </Text>
  )
}

function CareerProfile({ career, rank }: { career: MatchedCareer; rank: number }) {
  const t = career.outlook.trend
  const growth = t.length > 1 && t[0] > 0 ? Math.round(((t[t.length - 1] - t[0]) / t[0]) * 100) : 0
  const mn = Math.min(...t)
  const mx = Math.max(...t)
  // Scale bars tight to the trend's own range so the trajectory reads clearly (the
  // exact values + growth label above keep it honest for slow-moving careers).
  const lo = Math.max(0, mn - 1)
  const hi = Math.min(100, mx + 1)
  const barH = (v: number) => 6 + ((v - lo) / (hi - lo || 1)) * 32
  const startYear = new Date().getFullYear()
  const step = t.length > 1 ? Math.round(10 / (t.length - 1)) : 2
  const sources = career.outlook.sources
  const { strengths, focus } = career.skillGap
  return (
    <View wrap={false} style={{ ...s.card, marginBottom: 10 }}>
      {/* header: title + field + demand · match ring */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={{ fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: MUTE, marginRight: 5 }}>#{rank}</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: INK }}>{career.title}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <Text style={{ fontSize: 8.5, color: MUTE, marginRight: 8 }}>{career.field}</Text>
            <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: DEMAND_COLOR[career.outlook.demand] ?? GRAY }}>
              {career.outlook.demand} demand
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Ring percent={career.match} size={50} />
          <Text style={{ ...s.muted, marginTop: 1, fontFamily: 'Helvetica-Bold' }}>MATCH</Text>
        </View>
      </View>

      {/* fit breakdown */}
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <FitCol label="Interest fit" value={career.interestFit} />
        <FitCol label="Skills fit" value={career.skillsFit} />
      </View>

      {/* why this fits (AI, per student) */}
      {career.whyFit ? (
        <View style={{ backgroundColor: PURPLE_50, borderRadius: 6, padding: 8, marginTop: 8 }}>
          <Text style={{ ...s.eyebrow, marginBottom: 3 }}>Why this fits</Text>
          <Text style={{ fontSize: 9, color: INK, lineHeight: 1.45 }}>{career.whyFit}</Text>
        </View>
      ) : null}

      {/* 10-year outlook — labelled bar chart + sources */}
      <View style={{ borderTopWidth: 1, borderTopColor: BORDER, marginTop: 8, paddingTop: 7 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={s.eyebrow}>10-year job outlook</Text>
          <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: growthColor(growth) }}>
            {career.outlook.growthLabel} · ~{growth > 0 ? '+' : ''}{growth}%
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 46 }}>
          {t.map((v, i) => (
            <View key={i} style={{ flex: 1, marginRight: i < t.length - 1 ? 5 : 0, alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 6.5, fontFamily: 'Helvetica-Bold', color: PURPLE, marginBottom: 1.5 }}>{v}</Text>
              <View style={{ width: '100%', height: barH(v), backgroundColor: PURPLE, borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', marginTop: 3, borderTopWidth: 1, borderTopColor: BORDER, paddingTop: 3 }}>
          {t.map((_, i) => (
            <Text key={i} style={{ flex: 1, marginRight: i < t.length - 1 ? 5 : 0, fontSize: 6, color: MUTE, textAlign: 'center' }}>
              {startYear + i * step}
            </Text>
          ))}
        </View>
        <Text style={{ ...s.small, marginTop: 6 }}>{career.outlook.marketNote}</Text>
        <Text style={{ ...s.muted, marginTop: 3 }}>
          Indicative, based on public labour-market sources{sources.length ? ` (${sources.join(', ')})` : ''}. Varies by country and over time.
        </Text>
      </View>

      {/* skills the career needs — chips */}
      <View style={{ marginTop: 8 }}>
        <Text style={{ ...s.eyebrow, marginBottom: 1 }}>Must-have skills</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 3 }}>
          {career.requiredSkills.map((sk) => <Chip key={sk} text={sk} tone="req" />)}
        </View>
        <Text style={{ ...s.eyebrow, marginTop: 6, marginBottom: 1 }}>Nice-to-have skills</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 3 }}>
          {career.niceToHaveSkills.map((sk) => <Chip key={sk} text={sk} tone="nice" />)}
        </View>
      </View>

      {/* student readiness (skill gap) — chips */}
      <View style={{ borderTopWidth: 1, borderTopColor: BORDER, marginTop: 8, paddingTop: 7 }}>
        <Text style={{ ...s.eyebrow, marginBottom: 5 }}>Student&apos;s readiness for this path</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
          <Text style={{ width: 82, fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#15803D', paddingTop: 3 }}>Head start</Text>
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {strengths.length ? (
              strengths.map((x) => <Chip key={x.label} text={`${x.label} ${x.percent}%`} tone="strength" />)
            ) : (
              <Text style={{ ...s.small, paddingTop: 2 }}>Strengths will build with study and practice.</Text>
            )}
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <Text style={{ width: 82, fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#B45309', paddingTop: 3 }}>Focus to get ready</Text>
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {focus.length ? (
              focus.map((f) => <Chip key={f} text={f} tone="focus" />)
            ) : (
              <Text style={{ ...s.small, paddingTop: 2 }}>Well-rounded for this path.</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}

export interface ReportArgs {
  contact: ContactDetails
  scores: AssessmentScores
  synthesis: CounselorSynthesis | null
  tree: RecommendationTree
  careers: MatchedCareer[]
}

export function ReportDocument({ contact, scores, synthesis, tree, careers }: ReportArgs) {
  const { riasec, bigFive, aptitude } = scores
  const top3 = riasec.ranked.slice(0, 3)
  const archetype = buildArchetype(scores)
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const rankedCats = [...RIASEC_ORDER].sort((a, b) => riasec.scores[b] - riasec.scores[a])
  const paths = synthesis?.careerPaths ?? []

  // interpretation reads (fill pages with substance)
  const persReads = [...BIG_FIVE_BARS]
    .map((b) => ({ b, p: bigFive.percentile[b.trait], dist: Math.abs(bigFive.percentile[b.trait] - 50) }))
    .sort((x, y) => y.dist - x.dist)
    .slice(0, 3)
    .map(({ b, p }) => `${b.label} (${p}th): ${p >= 55 ? BIG_FIVE_INFO[b.trait].high : p <= 45 ? BIG_FIVE_INFO[b.trait].low : 'Balanced; adapts between both poles.'}`)
  const aptReads = [...aptitude.areas]
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 2)
    .map((a) => `${a.label} (${a.band}): ${APTITUDE_AREA_BLURB[a.area]}`)
  const comboText = `Your ${riasec.hollandCode} profile blends ${top3
    .map((c) => RIASEC_INFO[c].label.replace(/\s*\(.*\)\s*/, '').trim().toLowerCase())
    .join(', ')} interests. Look for fields and roles where these strengths work together.`
  const strongestApt = [...aptitude.areas].sort((a, b) => b.percent - a.percent)[0]
  const takeaways = [
    `Drawn most to ${top3.slice(0, 2).map((c) => RIASEC_INFO[c].label.replace(/\s*\(.*\)\s*/, '').trim().toLowerCase()).join(' and ')} work (Holland ${riasec.hollandCode}).`,
    `Strongest ability: ${strongestApt.label} (${strongestApt.band}).`,
    `Recommended focus: ${synthesis?.suggestedFields?.[0] ?? tree.fields[0] ?? 'see recommended career paths'}.`,
  ]

  const flags: { text: string; warn?: boolean }[] = []
  if (contact.preferredCountry) flags.push({ text: `Prefers ${contact.preferredCountry}` })
  if (contact.educationLevel) flags.push({ text: contact.educationLevel })
  if (bigFive.percentile.N > 70) flags.push({ text: 'High stress-reactivity', warn: true })
  if (bigFive.percentile.A < 30) flags.push({ text: 'Low agreeableness', warn: true })

  return (
    <Document title={`Career Assessment Report for ${contact.fullName}`} author="Saturday Education Consulting">
      {/* ── PAGE 1,COVER ───────────────────────────────────────────── */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', color: INK, padding: 0 }}>
        {/* decorative graphics,confined to top/bottom so they never cover content */}
        <Svg viewBox="0 0 595 180" style={{ position: 'absolute', top: 0, left: 0, width: 595, height: 180 }}>
          <Circle cx={30} cy={40} r={70} fill={PURPLE} fillOpacity={0.1} />
          <Circle cx={110} cy={-15} r={55} fill={GOLD} fillOpacity={0.16} />
          <Circle cx={20} cy={150} r={26} fill={PURPLE} fillOpacity={0.22} />
        </Svg>
        <Svg viewBox="0 0 595 120" style={{ position: 'absolute', bottom: 0, left: 0, width: 595, height: 120 }}>
          <Path d="M0,55 Q230,0 595,80 L595,120 L0,120 Z" fill={PURPLE} />
          <Path d="M0,45 Q250,-8 595,68" stroke={GOLD} strokeWidth={4} fill="none" />
        </Svg>

        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 52, paddingTop: 150, paddingBottom: 130 }}>
          <Image src={LOGO_DATA_URI} style={{ width: 240, alignSelf: 'flex-start', objectFit: 'contain', marginBottom: 26 }} />
          <View style={{ height: 4, width: 56, backgroundColor: GOLD, borderRadius: 2, marginBottom: 18 }} />
          <Text style={{ fontSize: 30, fontFamily: 'Helvetica-Bold', color: INK }}>Career Assessment Report</Text>
          <Text style={{ fontSize: 11, color: GRAY, marginTop: 6 }}>Interests · Personality · Aptitude</Text>

          <View style={{ marginTop: 34, borderWidth: 1, borderColor: PURPLE_BORDER, backgroundColor: PURPLE_50, borderRadius: 14, padding: 20, maxWidth: 360 }}>
            <Text style={{ fontSize: 8.5, color: PURPLE, fontFamily: 'Helvetica-Bold', letterSpacing: 1 }}>PREPARED FOR</Text>
            <Text style={{ fontSize: 22, fontFamily: 'Helvetica-Bold', color: PURPLE_DARK, marginTop: 4 }}>{contact.fullName}</Text>
            <Text style={{ fontSize: 13, color: PURPLE, fontFamily: 'Helvetica-Bold', marginTop: 8 }}>{archetype} · Holland {riasec.hollandCode}</Text>
            <Text style={{ fontSize: 9, color: GRAY, marginTop: 8 }}>{contact.email}{contact.phone ? `  ·  ${contact.phone}` : ''}</Text>
            {(contact.educationLevel || contact.preferredCountry) && (
              <Text style={{ fontSize: 9, color: GRAY, marginTop: 2 }}>
                {contact.educationLevel ?? ''}{contact.educationLevel && contact.preferredCountry ? '  ·  ' : ''}{contact.preferredCountry ? `Prefers ${contact.preferredCountry}` : ''}
              </Text>
            )}
          </View>

          <Text style={{ fontSize: 9.5, color: MUTE, marginTop: 22 }}>{today}</Text>
        </View>

        <View style={{ position: 'absolute', bottom: 26, left: 0, right: 0, alignItems: 'center' }}>
          <Text style={{ fontSize: 8.5, color: '#fff', fontFamily: 'Helvetica-Bold' }}>Confidential · Prepared by Saturday Education Consulting</Text>
        </View>
      </Page>

      {/* ── PAGE 2,SNAPSHOT ────────────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <Header />
        <Footer name={contact.fullName} />
        <View style={s.band}><Text style={s.bandText}>Candidate Snapshot</Text></View>

        <View style={s.card}>
          <Text style={{ fontSize: 16, fontFamily: 'Helvetica-Bold', color: INK }}>{contact.fullName}</Text>
          <Text style={{ fontSize: 11, color: PURPLE, fontFamily: 'Helvetica-Bold', marginTop: 3 }}>{archetype} · Holland code {riasec.hollandCode}</Text>
          <Text style={{ ...s.small, marginTop: 6 }}>{contact.email}{contact.phone ? ` · ${contact.phone}` : ''}</Text>
          <View style={{ flexDirection: 'row', marginTop: 6 }}>
            {contact.educationLevel ? <Text style={{ ...s.small, marginRight: 16 }}>Education: {contact.educationLevel}</Text> : null}
            {contact.preferredCountry ? <Text style={s.small}>Preferred destination: {contact.preferredCountry}</Text> : null}
          </View>
        </View>

        <View style={s.card}>
          <Text style={s.eyebrow}>Counsellor Read</Text>
          {synthesis?.read ? (
            <Text style={{ fontSize: 10, color: PURPLE_DARK, lineHeight: 1.6 }}>{synthesis.read}</Text>
          ) : (
            <Text style={s.muted}>AI synthesis unavailable. Use the dimension detail in the following pages.</Text>
          )}
        </View>

        <View style={s.card}>
          <Text style={s.eyebrow}>Counsellor Notes</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {flags.length ? flags.map((f, i) => <Text key={i} style={f.warn ? s.flagWarn : s.chip}>{f.text}</Text>) : <Text style={s.muted}>No special flags.</Text>}
          </View>
          <Text style={{ ...s.muted, marginTop: 4 }}>Derived signals to guide the conversation, not clinical diagnoses.</Text>
        </View>

        {/* profile at a glance */}
        <Text style={s.eyebrow}>Profile at a glance</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1, ...s.card, alignItems: 'center' }}>
            <Text style={{ ...s.muted, marginBottom: 2 }}>Interests</Text>
            <Hexagon values={RIASEC_ORDER.map((c) => (riasec.scores[c] / 50) * 100)} size={110} />
            <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: PURPLE, marginTop: 2 }}>Holland {riasec.hollandCode}</Text>
          </View>
          <View style={{ flex: 1, ...s.card }}>
            <Text style={{ ...s.muted, marginBottom: 6, textAlign: 'center' }}>Top personality</Text>
            {[...BIG_FIVE_BARS].sort((a, b) => bigFive.percentile[b.trait] - bigFive.percentile[a.trait]).slice(0, 3).map((b) => (
              <BarRow key={b.trait} label={b.label} pct={bigFive.percentile[b.trait]} color={b.color} />
            ))}
          </View>
          <View style={{ flex: 1, ...s.card, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ ...s.muted, marginBottom: 6 }}>Aptitude</Text>
            <Ring percent={aptitude.overallPercent} size={84} />
            <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: INK, marginTop: 4 }}>{aptitude.overallBand}</Text>
          </View>
        </View>

        <View style={{ ...s.card, marginTop: 10 }}>
          <Text style={s.eyebrow}>Key takeaways</Text>
          {takeaways.map((t, i) => <Text key={i} style={s.bullet}>• {t}</Text>)}
        </View>
      </Page>

      {/* ── PAGE 3,INTERESTS ───────────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <Header />
        <Footer name={contact.fullName} />
        <View style={s.band}><Text style={s.bandText}>Your Interests · Holland Code {riasec.hollandCode}</Text></View>

        <View style={{ flexDirection: 'row', marginBottom: 6 }}>
          <View style={{ width: 168, alignItems: 'center', justifyContent: 'center' }}>
            <Hexagon values={RIASEC_ORDER.map((c) => (riasec.scores[c] / 50) * 100)} size={168} />
          </View>
          <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'center' }}>
            {rankedCats.map((c) => (
              <BarRow key={c} label={RIASEC_INFO[c].label} pct={(riasec.scores[c] / 50) * 100} color={RIASEC_COLOR[c]} />
            ))}
          </View>
        </View>

        <Text style={s.eyebrow}>What your top interests mean</Text>
        {top3.map((c) => (
          <AnalysisCard
            key={c}
            letter={c}
            label={RIASEC_INFO[c].label.replace(/\s*\(.*\)\s*/, '').trim()}
            color={RIASEC_COLOR[c]}
            bullets={[RIASEC_INFO[c].blurb, `Fields: ${RIASEC_INFO[c].fields.join(', ')}`, `Example careers: ${RIASEC_INFO[c].careers.join(', ')}`]}
          />
        ))}

        <View style={{ ...s.card, backgroundColor: PURPLE_50, borderColor: PURPLE_BORDER, marginTop: 2 }}>
          <Text style={s.eyebrow}>Your interest combination</Text>
          <Text style={{ fontSize: 9.5, color: PURPLE_DARK, lineHeight: 1.5 }}>{comboText}</Text>
        </View>
      </Page>

      {/* ── PAGE 4,PERSONALITY + APTITUDE ──────────────────────────── */}
      <Page size="A4" style={s.page}>
        <Header />
        <Footer name={contact.fullName} />
        <View style={s.band}><Text style={s.bandText}>Your Personality · Big Five</Text></View>
        <View style={s.card}>
          {BIG_FIVE_BARS.map((b) => (
            <SliderBar key={b.trait} label={b.label} low={b.low} high={b.high} percentile={bigFive.percentile[b.trait]} color={b.color} />
          ))}
          <Text style={{ ...s.muted, marginTop: 2 }}>Each marker shows where this candidate sits between the two poles (percentile vs the general adult population).</Text>
          <View style={{ borderTopWidth: 1, borderTopColor: BORDER, marginTop: 9, paddingTop: 9 }}>
            <Text style={s.eyebrow}>What this suggests</Text>
            {persReads.map((t, i) => <Text key={i} style={s.bullet}>• {t}</Text>)}
          </View>
        </View>

        <View style={s.band}><Text style={s.bandText}>Your Aptitude · % correct (indicative)</Text></View>
        <View style={s.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <View style={{ alignItems: 'center', marginBottom: 4 }}>
              <Ring percent={aptitude.overallPercent} size={96} />
              <Text style={{ ...s.muted, marginTop: 3, fontFamily: 'Helvetica-Bold' }}>OVERALL · {aptitude.overallBand}</Text>
            </View>
            {aptitude.areas.map((a) => (
              <View key={a.area} style={{ alignItems: 'center', marginBottom: 4, width: 92 }}>
                <Ring percent={a.percent} size={62} />
                <Text style={{ ...s.muted, marginTop: 3, textAlign: 'center' }}>{a.label}</Text>
                <Text style={{ ...s.muted, textAlign: 'center', fontFamily: 'Helvetica-Bold' }}>{a.band}</Text>
              </View>
            ))}
          </View>
          <View style={{ borderTopWidth: 1, borderTopColor: BORDER, marginTop: 9, paddingTop: 9 }}>
            <Text style={s.eyebrow}>What this suggests</Text>
            {aptReads.map((t, i) => <Text key={i} style={s.bullet}>• {t}</Text>)}
          </View>
          <Text style={{ ...s.muted, marginTop: 6 }}>An indicative snapshot of ability strengths across the four areas.</Text>
        </View>
      </Page>

      {/* ── PAGE 5,CAREER PATHS ────────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <Header />
        <Footer name={contact.fullName} />
        <View style={s.band}><Text style={s.bandText}>Career Matches & 10-Year Outlook</Text></View>
        <Text style={{ ...s.small, marginBottom: 10 }}>
          The careers that best fit this student&apos;s profile, with how each job market looks over the next
          10 years. Use these to guide the consultation.
        </Text>

        {careers.length ? (
          careers.map((c, i) => <CareerProfile key={c.slug} career={c} rank={i + 1} />)
        ) : (
          <Text style={s.muted}>No career matches were generated for this profile.</Text>
        )}
      </Page>

      {/* ── DIRECTIONS + UNIVERSITY MATCHES (kept together on one page) ── */}
      <Page size="A4" style={s.page}>
        <Header />
        <Footer name={contact.fullName} />
        <View style={s.band}><Text style={s.bandText}>Directions & University Matches</Text></View>

        {synthesis?.careerDirections?.length ? (
          <View style={{ ...s.card, marginBottom: 10 }} wrap={false}>
            <Text style={{ ...s.eyebrow, marginBottom: 4 }}>Broader directions to explore</Text>
            {synthesis.careerDirections.map((d, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: INK }}>{d.title}</Text>
                <Text style={s.small}>{d.why}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <Text style={s.eyebrow}>Universities we can match (from our database)</Text>
        {tree.buckets.length ? (
          tree.buckets.slice(0, 3).map((b) => (
            <View key={b.bucket} style={{ marginBottom: 5 }} wrap={false}>
              <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: PURPLE_DARK }}>{b.bucket}</Text>
              {b.countries.slice(0, 2).map((c) => (
                <View key={c.country} style={{ marginTop: 2, paddingLeft: 8, borderLeftWidth: 2, borderLeftColor: c.preferred ? GOLD : PURPLE_BORDER }}>
                  <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: INK }}>{c.country}{c.preferred ? '  · preferred' : ''}</Text>
                  {c.universities.slice(0, 2).map((u, i) => (
                    <Text key={i} style={s.small}>• {u.program} ({u.degreeLevel}) at {u.name}</Text>
                  ))}
                </View>
              ))}
            </View>
          ))
        ) : (
          <Text style={s.muted}>No matching programs in the database yet for this profile.</Text>
        )}
      </Page>

      {/* ── PAGE 6,SUMMARY ─────────────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <Header />
        <Footer name={contact.fullName} />
        <View style={s.band}><Text style={s.bandText}>Your Profile Summary</Text></View>

        <View style={{ borderWidth: 1, borderColor: BORDER, borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
          {[
            ['Interests', `Holland ${riasec.hollandCode}: ${top3.map((c) => RIASEC_INFO[c].label.replace(/\s*\(.*\)\s*/, '').trim()).join(', ')}`],
            ['Personality', BIG_FIVE_BARS.map((b) => `${b.label} ${bigFive.percentile[b.trait]}%`).join(' · ')],
            ['Aptitude', `Overall ${aptitude.overallPercent}% (${aptitude.overallBand}): ${aptitude.areas.map((a) => `${a.label.split(' ')[0]} ${a.percent}%`).join(', ')}`],
            ['Suggested fields', (synthesis?.suggestedFields?.length ? synthesis.suggestedFields : tree.fields).slice(0, 6).join(', ') || '-'],
            ['Top career paths', paths.slice(0, 3).map((p) => p.title).join(' · ') || '-'],
          ].map((row, i) => (
            <View key={i} style={{ flexDirection: 'row', borderTopWidth: i === 0 ? 0 : 1, borderTopColor: BORDER, backgroundColor: i % 2 ? '#FAFAFC' : '#fff' }}>
              <Text style={{ width: 110, backgroundColor: PURPLE, color: '#fff', fontFamily: 'Helvetica-Bold', fontSize: 9, padding: 8 }}>{row[0]}</Text>
              <Text style={{ flex: 1, fontSize: 9, color: INK, padding: 8, lineHeight: 1.4 }}>{row[1]}</Text>
            </View>
          ))}
        </View>

        <View style={s.card}>
          <Text style={s.eyebrow}>Talking points for the consultation</Text>
          <Text style={s.bullet}>• Lead with their {RIASEC_INFO[top3[0]].label.replace(/\s*\(.*\)\s*/, '').trim().toLowerCase()} interests and connect to a concrete field.</Text>
          <Text style={s.bullet}>• Strongest ability: {aptitude.directions[0]?.label ?? 'developing across the board'}. Use it to validate or stretch the field choice.</Text>
          {paths[0] ? <Text style={s.bullet}>• Top-fit path to explore first: {paths[0].title}.</Text> : null}
          {contact.preferredCountry ? <Text style={s.bullet}>• Confirm interest in {contact.preferredCountry}; discuss budget, intake and entry requirements.</Text> : <Text style={s.bullet}>• Explore preferred destinations and budget.</Text>}
          <Text style={s.bullet}>• Reassure: this is an indicative profile; the consultation turns it into a concrete plan.</Text>
        </View>

        <View style={s.card}>
          <Text style={s.eyebrow}>Recommended next steps</Text>
          <Text style={s.bullet}>• Walk the student through the top three career paths and the matched universities.</Text>
          <Text style={s.bullet}>• Shortlist 2 to 3 programmes aligned to {synthesis?.suggestedFields?.[0] ?? tree.fields[0] ?? 'the recommended fields'}.</Text>
          <Text style={s.bullet}>• Map entry requirements, intake and budget{contact.preferredCountry ? ` for ${contact.preferredCountry}` : ''}.</Text>
          <Text style={s.bullet}>• Agree concrete next actions and a follow-up date.</Text>
        </View>

        <View style={{ backgroundColor: PURPLE, borderRadius: 10, padding: 14, marginTop: 2 }}>
          <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Helvetica-Bold' }}>Ready to plan the next step?</Text>
          <Text style={{ color: '#EADBF5', fontSize: 9.5, marginTop: 3, lineHeight: 1.4 }}>Book a free consultation with a Saturday Education counsellor to turn this profile into a concrete study-abroad plan.</Text>
        </View>

        <Text style={{ ...s.muted, textAlign: 'center', marginTop: 10 }}>
          {"Based on Holland's RIASEC, the Big Five (OCEAN) and an aptitude check, designed to guide your career and study planning."}
        </Text>
      </Page>
    </Document>
  )
}

/** Renders the report to a PDF Buffer (server-side). */
export async function buildAssessmentPdf(args: ReportArgs): Promise<Buffer> {
  return renderToBuffer(<ReportDocument {...args} />)
}
