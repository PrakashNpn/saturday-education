'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { CheckCircle2, ArrowLeft, FileText, X, Plus } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { DocumentRequirement } from '../constants/documentDefaults'

interface Props {
  universitySlug: string
  programSlug: string
  programName: string
  universityName: string
  documents: DocumentRequirement[]
}

interface FileEntry {
  id: string
  file: File
  documentKey: string
}

const inputCls =
  'w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple transition-colors'

const labelCls = 'text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 block'

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function ApplyForm({ universitySlug, programSlug, programName, universityName, documents }: Props) {
  const t = useTranslations('application')
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fileEntries, setFileEntries] = useState<FileEntry[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = Array.from(e.target.files ?? [])
    setFileEntries((prev) => [
      ...prev,
      ...newFiles.map((file) => ({ id: crypto.randomUUID(), file, documentKey: '' })),
    ])
    e.target.value = ''
  }

  function updateDocumentKey(id: string, documentKey: string) {
    setFileEntries((prev) => prev.map((entry) => (entry.id === id ? { ...entry, documentKey } : entry)))
  }

  function removeEntry(id: string) {
    setFileEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const form = formRef.current
    if (!form) return

    const fullName = (form.elements.namedItem('fullName') as HTMLInputElement)?.value ?? ''
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value ?? ''

    if (!fullName.trim()) {
      setError(t('errorName'))
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError(t('errorEmail'))
      return
    }
    if (fileEntries.some((entry) => !entry.documentKey)) {
      setError(t('errorUntagged'))
      return
    }
    const missingRequired = documents.filter(
      (doc) => doc.required && !fileEntries.some((entry) => entry.documentKey === doc.key)
    )
    if (missingRequired.length > 0) {
      setError(`${t('errorMissingRequired')} ${missingRequired.map((doc) => t(doc.labelKey)).join(', ')}`)
      return
    }
    if (!consent) {
      setError(t('errorConsent'))
      return
    }

    const formData = new FormData(form)
    formData.set('universitySlug', universitySlug)
    formData.set('programSlug', programSlug)
    formData.set('consent', 'true')
    for (const entry of fileEntries) {
      formData.append(`document:${entry.documentKey}`, entry.file)
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/apply', { method: 'POST', body: formData })
      const result = await res.json()
      if (result.success) {
        setSubmitted(true)
        form.reset()
        setConsent(false)
        setFileEntries([])
      } else {
        setError(result.error ?? t('errorGeneric'))
      }
    } catch {
      setError(t('errorGeneric'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-10 lg:py-14">
        <Link
          href={`/universities/${universitySlug}/programs/${programSlug}`}
          className="inline-flex items-center gap-1.5 text-sm text-brand-purple hover:underline mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t('backToProgram')}
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-1">{t('heading')}</h1>
        <p className="text-sm text-gray-500 mb-8">
          {programName} · {universityName}
        </p>

        {submitted ? (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 md:p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-dark flex items-center justify-center mb-5 mx-auto">
              <CheckCircle2 size={30} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('successTitle')}</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">{t('successSubtitle')}</p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8"
          >
            {/* Your details */}
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-4">
              {t('sectionYourDetails')}
            </h2>

            <div className="mb-5">
              <label className={labelCls}>{t('fullNameLabel')}</label>
              <input type="text" name="fullName" placeholder={t('fullNamePlaceholder')} className={inputCls} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelCls}>{t('emailLabel')}</label>
                <input type="email" name="email" placeholder={t('emailPlaceholder')} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{t('phoneLabel')}</label>
                <input type="tel" name="phone" placeholder={t('phonePlaceholder')} className={inputCls} />
              </div>
            </div>

            <div className="mb-5">
              <label className={labelCls}>{t('nationalityLabel')}</label>
              <input type="text" name="nationality" placeholder={t('nationalityPlaceholder')} className={inputCls} />
            </div>

            <div className="mb-8">
              <label className={labelCls}>{t('messageLabel')}</label>
              <textarea
                name="message"
                placeholder={t('messagePlaceholder')}
                className={`${inputCls} min-h-[100px] resize-none`}
              />
            </div>

            {/* Documents */}
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-1 pt-6 border-t border-gray-100">
              {t('sectionDocuments')}
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              {t('documentsHint')}{' '}
              {documents
                .filter((doc) => doc.required)
                .map((doc) => t(doc.labelKey))
                .join(', ')}
            </p>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={handleFilesSelected}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 mb-4 py-2 px-4 rounded-lg bg-brand-purple-50 text-xs font-semibold text-brand-purple hover:bg-brand-purple-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              {t('addFiles')}
            </button>

            {fileEntries.length > 0 && (
              <ul className="space-y-2 mb-8">
                {fileEntries.map((entry) => (
                  <li
                    key={entry.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <FileText className="w-4 h-4 text-brand-purple flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-neutral-900 truncate">{entry.file.name}</p>
                      <p className="text-[10px] text-gray-400">{formatFileSize(entry.file.size)}</p>
                    </div>
                    <select
                      value={entry.documentKey}
                      onChange={(e) => updateDocumentKey(entry.id, e.target.value)}
                      className="text-xs rounded-lg border border-gray-200 bg-white py-1.5 px-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple flex-shrink-0"
                    >
                      <option value="">{t('selectDocumentType')}</option>
                      {documents.map((doc) => (
                        <option key={doc.key} value={doc.key}>
                          {t(doc.labelKey)}
                          {doc.required ? ` (${t('requiredBadge')})` : ''}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeEntry(entry.id)}
                      className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                      aria-label={t('removeFile')}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {fileEntries.length === 0 && <p className="text-xs text-gray-400 mb-8">{t('noFilesYet')}</p>}

            {/* Consent */}
            <label className="flex items-start gap-2.5 mb-6 text-xs text-gray-500 leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-brand-purple flex-shrink-0"
              />
              <span>
                {t.rich('consentLabel', {
                  link: (chunks) => (
                    <Link href="/privacy" target="_blank" className="text-brand-purple hover:underline">
                      {chunks}
                    </Link>
                  ),
                })}
              </span>
            </label>

            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white font-bold py-4 rounded-full text-base transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('submitting') : t('submitButton')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
