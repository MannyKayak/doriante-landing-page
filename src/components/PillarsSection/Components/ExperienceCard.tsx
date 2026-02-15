import DorianteText from '@/components/ui/DorianteText'
import DorianteTitle from '@/components/ui/DorianteTitle'
import React from 'react'
import './experienceCard.css'

export type ExperienceCardProps = {
  title: string
  description: string
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, description }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <article className="flex flex-col w-full ">
      <DorianteTitle tag="h1" className="text-light text-center pb-4">
        {title}
      </DorianteTitle>

      <DorianteText color="white" style="arial" className="flex justify-center text-center ">
        {description}
      </DorianteText>

      {!isMobile && <span className="mt-8 h-1 w-1/3 self-center bg-light" />}
    </article>
  )
}
