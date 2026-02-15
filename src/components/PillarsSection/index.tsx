import React, { FC, JSX } from 'react'
import { ExperienceCard } from './Components/ExperienceCard'
import DorianteSection from '../ui/DorianteSection'
import { PillarsSectionProps } from '@/payload-types'

export const PillarsSection: FC<PillarsSectionProps> = ({ items }): JSX.Element => {
  console.log(items)
  return (
    <DorianteSection className="pb-20">
      <div className="flex justify-around gap-8">
        {items &&
          items.map((item) => (
            <ExperienceCard key={item.id} title={item.title} description={item.subtitle} />
          ))}
      </div>
    </DorianteSection>
  )
}
