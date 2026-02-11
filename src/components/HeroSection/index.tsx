'use client'
import Image from 'next/image'
import React from 'react'
import DorianteSection from '../ui/DorianteSection'
import { DorinateLogo } from '../ui/DorianteLogo'
import DorianteText from '../ui/DorianteText'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { HeroSectionProps } from '@/payload-types'

export const HeroSection: React.FC<HeroSectionProps> = async ({
  heading,
  subHeading,
  backgroundImage,
}) => {
  console.log('Rendering HeroSection with data:', { heading, subHeading, backgroundImage })
  return (
    <DorianteSection>
      {/* Background */}
      <div className="z-0">
        <Image
          src={'/assets/images/backgroundHero.png'}
          alt="background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/35" />
        <div className="absolute inset-0 bg-linear-to-b from-white/40 via-transparent to-white/15" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen max-w-2xl flex-col pt-28 ">
        <DorianteText color="dark" size="3xl" style="serif">
          {heading || 'Welcome to Doriante'}
        </DorianteText>
        <DorianteText color="dark" size="lg" style="arial">
          {subHeading}
        </DorianteText>
      </div>

      {/* Big logo bottom */}
      <div className="absolute bottom-0 left-0 z-10 mx-20">
        <DorinateLogo variant="dark" />
      </div>
    </DorianteSection>
  )
}
