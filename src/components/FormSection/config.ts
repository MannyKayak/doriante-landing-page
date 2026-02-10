import type { Field } from 'payload'

/**
 * FormSection (solo testi)
 * - heading: intestazione
 * - description: testo descrittivo sopra il form
 * - footerText: testo sotto al form (es: privacy + link disiscrizione gestito dal frontend)
 */
export const formSectionFields: Field = {
  name: 'formSection',
  type: 'group',
  label: 'Sezione Form',
  fields: [
    {
      name: 'heading',
      label: 'Intestazione',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      label: 'Descrizione',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'footerText',
      label: 'Testo Footer',
      type: 'textarea',
      localized: true,
      required: true,
      admin: {
        description:
          'Testo sotto al form (es: privacy + riferimento alla disiscrizione). Il link lo gestiamo lato frontend.',
      },
    },
  ],
}
