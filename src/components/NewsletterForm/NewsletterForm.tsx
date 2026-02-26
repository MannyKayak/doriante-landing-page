'use client'

import Link from 'next/link'
import type { FormEvent } from 'react'
import { useId, useMemo, useState } from 'react'

import UnsubscribedModal from './components/UnsubscribedModal'
import DorianteText from '../ui/DorianteText'
import PrivacyPolicyLink from '../PrivacyPolicy'

type Status = 'idle' | 'loading' | 'success' | 'error'

type Props = {
  className?: string
  privacyHref?: string
  endpoint?: string
  footerText?: string
}

type SubscribeApiResponse = {
  ok?: boolean
  code?: string
  message?: string
  errors?: Array<{ message?: string }>
}

type UnsubscribeApiResponse = {
  ok?: boolean
  code?: string
  message?: string
  errors?: Array<{ message?: string }>
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function NewsletterForm({
  className = '',
  privacyHref = '',
  endpoint = '/api/newsletter/subscribe',
  footerText = 'Ci teniamo alla tua privacy disinscriviti quando vuoi',
}: Props) {
  const uid = useId()
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const [isUnsubscribeModalOpen, setIsUnsubscribeModalOpen] = useState(false)
  const [unsubscribeEmail, setUnsubscribeEmail] = useState('')
  const [unsubscribeMessage, setUnsubscribeMessage] = useState<string | null>(null)
  const [isUnsubscribing, setIsUnsubscribing] = useState(false)

  const disabled = useMemo(() => status === 'loading' || isUnsubscribing, [status, isUnsubscribing])
  const hasUnsubscribeWord = footerText.toLowerCase().includes('disinscriviti')
  const unsubscribeTextParts = hasUnsubscribeWord
    ? footerText.split(/disinscriviti/i)
    : [footerText]

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
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
      setMessage(
        payload?.code === 'ALREADY_SUBSCRIBED' ? 'Sei gia iscritto.' : 'Iscrizione completata.',
      )
      setEmail('')
      setConsent(false)
    } catch {
      setStatus('error')
      setMessage("Impossibile completare l'iscrizione. Riprova piu tardi.")
    }
  }

  async function onUnsubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setUnsubscribeMessage(null)

    const normalizedUnsubscribeEmail = unsubscribeEmail.trim().toLowerCase()
    if (!normalizedUnsubscribeEmail || !EMAIL_REGEX.test(normalizedUnsubscribeEmail)) {
      setUnsubscribeMessage('Inserisci una email valida prima di disiscriverti.')
      return
    }

    setIsUnsubscribing(true)

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({
          email: normalizedUnsubscribeEmail,
        }),
      })

      const payload = (await response.json().catch(() => null)) as UnsubscribeApiResponse | null

      if (!response.ok) {
        setUnsubscribeMessage(
          payload?.message ||
            payload?.errors?.[0]?.message ||
            'Impossibile completare la disiscrizione. Riprova.',
        )
        return
      }

      if (payload?.code === 'ALREADY_UNSUBSCRIBED') {
        setUnsubscribeMessage('Sei gia disiscritto.')
        return
      }

      setIsUnsubscribeModalOpen(false)
      setUnsubscribeEmail('')
      setStatus('success')
      setMessage('Disiscrizione completata.')
    } catch {
      setUnsubscribeMessage('Impossibile completare la disiscrizione. Riprova.')
    } finally {
      setIsUnsubscribing(false)
    }
  }

  function closeUnsubscribeModal() {
    setIsUnsubscribeModalOpen(false)
    setUnsubscribeEmail('')
    setUnsubscribeMessage(null)
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

          <label className="flex items-center gap-3 text-sm text-dark">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              disabled={disabled}
              className="mt-0.5 h-4 w-4 rounded border-dark accent-dark focus:ring-dark"
            />
            <DorianteText className="text-dark font-arial font-bold text-xs">
              <span>
                Acconsento a ricevere comunicazioni marketing e confermo di aver letto la{' '}
                <Link href={privacyHref} target="_blank" className="underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </span>
            </DorianteText>
          </label>
        </form>

        <div className="mt-10">
          <DorianteText color="dark" align="center">
            {hasUnsubscribeWord ? (
              <>
                {unsubscribeTextParts[0]}
                <button
                  type="button"
                  className="underline underline-offset-2"
                  onClick={() => {
                    setUnsubscribeMessage(null)
                    setUnsubscribeEmail(email.trim().toLowerCase())
                    setIsUnsubscribeModalOpen(true)
                  }}
                >
                  disinscriviti
                </button>
                {unsubscribeTextParts.slice(1).join('disinscriviti')}
              </>
            ) : (
              footerText
            )}
          </DorianteText>
        </div>

        {message ? (
          <p
            className={[
              'mt-3 text-sm',
              status === 'success' ? 'text-dark' : 'text-red-900/80',
            ].join(' ')}
            aria-live="polite"
          >
            {message}
          </p>
        ) : null}

        {isUnsubscribeModalOpen ? (
          <UnsubscribedModal
            uid={uid}
            unsubscribeEmail={unsubscribeEmail}
            unsubscribeMessage={unsubscribeMessage}
            isUnsubscribing={isUnsubscribing}
            onClose={closeUnsubscribeModal}
            onEmailChange={setUnsubscribeEmail}
            onSubmit={onUnsubscribe}
          />
        ) : null}
      </div>
    </section>
  )
}
