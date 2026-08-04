import { Clock, MapPin, CalendarDays, Banknote, Receipt, ExternalLink, Check, ArrowRight, ArrowLeft, type LucideIcon } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { splitIntoBullets } from '@/shared/utils/text'

type ProgramDetail = {
  slug: string
  name: string
  field: string
  campus: string | null
  durationYears: number | null
  intakeMonths: string | null
  tuitionFeePerYear: string | null
  applicationFee: string | null
  entryRequirements: string | null
  learnMoreUrl: string | null
  description: string | null
  updatedAt: Date
  university: {
    name: string
    slug: string
    logoUrl: string | null
    country: { name: string }
  }
}

type Translations = {
  backTo: string
  lastUpdated: string
  officialPage: string
  sectionDetails: string
  sectionEntryRequirements: string
  sectionDescription: string
  duration: string
  campus: string
  intake: string
  tuitionFee: string
  appFee: string
  year: string
  years: string
  applyButton: string
}

interface Props {
  program: ProgramDetail
  translations: Translations
}

type Stat = { key: string; icon: LucideIcon; label: string; value: string }

function getStats(program: ProgramDetail, t: Translations): Stat[] {
  const stats: Stat[] = []
  if (program.durationYears) {
    stats.push({
      key: 'duration',
      icon: Clock,
      label: t.duration,
      value: `${program.durationYears} ${program.durationYears === 1 ? t.year : t.years}`,
    })
  }
  if (program.campus) {
    stats.push({ key: 'campus', icon: MapPin, label: t.campus, value: program.campus })
  }
  if (program.intakeMonths) {
    stats.push({ key: 'intake', icon: CalendarDays, label: t.intake, value: program.intakeMonths })
  }
  if (program.tuitionFeePerYear) {
    stats.push({ key: 'tuition', icon: Banknote, label: t.tuitionFee, value: program.tuitionFeePerYear })
  }
  if (program.applicationFee) {
    stats.push({ key: 'appFee', icon: Receipt, label: t.appFee, value: program.applicationFee })
  }
  return stats
}

function SectionHeader({ children }: { children: string }) {
  return (
    <div className="bg-brand-purple-50 px-6 md:px-8 py-2.5">
      <h2 className="text-xs font-bold uppercase tracking-wider text-brand-purple">{children}</h2>
    </div>
  )
}

export function ProgramDetailPage({ program, translations: t }: Props) {
  const requirementBullets = program.entryRequirements ? splitIntoBullets(program.entryRequirements) : []
  const stats = getStats(program, t)
  const initial = program.university.name.charAt(0).toUpperCase()
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(program.updatedAt)

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 lg:py-14">
        <Link
          href={`/universities/${program.university.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-brand-purple hover:underline mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t.backTo} {program.university.name}
        </Link>

        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10 items-start">
          {/* University mini-card + Apply CTA — sticky on desktop */}
          <div className="lg:sticky lg:top-24 mb-8 lg:mb-0">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="w-28 h-28 rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center mb-3">
                {program.university.logoUrl ? (
                  <img
                    src={program.university.logoUrl}
                    alt={`${program.university.name} logo`}
                    className="w-full h-full object-contain p-2.5"
                  />
                ) : (
                  <span className="text-brand-purple font-black text-3xl select-none">{initial}</span>
                )}
              </div>
              <p className="font-semibold text-sm text-neutral-900">{program.university.name}</p>
              <p className="text-xs text-gray-500 mt-1">{program.university.country.name}</p>
            </div>

            <Link
              href={`/apply/${program.university.slug}/${program.slug}`}
              className="mt-4 flex items-center justify-center gap-1.5 w-full py-3 rounded-lg bg-brand-purple text-white text-sm font-semibold hover:bg-brand-purple-dark transition-colors"
            >
              {t.applyButton}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Main content */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="inline-block text-[10px] uppercase tracking-wider text-brand-purple bg-brand-purple-50 px-2 py-0.5 rounded-full font-semibold mb-2">
                    {program.field}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">{program.name}</h1>
                  {program.learnMoreUrl && (
                    <a
                      href={program.learnMoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 mt-2"
                    >
                      {t.officialPage}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                  {t.lastUpdated} {formattedDate}
                </span>
              </div>
            </div>

            {/* Program Details */}
            {stats.length > 0 && (
              <div className="border-b border-gray-100">
                <SectionHeader>{t.sectionDetails}</SectionHeader>
                <div className="p-6 md:p-8">
                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5">
                    {stats.map((stat, i) => {
                      const Icon = stat.icon
                      const isOdd = stats.length % 2 === 1 && i === stats.length - 1
                      return (
                        <div key={stat.key} className={isOdd ? 'col-span-2 sm:col-span-1' : undefined}>
                          <dt className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                            <Icon className="w-3 h-3" />
                            {stat.label}
                          </dt>
                          <dd className="text-sm font-semibold text-neutral-900 mt-1">{stat.value}</dd>
                        </div>
                      )
                    })}
                  </dl>
                </div>
              </div>
            )}

            {/* Entry Requirements */}
            {requirementBullets.length > 0 && (
              <div className="border-b border-gray-100">
                <SectionHeader>{t.sectionEntryRequirements}</SectionHeader>
                <div className="p-6 md:p-8">
                  <ul className="space-y-2">
                    {requirementBullets.map((requirement) => (
                      <li key={requirement} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                        <Check className="w-4 h-4 text-brand-purple-light flex-shrink-0 mt-0.5" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Description */}
            {program.description && (
              <div>
                <SectionHeader>{t.sectionDescription}</SectionHeader>
                <div className="p-6 md:p-8">
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{program.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
