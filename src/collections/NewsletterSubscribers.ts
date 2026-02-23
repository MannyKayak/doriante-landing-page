import type { CollectionConfig } from 'payload'
import { newsletterSubscriberMailchimpSyncHook } from '@/hooks/newsletterSubscriberMailchimpSync'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'updatedAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [newsletterSubscriberMailchimpSyncHook],
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'subscribed',
      options: [
        { label: 'Subscribed', value: 'subscribed' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
    },
    {
      name: 'lastMailchimpSyncStatus',
      type: 'select',
      options: [
        { label: 'Success', value: 'success' },
        { label: 'Error', value: 'error' },
        { label: 'Skipped', value: 'skipped' },
      ],
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'lastMailchimpSyncAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'mailchimpSyncError',
      type: 'textarea',
      admin: {
        readOnly: true,
      },
    },
  ],
}
