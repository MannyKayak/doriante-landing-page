'use client'

import Link from 'next/link'
import { useId, useMemo, useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

type Props = {
  className?: string
  privacyHref?: string
  endpoint?: string
}

type SubscribeApiResponse = {
  ok?: boolean
  code?: string
  message?: string
  errors?: Array<{ message?: string }>
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function NewsletterForm({
  className = '',
  privacyHref = '/privacy-policy',
  endpoint = '/api/newsletter/subscribe',
}: Props) {
  const uid = useId()
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const disabled = useMemo(() => status === 'loading', [status])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)

    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail || !EMAIL_REGEX.test(normalizedEmail)) {
      setStatus('error')
      setMessage('Inserisci una email valida.')
      return
    }

    if (!consent) {
      setStatus('error')
      setMessage('Devi accettare la privacy policy per iscriverti')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({
          email: normalizedEmail,
          consent: true,
        }),
      })

      const payload = (await response.json().catch(() => null)) as SubscribeApiResponse | null

      if (!response.ok) {
        setStatus('error')
        setMessage(
          payload?.message ||
            payload?.errors?.[0]?.message ||
            "Impossibile completare l'iscrizione. Riprova piu tardi.",
        )
        return
      }

      setStatus('success')

      if (payload?.code === 'ALREADY_SUBSCRIBED') {
        setMessage('Sei gia iscritto.')
      } else {
        setMessage('Iscrizione completata.')
      }

      setEmail('')
      setConsent(false)
    } catch {
      setStatus('error')
      setMessage("Impossibile completare l'iscrizione. Riprova piu tardi.")
    }
  }

  return (
    <section className={['w-full py-16 sm:py-20', className].join(' ')}>
      <div className="mx-auto w-full max-w-3xl px-6 text-center">
        <form onSubmit={onSubmit} className="mx-auto mt-8 w-full max-w-xl space-y-4 text-left">
          <div className="flex gap-4">
            <label className="sr-only" htmlFor={`${uid}-email`}>
              Email
            </label>

            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={[
                'h-11 w-full rounded-md  bg-white px-4 text-sm text-black outline-none',
                'placeholder:text-black/50 ring-1 ring-black/10 focus:ring-2 focus:ring-black/40',
              ].join(' ')}
              disabled={disabled}
            />

            <button
              type="submit"
              disabled={disabled}
              className={[
                'h-11 w-full rounded-md bg-dark text-sm font-medium text-white max-w-53',
                'transition-opacity hover:opacity-90 disabled:opacity-60',
              ].join(' ')}
            >
              {status === 'loading' ? 'Invio...' : 'Iscriviti'}
            </button>
          </div>

          <label className="flex items-start gap-3 text-sm text-black/80">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              disabled={disabled}
              className="mt-0.5 h-4 w-4 rounded border-black/30 text-black focus:ring-black"
            />
            <span>
              Acconsento a ricevere comunicazioni marketing e confermo di aver letto la{' '}
              <Link href={privacyHref} className="underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </form>

        {message ? (
          <p
            className={[
              'mt-3 text-sm',
              status === 'success' ? 'text-black/80' : 'text-red-900/80',
            ].join(' ')}
            aria-live="polite"
          >
            {message}
          </p>
        ) : null}
      </div>
    </section>
  )
}
