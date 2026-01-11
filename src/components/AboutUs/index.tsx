import { AboutUsProps } from '@/types'
import React, { FC } from 'react'
import DorianteSection from '../ui/DorianteSection'
import DorianteTitle from '../ui/DorianteTitle'
import DorianteText from '../ui/DorianteText'
import DorianteImage from '../ui/DorianteImage'

export const AboutUs: FC<AboutUsProps> = ({ title, description, imageUrl }) => {
  return (
    <DorianteSection className="w-full py-20">
      <div className="flex gap-16">
        <div className="flex flex-col justify-start gap-4 max-w-lg">
          <DorianteTitle tag="h1" color="light" align="left">
            {title}
          </DorianteTitle>

          <div className="">
            <DorianteText color="white" align="left" size="lg">
              {description}
            </DorianteText>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <DorianteImage use="base" src={imageUrl} alt="About Us Image" />
        </div>
      </div>
    </DorianteSection>
  )
}
