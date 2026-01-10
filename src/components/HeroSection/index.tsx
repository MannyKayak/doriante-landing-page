import Image from 'next/image'
import React from 'react'
import DorianteSection from '../ui/DorianteSection'
import { DorinateLogo } from '../ui/DorianteLogo'

export type HeroSectionProps = {
  logoSrc: string
  description: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({ logoSrc, description }) => {
  return (
    <DorianteSection>
      {/* Background */}
      <div className="z-0">
        <Image
          src="/assets/images/backgroundHero.png"
          alt="background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/35" />
        <div className="absolute inset-0 bg-linear-to-b from-white/40 via-transparent to-white/15" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen max-w-6xl flex-col pt-28">
        <div className="max-w-2xl">
          <p className="font-serif text-[40px] leading-[1.05] tracking-tight text-[#0b2b3a] md:text-[56px]">
            {description}
          </p>
        </div>
      </div>

      {/* Big logo bottom */}
      <div className="absolute bottom-0 left-0 z-10 mx-20">
        <DorinateLogo variant="dark" />
      </div>
    </DorianteSection>
  )
}
