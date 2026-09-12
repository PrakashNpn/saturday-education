'use client'

import { motion } from 'framer-motion'
import { aptitudeBandFor } from '../data/aptitudeBands'
import type { DashboardData } from '../types'

// ── Holland hexagon (radar) ──────────────────────────────────────────────────
const SIZE = 260
const CX = 130
const CY = 130
const MAXR = 90

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
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-auto h-auto w-full max-w-[240px]">
      {/* grid rings + spokes */}
      <polygon points={hexPoints(MAXR)} fill="none" stroke="#E5E5E5" strokeWidth="1" />
      <polygon points={hexPoints(MAXR * 0.75)} fill="none" stroke="#EFEFF2" strokeWidth="1" />
      <polygon points={hexPoints(MAXR * 0.5)} fill="none" stroke="#EFEFF2" strokeWidth="1" />
      <polygon points={hexPoints(MAXR * 0.25)} fill="none" stroke="#EFEFF2" strokeWidth="1" />
      {interests.map((_, i) => {
        const [x, y] = point(i, MAXR)
        return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="#EFEFF2" strokeWidth="1" />
      })}

      {/* data polygon */}
      <motion.polygon
        points={dataPts}
        fill="rgba(99,45,139,0.16)"
        stroke="#632D8B"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.15 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />

      {/* vertex letter badges */}
      {interests.map((it, i) => {
        const [x, y] = point(i, MAXR + 18)
        return (
          <g key={it.category}>
            <circle cx={x} cy={y} r="13" fill="#F3EDFA" stroke="#E5E5E5" strokeWidth="1" />
            <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="700" fill="#632D8B">
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
      <div className="mb-1.5 flex items-baseline justify-between text-label">
        <span className="font-bold text-primary-text">{label}</span>
        <span className="text-min font-medium text-secondary-text">{pct}%</span>
      </div>
      <div className="relative h-2 rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full bg-action"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: 'easeOut', delay }}
        />
        <motion.div
          className="absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full border-2 border-white bg-action shadow-xs"
          initial={{ left: '0%' }}
          animate={{ left: `calc(${pct}% - 7px)` }}
          transition={{ duration: 0.7, ease: 'easeOut', delay }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-muted-text">
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
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E5E5" strokeWidth={stroke} />
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
          <span className={size >= 100 ? 'text-section font-bold text-primary-text' : 'text-label font-bold text-primary-text'}>
            {pct}%
          </span>
        </div>
      </div>
      {label && <span className="max-w-[80px] text-center text-min leading-tight font-medium text-secondary-text">{label}</span>}
    </div>
  )
}
