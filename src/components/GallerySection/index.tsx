import React, { FC, JSX } from 'react'
import DorianteSection from '../ui/DorianteSection'
import { SectionsProps } from '@/payload-types'
import GalleryContent from './components/GalleryContent'

export const GallerySection: FC<SectionsProps> = ({ dimora, gusto, mirabilia }): JSX.Element => {
  const gallerySections = [
    { anchorId: 'dimora', content: dimora },
    { anchorId: 'gusto', content: gusto },
    { anchorId: 'mirabilia', content: mirabilia },
  ]

  return (
    <DorianteSection className="py-4 bg-dark sm:!px-4 !px-0">
      {gallerySections.map(({ anchorId, content }, index) => (
        <div key={content.sectionTitle} id={anchorId} className="scroll-mt-24 py-10">
          <GalleryContent {...content} reverse={index % 2 === 1} />
        </div>
      ))}
    </DorianteSection>
  )
}
