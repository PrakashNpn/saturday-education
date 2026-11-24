import {
  DESTINATION_FORMAT,
  DESTINATION_SCALE_LABEL,
  SCALE_DEFINITIONS,
  STRENGTH_TO_BAND,
  bandById,
  labelsForBand,
  sourceBandsForScale,
  type DestinationFormat,
  type ScaleType,
  type SourceBand,
} from '../data/estimate-model'

export type EstimateInput = {
  origin: string
  target: string
  scale: ScaleType
  score: string
}

export type EstimateResult = {
  format: DestinationFormat
  bandId: string
  /** Hero answer shown large (class name or grade range). */
  displayValue: string
  /** Supporting detail under the hero (scale range, or null to use i18n band label). */
  detailLabel: string | null
  headline: string
  submittedLabel: string
  /** Expert-style source band, e.g. "3.00 - 3.49 (Good)". */
  sourceBandLabel: string
  sourceBandId: string
  /** Destination scale name for the footnote. */
  destinationScaleLabel: string
  /** Strength 0 = strongest (for tests / debugging). */
  strength: number
  /** Approximate planning percent retained for diagnostics. */
  normalizedPercent: number
}

export type EstimateFailure = {
  error: 'invalid_score' | 'unknown_target' | 'unknown_scale'
}

export type EstimateOutcome = ({ ok: true } & EstimateResult) | ({ ok: false } & EstimateFailure)

function parseNumericScore(raw: string): number | null {
  const normalized = raw.trim().replace(',', '.')
  if (!/^\d+(?:\.\d+)?$/.test(normalized)) return null
  const value = Number(normalized)
  return Number.isFinite(value) ? value : null
}

function findSourceBand(scale: ScaleType, value: number): SourceBand {
  const bands = sourceBandsForScale(scale)
  return bands.find(band => value >= band.min) ?? bands[bands.length - 1]
}

function destinationBandId(format: DestinationFormat, strength: number): string {
  const row = STRENGTH_TO_BAND[format]
  return row[Math.min(strength, row.length - 1)] ?? row[row.length - 1]
}

/** Representative planning percent for a source strength (diagnostics / legacy helpers). */
function strengthToPercent(strength: number): number {
  const table = [92, 85, 76, 68, 58, 40]
  return table[Math.min(strength, table.length - 1)] ?? 40
}

/** Convert a home score into a 0-100 planning percentage (legacy helper + tests). */
export function normalizeToPercent(scale: ScaleType, score: string): number | null {
  const definition = SCALE_DEFINITIONS[scale]
  if (!definition) return null

  const value = parseNumericScore(score)
  if (value === null) return null
  if (value < definition.min || value > definition.max) return null

  return strengthToPercent(findSourceBand(scale, value).strength)
}

function submittedLabel(scale: ScaleType, score: string): string {
  if (scale === 'percent100') return `${score}%`
  if (scale === 'gpa4') return `${score} / 4.0`
  return score
}

/** Expert-style planning estimate for any supported origin → destination pair. */
export function estimateGrade(input: EstimateInput): EstimateOutcome {
  if (!SCALE_DEFINITIONS[input.scale]) return { ok: false, error: 'unknown_scale' }

  const format = DESTINATION_FORMAT[input.target]
  if (!format) return { ok: false, error: 'unknown_target' }

  const definition = SCALE_DEFINITIONS[input.scale]
  const value = parseNumericScore(input.score)
  if (value === null || value < definition.min || value > definition.max) {
    return { ok: false, error: 'invalid_score' }
  }

  const source = findSourceBand(input.scale, value)
  const bandId = destinationBandId(format, source.strength)
  const band = bandById(format, bandId)
  if (!band) return { ok: false, error: 'unknown_target' }

  const labels = labelsForBand(format, band.id, band.headline)
  return {
    ok: true,
    format,
    bandId: band.id,
    displayValue: labels.displayValue,
    detailLabel: labels.detailLabel,
    headline: band.headline,
    submittedLabel: submittedLabel(input.scale, input.score),
    sourceBandLabel: source.label,
    sourceBandId: source.id,
    destinationScaleLabel: DESTINATION_SCALE_LABEL[format],
    strength: source.strength,
    normalizedPercent: strengthToPercent(source.strength),
  }
}

export function isValidScore(scale: ScaleType, score: string): boolean {
  return normalizeToPercent(scale, score) !== null
}
