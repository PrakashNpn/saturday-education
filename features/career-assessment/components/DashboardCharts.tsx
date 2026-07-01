'use client'

import { motion } from 'framer-motion'
import { aptitudeBandFor } from '../data/aptitudeBands'
import type { DashboardData } from '../types'

// ── Holland hexagon (radar) ──────────────────────────────────────────────────
const SIZE = 200
const CX = 100
const CY = 100
const MAXR = 70

function point(i: number, r: number): [number, number] {
  const a = ((-90 + i * 60) * Math.PI) / 180 // R at top, clockwise
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
}
function hexPoints(r: number): string {
  return Array.from({ length: 6 }, (_, i) => point(i, r).join(',')).join(' ')
}

export function HollandHexagon({ interests }: { interests: DashboardData['interests'] }) {
  const dataPts = interests.map((it, i) => point(i, (Math.max(0, Math.min(100, it.value)) / 100) * MAXR).join(',')).join(' ')

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-auto h-auto w-full max-w-[220px]">
      {/* grid rings + spokes */}
      <polygon points={hexPoints(MAXR)} fill="none" stroke="#E5E7EB" strokeWidth="1" />
      <polygon points={hexPoints(MAXR * 0.66)} fill="none" stroke="#EFEFF2" strokeWidth="1" />
      <polygon points={hexPoints(MAXR * 0.33)} fill="none" stroke="#EFEFF2" strokeWidth="1" />
      {interests.map((_, i) => {
        const [x, y] = point(i, MAXR)
        return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="#EFEFF2" strokeWidth="1" />
      })}

      {/* data polygon */}
      <motion.polygon
        points={dataPts}
        fill="rgba(89,13,130,0.18)"
        stroke="#590D82"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.15 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />

      {/* vertex letter badges */}
      {interests.map((it, i) => {
        const [x, y] = point(i, MAXR + 15)
        return (
          <g key={it.category}>
            <circle cx={x} cy={y} r="10" fill="#F5E6FF" stroke="#E8CCFF" strokeWidth="1" />
            <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="700" fill="#590D82">
              {it.category}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ── Bipolar personality bar ──────────────────────────────────────────────────
export function BipolarBar({
  label,
  low,
  high,
  percentile,
  delay = 0,
}: {
  label: string
  low: string
  high: string
  percentile: number
  delay?: number
}) {
  const pct = Math.max(0, Math.min(100, percentile))
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-xs font-semibold text-neutral-800">{label}</span>
        <span className="text-[11px] font-medium text-gray-400">{pct}%</span>
      </div>
      <div className="relative h-2 rounded-full bg-gray-100">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-light"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: 'easeOut', delay }}
        />
        <motion.div
          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-brand-purple shadow"
          initial={{ left: '0%' }}
          animate={{ left: `${pct}%` }}
          transition={{ duration: 0.7, ease: 'easeOut', delay }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-gray-400">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  )
}

// ── Radial score ring ────────────────────────────────────────────────────────
export function ScoreRing({
  percent,
  label,
  size = 88,
  stroke = 8,
  delay = 0,
}: {
  percent: number
  label?: string
  size?: number
  stroke?: number
  delay?: number
}) {
  const pct = Math.max(0, Math.min(100, percent))
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const color = aptitudeBandFor(pct).color

  return (
    <div className="flex flex-col items-center gap-1.5">
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
            animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
            transition={{ duration: 1, ease: 'easeOut', delay }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-extrabold text-neutral-900">{pct}%</span>
        </div>
      </div>
      {label && <span className="text-center text-[11px] font-medium text-gray-500">{label}</span>}
    </div>
  )
}

// OutlookChart + DemandGauge moved to shared/components/careers/OutlookCharts.tsx
// (reused by the public Career Library, which cannot import from this feature).
