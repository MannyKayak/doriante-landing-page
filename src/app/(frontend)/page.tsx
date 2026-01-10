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
import { HeroSection } from '@/components/HeroSection'
import { OurStorySection } from '@/components/OurHistorySection'
import { ExperiencesDetailsSection } from '@/components/ExperiencesDetailsSection'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="bg-dark">
      <div className="">
        <HeroSection logoSrc="/assets/svg/doriante_logo.svg" />
        <ExperiencesSection />
        <ExperiencesDetailsSection />
      </div>
    </div>
  )
}
