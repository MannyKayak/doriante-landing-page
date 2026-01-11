import React, { FC, JSX } from 'react'
import { ExperienceCard } from './Components/ExperienceCard'
import DorianteSection from '../ui/DorianteSection'
import { FeatureCard } from '@/types'

type ExperiencesSectionProps = {
  features: FeatureCard[]
}

export const ExperiencesSection: FC<ExperiencesSectionProps> = ({ features }): JSX.Element => {
  return (
    <DorianteSection className="pb-20">
      <div className="flex justify-around gap-8">
        {features.map((item) => (
          <ExperienceCard key={item.id} title={item.title} description={item.description} />
        ))}
      </div>
    </DorianteSection>
  )
}
