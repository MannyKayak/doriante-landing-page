'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Language = 'it' | 'en'

type Props = {
  currentLanguage?: Language
  className?: string
}

export default function LanguageToggle({ currentLanguage = 'it', className = '' }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeLanguage = searchParams.get('lang') === 'en' ? 'en' : currentLanguage

  function onChange(language: Language) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', language)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={['absolute right-6 top-6 z-50', className].join(' ')}>
      <div className="inline-flex rounded-md border border-white/30 bg-black/25 p-1 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => onChange('it')}
          className={[
            'rounded px-4 py-2 text-xs uppercase tracking-wide transition-colors sm:text-sm',
            activeLanguage === 'it' ? 'bg-white text-dark' : 'text-white hover:bg-white/10',
          ].join(' ')}
          aria-pressed={activeLanguage === 'it'}
        >
          Italiano
        </button>
        <button
          type="button"
          onClick={() => onChange('en')}
          className={[
            'rounded px-4 py-2 text-xs uppercase tracking-wide transition-colors sm:text-sm',
            activeLanguage === 'en' ? 'bg-white text-dark' : 'text-white hover:bg-white/10',
          ].join(' ')}
          aria-pressed={activeLanguage === 'en'}
        >
          English
        </button>
      </div>
    </div>
  )
}
