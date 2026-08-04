export interface DocumentRequirement {
  key: string
  label: string
  labelKey: string
  required: boolean
}

const PASSPORT: DocumentRequirement = { key: 'passport', label: 'Passport copy', labelKey: 'documentPassport', required: true }
const ENGLISH_TEST: DocumentRequirement = { key: 'englishTest', label: 'English test score', labelKey: 'documentEnglishTest', required: false }
const PERSONAL_STATEMENT: DocumentRequirement = { key: 'personalStatement', label: 'Personal statement', labelKey: 'documentPersonalStatement', required: false }
const CV: DocumentRequirement = { key: 'cv', label: 'CV / resume', labelKey: 'documentCv', required: false }
const REFERENCE_LETTER: DocumentRequirement = { key: 'referenceLetter', label: 'Reference letter', labelKey: 'documentReferenceLetter', required: false }

export const SUPPORTING_DOCUMENT: DocumentRequirement = {
  key: 'supporting',
  label: 'Other supporting documents',
  labelKey: 'documentSupporting',
  required: false,
}

const FOUNDATION_LEVEL: DocumentRequirement[] = [
  PASSPORT,
  { key: 'transcript', label: 'Academic transcript', labelKey: 'documentAcademicTranscript', required: true },
  ENGLISH_TEST,
]

const UNDERGRAD_LEVEL: DocumentRequirement[] = [
  PASSPORT,
  { key: 'transcript', label: 'High school transcript / certificate', labelKey: 'documentHighSchoolTranscript', required: true },
  ENGLISH_TEST,
  PERSONAL_STATEMENT,
]

const MASTER_LEVEL: DocumentRequirement[] = [
  PASSPORT,
  { key: 'transcript', label: "Bachelor's degree transcript", labelKey: 'documentBachelorTranscript', required: true },
  ENGLISH_TEST,
  CV,
  PERSONAL_STATEMENT,
  REFERENCE_LETTER,
]

const PHD_LEVEL: DocumentRequirement[] = [
  PASSPORT,
  { key: 'transcript', label: 'Prior degree transcript', labelKey: 'documentPriorDegreeTranscript', required: true },
  { ...CV, required: true },
  { key: 'researchProposal', label: 'Research proposal', labelKey: 'documentResearchProposal', required: true },
  ENGLISH_TEST,
  REFERENCE_LETTER,
]

export const DEFAULT_DOCUMENTS_BY_DEGREE: Record<string, DocumentRequirement[]> = {
  FOUNDATION: FOUNDATION_LEVEL,
  CERTIFICATE: FOUNDATION_LEVEL,
  DIPLOMA: UNDERGRAD_LEVEL,
  ASSOCIATE: UNDERGRAD_LEVEL,
  BACHELOR: UNDERGRAD_LEVEL,
  MASTER: MASTER_LEVEL,
  PHD: PHD_LEVEL,
}

export function getDefaultDocuments(degreeLevel: string): DocumentRequirement[] {
  return DEFAULT_DOCUMENTS_BY_DEGREE[degreeLevel] ?? UNDERGRAD_LEVEL
}
