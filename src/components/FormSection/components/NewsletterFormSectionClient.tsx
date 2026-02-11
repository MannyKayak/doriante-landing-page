// src/components/FormSection/NewsletterFormSectionClient.tsx
'use client'

import { useId, useMemo, useState } from 'react'

type Props = {
  formId: string
  title: string
  description: string
  privacyText: string
  className?: string
  endpoint?: string
}

type PayloadFormSubmissionBody = {
  form: string
  submissionData: Array<{ field: string; value: unknown }>
}

export default function NewsletterFormSectionClient({
  formId,
  title,
  description,
  privacyText,
  className = '',
  endpoint = '/api/form-submissions',
}: Props) {
  const uid = useId()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  const canSubmit = useMemo(() => status !== 'loading', [status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const trimmed = email.trim().toLowerCase()

    if (!trimmed || !isValidEmail(trimmed)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    if (!formId) {
      setStatus('error')
      setMessage('Form is not configured in CMS.')
      return
    }

    const body: PayloadFormSubmissionBody = {
      form: formId,
      submissionData: [{ field: 'email', value: trimmed }],
    }

    try {
      setStatus('loading')

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        const errMsg =
          (data?.errors?.[0]?.message as string | undefined) ||
          (data?.error as string | undefined) ||
          `Request failed (${res.status})`

        const looksLikeDuplicate = /duplicate|already|exists|unique|E11000/i.test(errMsg)
        if (looksLikeDuplicate) {
          setStatus('success')
          setMessage("You're subscribed. See you soon!")
          setEmail('')
          return
        }

        throw new Error(errMsg)
      }

      setStatus('success')
      setMessage("You're subscribed. See you soon!")
      setEmail('')
    } catch (err: any) {
      setStatus('error')
      setMessage(err?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section
      className={['w-full bg-[#E8D5A6] text-[#0B1C2A]', 'py-16 sm:py-20', className].join(' ')}
    >
      <div className="mx-auto w-full max-w-3xl px-6 text-center">
        <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">{title}</h2>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed whitespace-pre-line">
          {description}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-12 flex w-full max-w-xl flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <label className="sr-only" htmlFor={`${uid}-email`}>
            Email
          </label>

          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={[
              'h-11 w-full rounded-md bg-white px-4 text-sm outline-none',
              'placeholder:text-black/40',
              'ring-1 ring-black/10 focus:ring-2 focus:ring-black/40',
              'sm:flex-1',
            ].join(' ')}
            disabled={!canSubmit}
          />

          <button
            type="submit"
            disabled={!canSubmit}
            className={[
              'h-11 w-full sm:w-44 rounded-md',
              'bg-[#0B1C2A] text-white text-sm font-medium',
              'transition-opacity hover:opacity-90 disabled:opacity-60',
            ].join(' ')}
          >
            {status === 'loading' ? 'Sending…' : 'Subscribe'}
          </button>
        </form>

        <p className="mt-10 text-sm text-black/70">{privacyText}</p>

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
