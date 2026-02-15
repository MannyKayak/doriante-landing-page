import type { Field } from 'payload'
import { createGallerySectionFields } from './components/GallerySectionConfig'
import { amenitiesSectionFields } from '../AmenitySection/config'

export const sectionsFields: Field[] = [
  {
    name: 'sections',
    type: 'group',
    label: 'Sezioni',
    interfaceName: 'SectionsProps',
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
