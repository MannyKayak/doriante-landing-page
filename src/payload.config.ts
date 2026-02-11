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
import { endpoints } from './app/(payload)/config/endpoints'
import { mailSubmissionHook } from './hooks/mailSubmission'

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
  endpoints: endpoints,

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
          afterChange: [mailSubmissionHook],
        },
      },
    }),
  ],
})
