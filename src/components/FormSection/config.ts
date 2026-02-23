import type { Field } from 'payload'

export const formSectionFields: Field = {
  name: 'formSection',
  type: 'group',
  label: 'Sezione Form',
  interfaceName: 'FormSectionProps',
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
