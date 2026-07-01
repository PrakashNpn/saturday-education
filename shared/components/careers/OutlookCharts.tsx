'use client'

// Reusable career job-market visuals (used by both the assessment results and the
// public Career Library). Pure, brand-styled SVG/HTML — no chart library.

import { motion } from 'framer-motion'

// ── Mini outlook sparkline (tiny trend line, for cards) ───────────────────────
// Solid stroke + fill (no gradient/ids) so it's safe to render many at once.
export function OutlookSparkline({ data }: { data: number[] }) {
  if (!data || data.length < 2) return null
  const W = 100
  const H = 26
  const max = Math.max(...data)
  const min = Math.min(...data)
  const domMin = Math.max(0, min - 8)
  const domMax = Math.min(100, max + 4)
  const x = (i: number) => (i / (data.length - 1)) * W
  const y = (v: number) => H - ((v - domMin) / (domMax - domMin || 1)) * H
  const pts = data.map((v, i) => [x(i), y(v)] as const)
  let line = `M ${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i]
    const [x1, y1] = pts[i + 1]
    const cx = (x0 + x1) / 2
    line += ` C ${cx},${y0} ${cx},${y1} ${x1},${y1}`
  }
  const area = `${line} L ${W},${H} L 0,${H} Z`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-6 w-full">
      <path d={area} fill="rgba(89,13,130,0.07)" />
      <path d={line} fill="none" stroke="#590D82" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

// ── 10-year outlook chart (year-labelled demand columns) ──────────────────────
export function OutlookChart({
  data,
  startYear = new Date().getFullYear(),
  step = 2,
  delay = 0,
}: {
  data: number[]
  startYear?: number
  step?: number
  delay?: number
}) {
  if (!data.length) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  // Adaptive scale so the trajectory is visible (values sit in a narrow band).
  const domMin = Math.max(0, min - 12)
  const domMax = Math.min(100, max + 6)
  const heightPct = (v: number) => Math.max(8, ((v - domMin) / (domMax - domMin || 1)) * 100)

  return (
    <div>
      <div className="flex h-24 items-stretch gap-1.5">
        {data.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center justify-end">
            <span className="mb-1 text-[9px] font-semibold text-brand-purple/70">{v}</span>
            <div className="flex w-full flex-1 items-end">
              <motion.div
                className="w-full rounded-t-md bg-gradient-to-t from-brand-purple/80 to-brand-purple-light"
                initial={{ height: 0 }}
                animate={{ height: `${heightPct(v)}%` }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: delay + i * 0.06 }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-1.5">
        {data.map((_, i) => (
          <span key={i} className="flex-1 text-center text-[10px] font-medium text-gray-400">
            {startYear + i * step}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Demand gauge (radial, demand level) ──────────────────────────────────────
const DEMAND_META: Record<'High' | 'Moderate' | 'Competitive', { frac: number; color: string }> = {
  High: { frac: 0.92, color: '#590D82' },
  Moderate: { frac: 0.66, color: '#7B1FA2' },
  Competitive: { frac: 0.46, color: '#9D5BB8' },
}

export function DemandGauge({
  demand,
  caption,
  size = 86,
  stroke = 9,
  delay = 0,
}: {
  demand: 'High' | 'Moderate' | 'Competitive'
  caption?: string
  size?: number
  stroke?: number
  delay?: number
}) {
  const { frac, color } = DEMAND_META[demand] ?? DEMAND_META.Moderate
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F1F4" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - frac) }}
          transition={{ duration: 1, ease: 'easeOut', delay }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-extrabold text-neutral-900">{demand}</span>
        {caption && <span className="text-[9px] font-medium uppercase tracking-wider text-gray-400">{caption}</span>}
      </div>
    </div>
  )
}
