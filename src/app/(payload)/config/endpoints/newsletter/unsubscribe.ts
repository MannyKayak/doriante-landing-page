import { PayloadRequest } from 'payload'

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
      return new Response('Missing email', { status: 400 })
    }

    // Cerca subscriber
    const existing = await req.payload.find({
      collection: 'newsletter-subscribers',
      where: { email: { equals: email } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await req.payload.update({
        collection: 'newsletter-subscribers',
        id: existing.docs[0].id,
        data: { status: 'unsubscribed' },
        overrideAccess: true, // importante: endpoint pubblico
      })
    }

    // Risposta "neutra" (non rivela se esiste o no)
    return new Response(`You have been unsubscribed.`, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  },
}
