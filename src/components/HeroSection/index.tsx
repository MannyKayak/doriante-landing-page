import Image from 'next/image'
import React from 'react'
import DorianteSection from '../ui/DorianteSection'
import { DorinateLogo } from '../ui/DorianteLogo'
import { HeroSectionProps } from '@/payload-types'
import { getUrlFromMedia } from '@/utils/functions/getUrlFromMedia'
import DorianteTitle from '../ui/DorianteTitle'

export const HeroSection: React.FC<HeroSectionProps> = async ({
  heading,
  subHeading,
  backgroundImage,
}) => {
  const backgroundImageUrl = getUrlFromMedia(backgroundImage)
  return (
    <DorianteSection className="relative min-h-screen">
      {/* Background */}
      <div className="z-0">
        <Image src={backgroundImageUrl} alt="background" fill className="object-cover" />
        <div className="absolute inset-0 bg-white/35" />
        <div className="absolute inset-0 bg-linear-to-b from-white/40 via-transparent to-white/15" />
      </div>

      {/* Content */}
      <div className="relative flex max-w-2xl flex-col mt-52">
        <DorianteTitle color="dark" tag="h1" className="text-dark">
          {heading || 'Welcome to Doriante'}
        </DorianteTitle>
        <DorianteTitle tag="h1" className="arial text-dark">
          {subHeading}
        </DorianteTitle>
      </div>

      {/* Big logo bottom */}
      <div className="absolute bottom-0 left-0 z-10 sm:px-40 px-4">
        <DorinateLogo variant="dark" />
      </div>
    </DorianteSection>
  )
}
