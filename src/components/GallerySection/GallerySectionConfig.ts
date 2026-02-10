import type { Field } from 'payload'

type GallerySectionArgs = {
  name: string
  label: string
}

export const createGallerySectionFields = ({ name, label }: GallerySectionArgs): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    {
      name: 'sectionTitle',
      label: 'Titolo Sezione',
      type: 'textarea',
      localized: true,
      required: true,
      admin: {
        description: 'Titolo della sezione (es: Dimora, Gusto, Mirabilia)',
      },
    },
    {
      name: 'title',
      label: 'Titolo',
      type: 'textarea',
      localized: true,
      required: true,
      admin: {
        description: 'Titolo principale della sezione',
      },
    },
    {
      name: 'description',
      label: 'Descrizione',
      type: 'textarea',
      localized: true,
      required: true,
      admin: {
        description: 'Testo descrittivo della sezione',
      },
    },
    {
      name: 'images',
      label: 'Immagini',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          label: 'Immagine',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'Didascalia',
          type: 'textarea',
          localized: true,
          required: false,
        },
        {
          name: 'alt',
          label: 'Alt',
          type: 'text',
          localized: true,
          required: false,
        },
      ],
    },
  ],
})
