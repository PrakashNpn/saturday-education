import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Region } from '../generated/client'
import { UNITED_KINGDOM, UK_UNIVERSITIES } from './seeds/uk'
import { AUSTRALIA, AUSTRALIA_UNIVERSITIES } from './seeds/australia'
import { UAE, UAE_UNIVERSITIES } from './seeds/uae'
import { NEW_ZEALAND, NZ_UNIVERSITIES } from './seeds/new-zealand'
import { SPAIN, SPAIN_UNIVERSITIES } from './seeds/spain'
import { GRENADA, GRENADA_UNIVERSITIES } from './seeds/grenada'
import { CANADA, CANADA_UNIVERSITIES } from './seeds/canada'
import { GERMANY, GERMANY_UNIVERSITIES } from './seeds/germany'
import { IRELAND, IRELAND_UNIVERSITIES } from './seeds/ireland'
import { MALAYSIA, MALAYSIA_UNIVERSITIES } from './seeds/malaysia'
import { SINGAPORE, SINGAPORE_UNIVERSITIES } from './seeds/singapore'
import { THAILAND, THAILAND_UNIVERSITIES } from './seeds/thailand'
import { SWITZERLAND, SWITZERLAND_UNIVERSITIES } from './seeds/switzerland'
import { NETHERLANDS, NETHERLANDS_UNIVERSITIES } from './seeds/netherlands'
import { USA_UNIVERSITIES } from './seeds/usa'

// Use pooler URL for seeding — DIRECT_URL may resolve IPv6-only
const seedUrl = (process.env.DATABASE_URL ?? process.env.DIRECT_URL!).replace('?pgbouncer=true', '')
const pool = new Pool({ connectionString: seedUrl })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })


const UNITED_STATES = {
  slug: 'united-states',
  name: 'United States of America',
  region: Region.AMERICAS,
  tagline: 'Land of Global Reach',
  shortDescription: "The world's most diverse higher education system with unmatched research investment.",
  overview: `Home to 4,000+ accredited institutions, the USA hosts more international students than any other country. Its research funding is unmatched, its campuses are culturally diverse, and programs from liberal arts colleges to Ivy League research universities offer unparalleled flexibility and career outcomes.`,
  cardImageUrl: null,
  heroImageUrl: null,
  institutionCount: '4,000+',
  tuitionFeeRange: '$35,000 – $65,000',
  postStudyWorkVisa: 'OPT – 12 months, extendable to 36 months for STEM graduates',
  internationalStudents: 1100000,
  visaProcessingTime: '3–8 weeks (varies by consulate)',
  workRights: '20 hrs/week on-campus during term. Post-study: OPT — 12 months, extendable to 36 months for STEM.',
  costOfLivingMinUSD: 12000,
  costOfLivingMaxUSD: 22000,
  currencyCode: 'USD',
  academicSpecialties: ['Computer Science', 'Business & MBA', 'Engineering', 'Medicine', 'Liberal Arts', 'Data Science'],
  isFeatured: true,
  advantages: [
    { title: 'Unmatched Academic Flexibility', description: 'Liberal arts philosophy lets you explore multiple disciplines before declaring a major. Change paths without starting over.', order: 1 },
    { title: 'Research & Innovation Powerhouse', description: '$75B+ in annual university research funding. MIT, Stanford, and Harvard lead global rankings across STEM fields.', order: 2 },
    { title: 'OPT & STEM Extension', description: 'Work in the US for up to 3 years after graduation in STEM fields — a direct pathway to US careers and H-1B sponsorship.', order: 3 },
  ],
  processSteps: [
    { stepNumber: 1, title: 'Standardized Tests', description: 'Take SAT/ACT (undergraduate) or GRE/GMAT (graduate), plus TOEFL/IELTS for English proficiency.' },
    { stepNumber: 2, title: 'Apply to Universities', description: 'Submit applications via Common App (undergraduate) or direct portals. Include essays, transcripts, and recommendations.' },
    { stepNumber: 3, title: 'Receive I-20', description: 'After acceptance and financial documentation, the university issues Form I-20, required for your F-1 visa application.' },
    { stepNumber: 4, title: 'F-1 Visa Interview', description: 'Pay SEVIS fee, schedule consulate interview, and travel up to 30 days before program start.' },
  ],
  faqs: [
    { question: 'What is OPT and how long can I stay in the US after graduating?', answer: 'Optional Practical Training (OPT) lets you work in a field related to your degree for 12 months after graduation. STEM graduates can apply for a 24-month extension, giving up to 3 years of US work experience.', order: 1 },
    { question: 'Do I need SAT/ACT for US university admission?', answer: 'Most US universities have adopted test-optional policies, but competitive institutions still give weight to strong scores. For graduate programs, GRE or GMAT scores are typically required.', order: 2 },
    { question: 'How expensive is it to study in the US?', answer: 'Tuition ranges from $35,000 to $65,000/year at private universities, though many offer generous need-based aid. Living costs vary from $12,000 (smaller cities) to $22,000+ (New York, San Francisco).', order: 3 },
    { question: 'Can I work off-campus during my F-1 visa?', answer: 'Off-campus work during the academic year is generally not permitted unless authorized through CPT or economic hardship. On-campus jobs up to 20 hours/week are allowed.', order: 4 },
  ],
}


// ─── STUB COUNTRIES (no universities yet) ────────────────────────────────────

const STUB_COUNTRIES = [
  { slug: 'vietnam',       name: 'Vietnam',                   region: Region.ASIA     },
  { slug: 'cambodia',      name: 'Cambodia',                  region: Region.ASIA     },
  { slug: 'china',         name: 'China',                     region: Region.ASIA     },


  { slug: 'hungary',       name: 'Hungary',                   region: Region.EUROPE   },
]

// ─── SEED HELPERS ─────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function seedCountry(data: any): Promise<string> {
  const { advantages, processSteps, faqs, ...countryFields } = data

  const country = await prisma.country.upsert({
    where: { slug: countryFields.slug },
    update: countryFields,
    create: countryFields,
    select: { id: true },
  })
  const id = country.id

  await prisma.countryAdvantage.deleteMany({ where: { countryId: id } })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await prisma.countryAdvantage.createMany({ data: advantages.map((a: any) => ({ ...a, countryId: id })) })

  await prisma.countryProcessStep.deleteMany({ where: { countryId: id } })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await prisma.countryProcessStep.createMany({ data: processSteps.map((s: any) => ({ ...s, countryId: id })) })

  await prisma.countryFAQ.deleteMany({ where: { countryId: id } })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await prisma.countryFAQ.createMany({ data: faqs.map((f: any) => ({ ...f, countryId: id })) })

  return id
}

async function seedCountryStub(data: { slug: string; name: string; region: Region }): Promise<void> {
  await prisma.country.upsert({
    where: { slug: data.slug },
    update: data,
    create: data,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function seedUniversity(data: any, countryId: string): Promise<void> {
  const { programs, admissionSteps, scholarships, ...uniFields } = data

  const uni = await prisma.university.upsert({
    where: { slug: uniFields.slug },
    update: { ...uniFields, countryId },
    create: { ...uniFields, countryId },
    select: { id: true },
  })
  const id = uni.id

  await prisma.program.deleteMany({ where: { universityId: id } })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await prisma.program.createMany({ data: programs.map((p: any) => ({ ...p, universityId: id })) })

  await prisma.admissionStep.deleteMany({ where: { universityId: id } })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await prisma.admissionStep.createMany({ data: admissionSteps.map((s: any) => ({ ...s, universityId: id })) })

  await prisma.scholarship.deleteMany({ where: { universityId: id } })
  if (scholarships.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await prisma.scholarship.createMany({ data: scholarships.map((s: any) => ({ ...s, universityId: id })) })
  }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Seeding database...')

  // United Kingdom
  const ukId = await seedCountry(UNITED_KINGDOM)
  for (const uni of UK_UNIVERSITIES) await seedUniversity(uni, ukId)
  console.log(`  ✓ United Kingdom + ${UK_UNIVERSITIES.length} universities`)

  // United States
  const usaId = await seedCountry(UNITED_STATES)
  for (const uni of USA_UNIVERSITIES) await seedUniversity(uni, usaId)
  console.log(`  ✓ United States + ${USA_UNIVERSITIES.length} universities`)

  // Australia
  const ausId = await seedCountry(AUSTRALIA)
  for (const uni of AUSTRALIA_UNIVERSITIES) await seedUniversity(uni, ausId)
  console.log(`  ✓ Australia + ${AUSTRALIA_UNIVERSITIES.length} universities`)

  // Germany
  const deId = await seedCountry(GERMANY)
  for (const uni of GERMANY_UNIVERSITIES) await seedUniversity(uni, deId)
  console.log(`  ✓ Germany + ${GERMANY_UNIVERSITIES.length} universities`)

  // Ireland
  const ieId = await seedCountry(IRELAND)
  for (const uni of IRELAND_UNIVERSITIES) await seedUniversity(uni, ieId)
  console.log(`  ✓ Ireland + ${IRELAND_UNIVERSITIES.length} universities`)

  // Malaysia
  const myId = await seedCountry(MALAYSIA)
  for (const uni of MALAYSIA_UNIVERSITIES) await seedUniversity(uni, myId)
  console.log(`  ✓ Malaysia + ${MALAYSIA_UNIVERSITIES.length} universities`)

  // Singapore
  const sgId = await seedCountry(SINGAPORE)
  for (const uni of SINGAPORE_UNIVERSITIES) await seedUniversity(uni, sgId)
  console.log(`  ✓ Singapore + ${SINGAPORE_UNIVERSITIES.length} universities`)

  // Thailand
  const thId = await seedCountry(THAILAND)
  for (const uni of THAILAND_UNIVERSITIES) await seedUniversity(uni, thId)
  console.log(`  ✓ Thailand + ${THAILAND_UNIVERSITIES.length} universities`)

  // Switzerland
  const chId = await seedCountry(SWITZERLAND)
  for (const uni of SWITZERLAND_UNIVERSITIES) await seedUniversity(uni, chId)
  console.log(`  ✓ Switzerland + ${SWITZERLAND_UNIVERSITIES.length} universities`)

  // Netherlands
  const nlId = await seedCountry(NETHERLANDS)
  for (const uni of NETHERLANDS_UNIVERSITIES) await seedUniversity(uni, nlId)
  console.log(`  ✓ Netherlands + ${NETHERLANDS_UNIVERSITIES.length} universities`)

  // UAE
  const aeId = await seedCountry(UAE)
  for (const uni of UAE_UNIVERSITIES) await seedUniversity(uni, aeId)
  console.log(`  ✓ UAE + ${UAE_UNIVERSITIES.length} universities`)

  // New Zealand
  const nzId = await seedCountry(NEW_ZEALAND)
  for (const uni of NZ_UNIVERSITIES) await seedUniversity(uni, nzId)
  console.log(`  ✓ New Zealand + ${NZ_UNIVERSITIES.length} universities`)

  // Spain
  const esId = await seedCountry(SPAIN)
  for (const uni of SPAIN_UNIVERSITIES) await seedUniversity(uni, esId)
  console.log(`  ✓ Spain + ${SPAIN_UNIVERSITIES.length} universities`)

  // Grenada
  const gdId = await seedCountry(GRENADA)
  for (const uni of GRENADA_UNIVERSITIES) await seedUniversity(uni, gdId)
  console.log(`  ✓ Grenada + ${GRENADA_UNIVERSITIES.length} universities`)

  // Canada
  const caId = await seedCountry(CANADA)
  for (const uni of CANADA_UNIVERSITIES) await seedUniversity(uni, caId)
  console.log(`  ✓ Canada + ${CANADA_UNIVERSITIES.length} universities`)

  // Stub countries — no universities yet, appear in finder filter
  for (const c of STUB_COUNTRIES) await seedCountryStub(c)
  console.log(`  ✓ ${STUB_COUNTRIES.length} stub countries (filter-only)`)

  console.log('\n✅ Seeded 15 countries + 4 stub countries')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
