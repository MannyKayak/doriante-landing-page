import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import LanguageToggle from '@/components/LanguageToggle'

import { PillarsSection } from '@/components/PillarsSection'
import { HeroSection } from '@/components/HeroSection'
import { GallerySection } from '@/components/GallerySection'
import SubHeroSection from '@/components/SubHeroSection'
import { AmenitySection } from '@/components/AmenitySection'
import { AboutUs } from '@/components/AboutUs'
import FormSection from '@/components/FormSection'
import DorianteText from '@/components/ui/DorianteText'
import { getCurrentLocale } from '@/utils/i18n/locale'

export default async function HomePage() {
  const headers = await getHeaders()
  const locale = await getCurrentLocale()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  const landingData = await payload.findGlobal({
    slug: 'landing',
    user,
    depth: 1,
    locale,
    fallbackLocale: 'it',
  })
  const topBanner = (landingData as { topBanner?: { enabled?: boolean; text?: string | null } })
    .topBanner
  const showTopBanner = topBanner?.enabled === true && Boolean(topBanner.text?.trim())

  // const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="bg-dark relative">
      <LanguageToggle currentLanguage={locale} />

      {showTopBanner ? (
        <div className="text-center py-4 fixed top-0 bg-dark z-20 w-full opacity-60 ">
          <DorianteText className="text-white font-bold text-lg sm:text-3xl text-serif doriante-text">
            {topBanner?.text}
          </DorianteText>{' '}
        </div>
      ) : null}
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
