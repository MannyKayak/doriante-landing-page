import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

import { PillarsSection } from '@/components/PillarsSection'
import { HeroSection, HeroSectionProps } from '@/components/HeroSection'
import { GallerySection } from '@/components/GallerySection'
import SubHeroSection, { SubHeroSectionProps } from '@/components/SubHeroSection'
import { ActivitySectionProps, GalleryCard, FeatureCard } from '../../types'
import { AmenitySection } from '@/components/AmenitySection'
import { AboutUs } from '@/components/AboutUs'
import { Form } from '@payloadcms/ui'
import FormSection from '@/components/FormSection'

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

  const heroConfig: HeroSectionProps = {
    description:
      'Benvenuti a casa.<br/>Assaporate la quiete, ritrovate la meraviglia. Un boutique retreat sospeso tra arte e natura.',
  }

  const subHeroConfig: SubHeroSectionProps = {
    text: 'Doriante è un rifugio d’autore ad Ameno, sulle colline del Lago d’Orta. Cinque suite di charme immerse in un paesaggio UNESCO, dove il design essenziale incontra l’arte contemporanea e una cucina che celebra il territorio. Un luogo per rallentare, respirare e ritrovare il proprio ritmo.',
  }

  const features: FeatureCard[] = [
    {
      id: 1,
      title: 'Luxury\nAccommodation',
      description:
        'Our elegantly appointed rooms and suites offer the perfect blend of rustic charm and modern luxury, ensuring a restful stay.',
    },
    {
      id: 2,
      title: 'Farm-to-Table\nRestaurant',
      description:
        'Experience the authentic flavors of Tuscany with our seasonal menu featuring ingredients from our own garden and local producers.',
    },
    {
      id: 3,
      title: 'Art & Cultural\nExperiences',
      description:
        'Immerse yourself in Tuscan culture through our on-site art gallery, cooking classes, wine tastings, and guided excursions.',
    },
  ]

  const contentData: GalleryCard[] = [
    {
      id: 10,
      title: 'Where Art Lives',
      images: [
        '/assets/images/photo1.png',
        '/assets/images/photo2.png',
        '/assets/images/photo3.png',
      ],
      details: [
        "Each room at Doriante is a carefully curated gallery space, featuring works by emerging and established artists. Wake up surrounded by beauty, with views of Lago d'Orta stretching beyond your windows.",
        'Our accommodations blend minimalist Italian design with contemporary comfort, creating spaces that inspire contemplation and connection with the artistic heritage of the region.',
        'Experience slow living at its finest - where every detail is designed to encourage mindfulness, creativity, and deep restoration.',
      ],
    },
  ]

  const AmenitySectionData: ActivitySectionProps = {
    title: 'Esperienze e Territorio',
    // description: undefined, // volutamente assente
    data: [
      {
        id: 1,
        title: 'Kayak al tramonto',
        description: 'Un’esperienza rilassante in kayak tra luci calde e riflessi sull’acqua.',
        imageUrl: '/assets/images/cardPic.png',
      },
      {
        id: 2,
        title: 'Passeggiata in vigna',
        description: 'Tour guidato tra i filari con degustazione di vini locali.',
        imageUrl: '/assets/images/cardPic.png',
      },
      {
        id: 3,
        title: 'Cena gourmet',
        description: 'Percorso gastronomico con piatti tipici rivisitati in chiave moderna.',
        imageUrl: '/assets/images/cardPic.png',
      },
      {
        id: 4,
        title: 'Escursione panoramica',
        description: 'Trekking leggero con viste mozzafiato sulla valle.',
        imageUrl: '/assets/images/cardPic.png',
      },
      {
        id: 5,
        title: 'Relax in spa',
        description: 'Momento di benessere tra sauna, massaggi e piscina riscaldata.',
        imageUrl: '/assets/images/cardPic.png',
      },
      {
        id: 6,
        title: 'Workshop creativo',
        description: 'Laboratorio artistico con materiali naturali e tecniche miste.',
        imageUrl: '/assets/images/cardPic.png',
      },
    ],
  }

  const aboutUsData = {
    title: 'Chi Siamo',
    description:
      'Nato come un luogo dell’immaginazione - una città invisibile mai scritta - Doriante sta prendendo forma ad Ameno, borgo silenzioso affacciato sulla riva più quieta del Lago d’Orta. Più che una dimora, è un pensiero sospeso tra bellezza e natura, dove il tempo smette di correre. Il suo nome non appartiene a nessuna lingua, eppure parla a tutti: evoca un’ospitalità rara e intima, aperta al mondo. Doriante vive nei dettagli  nella vena del legno, nel lino grezzo, nel verde che entra dalle finestre offrendo una pausa delicata dove l’arte incontra il respiro profondo della quiete.',
    imageUrl: '/assets/images/profile.png',
  }

  return (
    <div className="bg-dark">
      <HeroSection description={heroConfig.description} />
      <SubHeroSection text={subHeroConfig.text} />
      <PillarsSection features={features} />
      <GallerySection contentData={contentData} />
      <GallerySection contentData={contentData} />
      <GallerySection contentData={contentData} />
      <AmenitySection {...AmenitySectionData} />

      <FormSection formId="newsletter-form" />
      <AboutUs {...aboutUsData} />
    </div>
  )
}
