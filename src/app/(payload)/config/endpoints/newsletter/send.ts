import type { PayloadRequest } from 'payload'

export const sendNewsletterEndpoint = {
  path: '/newsletter/send',
  method: 'post' as const,

  handler: async (req: PayloadRequest) => {
    console.log(req)
    // --- AUTH
    if (!req.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // --- BODY PARSE (robusto)
    const body = (await (async () => {
      const maybeJson = req?.json
      if (typeof maybeJson === 'function') {
        try {
          return await maybeJson.call(req)
        } catch {
          return {}
        }
      }
      return req?.body ?? {}
    })()) as { subject?: string; html?: string }

    const subject = body.subject?.trim()
    const html = body.html

    if (!subject || !html) {
      return new Response(JSON.stringify({ error: 'subject and html are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // --- RECIPIENTS
    const result = await req.payload.find({
      collection: 'newsletter-subscribers',
      where: { status: { equals: 'subscribed' } },
      limit: 1000,
    })

    const recipients = result.docs.map((d) => d.email).filter(Boolean)

    if (recipients.length === 0) {
      return new Response(JSON.stringify({ error: 'No recipients' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // --- BASE URL
    const baseUrl = (process.env.PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

    // --- SEND
    let sentCount = 0

    for (const to of recipients) {
      const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(to)}`

      const htmlWithUnsub = `
        ${html}
        <hr />
        <p style="font-size:12px;opacity:.7">
          <a href="${unsubscribeUrl}">Unsubscribe</a>
        </p>
      `

      await req.payload.sendEmail({
        from: 'onboarding@resend.dev',
        to,
        subject,
        html: htmlWithUnsub,
      })

      sentCount++
    }

    return new Response(JSON.stringify({ success: true, sent: sentCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  },
}
