import React from 'react'
import DorianteSection from '../ui/DorianteSection'
import DorianteText from '../ui/DorianteText'

export type SubHeroSectionProps = {
  text: string
}

export default function SubHeroSection({ text }: SubHeroSectionProps) {
  return (
    <DorianteSection className="bg-dark min-h-[500px] flex items-end pb-10 justify-center">
      <DorianteText
        color="white"
        align="center"
        style="serif"
        className="loose doriante-text serif text-center "
      >
        {text}
      </DorianteText>
    </DorianteSection>
  )
}
