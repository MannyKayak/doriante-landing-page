import type { CollectionAfterChangeHook } from 'payload'

import { setMemberUnsubscribed, upsertMemberSubscribed } from '@/lib/mailchimp'

type SubscriberStatus = 'subscribed' | 'unsubscribed'

export const newsletterSubscriberMailchimpSyncHook: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
  context,
}) => {
  if (context?.skipMailchimpSync) return doc
  if (operation !== 'create' && operation !== 'update') return doc

  const nextStatus = (doc as { status?: SubscriberStatus })?.status
  const previousStatus = (previousDoc as { status?: SubscriberStatus } | null)?.status
  const email = String((doc as { email?: string })?.email || '')
    .trim()
    .toLowerCase()

  if (!email || !nextStatus) return doc
  if (operation === 'update' && previousStatus === nextStatus) return doc

  let trackingData: {
    lastMailchimpSyncStatus: 'success' | 'error' | 'skipped'
    lastMailchimpSyncAt: string
    mailchimpSyncError: string | null
  } | null = null

  try {
    const result =
      nextStatus === 'subscribed'
        ? await upsertMemberSubscribed(email)
        : await setMemberUnsubscribed(email)

    trackingData = {
      lastMailchimpSyncStatus: result.ok ? 'success' : result.skipped ? 'skipped' : 'error',
      lastMailchimpSyncAt: new Date().toISOString(),
      mailchimpSyncError: result.ok || result.skipped ? null : result.message,
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown Mailchimp sync error'

    console.error('[mailchimp] unexpected sync error', {
      action: nextStatus,
      email,
      error: errorMessage,
    })

    trackingData = {
      lastMailchimpSyncStatus: 'error',
      lastMailchimpSyncAt: new Date().toISOString(),
      mailchimpSyncError: errorMessage,
    }
  }

  if (!trackingData) return doc

  try {
    await req.payload.update({
      collection: 'newsletter-subscribers',
      id: (doc as { id: number | string }).id,
      data: trackingData,
      overrideAccess: true,
      context: {
        ...(context || {}),
        skipMailchimpSync: true,
      },
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown tracking update error'
    console.error('[mailchimp] failed to persist sync tracking', {
      email,
      error: errorMessage,
    })
  }

  return doc
}

