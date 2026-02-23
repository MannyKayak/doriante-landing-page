import { PayloadRequest } from 'payload'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const unsubscribeNewsletterEndpoint = {
  path: '/newsletter/unsubscribe',
  method: 'get' as const,
  handler: async (req: PayloadRequest) => {
    // Legge ?email=...
    const rawUrl = req?.url || ''
    const baseUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:3000'
    const url = new URL(rawUrl, baseUrl)

    const email = (url.searchParams.get('email') || '').trim().toLowerCase()

    if (!email) {
      return Response.json({ message: 'Missing email' }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email)) {
      return Response.json({ message: 'Invalid email format' }, { status: 400 })
    }

    const existing = await req.payload.find({
      collection: 'newsletter-subscribers',
      where: { email: { equals: email } },
      overrideAccess: true,
      limit: 1,
    })

    if (existing.docs.length === 0) {
      return Response.json({ message: 'Subscriber not found', synced: false }, { status: 404 })
    }

    const subscriber = existing.docs[0] as {
      id: number | string
      status?: 'subscribed' | 'unsubscribed'
      lastMailchimpSyncStatus?: 'success' | 'error' | 'skipped'
      mailchimpSyncError?: string | null
    }

    if (subscriber.status !== 'unsubscribed') {
      await req.payload.update({
        collection: 'newsletter-subscribers',
        id: subscriber.id,
        data: { status: 'unsubscribed' },
        overrideAccess: true,
      })
    }

    const refreshed = (await req.payload.findByID({
      collection: 'newsletter-subscribers',
      id: subscriber.id,
      overrideAccess: true,
    })) as {
      lastMailchimpSyncStatus?: 'success' | 'error' | 'skipped'
      mailchimpSyncError?: string | null
    }

    const synced = refreshed.lastMailchimpSyncStatus === 'success'

    return Response.json({
      message: synced
        ? 'You have been unsubscribed.'
        : 'You have been unsubscribed locally. Mailchimp sync failed or skipped.',
      synced,
      syncError: synced ? null : refreshed.mailchimpSyncError || null,
    })
  },
}
