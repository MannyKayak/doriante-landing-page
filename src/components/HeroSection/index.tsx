import Image from 'next/image'
import React from 'react'

type HeroSectionProps = {
  logoSrc: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({ logoSrc }) => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/backgroundHero.png"
          alt="background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/15" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 pt-28 pb-12">
        <div className="max-w-2xl">
          <p className="font-serif text-[40px] leading-[1.05] tracking-tight text-[#0b2b3a] md:text-[56px]">
            <span className="font-semibold">A</span> serene retreat where
            <br />
            <span className="font-semibold">elegance and art meet</span>
            <br />
            <span className="font-semibold">to create a slow-living</span>
            <br />
            <span className="font-semibold">experience.</span>
          </p>
        </div>
      </div>

      {/* Big logo bottom */}
      <div className="absolute bottom-0 px-20 z-10">
        <Image
          src={logoSrc}
          alt="Logo"
          width={1400}
          height={300}
          className="w-full select-none"
          draggable={false}
        />
      </div>
    </section>
  )
}
