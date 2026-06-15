// Maps each RIASEC interest category to a human label, broad fields of study
// (used to query matching university programs), and example career directions
// (used in the templated counselor brief as a fallback alongside the AI synthesis).

import type { RiasecCategory } from './riasecQuestions'

export interface RiasecCategoryInfo {
  label: string
  blurb: string
  fields: string[]
  careers: string[]
}

export const RIASEC_INFO: Record<RiasecCategory, RiasecCategoryInfo> = {
  R: {
    label: 'Realistic (Doer)',
    blurb: 'Practical, hands-on, enjoys working with tools, machines, technology, or the outdoors.',
    fields: ['Engineering', 'Computer Science', 'Architecture', 'Agriculture', 'Information Technology'],
    careers: ['Engineer', 'IT/Network Specialist', 'Architect', 'Technician', 'Pilot'],
  },
  I: {
    label: 'Investigative (Thinker)',
    blurb: 'Analytical and curious, enjoys research, ideas, science, and solving complex problems.',
    fields: ['Computer Science', 'Data Science', 'Mathematics', 'Medicine', 'Engineering', 'Natural Sciences'],
    careers: ['Data Scientist', 'Doctor / Researcher', 'Software Engineer', 'Analyst', 'Scientist'],
  },
  A: {
    label: 'Artistic (Creator)',
    blurb: 'Imaginative and expressive, enjoys creating, designing, and original, unstructured work.',
    fields: ['Design', 'Architecture', 'Media & Communication', 'Fine Arts', 'Marketing'],
    careers: ['Designer', 'Architect', 'Content Creator', 'Marketer', 'Media Producer'],
  },
  S: {
    label: 'Social (Helper)',
    blurb: 'Warm and supportive, enjoys teaching, caring for, advising, and working closely with people.',
    fields: ['Education', 'Psychology', 'Nursing', 'Public Health', 'Social Sciences'],
    careers: ['Teacher', 'Psychologist / Counsellor', 'Nurse', 'Healthcare Manager', 'Social Worker'],
  },
  E: {
    label: 'Enterprising (Persuader)',
    blurb: 'Ambitious and persuasive, enjoys leading, selling, organising ventures, and taking charge.',
    fields: ['Business Administration', 'Management', 'Marketing', 'Economics', 'Law', 'Finance'],
    careers: ['Entrepreneur', 'Manager', 'Marketing Lead', 'Lawyer', 'Sales Director'],
  },
  C: {
    label: 'Conventional (Organiser)',
    blurb: 'Careful and orderly, enjoys structure, accuracy, and working systematically with data and records.',
    fields: ['Accounting', 'Finance', 'Business Administration', 'Information Systems', 'Economics'],
    careers: ['Accountant', 'Financial Analyst', 'Auditor', 'Operations Manager', 'Data Administrator'],
  },
}
