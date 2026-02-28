// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'
import { Landing } from './globals/Landing'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const blobToken =
  process.env.NODE_ENV === 'production'
    ? process.env.DORIANTE_PROD_READ_WRITE_TOKEN
    : process.env.BLOB_READ_WRITE_TOKEN
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, NewsletterSubscribers],
  globals: [Landing, Footer],
  editor: lexicalEditor(),
  localization: {
    defaultLocale: 'it',
    locales: [
      { code: 'it', label: 'Italiano' },
      { code: 'en', label: 'English' },
    ],
    fallback: true, // utile: se manca EN, usa IT
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: {
          // opzionale: cartella/prefix nello store
          prefix: 'media',
        },
      },
      token: blobToken,
    }),
  ],
})
