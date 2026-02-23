import type { CollectionConfig } from 'payload'
import { SendNewsletterCampaignButton } from '@components/ui/SendNewsletterCampaignButton'

export const NewsletterCampaigns: CollectionConfig = {
  slug: 'newsletter-campaigns',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'status', 'sentAt', 'updatedAt'],
    components: {
      edit: {
        beforeDocumentControls: [
          '@components/ui/SendNewsletterCampaignButton#SendNewsletterCampaignButton',
        ],
      },
    },
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'html',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'HTML della newsletter. (Per ora semplice: poi possiamo passare a RichText/template.)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Sent', value: 'sent' },
        { label: 'Sending', value: 'sending' },
        { label: 'Failed', value: 'failed' },
      ],
    },
    {
      name: 'sentAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'lastError',
      type: 'textarea',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
  endpoints: [
    {
      path: '/:id/send',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const campaignId = (req as any).routeParams?.id as string | undefined
        if (!campaignId) {
          return Response.json({ error: 'Missing campaign id' }, { status: 400 })
        }

        const campaign = await req.payload.findByID({
          collection: 'newsletter-campaigns',
          id: campaignId,
        })

        if (!campaign || campaign.status !== 'draft') {
          return Response.json({ error: 'Campaign not found or not in draft' }, { status: 400 })
        }

        const subs = await req.payload.find({
          collection: 'newsletter-subscribers',
          where: { status: { equals: 'subscribed' } },
          limit: 1000,
        })

        const recipients = subs.docs.map((d: any) => d.email).filter(Boolean)
        if (recipients.length === 0) {
          return Response.json({ error: 'No recipients' }, { status: 400 })
        }

        const baseUrl = (process.env.PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

        await req.payload.update({
          collection: 'newsletter-campaigns',
          id: campaignId,
          data: { status: 'sending' },
        })

        let sentCount = 0

        try {
          for (const to of recipients) {
            const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(to)}`
            const htmlWithUnsub = `
              ${campaign.html}
              <hr/>
              <p style="font-size:12px;opacity:.7">
                <a href="${unsubscribeUrl}">Unsubscribe</a>
              </p>
            `

            await req.payload.sendEmail({
              from: 'onboarding@resend.dev',
              to,
              subject: campaign.subject,
              html: htmlWithUnsub,
            })

            sentCount++
          }

          await req.payload.update({
            collection: 'newsletter-campaigns',
            id: campaignId,
            data: { status: 'sent', sentAt: new Date().toISOString() },
          })

          return Response.json({ success: true, sent: sentCount })
        } catch (err: any) {
          await req.payload.update({
            collection: 'newsletter-campaigns',
            id: campaignId,
            data: { status: 'failed', lastError: String(err?.message || err) },
          })

          return Response.json({ error: 'Send failed' }, { status: 500 })
        }
      },
    },
  ],
}
