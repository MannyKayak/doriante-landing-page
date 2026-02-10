import type { Field } from 'payload'
import { createGallerySectionFields } from './GallerySectionConfig'
import { amenitiesSectionFields } from '../AmenitySection/config'

export const sectionsFields: Field[] = [
  {
    name: 'sections',
    type: 'group',
    label: 'Sezioni',
    fields: [
      createGallerySectionFields({
        name: 'dimora',
        label: 'Dimora',
      }),
      createGallerySectionFields({
        name: 'gusto',
        label: 'Gusto',
      }),
      createGallerySectionFields({
        name: 'mirabilia',
        label: 'Mirabilia',
      }),
      amenitiesSectionFields,
    ],
  },
]
