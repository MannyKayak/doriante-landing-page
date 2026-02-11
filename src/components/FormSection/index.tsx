// src/components/FormSection/LandingFormSection.tsx

import NewsletterFormSectionClient from './components/NewsletterFormSectionClient'

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

export default async function FormSection({ locale = 'it' }: { locale?: 'it' | 'en' }) {
  const landing = await getLanding(locale)

  const formSection = landing.formSection

  const formId =
    typeof formSection?.form === 'string'
      ? formSection.form
      : formSection?.form && typeof formSection.form === 'object'
        ? formSection.form.id
        : ''

  return (
    <NewsletterFormSectionClient
      formId={formId}
      title={formSection?.heading || ''}
      description={formSection?.description || ''}
      privacyText={formSection?.footerText || ''}
    />
  )
}
