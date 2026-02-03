import { GlobalConfig } from 'payload'

export const Landing: GlobalConfig = {
  slug: 'landing',
  label: 'Landing Page',
  fields: [
    // -------------------
    // HERO
    // -------------------
    {
      type: 'group',
      name: 'hero',
      label: 'Hero Section',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'textarea' },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    // -------------------
    // SUB HERO
    // -------------------
    {
      type: 'group',
      name: 'subHero',
      label: 'Sub Hero Section',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },

    // -------------------
    // CARD SECTION (3 cards)
    // -------------------
    {
      type: 'group',
      name: 'cardSection',
      label: 'Card Section (3 cards)',
      fields: [
        {
          name: 'cards',
          type: 'array',
          minRows: 3,
          maxRows: 3,
          required: true,
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'text', type: 'textarea', required: true },
            {
              name: 'image',
              type: 'relationship',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },

    // -------------------
    // SWIPER SECTIONS (3 sections, ognuna con 3 immagini)
    // -------------------
    {
      type: 'group',
      name: 'swiperSections',
      label: 'Swiper Sections (3 sections)',
      fields: [
        {
          name: 'sections',
          type: 'array',
          minRows: 3,
          maxRows: 3,
          required: true,
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'text', type: 'textarea', required: true },
            {
              name: 'images',
              type: 'array',
              minRows: 3,
              maxRows: 3,
              required: true,
              fields: [
                {
                  name: 'image',
                  type: 'relationship',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },

    // -------------------
    // FORM SECTION
    // -------------------
    {
      type: 'group',
      name: 'formSection',
      label: 'Form Section',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'submitLabel', type: 'text', required: true },
      ],
    },

    // -------------------
    // GALLERY (3 cards)
    // -------------------
    {
      type: 'group',
      name: 'gallery',
      label: 'Gallery (3 cards)',
      fields: [
        {
          name: 'cards',
          type: 'array',
          minRows: 3,
          maxRows: 3,
          required: true,
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'image',
              type: 'relationship',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },

    // -------------------
    // ABOUT US
    // -------------------
    {
      type: 'group',
      name: 'about',
      label: 'About Us',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    // -------------------
    // FOOTER
    // -------------------
    {
      type: 'group',
      name: 'footer',
      label: 'Footer',
      fields: [
        { name: 'text', type: 'textarea' },
        { name: 'note', type: 'text' },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
  ],
}
