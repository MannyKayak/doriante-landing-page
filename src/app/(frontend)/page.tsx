import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

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
import { L } from 'vitest/dist/chunks/reporters.d.DL9pg5DB.js'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  const landingData = await payload.findGlobal({
    slug: 'landing',
    user,
  })
  // landing data contiene tutti i dati del global "landing", devo fare alcune modifiche:
  // - nel global credo ci sia dentro anche il footer, che forse metterei in una sezione separata
  // - bisogna capire il multilingua a i form
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const aboutUsData = {
    title: 'Chi Siamo',
    description:
      'Nato come un luogo dell’immaginazione - una città invisibile mai scritta - Doriante sta prendendo forma ad Ameno, borgo silenzioso affacciato sulla riva più quieta del Lago d’Orta. Più che una dimora, è un pensiero sospeso tra bellezza e natura, dove il tempo smette di correre. Il suo nome non appartiene a nessuna lingua, eppure parla a tutti: evoca un’ospitalità rara e intima, aperta al mondo. Doriante vive nei dettagli  nella vena del legno, nel lino grezzo, nel verde che entra dalle finestre offrendo una pausa delicata dove l’arte incontra il respiro profondo della quiete.',
    imageUrl: '/assets/images/profile.png',
  }

  return (
    <div className="bg-dark">
      <div className="hidden text-center py-4 fixed top-0 bg-dark z-20 w-full opacity-60 ">
        <DorianteText className="text-white text-serif" style="serif">
          Prossima aperture primavera 2027
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
