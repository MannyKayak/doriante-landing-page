import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  fields: [
    {
      type: 'group',
      name: 'footer',
      label: 'Footer Content',
      fields: [
        // ---------------------
        // ADDRESS
        // ---------------------
        {
          name: 'address',
          type: 'text',
          label: 'Address',
          localized: true,
          required: true,
        },

        // ---------------------
        // CONTACTS
        // ---------------------
        {
          name: 'contacts',
          type: 'group',
          label: 'Contacts',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Contacts Label',
              localized: true,
              required: true,
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Phone',
              required: true,
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email',
              required: true,
            },
          ],
        },

        // ---------------------
        // SOCIALS
        // ---------------------
        {
          name: 'socials',
          type: 'group',
          label: 'Socials',
          fields: [
            {
              name: 'cta',
              type: 'text',
              label: 'CTA Label (Follow us)',
              localized: true,
              required: true,
            },
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram Label',
              localized: true,
              defaultValue: 'Instagram',
            },
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook Label',
              localized: true,
              defaultValue: 'Facebook',
            },
            {
              name: 'linkedin',
              type: 'text',
              label: 'LinkedIn Label',
              localized: true,
              defaultValue: 'LinkedIn',
            },
            {
              name: 'tiktok',
              type: 'text',
              label: 'TikTok Label',
              localized: true,
              defaultValue: 'TikTok',
            },
          ],
        },

        // ---------------------
        // COPYRIGHT
        // ---------------------
        {
          name: 'copyright',
          type: 'text',
          label: 'Copyright Text',
          localized: true,
          required: true,
        },

        // ---------------------
        // DESCRIPTION TEXT
        // ---------------------
        {
          name: 'text',
          type: 'textarea',
          label: 'Footer Description Text',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
