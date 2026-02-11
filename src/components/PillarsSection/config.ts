import type { Field } from 'payload'

/**
 * Pillars config (Pilastri)
 * - items: array fisso (4 elementi)
 * - key: select (dimora/gusto/mirabilia/amenita)
 * - title/subtitle: textarea localized (fallback i18n lato frontend)
 * - icon: upload media opzionale
 * - anchorId: text (scroll)
 */
export const pillarsFields: Field[] = [
  {
    name: 'pillars',
    type: 'group',
    label: 'Pilastri',
    interfaceName: 'PillarsSectionProps',
    fields: [
      {
        name: 'items',
        label: 'Elementi',
        type: 'array',
        minRows: 4,
        maxRows: 4,
        fields: [
          {
            name: 'key',
            type: 'select',
            required: true,
            options: [
              { label: 'Dimora', value: 'dimora' },
              { label: 'Gusto', value: 'gusto' },
              { label: 'Mirabilia', value: 'mirabilia' },
              { label: 'Amenità', value: 'amenita' },
            ],
          },
          {
            name: 'title',
            label: 'Titolo',
            type: 'textarea',
            localized: true,
            required: true,
          },
          {
            name: 'subtitle',
            label: 'Sottotitolo',
            type: 'textarea',
            localized: true,
            required: true,
          },
          {
            name: 'icon',
            label: 'Icona',
            type: 'upload',
            relationTo: 'media',
            required: false,
          },
          {
            name: 'anchorId',
            label: 'Anchor ID',
            type: 'text',
            required: true,
            admin: {
              description: 'Anchor per scroll (es: dimora, gusto, mirabilia, amenita)',
            },
          },
        ],
      },
    ],
  },
]
