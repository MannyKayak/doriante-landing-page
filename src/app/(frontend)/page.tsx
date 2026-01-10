import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

import { ExperiencesSection } from '@/components/ExperiencesSection'
import { Footer } from '@/components/Footer'
import { FormSection } from '@/components/FormSection'
import { HeroSection, HeroSectionProps } from '@/components/HeroSection'
import { OurStorySection } from '@/components/OurHistorySection'
import { ExperiencesDetailsSection } from '@/components/ExperiencesDetailsSection'
import SubHeroSection, { SubHeroSectionProps } from '@/components/SubHeroSection'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const heroConfig: HeroSectionProps = {
    logoSrc: '',
    description:
      'Benvenuti a casa.Assaporate la quiete, ritrovate la meraviglia. Un boutique retreat sospeso tra arte e natura.',
  }

  const subHeroConfig: SubHeroSectionProps = {
    text: 'Doriante è un rifugio d’autore ad Ameno, sulle colline del Lago d’Orta. Cinque suite di charme immerse in un paesaggio UNESCO, dove il design essenziale incontra l’arte contemporanea e una cucina che celebra il territorio. Un luogo per rallentare, respirare e ritrovare il proprio ritmo.',
  }
  return (
    <div className="bg-dark">
      <HeroSection logoSrc={heroConfig.logoSrc} description={heroConfig.description} />
    </div>
  )
}
