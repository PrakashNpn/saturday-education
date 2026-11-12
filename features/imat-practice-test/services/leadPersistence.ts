import type { ImatLeadRecord, ImatSectionResult } from './leadSubmission'
import type { ImatNotification } from './leadNotification'

/** Save first, then queue one notification only for a newly inserted attempt. */
export async function saveImatLeadAndNotify(lead: ImatLeadRecord, sections: ImatSectionResult[], dependencies: {
  insert: (record: ImatLeadRecord) => Promise<boolean>
  exists: (attemptId: string) => Promise<boolean>
  schedule: (job: () => Promise<void>) => void
  notify: (notification: ImatNotification) => Promise<void>
  warn: () => void
}) {
  if (!await dependencies.insert(lead)) {
    if (!await dependencies.exists(lead.attempt_id)) throw new Error('IMAT lead could not be saved')
    return
  }
  try {
    dependencies.schedule(async () => {
      try { await dependencies.notify({ lead, sections }) }
      catch { dependencies.warn() }
    })
  } catch { dependencies.warn() }
}
