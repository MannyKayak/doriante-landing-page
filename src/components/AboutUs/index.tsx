import React, { FC } from 'react'
import DorianteSection from '../ui/DorianteSection'
import DorianteTitle from '../ui/DorianteTitle'
import DorianteText from '../ui/DorianteText'
import DorianteImage from '../ui/DorianteImage'
import { ProjectSectionProps } from '@/payload-types'
import { get } from 'http'
import { getUrlFromMedia } from '@/utils/functions/getUrlFromMedia'

export const AboutUs: FC<ProjectSectionProps> = ({
  title,
  description,
  tagline,
  subtitle,
  image,
}) => {
  const imageUrl = getUrlFromMedia(image)
  return (
    <DorianteSection className="w-full py-20">
      <div className="flex flex-col-reverse md:flex-row gap-16">
        <div className="flex flex-col justify-start gap-4 max-w-lg">
          <DorianteTitle tag="h1" className="text-light">
            {title}
          </DorianteTitle>

          <DorianteText color="white" align="left" size="lg">
            {subtitle}
          </DorianteText>

          <DorianteText color="white" align="left" size="base" style="serif">
            -{tagline}-
          </DorianteText>
          <DorianteText color="white" align="left" size="base">
            {description}
          </DorianteText>
        </div>

        <div className="flex items-center justify-center">
          <DorianteImage use="base" src={imageUrl} alt="About Us Image" />
        </div>
      </div>
    </DorianteSection>
  )
}
