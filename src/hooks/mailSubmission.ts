import type { CollectionAfterChangeHook } from 'payload'

export const mailSubmissionHook: CollectionAfterChangeHook = async ({ doc, req, operation }) => {
  if (operation !== 'create') return

  const submissionData = (doc as any)?.submissionData

  // Form Builder => submissionData: Array<{ field, value }>
  if (!Array.isArray(submissionData)) return

  const emailEntry = submissionData.find((item: any) => item?.field === 'email')
  const email = String(emailEntry?.value || '')
    .trim()
    .toLowerCase()
  if (!email) return

  const existing = await req.payload.find({
    collection: 'newsletter-subscribers',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    await req.payload.update({
      collection: 'newsletter-subscribers',
      id: existing.docs[0].id,
      data: { status: 'subscribed' },
    })
  } else {
    await req.payload.create({
      collection: 'newsletter-subscribers',
      data: { email, status: 'subscribed' },
    })
  }
}
