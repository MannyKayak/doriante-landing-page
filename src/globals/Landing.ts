import { pillarsFields } from '@/components/PillarsSection/config'
import { heroFields } from '@/components/HeroSection/config'
import { sectionsFields } from '@/components/GallerySection/config'
import { formSectionFields } from '@/components/FormSection/config'
import { projectSectionFields } from '@/components/AboutUs/config'
import { GlobalConfig } from 'payload'

export const Landing: GlobalConfig = {
  slug: 'landing',
  label: 'Contenuti Testuali e Immagini della Landing Page',
  admin: {
    group: 'Website',
    description: 'Gestisci i contenuti testuali e le immagini della landing page del sito.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // {
        //   label: 'SEO',
        //   fields: [
        //     {
        //       name: 'seo',
        //       type: 'group',
        //       fields: [
        //         { name: 'metaTitle', type: 'text' },
        //         {
        //           name: 'metaDescription',
        //           type: 'textarea',
        //           localized: true,
        //         },
        //         {
        //           name: 'ogImage',
        //           type: 'upload',
        //           relationTo: 'media',
        //         },
        //         { name: 'noIndex', type: 'checkbox', defaultValue: false },
        //       ],
        //     },
        //   ],
        // },
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
