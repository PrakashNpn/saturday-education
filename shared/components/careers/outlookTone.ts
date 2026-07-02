// Maps a 10-year growth figure to a visual tone, so the outlook reads honestly:
// growing trends stay on-brand purple, flat/stable ones go neutral slate, and
// genuinely declining careers turn rose — a quiet "look closer" signal.

import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react'

export interface GrowthTone {
  Icon: LucideIcon
  /** chip background */
  chipBg: string
  /** chip + icon text */
  chipText: string
  /** larger number on the detail page */
  numberText: string
}

const UP: GrowthTone = { Icon: TrendingUp, chipBg: 'bg-brand-purple-50', chipText: 'text-brand-purple', numberText: 'text-brand-purple' }
const FLAT: GrowthTone = { Icon: Minus, chipBg: 'bg-slate-100', chipText: 'text-slate-600', numberText: 'text-slate-700' }
const DOWN: GrowthTone = { Icon: TrendingDown, chipBg: 'bg-rose-50', chipText: 'text-rose-600', numberText: 'text-rose-600' }

/** growth is a percentage (e.g. +25, -34). */
export function growthTone(growth: number): GrowthTone {
  if (growth <= -8) return DOWN
  if (growth < 8) return FLAT
  return UP
}
