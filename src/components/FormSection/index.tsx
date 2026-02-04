'use client'
import React, { JSX, useState } from 'react'

const FORM_ID = '69824609c59561f151f84306'

export const FormSection = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: FORM_ID,
          submissionData: [
            {
              field: 'email',
              value: email,
            },
          ],
        }),
      })

      if (!res.ok) {
        throw new Error('Submission failed')
      }

      setStatus('success')
      setEmail('')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <div className="bg-white w-full  relative">
      <div className="absolute top-0 left-0  bg-[#eed9a4]" />

      <main className="relative">
        <form onSubmit={handleSubmit} className="absolute top-[561px] left-[606px]">
          <div className="flex items-center gap-0">
            <label htmlFor="email-input" className="sr-only">
              Email address
            </label>

            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={status === 'loading' || status === 'success'}
              className="w-[393px] h-[52px] bg-white px-4 [font-family:'Arial-Regular',Helvetica] font-normal text-[#001b31] text-base"
            />

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-[292px] h-[62px] bg-[#001b31] rounded-[10px] [font-family:'Arial-Regular',Helvetica] font-normal text-white text-2xl text-center tracking-[0] leading-[normal] whitespace-nowrap ml-[23px] cursor-pointer hover:bg-[#002a47] transition-colors disabled:opacity-50"
              aria-label="Subscribe to newsletter"
            >
              {status === 'loading' ? 'Sending...' : 'Subscribe'}
            </button>
          </div>

          <p className="w-[708px] [font-family:'Arial-Regular',Helvetica] font-normal text-[#001b31] text-2xl text-center tracking-[0] leading-[normal] mt-[101px]">
            We respect your privacy. Unsubscribe at any time.
          </p>

          {status === 'success' && (
            <p className="mt-6 text-green-700 text-xl text-center">Thanks for subscribing!</p>
          )}

          {status === 'error' && (
            <p className="mt-6 text-red-700 text-xl text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </main>
    </div>
  )
}
