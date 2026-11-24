/** Expert-style estimate model.
 *
 *  Phase A: each destination speaks its native reporting language.
 *  Phase B: source score → qualitative band → destination band (not raw ×25).
 *  These are planning estimates, not university admissions decisions.
 */

export const QUALIFICATION_LEVELS = ['highSchool', 'bachelor', 'master'] as const
export type QualificationLevel = (typeof QUALIFICATION_LEVELS)[number]

export const STUDY_LEVELS = ['foundation', 'bachelor', 'master'] as const
export type StudyLevel = (typeof STUDY_LEVELS)[number]

export const SUBJECTS = [
  'business',
  'computing',
  'engineering',
  'health',
  'science',
  'arts',
  'social',
  'education',
  'hospitality',
  'other',
] as const
export type SubjectArea = (typeof SUBJECTS)[number]

/** Keep the grading-system list short, like Expert Education. */
export const SCALE_TYPES = ['percent100', 'gpa4'] as const
export type ScaleType = (typeof SCALE_TYPES)[number]

export type ScaleDefinition = {
  id: ScaleType
  kind: 'numeric'
  min: number
  max: number
  direction: 'higher_is_better'
}

export const SCALE_DEFINITIONS: Record<ScaleType, ScaleDefinition> = {
  percent100: { id: 'percent100', kind: 'numeric', min: 0, max: 100, direction: 'higher_is_better' },
  gpa4: { id: 'gpa4', kind: 'numeric', min: 0, max: 4, direction: 'higher_is_better' },
}

/** High school → bachelor, bachelor → master, master → master. */
export function defaultTargetStudyLevel(current: QualificationLevel): StudyLevel {
  if (current === 'highSchool') return 'bachelor'
  return 'master'
}

export type DestinationFormat =
  | 'uk_class'
  | 'gpa4'
  | 'gpa7'
  | 'percent'
  | 'german'
  | 'french20'
  | 'spanish10'
  | 'scale10'
  | 'scale5'
  | 'italian110'

/** Phase A: destination language pack per target country. */
export const DESTINATION_FORMAT: Record<string, DestinationFormat> = {
  uk: 'uk_class',
  ireland: 'uk_class',
  usa: 'gpa4',
  canada: 'percent',
  singapore: 'gpa4',
  malaysia: 'gpa4',
  uae: 'gpa4',
  grenada: 'gpa4',
  philippines: 'gpa4',
  australia: 'gpa7',
  newZealand: 'gpa7',
  germany: 'german',
  switzerland: 'german',
  netherlands: 'scale10',
  hungary: 'scale5',
  finland: 'scale5',
  france: 'french20',
  belgium: 'french20',
  spain: 'spanish10',
  italy: 'italian110',
  thailand: 'percent',
  vietnam: 'percent',
  myanmar: 'percent',
  indonesia: 'percent',
  china: 'percent',
}

/** Short scale name shown in the Expert-style result footnote. */
export const DESTINATION_SCALE_LABEL: Record<DestinationFormat, string> = {
  uk_class: 'UK class',
  gpa4: '4.0 GPA',
  gpa7: '7.0 GPA / Class',
  percent: 'Percentage',
  german: 'German 1.0-4.0',
  french20: '20-point scale',
  spanish10: '10-point scale',
  scale10: '10-point scale',
  scale5: '5-point scale',
  italian110: '110-point scale',
}

export type Band = {
  id: string
  headline: string
}

/** Destination-facing bands. Order is strongest → weakest; index aligns with strength. */
export const FORMAT_BANDS: Record<DestinationFormat, Band[]> = {
  uk_class: [
    { id: 'first', headline: 'First class' },
    { id: 'upperSecond', headline: '2:1' },
    { id: 'lowerSecond', headline: '2:2' },
    { id: 'third', headline: 'Third class' },
    { id: 'below', headline: 'Below third class' },
  ],
  gpa4: [
    { id: 'gpa4_37', headline: '3.7-4.0 GPA' },
    { id: 'gpa4_33', headline: '3.3-3.6 GPA' },
    { id: 'gpa4_30', headline: '3.0-3.2 GPA' },
    { id: 'gpa4_27', headline: '2.7-2.9 GPA' },
    { id: 'gpa4_23', headline: '2.3-2.6 GPA' },
    { id: 'gpa4_low', headline: 'Below 2.0 GPA' },
  ],
  gpa7: [
    { id: 'gpa7_hd', headline: '6.5-7.0 / High Distinction' },
    { id: 'gpa7_d', headline: '5.5-6.4 / Distinction' },
    { id: 'gpa7_c', headline: '4.5-5.4 / Credit' },
    { id: 'gpa7_p', headline: '4.0-4.4 / Pass' },
    { id: 'gpa7_low', headline: 'Below typical pass band' },
  ],
  percent: [
    { id: 'pct_excellent', headline: '90-100%' },
    { id: 'pct_veryGood', headline: '80-89%' },
    { id: 'pct_good', headline: '73-79%' },
    { id: 'pct_fair', headline: '65-72%' },
    { id: 'pct_pass', headline: '50-64%' },
    { id: 'pct_low', headline: 'Below 50%' },
  ],
  german: [
    { id: 'de_1', headline: '1.0-1.5' },
    { id: 'de_2', headline: '1.6-2.5' },
    { id: 'de_3', headline: '2.6-3.5' },
    { id: 'de_4', headline: '3.6-4.0' },
    { id: 'de_5', headline: 'Below 4.0' },
  ],
  french20: [
    { id: 'fr_16', headline: '16-20 / 20' },
    { id: 'fr_14', headline: '14-15.9 / 20' },
    { id: 'fr_12', headline: '12-13.9 / 20' },
    { id: 'fr_10', headline: '10-11.9 / 20' },
    { id: 'fr_low', headline: 'Below 10 / 20' },
  ],
  spanish10: [
    { id: 'es_9', headline: '9.0-10' },
    { id: 'es_7', headline: '7.0-8.9' },
    { id: 'es_5', headline: '5.0-6.9' },
    { id: 'es_low', headline: 'Below 5.0' },
  ],
  scale10: [
    { id: 's10_9', headline: '9.0-10' },
    { id: 's10_7', headline: '7.0-8.9' },
    { id: 's10_6', headline: '6.0-6.9' },
    { id: 's10_5', headline: '5.5-5.9' },
    { id: 's10_low', headline: 'Below 5.5' },
  ],
  scale5: [
    { id: 's5_5', headline: '5 / 5' },
    { id: 's5_4', headline: '4 / 5' },
    { id: 's5_3', headline: '3 / 5' },
    { id: 's5_2', headline: '2 / 5' },
    { id: 's5_low', headline: 'Below 2 / 5' },
  ],
  italian110: [
    { id: 'it_110', headline: '110 / 110' },
    { id: 'it_105', headline: '105-109 / 110' },
    { id: 'it_100', headline: '100-104 / 110' },
    { id: 'it_90', headline: '90-99 / 110' },
    { id: 'it_66', headline: '66-89 / 110' },
    { id: 'it_low', headline: 'Below 66 / 110' },
  ],
}

/**
 * Phase B: strength index (0 = strongest) → destination band id.
 * Length may be shorter than FORMAT_BANDS; missing slots fall back to the last band.
 */
export const STRENGTH_TO_BAND: Record<DestinationFormat, string[]> = {
  // Good (strength 2) → 2:1; Excellent/Very good → First
  uk_class: ['first', 'first', 'upperSecond', 'upperSecond', 'lowerSecond', 'third'],
  // Good → 3.0-3.2 (no same-scale inflation)
  gpa4: ['gpa4_37', 'gpa4_33', 'gpa4_30', 'gpa4_27', 'gpa4_23', 'gpa4_low'],
  // Good → Distinction (matches Expert Thailand 3.2 → AU)
  gpa7: ['gpa7_hd', 'gpa7_hd', 'gpa7_d', 'gpa7_c', 'gpa7_p', 'gpa7_low'],
  // Good → 73-79% (matches Expert Thailand 3.2 → CA)
  percent: ['pct_excellent', 'pct_veryGood', 'pct_good', 'pct_fair', 'pct_pass', 'pct_low'],
  german: ['de_1', 'de_2', 'de_2', 'de_3', 'de_4', 'de_5'],
  french20: ['fr_16', 'fr_14', 'fr_14', 'fr_12', 'fr_10', 'fr_low'],
  spanish10: ['es_9', 'es_7', 'es_7', 'es_5', 'es_5', 'es_low'],
  scale10: ['s10_9', 's10_7', 's10_7', 's10_6', 's10_5', 's10_low'],
  scale5: ['s5_5', 's5_4', 's5_4', 's5_3', 's5_2', 's5_low'],
  italian110: ['it_110', 'it_105', 'it_100', 'it_90', 'it_66', 'it_low'],
}

export type SourceBand = {
  id: string
  /** Inclusive lower bound on the raw score */
  min: number
  /** 0 = strongest */
  strength: number
  /** Expert-style label, e.g. "3.00 - 3.49 (Good)" */
  label: string
}

/** Qualitative source bands for 4.0 GPA inputs (Expert-style). */
export const SOURCE_BANDS_GPA4: SourceBand[] = [
  { id: 'src_gpa_37', min: 3.7, strength: 0, label: '3.70 - 4.00 (Excellent)' },
  { id: 'src_gpa_35', min: 3.5, strength: 1, label: '3.50 - 3.69 (Very good)' },
  { id: 'src_gpa_30', min: 3.0, strength: 2, label: '3.00 - 3.49 (Good)' },
  { id: 'src_gpa_25', min: 2.5, strength: 3, label: '2.50 - 2.99 (Satisfactory)' },
  { id: 'src_gpa_20', min: 2.0, strength: 4, label: '2.00 - 2.49 (Pass)' },
  { id: 'src_gpa_low', min: 0, strength: 5, label: 'Below 2.00' },
]

/** Qualitative source bands for percentage inputs. */
export const SOURCE_BANDS_PERCENT: SourceBand[] = [
  { id: 'src_pct_90', min: 90, strength: 0, label: '90 - 100% (Excellent)' },
  { id: 'src_pct_80', min: 80, strength: 1, label: '80 - 89% (Very good)' },
  { id: 'src_pct_70', min: 70, strength: 2, label: '70 - 79% (Good)' },
  { id: 'src_pct_60', min: 60, strength: 3, label: '60 - 69% (Fair)' },
  { id: 'src_pct_50', min: 50, strength: 4, label: '50 - 59% (Pass)' },
  { id: 'src_pct_low', min: 0, strength: 5, label: 'Below 50%' },
]

export function sourceBandsForScale(scale: ScaleType): SourceBand[] {
  return scale === 'gpa4' ? SOURCE_BANDS_GPA4 : SOURCE_BANDS_PERCENT
}

export function bandById(format: DestinationFormat, bandId: string): Band | undefined {
  return FORMAT_BANDS[format].find(band => band.id === bandId)
}

/** Class-based destinations lead with the named grade (Expert-style);
 *  numeric destinations lead with the range. */
export function labelsForBand(
  format: DestinationFormat,
  bandId: string,
  headline: string,
): { displayValue: string; detailLabel: string | null } {
  if (format === 'uk_class') {
    if (bandId === 'first') return { displayValue: '1st', detailLabel: null }
    if (bandId === 'upperSecond') return { displayValue: '2:1', detailLabel: null }
    if (bandId === 'lowerSecond') return { displayValue: '2:2', detailLabel: null }
    if (bandId === 'third') return { displayValue: '3rd', detailLabel: null }
    return { displayValue: '-', detailLabel: null }
  }

  if (format === 'gpa7') {
    const range = headline.split(' / ')[0]?.trim() ?? headline
    const named: Record<string, string> = {
      gpa7_hd: 'High Distinction (HD)',
      gpa7_d: 'Distinction (D)',
      gpa7_c: 'Credit (C)',
      gpa7_p: 'Pass (P)',
      gpa7_low: 'Below pass',
    }
    return {
      displayValue: named[bandId] ?? range,
      detailLabel: bandId === 'gpa7_low' ? null : `${range} / 7.0`,
    }
  }

  if (format === 'french20') {
    const named: Record<string, string> = {
      fr_16: 'Très bien',
      fr_14: 'Bien',
      fr_12: 'Assez bien',
      fr_10: 'Passable',
      fr_low: 'Below pass',
    }
    const range = headline.replace(' / 20', '').trim()
    return {
      displayValue: named[bandId] ?? range,
      detailLabel: bandId === 'fr_low' ? null : `${range} / 20`,
    }
  }

  if (format === 'german') {
    const named: Record<string, string> = {
      de_1: 'Sehr gut',
      de_2: 'Gut',
      de_3: 'Befriedigend',
      de_4: 'Ausreichend',
      de_5: 'Below pass',
    }
    return {
      displayValue: headline,
      detailLabel: named[bandId] ?? null,
    }
  }

  if (format === 'scale5') {
    const named: Record<string, string> = {
      s5_5: 'Excellent',
      s5_4: 'Good',
      s5_3: 'Satisfactory',
      s5_2: 'Pass',
      s5_low: 'Below pass',
    }
    return {
      displayValue: headline,
      detailLabel: named[bandId] ?? null,
    }
  }

  if (format === 'scale10') {
    return { displayValue: headline, detailLabel: null }
  }

  const primary = headline.split(' / ')[0]?.trim() ?? headline
  return { displayValue: primary, detailLabel: null }
}
