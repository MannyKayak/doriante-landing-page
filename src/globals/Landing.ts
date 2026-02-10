import { pillarsFields } from '@/components/PillarsSection/config'
import { heroFields } from '@/components/HeroSection/config'
import type { GlobalConfig } from 'payload'
import { sectionsFields } from '@/components/GallerySection/config'
import { formSectionFields } from '@/components/FormSection/config'
import { projectSectionFields } from '@/components/AboutUs/config'

export const Landing: GlobalConfig = {
  slug: 'landing',
  label: 'Landing',
  admin: {
    group: 'Website',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // =========================
        // SEO
        // =========================
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              fields: [
                { name: 'metaTitle', type: 'text' },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  relationTo: 'media',
                },
                { name: 'noIndex', type: 'checkbox', defaultValue: false },
              ],
            },
          ],
        },
        {
          label: 'Hero',
          fields: [...heroFields],
        },
        {
          label: 'Valori',
          fields: [...pillarsFields],
        },
        {
          label: 'Sections',
          fields: [...sectionsFields],
        },
        {
          label: 'Form',
          fields: [formSectionFields],
        },
        {
          label: 'Il Progetto',
          fields: [projectSectionFields],
        },
      ],
    },
  ],
}
