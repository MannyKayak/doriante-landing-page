'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { type Locale } from '@/utils/i18n/locale'

type Props = {
  currentLanguage: Locale
  className?: string
}

type SetLocaleResponse = {
  ok?: boolean
  locale?: Locale
}

export default function LanguageToggle({ currentLanguage, className = '' }: Props) {
  const router = useRouter()
  const [activeLanguage, setActiveLanguage] = useState<Locale>(currentLanguage)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setActiveLanguage(currentLanguage)
  }, [currentLanguage])

  function onChange(language: Locale) {
    if (language === activeLanguage) return

    setActiveLanguage(language)

    startTransition(() => {
      void (async () => {
        try {
          const response = await fetch('/api/locale', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            cache: 'no-store',
            body: JSON.stringify({ locale: language }),
          })

          const data = (await response.json().catch(() => null)) as SetLocaleResponse | null

          if (!response.ok || data?.ok !== true) {
            setActiveLanguage(currentLanguage)
            return
          }

          router.refresh()
        } catch {
          setActiveLanguage(currentLanguage)
        }
      })()
    })
  }

  return (
    <div className={['absolute right-1 top-15 sm:top-6 z-50', className].join(' ')}>
      <div className="flex rounded-full border border-white/30 bg-dark p-1 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => onChange('it')}
          className={[
            'inline-flex items-center justify-center rounded-full w-5 h-5 text-[12px] leading-none uppercase tracking-wide transition-colors sm:w-6 sm:h-6 sm:text-xs',
            activeLanguage === 'it' ? 'bg-white text-dark' : 'text-white hover:bg-white/10',
          ].join(' ')}
          aria-pressed={activeLanguage === 'it'}
          disabled={isPending}
        >
          <span className="sr-only">Italian</span>
          it
        </button>
        <button
          type="button"
          onClick={() => onChange('en')}
          className={[
            'inline-flex items-center justify-center rounded-full w-5 h-5 text-[12px] leading-none uppercase tracking-wide transition-colors sm:w-6 sm:h-6 sm:text-xs',
            activeLanguage === 'en' ? 'bg-white text-dark' : 'text-white hover:bg-white/10',
          ].join(' ')}
          aria-pressed={activeLanguage === 'en'}
          disabled={isPending}
        >
          <span className="sr-only">English</span>
          En
        </button>
      </div>
    </div>
  )
}
