import type { Field } from 'payload'

/**
 * Sezione "Il Progetto"
 * - title: titolo principale
 * - subtitle: sottotitolo
 * - tagline: frase poetica / di chiusura
 * - description: testo descrittivo principale
 */
export const projectSectionFields: Field = {
  name: 'project',
  type: 'group',
  interfaceName: 'ProjectSectionProps',
  label: 'Il Progetto',
  fields: [
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
      name: 'tagline',
      label: 'Tagline',
      type: 'textarea',
      localized: true,
      required: true,
      admin: {
        description: 'Frase evocativa / di chiusura',
      },
    },
    {
      name: 'description',
      label: 'Descrizione',
      type: 'textarea',
      localized: true,
      required: true,
    },
  ],
}
