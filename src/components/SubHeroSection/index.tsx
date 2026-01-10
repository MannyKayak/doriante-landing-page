import React from 'react'
import DorianteSection from '../ui/DorianteSection'

export type SubHeroSectionProps = {
  text: string
}

export default function SubHeroSection({ text }: SubHeroSectionProps) {
  return <DorianteSection>{text}</DorianteSection>
}
