import type { Field } from 'payload'

export const amenitiesSectionFields: Field = {
  name: 'amenita',
  type: 'group',
  label: 'Amenità',
  interfaceName: 'ActivitySectionProps',
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
      name: 'subtitle',
      label: 'Sottotitolo Sezione',
      type: 'textarea',
      localized: true,
      required: false,
      admin: {
        description: 'Sottotitolo della sezione (es: Amenità / Amenities)',
      },
    },
    {
      name: 'description',
      label: 'Descrizione',
      type: 'textarea',
      localized: true,
      required: false,
      admin: {
        description: 'Descrizione della sezione',
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
