// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { resendAdapter } from '@payloadcms/email-resend'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Landing } from './globals/Landing'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'
import { NewsletterCampaigns } from './collections/NewsletterCampaigns'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, NewsletterSubscribers, NewsletterCampaigns],
  globals: [Landing],
  editor: lexicalEditor(),
  localization: {
    locales: ['en', 'it'],
    defaultLocale: 'it',
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY || '',
    defaultFromAddress: 'newsletter@tuodominio.it',
    defaultFromName: 'Doriante',
  }),
  endpoints: [
    {
      path: '/newsletter/send',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        const body = (await (async () => {
          const maybeJson = (req as any)?.json
          if (typeof maybeJson === 'function') {
            try {
              return await maybeJson.call(req)
            } catch {
              return {}
            }
          }
          return (req as any)?.body ?? {}
        })()) as { subject?: string; html?: string }

        const subject = body.subject?.trim()
        const html = body.html

        if (!subject || !html) {
          return new Response(JSON.stringify({ error: 'subject and html are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        const result = await req.payload.find({
          collection: 'newsletter-subscribers',
          where: { status: { equals: 'subscribed' } },
          limit: 1000,
        })

        const recipients = result.docs.map((d: any) => d.email).filter(Boolean)

        if (recipients.length === 0) {
          return new Response(JSON.stringify({ error: 'No recipients' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        const baseUrl = (process.env.PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

        let sentCount = 0

        for (const to of recipients) {
          const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(to)}`

          const htmlWithUnsub = ` ${html}<hr/><p style="font-size:12px;opacity:.7"><a href="${unsubscribeUrl}">Unsubscribe</a></p>`

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
    },
    {
      path: '/newsletter/unsubscribe',
      method: 'get',
      handler: async (req) => {
        // Legge ?email=...
        const rawUrl = (req as any)?.url || ''
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
    },
  ],

  plugins: [
    formBuilderPlugin({
      fields: {
        email: true,
      },
      defaultToEmail: 'test@example.com',

      formOverrides: {
        access: {
          read: ({ req }) => Boolean(req.user),
          create: ({ req }) => Boolean(req.user),
          update: ({ req }) => Boolean(req.user),
          delete: ({ req }) => Boolean(req.user),
        },
      },

      formSubmissionOverrides: {
        access: {
          create: () => true,
          read: ({ req }) => Boolean(req.user),
          update: ({ req }) => Boolean(req.user),
          delete: ({ req }) => Boolean(req.user),
        },
        hooks: {
          afterChange: [
            async ({ doc, req, operation }) => {
              // Ci interessa solo quando viene CREATA una submission
              if (operation !== 'create') return

              // doc.submissionData è un array { field, value }
              const emailEntry = Array.isArray(doc.submissionData)
                ? doc.submissionData.find((item: any) => item?.field === 'email')
                : null

              const email = (emailEntry?.value || '').toString().trim().toLowerCase()
              if (!email) return

              // Upsert su newsletter-subscribers
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
            },
          ],
        },
      },
    }),
  ],
})
