import type { Field } from 'payload'

/**
 * Hero config (granulare)
 * - Campi LOCALIZED
 * - Nessun defaultValue testuale (userai fallback i18n lato frontend)
 * - Il frontend userà il valore CMS SOLO se valorizzato (trim !== '')
 */
export const heroFields: Field[] = [
  {
    name: 'hero',
    type: 'group',
    label: 'Hero',
    interfaceName: 'HeroSectionProps',
    fields: [
      {
        name: 'heading',
        label: 'Titolo',
        type: 'textarea',
        localized: true,
        required: true,
      },
      {
        name: 'subHeading',
        label: 'Sottotitolo',
        type: 'textarea',
        localized: true,
        required: true,
      },
      {
        name: 'subHeroText',
        label: 'Testo sotto Hero',
        type: 'textarea',
        localized: true,
        required: true,
      },
      {
        name: 'backgroundImage',
        label: 'Immagine di sfondo',
        type: 'upload',
        relationTo: 'media',
        required: true,
      },
    ],
  },
]
