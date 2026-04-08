import DorianteText from '@/components/ui/DorianteText'
import DorianteTitle from '@/components/ui/DorianteTitle'
import React from 'react'
import './experienceCard.css'

export type ExperienceCardProps = {
  title: string
  description: string
  anchorId: string
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, description, anchorId }) => {
  return (
    <a
      href={`#${anchorId}`}
      className="flex h-full w-full flex-col transition-opacity duration-200 hover:opacity-80 focus-visible:opacity-80"
    >
      <article className="flex h-full w-full flex-col">
        <DorianteTitle tag="h1" className="text-light text-center pb-4">
          {title}
        </DorianteTitle>

        <DorianteText
          color="white"
          style="arial"
          className="flex flex-1 items-start justify-center text-center"
        >
          {description}
        </DorianteText>

        <span className="mt-8 hidden h-1 w-1/3 self-center bg-light md:block" />
      </article>
    </a>
  )
}
