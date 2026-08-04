import { FileText, ExternalLink, Download } from 'lucide-react'
import type { ApplicationSummary } from '../services/applicationService'

interface Props {
  application: ApplicationSummary
}

// Internal admissions-team tool only (reached via the emailed link, never linked from the
// public site) — intentionally not localized, same as the rest of the /admin tooling.
export function ApplicationSummaryPage({ application }: Props) {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(application.createdAt)

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-10 lg:py-14">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-1">Application Summary</h1>
        <p className="text-sm text-gray-500 mb-8">Submitted {formattedDate}</p>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8 mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-4">Applicant Details</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Full Name</dt>
              <dd className="text-sm font-semibold text-neutral-900 mt-1">{application.fullName}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Email</dt>
              <dd className="text-sm font-semibold text-neutral-900 mt-1">{application.email}</dd>
            </div>
            {application.phone && (
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Phone</dt>
                <dd className="text-sm font-semibold text-neutral-900 mt-1">{application.phone}</dd>
              </div>
            )}
            {application.nationality && (
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Nationality</dt>
                <dd className="text-sm font-semibold text-neutral-900 mt-1">{application.nationality}</dd>
              </div>
            )}
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">University</dt>
              <dd className="text-sm font-semibold text-neutral-900 mt-1">{application.universityName}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Program</dt>
              <dd className="text-sm font-semibold text-neutral-900 mt-1">{application.programName}</dd>
            </div>
          </dl>

          {application.message && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">Message</p>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{application.message}</p>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-4">Documents</h2>
          {application.documents.length === 0 ? (
            <p className="text-sm text-gray-500">No documents uploaded.</p>
          ) : (
            <ul className="space-y-2">
              {application.documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-brand-purple flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-neutral-900 truncate">{doc.label}</p>
                      <p className="text-xs text-gray-400 truncate">{doc.fileName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {doc.url ? (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold text-brand-purple hover:underline"
                      >
                        View
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">Unavailable</span>
                    )}
                    {doc.downloadUrl && (
                      <a
                        href={doc.downloadUrl}
                        className="flex items-center gap-1 text-xs font-semibold text-brand-purple hover:underline"
                      >
                        Download
                        <Download className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
