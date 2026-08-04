import * as z from 'zod'
import { prisma } from '@/shared/lib/db/prisma'
import { resend } from '@/shared/lib/email'
import { supabaseAdmin, APPLICATIONS_BUCKET, createSignedUrl } from '@/shared/lib/supabase'
import { slugify } from '@/shared/utils/text'
import { getDefaultDocuments, SUPPORTING_DOCUMENT, type DocumentRequirement } from '../constants/documentDefaults'

const NOTIFICATION_EMAIL = process.env.CONSULTATION_NOTIFICATION_EMAIL ?? 'saturdayeducationconsulting@gmail.com'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://saturdayeducation.com'

const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_FILE_COUNT = 8
// Short-lived — the summary page regenerates fresh signed URLs on every view, so links never go stale.
const SIGNED_URL_EXPIRY_SECONDS = 60 * 60

const ApplicantSchema = z.object({
  fullName: z.string().trim().min(1, 'Please enter your full name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  phone: z.string().trim().optional(),
  nationality: z.string().trim().optional(),
  message: z.string().trim().optional(),
})

/** Program's own `requiredDocuments` override if set, otherwise the default checklist for its degree level. */
export function resolveRequiredDocuments(program: {
  degreeLevel: string
  requiredDocuments: unknown
}): DocumentRequirement[] {
  const override = Array.isArray(program.requiredDocuments)
    ? (program.requiredDocuments as DocumentRequirement[])
    : null
  const base = override ?? getDefaultDocuments(program.degreeLevel)
  return [...base, SUPPORTING_DOCUMENT]
}

export async function getProgramForApply(universitySlug: string, programSlug: string) {
  const program = await prisma.program.findFirst({
    where: { slug: programSlug, university: { slug: universitySlug, isPublished: true } },
    select: {
      id: true,
      name: true,
      degreeLevel: true,
      requiredDocuments: true,
      university: { select: { name: true, slug: true } },
    },
  })

  if (!program) return null

  return {
    id: program.id,
    name: program.name,
    universityName: program.university.name,
    universitySlug: program.university.slug,
    documents: resolveRequiredDocuments(program),
  }
}

interface SubmitApplicationResult {
  success: boolean
  error?: string
}

export async function submitApplication(formData: FormData): Promise<SubmitApplicationResult> {
  const universitySlug = String(formData.get('universitySlug') ?? '')
  const programSlug = String(formData.get('programSlug') ?? '')

  if (!universitySlug || !programSlug) {
    return { success: false, error: 'Missing program reference.' }
  }

  const program = await prisma.program.findFirst({
    where: { slug: programSlug, university: { slug: universitySlug, isPublished: true } },
    select: {
      id: true,
      name: true,
      degreeLevel: true,
      requiredDocuments: true,
      university: { select: { name: true } },
    },
  })

  if (!program) {
    return { success: false, error: 'This program could not be found.' }
  }

  const parsed = ApplicantSchema.safeParse({
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
    nationality: formData.get('nationality') || undefined,
    message: formData.get('message') || undefined,
  })

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Please check your details.' }
  }

  if (formData.get('consent') !== 'true') {
    return { success: false, error: 'Please confirm you consent to us storing and processing your documents.' }
  }

  const documents = resolveRequiredDocuments(program)
  const fileEntries: { doc: DocumentRequirement; file: File }[] = []
  let totalFileCount = 0

  for (const doc of documents) {
    const files = formData
      .getAll(`document:${doc.key}`)
      .filter((value): value is File => value instanceof File && value.size > 0)

    if (doc.required && files.length === 0) {
      return { success: false, error: `Please upload your ${doc.label.toLowerCase()}.` }
    }

    for (const file of files) {
      totalFileCount += 1
      if (totalFileCount > MAX_FILE_COUNT) {
        return { success: false, error: 'Too many files uploaded (maximum 8).' }
      }
      if (file.size > MAX_FILE_SIZE) {
        return { success: false, error: `${file.name} is too large (10MB max).` }
      }
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return { success: false, error: `${file.name} must be a PDF, JPG, PNG, or WEBP file.` }
      }
      fileEntries.push({ doc, file })
    }
  }

  try {
    const application = await prisma.application.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        nationality: parsed.data.nationality || null,
        message: parsed.data.message || null,
        programId: program.id,
        programName: program.name,
        universityName: program.university.name,
      },
    })

    // Human-readable but still unique — a name alone risks two applicants colliding,
    // and non-Latin names (Thai, Burmese, etc.) can slugify to nothing.
    const folderName = `${slugify(parsed.data.fullName) || 'applicant'}-${application.id.slice(-8)}`

    for (const { doc, file } of fileEntries) {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin'
      // No leading "applications/" — the bucket itself is already named that, and the earlier
      // code had it doubled (bucket "applications" + path "applications/<id>/...").
      const path = `${folderName}/${doc.key}-${Date.now()}.${ext}`
      const buffer = new Uint8Array(await file.arrayBuffer())

      const { error: uploadError } = await supabaseAdmin.storage
        .from(APPLICATIONS_BUCKET)
        .upload(path, buffer, { contentType: file.type })

      if (uploadError) {
        console.error('Application document upload error:', uploadError)
        continue
      }

      await prisma.applicationDocument.create({
        data: {
          applicationId: application.id,
          documentKey: doc.key,
          label: doc.label,
          fileName: file.name,
          storagePath: path,
          mimeType: file.type,
          fileSize: file.size,
        },
      })
    }

    await sendNotificationEmail({
      applicationId: application.id,
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      nationality: parsed.data.nationality,
      message: parsed.data.message,
      programName: program.name,
      universityName: program.university.name,
    })

    return { success: true }
  } catch (error) {
    console.error('Application submission error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}

interface NotificationData {
  applicationId: string
  fullName: string
  email: string
  phone?: string
  nationality?: string
  message?: string
  programName: string
  universityName: string
}

async function sendNotificationEmail(data: NotificationData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set — skipping application notification email.')
    return
  }

  const summaryUrl = `${SITE_URL}/applications/${data.applicationId}`

  try {
    await resend.emails.send({
      from: 'Saturday Education <consultations@saturdayeducation.com>',
      to: NOTIFICATION_EMAIL,
      replyTo: data.email,
      subject: `New Application — ${data.fullName} · ${data.programName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #590D82;">New Program Application</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #6b7280;">Full Name</td><td style="padding: 8px 0; font-weight: 600;">${data.fullName}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0; font-weight: 600;">${data.email}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; font-weight: 600;">${data.phone || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Nationality</td><td style="padding: 8px 0; font-weight: 600;">${data.nationality || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">University</td><td style="padding: 8px 0; font-weight: 600;">${data.universityName}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Program</td><td style="padding: 8px 0; font-weight: 600;">${data.programName}</td></tr>
          </table>
          ${
            data.message
              ? `<p style="color: #6b7280; margin-top: 16px; margin-bottom: 4px;">Message</p>
                 <p style="white-space: pre-wrap; background: #f9fafb; border-radius: 8px; padding: 12px; font-size: 14px;">${data.message}</p>`
              : ''
          }
          <div style="margin-top: 24px;">
            <a href="${summaryUrl}" style="display: inline-block; background: #590D82; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-weight: 600; font-size: 14px;">
              View Application &amp; Documents
            </a>
          </div>
        </div>
      `,
    })
  } catch (error) {
    console.error('Application notification email error:', error)
  }
}

export interface ApplicationSummary {
  id: string
  fullName: string
  email: string
  phone: string | null
  nationality: string | null
  message: string | null
  programName: string
  universityName: string
  createdAt: Date
  documents: { id: string; label: string; fileName: string; url: string | null; downloadUrl: string | null }[]
}

/** Fetches an application and generates fresh signed document URLs at call time — never stale. */
export async function getApplicationSummary(id: string): Promise<ApplicationSummary | null> {
  const application = await prisma.application.findUnique({
    where: { id },
    include: { documents: { orderBy: { createdAt: 'asc' } } },
  })

  if (!application) return null

  const documents = await Promise.all(
    application.documents.map(async (doc) => ({
      id: doc.id,
      label: doc.label,
      fileName: doc.fileName,
      url: await createSignedUrl(doc.storagePath, SIGNED_URL_EXPIRY_SECONDS),
      downloadUrl: await createSignedUrl(doc.storagePath, SIGNED_URL_EXPIRY_SECONDS, { download: doc.fileName }),
    }))
  )

  return {
    id: application.id,
    fullName: application.fullName,
    email: application.email,
    phone: application.phone,
    nationality: application.nationality,
    message: application.message,
    programName: application.programName,
    universityName: application.universityName,
    createdAt: application.createdAt,
    documents,
  }
}
