import DorianteText from '@/components/ui/DorianteText'
import React from 'react'

export type ExperienceCardProps = {
  title: string
  description: string
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, description }) => {
  return (
    <article className="flex flex-col w-full">
      <DorianteText color="light" align="center">
        {title}
      </DorianteText>

      <DorianteText color="white" size="lg" align="center">
        {description}
      </DorianteText>

      <span className="mt-8 h-1 w-1/3 self-center bg-light" />
    </article>
  )
}
