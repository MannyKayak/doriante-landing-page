import React from 'react'
import DorianteSection from '../ui/DorianteSection'
import DorianteText from '../ui/DorianteText'

export type SubHeroSectionProps = {
  text: string
}

export default function SubHeroSection({ text }: SubHeroSectionProps) {
  return (
    <DorianteSection className="py-20">
      <DorianteText color="white" size="2xl" align="center">
        {text}
      </DorianteText>
    </DorianteSection>
  )
}
