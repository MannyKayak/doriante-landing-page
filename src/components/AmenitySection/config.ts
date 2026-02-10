import type { Field } from 'payload'

export const amenitiesSectionFields: Field = {
  name: 'amenita',
  type: 'group',
  label: 'Amenità',
  fields: [
    {
      name: 'sectionTitle',
      label: 'Titolo Sezione',
      type: 'textarea',
      localized: true,
      required: true,
      admin: {
        description: 'Titolo della sezione (es: Amenità / Amenities)',
      },
    },
    {
      name: 'title',
      label: 'Titolo Sezione',
      type: 'textarea',
      localized: true,
      required: true,
      admin: {
        description: 'Titolo della sezione (es: Amenità / Amenities)',
      },
    },
    {
      name: 'cards',
      label: 'Card',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'cardtitle',
          label: 'Titolo della card',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'cardDescription',
          label: 'Descrizione',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'image',
          label: 'Immagine',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
