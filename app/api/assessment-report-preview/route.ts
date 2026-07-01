// DEV-ONLY: renders the counsellor PDF report with sample data so we can review the
// layout in the browser without running a full submit + email. 404 in production.

import { buildAssessmentPdf } from '@/features/career-assessment/services/pdf/ReportDocument'
import type { AssessmentScores, ContactDetails, CounselorSynthesis, RecommendationTree } from '@/features/career-assessment/types'

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Not found', { status: 404 })
  }

  const contact: ContactDetails = {
    fullName: 'Sample Student',
    email: 'sample.student@example.com',
    phone: '+95 9 123 456 789',
    educationLevel: 'Undergraduate',
    preferredCountry: 'Germany',
  }

  const scores: AssessmentScores = {
    riasec: {
      scores: { R: 38, I: 44, A: 30, S: 28, E: 41, C: 35 },
      ranked: ['I', 'E', 'R', 'C', 'A', 'S'],
      hollandCode: 'IER',
    },
    bigFive: {
      raw: { O: 40, C: 38, E: 42, A: 30, N: 33 },
      percent: { O: 75, C: 70, E: 80, A: 50, N: 58 },
      percentile: { O: 78, C: 64, E: 82, A: 28, N: 72 },
    },
    aptitude: {
      areas: [
        { area: 'numerical', label: 'Numerical reasoning', correct: 8, total: 10, percent: 80, band: 'Strong' },
        { area: 'verbal', label: 'Verbal reasoning', correct: 6, total: 10, percent: 60, band: 'Proficient' },
        { area: 'logical', label: 'Logical reasoning', correct: 7, total: 10, percent: 70, band: 'Proficient' },
        { area: 'spatial', label: 'Spatial reasoning', correct: 4, total: 10, percent: 40, band: 'Developing' },
      ],
      overallCorrect: 25,
      overallTotal: 40,
      overallPercent: 63,
      overallBand: 'Proficient',
      strengthAreas: ['numerical'],
      directions: [
        { area: 'numerical', label: 'Numerical reasoning', fields: ['Engineering', 'Computer Science', 'Finance & Economics', 'Data Science'] },
      ],
    },
  }

  const tree: RecommendationTree = {
    fields: ['Computer Science & IT', 'Finance & Economics'],
    buckets: [
      {
        bucket: 'Computer Science & IT',
        moreCountries: 1,
        countries: [
          {
            country: 'Germany',
            preferred: true,
            strongFit: true,
            moreCount: 2,
            bestRank: 50,
            universities: [
              { name: 'Technical University of Munich', program: 'BSc Computer Science', degreeLevel: "Bachelor's", ranking: 50 },
              { name: 'RWTH Aachen', program: 'BSc Informatics', degreeLevel: "Bachelor's", ranking: 100 },
            ],
          },
          {
            country: 'Ireland',
            preferred: false,
            strongFit: false,
            moreCount: 0,
            bestRank: 120,
            universities: [{ name: 'University College Dublin', program: 'BSc Computer Science', degreeLevel: "Bachelor's", ranking: 120 }],
          },
        ],
      },
      {
        bucket: 'Finance & Economics',
        moreCountries: 0,
        countries: [
          {
            country: 'Canada',
            preferred: false,
            strongFit: true,
            moreCount: 1,
            bestRank: 30,
            universities: [{ name: 'University of Toronto', program: 'BCom Finance', degreeLevel: "Bachelor's", ranking: 30 }],
          },
        ],
      },
    ],
  }

  const synthesis: CounselorSynthesis = {
    read: 'A curious, analytical profile with a strong enterprising streak; they enjoy investigating problems and also leading and persuading. High extraversion points to team-facing, applied roles over solitary research, and their numerical strength supports technical or quantitative fields.',
    careerDirections: [
      { title: 'Data / Business Analyst', why: 'Combines their investigative interest with strong numerical reasoning.' },
      { title: 'Software Engineering', why: 'Fits the investigative + realistic interests and logical aptitude.' },
      { title: 'Fintech / Product', why: 'Blends enterprising drive with analytical skill.' },
    ],
    suggestedFields: ['Computer Science', 'Data Science', 'Finance & Economics'],
    careerPaths: [
      { title: 'Data / Business Analytics', roles: 'Data Analyst, Business Analyst, BI Analyst', psychFit: 90, skillsFit: 86 },
      { title: 'Software Engineering', roles: 'Software Engineer, Backend Developer', psychFit: 88, skillsFit: 84 },
      { title: 'Fintech & Product', roles: 'Product Analyst, Fintech Associate', psychFit: 85, skillsFit: 80 },
      { title: 'Financial Analysis', roles: 'Financial Analyst, Investment Analyst', psychFit: 82, skillsFit: 78 },
      { title: 'Engineering (Computing)', roles: 'Systems Engineer, ML Engineer', psychFit: 80, skillsFit: 83 },
    ],
  }

  const pdf = await buildAssessmentPdf({ contact, scores, synthesis, tree })

  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="assessment-report-preview.pdf"',
    },
  })
}
