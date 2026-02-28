import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

import { PillarsSection } from '@/components/PillarsSection'
import { HeroSection } from '@/components/HeroSection'
import { GallerySection } from '@/components/GallerySection'
import SubHeroSection from '@/components/SubHeroSection'
import { AmenitySection } from '@/components/AmenitySection'
import { AboutUs } from '@/components/AboutUs'
import FormSection from '@/components/FormSection'
import DorianteText from '@/components/ui/DorianteText'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  const landingData = await payload.findGlobal({
    slug: 'landing',
    user,
    depth: 1,
  })

  // const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="bg-dark">
      <div className="text-center py-4 fixed top-0 bg-dark z-20 w-full opacity-60 ">
        <DorianteText className="text-white font-bold text-3xl text-serif doriante-text">
          La dimora aprirà nella primavera 2028
        </DorianteText>{' '}
      </div>
      <HeroSection {...landingData.hero} />
      <SubHeroSection text={landingData.hero.subHeroText} />
      <PillarsSection {...landingData.pillars} />
      <GallerySection {...landingData.sections} />
      <AmenitySection {...landingData.sections.amenita} />
      <FormSection {...landingData.formSection} />
      <AboutUs {...landingData.project} />
    </div>
  )
}
