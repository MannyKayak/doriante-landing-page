import type { CollectionConfig } from 'payload'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'subscribed', 'consent', 'createdAt'],
    components: {
      beforeList: ['@/components/payload/ExportNewsletterCsvButton'],
    },
  },
  endpoints: [
    {
      path: '/export-csv',
      method: 'get',
      handler: async (req) => {
        if (!req.user) {
          return new Response(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        const allSubscribers: Array<{ email: string; subscribed?: boolean }> = []
        let page = 1
        let hasNextPage = true

        while (hasNextPage) {
          const result = await req.payload.find({
            collection: 'newsletter-subscribers',
            page,
            limit: 1000,
            sort: 'createdAt',
          })

          for (const doc of result.docs) {
            allSubscribers.push({
              email: doc.email,
              subscribed: doc.subscribed,
            })
          }

          hasNextPage = Boolean(result.hasNextPage)
          page += 1
        }

        const escapeCSV = (value: string) => `"${value.replace(/"/g, '""')}"`

        const header = 'Email Address;Status'
        const rows = allSubscribers.map(({ email, subscribed }) => {
          const status = subscribed === false ? 'unsubscribed' : 'subscribed'
          return `${escapeCSV(email)};${escapeCSV(status)}`
        })

        const csv = [header, ...rows].join('\n')
        const filename = `newsletter-subscribers-mailchimp-${new Date().toISOString().slice(0, 10)}.csv`

        return new Response(csv, {
          status: 200,
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Cache-Control': 'no-store',
          },
        })
      },
    },
  ],
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'consent',
      type: 'checkbox',
      required: true,
      defaultValue: true,
    },
    {
      name: 'subscribed',
      type: 'checkbox',
      required: true,
      defaultValue: true,
    },
  ],
}
