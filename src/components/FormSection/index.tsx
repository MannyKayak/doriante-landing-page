// src/components/FormSection/LandingFormSection.tsx

import { FormSectionProps } from '@/payload-types'
import NewsletterFormSectionClient from './components/NewsletterFormSectionClient'
import DorianteSection from '../ui/DorianteSection'
import DorianteText from '../ui/DorianteText'
import DorianteTitle from '../ui/DorianteTitle'

type LandingResponse = {
  formSection?: {
    heading?: string
    description?: string
    footerText?: string
    form?: string | { id: string } | null
  }
}

async function getLanding(locale: 'it' | 'en' = 'it'): Promise<LandingResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.PUBLIC_SITE_URL || 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/globals/landing?depth=0&locale=${locale}`, {
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`Failed to fetch landing (${res.status})`)
  return res.json()
}

export default async function FormSection({
  heading,
  description,
  footerText,
  form,
}: FormSectionProps) {
  const formId = typeof form === 'string' ? form : form && typeof form === 'object' ? form.id : ''

  return (
    <DorianteSection className="bg-light h-screen flex flex-col pt-10 ">
      <DorianteTitle tag="h1" className="text-center text-dark !text-3xl">
        {heading}
      </DorianteTitle>
      <DorianteTitle tag="h2" className="text-center text-dark !text-2xl pt-20">
        {description}
      </DorianteTitle>
      <NewsletterFormSectionClient formId={formId} />
      <DorianteText className="doriante-text arial !text-md text-center text-dark">
        {footerText}
      </DorianteText>
    </DorianteSection>
  )
}
