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
}

export function buildGradeLeadSummary(input: GradeLeadSummaryInput): string {
  const estimateLine = input.estimateDetail
    ? `${input.estimateDisplay} (${input.estimateDetail})`
    : input.estimateDisplay

  return [
    '[Via Grade Converter]',
    `Country of study: ${input.originLabel}`,
    `Target country: ${input.targetLabel}`,
    `Qualification: ${input.qualificationLabel}`,
    `Study level: ${input.studyLevelLabel}`,
    `Subject: ${input.subjectLabel}`,
    `Grading system: ${input.scaleLabel}`,
    `Reported grade: ${input.submittedGrade} (${input.sourceBandLabel})`,
    `Estimated equivalent: ${estimateLine}`,
    `Destination scale: ${input.destinationScaleLabel}`,
  ].join('\n')
}
