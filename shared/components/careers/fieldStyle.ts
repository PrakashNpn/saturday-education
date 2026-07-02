// A subtle visual identity (icon + accent colour) per field-of-study, so the
// library reads as organised rather than a uniform wall of purple. Brand purple
// stays the primary colour for CTAs; these accents are quiet tints/icons only.
// Class names are written in full (static) so Tailwind picks them up.

import {
  Code,
  Cog,
  Briefcase,
  LineChart,
  Stethoscope,
  FlaskConical,
  Brain,
  Palette,
  Scale,
  GraduationCap,
  Languages,
  Plane,
  Dumbbell,
  Compass,
  type LucideIcon,
} from 'lucide-react'
import type { CareerField } from '@/shared/lib/careers/catalog'

export interface FieldStyle {
  icon: LucideIcon
  /** field tag chip */
  chipBg: string
  chipText: string
  /** small status dot */
  dot: string
  /** icon medallion (bg + text together) */
  iconBg: string
}

const STYLES: Record<CareerField, FieldStyle> = {
  'Computer Science & IT': { icon: Code, chipBg: 'bg-indigo-50', chipText: 'text-indigo-700', dot: 'bg-indigo-500', iconBg: 'bg-indigo-100 text-indigo-600' },
  Engineering: { icon: Cog, chipBg: 'bg-slate-100', chipText: 'text-slate-700', dot: 'bg-slate-500', iconBg: 'bg-slate-100 text-slate-600' },
  'Business & Management': { icon: Briefcase, chipBg: 'bg-amber-50', chipText: 'text-amber-700', dot: 'bg-amber-500', iconBg: 'bg-amber-100 text-amber-600' },
  'Finance & Economics': { icon: LineChart, chipBg: 'bg-emerald-50', chipText: 'text-emerald-700', dot: 'bg-emerald-500', iconBg: 'bg-emerald-100 text-emerald-600' },
  'Medicine & Health': { icon: Stethoscope, chipBg: 'bg-rose-50', chipText: 'text-rose-700', dot: 'bg-rose-500', iconBg: 'bg-rose-100 text-rose-600' },
  'Natural Sciences': { icon: FlaskConical, chipBg: 'bg-cyan-50', chipText: 'text-cyan-700', dot: 'bg-cyan-500', iconBg: 'bg-cyan-100 text-cyan-600' },
  'Social Sciences & Psychology': { icon: Brain, chipBg: 'bg-violet-50', chipText: 'text-violet-700', dot: 'bg-violet-500', iconBg: 'bg-violet-100 text-violet-600' },
  'Arts, Design & Media': { icon: Palette, chipBg: 'bg-pink-50', chipText: 'text-pink-700', dot: 'bg-pink-500', iconBg: 'bg-pink-100 text-pink-600' },
  Law: { icon: Scale, chipBg: 'bg-stone-100', chipText: 'text-stone-700', dot: 'bg-stone-500', iconBg: 'bg-stone-100 text-stone-600' },
  Education: { icon: GraduationCap, chipBg: 'bg-sky-50', chipText: 'text-sky-700', dot: 'bg-sky-500', iconBg: 'bg-sky-100 text-sky-600' },
  'Humanities & Languages': { icon: Languages, chipBg: 'bg-orange-50', chipText: 'text-orange-700', dot: 'bg-orange-500', iconBg: 'bg-orange-100 text-orange-600' },
  'Hospitality & Tourism': { icon: Plane, chipBg: 'bg-teal-50', chipText: 'text-teal-700', dot: 'bg-teal-500', iconBg: 'bg-teal-100 text-teal-600' },
  'Sports, Fitness & Recreation': { icon: Dumbbell, chipBg: 'bg-lime-50', chipText: 'text-lime-700', dot: 'bg-lime-500', iconBg: 'bg-lime-100 text-lime-600' },
}

// Neutral fallback for any field not in the map — including free-text labels the AI
// coins for off-catalog careers. Compass (not Briefcase, which "Business & Management"
// owns) + zinc (not slate, which "Engineering" owns) so it reads as its own thing.
const FALLBACK: FieldStyle = { icon: Compass, chipBg: 'bg-zinc-100', chipText: 'text-zinc-700', dot: 'bg-zinc-400', iconBg: 'bg-zinc-100 text-zinc-600' }

export function fieldStyle(field: string): FieldStyle {
  return STYLES[field as CareerField] ?? FALLBACK
}
