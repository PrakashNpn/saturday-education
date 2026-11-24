/** English counsellor-facing summary of a grade-converter run (email / CRM message). */

export type GradeLeadSummaryInput = {
  originLabel: string
  targetLabel: string
  qualificationLabel: string
  studyLevelLabel: string
  subjectLabel: string
  scaleLabel: string
  submittedGrade: string
  sourceBandLabel: string
  estimateDisplay: string
  estimateDetail: string | null
  destinationScaleLabel: string
  /** Optional linear reference line, e.g. "~80% · ~3.2/4.0 · ~4.0/5.0". */
  instantReference?: string | null
}

export function buildGradeLeadSummary(input: GradeLeadSummaryInput): string {
  const estimateLine = input.estimateDetail
    ? `${input.estimateDisplay} (${input.estimateDetail})`
    : input.estimateDisplay

  const lines = [
    '[Via Grade Converter]',
    `Country of study: ${input.originLabel}`,
    `Target country: ${input.targetLabel}`,
    `Qualification: ${input.qualificationLabel}`,
    `Study level: ${input.studyLevelLabel}`,
    `Subject: ${input.subjectLabel}`,
    `Grading system: ${input.scaleLabel}`,
    `Reported grade: ${input.submittedGrade} (${input.sourceBandLabel})`,
  ]
  if (input.instantReference) {
    lines.push(`Quick conversion: ${input.instantReference}`)
  }
  lines.push(
    `Destination estimate: ${estimateLine}`,
    `Destination scale: ${input.destinationScaleLabel}`,
  )
  return lines.join('\n')
}
