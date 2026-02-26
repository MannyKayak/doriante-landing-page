// src/components/FormSection/LandingFormSection.tsx

import { FormSectionProps } from '@/payload-types'
import NewsletterForm from '@/components/NewsletterForm'
import DorianteSection from '../ui/DorianteSection'
import DorianteTitle from '../ui/DorianteTitle'

export default async function FormSection({ heading, description, footerText }: FormSectionProps) {
  return (
    <DorianteSection className="bg-light h-screen flex flex-col pt-10 ">
      <DorianteTitle tag="h1" className="text-center text-dark !text-3xl">
        {heading}
      </DorianteTitle>
      <DorianteTitle tag="h2" className="text-center text-dark !text-2xl pt-20">
        {description}
      </DorianteTitle>
      <NewsletterForm
        footerText={footerText}
        privacyHref="https://www.iubenda.com/privacy-policy/77331444"
      />
    </DorianteSection>
  )
}
