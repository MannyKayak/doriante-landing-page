import React, { FC, JSX } from 'react'
import DorianteSection from '../ui/DorianteSection'
import { SectionsProps } from '@/payload-types'
import GalleryContent from './components/GalleryContent'

export const GallerySection: FC<SectionsProps> = ({ dimora, gusto, mirabilia }): JSX.Element => {
  return (
    <DorianteSection className="py-8 bg-dark">
      {[dimora, gusto, mirabilia].map((section, index) => (
        <div key={section.sectionTitle} className="py-10">
          <GalleryContent {...section} reverse={index % 2 === 1} />
        </div>
      ))}
    </DorianteSection>
  )
}
