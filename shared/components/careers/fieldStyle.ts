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
  /** gradient start for a soft field-tinted header (e.g. "from-indigo-50") */
  gradFrom: string
}

const STYLES: Record<CareerField, FieldStyle> = {
  'Computer Science & IT': { icon: Code, chipBg: 'bg-indigo-50', chipText: 'text-indigo-700', dot: 'bg-indigo-500', iconBg: 'bg-indigo-100 text-indigo-600', gradFrom: 'from-indigo-50' },
  Engineering: { icon: Cog, chipBg: 'bg-slate-100', chipText: 'text-slate-700', dot: 'bg-slate-500', iconBg: 'bg-slate-100 text-slate-600', gradFrom: 'from-slate-100' },
  'Business & Management': { icon: Briefcase, chipBg: 'bg-amber-50', chipText: 'text-amber-700', dot: 'bg-amber-500', iconBg: 'bg-amber-100 text-amber-600', gradFrom: 'from-amber-50' },
  'Finance & Economics': { icon: LineChart, chipBg: 'bg-emerald-50', chipText: 'text-emerald-700', dot: 'bg-emerald-500', iconBg: 'bg-emerald-100 text-emerald-600', gradFrom: 'from-emerald-50' },
  'Medicine & Health': { icon: Stethoscope, chipBg: 'bg-rose-50', chipText: 'text-rose-700', dot: 'bg-rose-500', iconBg: 'bg-rose-100 text-rose-600', gradFrom: 'from-rose-50' },
  'Natural Sciences': { icon: FlaskConical, chipBg: 'bg-cyan-50', chipText: 'text-cyan-700', dot: 'bg-cyan-500', iconBg: 'bg-cyan-100 text-cyan-600', gradFrom: 'from-cyan-50' },
  'Social Sciences & Psychology': { icon: Brain, chipBg: 'bg-violet-50', chipText: 'text-violet-700', dot: 'bg-violet-500', iconBg: 'bg-violet-100 text-violet-600', gradFrom: 'from-violet-50' },
  'Arts, Design & Media': { icon: Palette, chipBg: 'bg-pink-50', chipText: 'text-pink-700', dot: 'bg-pink-500', iconBg: 'bg-pink-100 text-pink-600', gradFrom: 'from-pink-50' },
  Law: { icon: Scale, chipBg: 'bg-stone-100', chipText: 'text-stone-700', dot: 'bg-stone-500', iconBg: 'bg-stone-100 text-stone-600', gradFrom: 'from-stone-100' },
  Education: { icon: GraduationCap, chipBg: 'bg-sky-50', chipText: 'text-sky-700', dot: 'bg-sky-500', iconBg: 'bg-sky-100 text-sky-600', gradFrom: 'from-sky-50' },
  'Humanities & Languages': { icon: Languages, chipBg: 'bg-orange-50', chipText: 'text-orange-700', dot: 'bg-orange-500', iconBg: 'bg-orange-100 text-orange-600', gradFrom: 'from-orange-50' },
  'Hospitality & Tourism': { icon: Plane, chipBg: 'bg-teal-50', chipText: 'text-teal-700', dot: 'bg-teal-500', iconBg: 'bg-teal-100 text-teal-600', gradFrom: 'from-teal-50' },
}

const FALLBACK: FieldStyle = { icon: Briefcase, chipBg: 'bg-gray-100', chipText: 'text-gray-700', dot: 'bg-gray-400', iconBg: 'bg-gray-100 text-gray-600', gradFrom: 'from-gray-50' }

export function fieldStyle(field: string): FieldStyle {
  return STYLES[field as CareerField] ?? FALLBACK
}
