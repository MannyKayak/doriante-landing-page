import { GlobalConfig } from 'payload'

const SOCIAL_OPTIONS = [
  { label: 'Instagram', value: 'instagram' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'TikTok', value: 'tiktok' },
] as const

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
              required: false,
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
              name: 'items',
              type: 'array',
              label: 'Social Links',
              labels: {
                singular: 'Social Link',
                plural: 'Social Links',
              },
              validate: (value) => {
                if (!Array.isArray(value) || value.length === 0) return true

                const items = value as Array<{ platform?: string | null }>
                const platforms = items
                  .map((item) => item.platform)
                  .filter((platform): platform is string => Boolean(platform))

                return new Set(platforms).size === platforms.length
                  ? true
                  : 'Puoi inserire ogni social una sola volta.'
              },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  label: 'Social',
                  required: true,
                  options: SOCIAL_OPTIONS.map((option) => ({
                    label: option.label,
                    value: option.value,
                  })),
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'Social URL',
                  required: true,
                },
              ],
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
