// Indicative performance bands from a percent-correct score (0–100). Threshold
// labels for a short, non-normed test — not population percentiles.

export type AptitudeBandLabel = 'Strong' | 'Proficient' | 'Developing' | 'Emerging'

export interface AptitudeBand {
  label: AptitudeBandLabel
  color: string // bar fill on the dashboard / email
}

export function aptitudeBandFor(percent: number): AptitudeBand {
  if (percent >= 80) return { label: 'Strong', color: '#590D82' }
  if (percent >= 60) return { label: 'Proficient', color: '#7B1FA2' }
  if (percent >= 40) return { label: 'Developing', color: '#9D5BB8' }
  return { label: 'Emerging', color: '#C9A8DD' }
}
