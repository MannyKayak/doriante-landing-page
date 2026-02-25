import { NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

const payloadPromise = getPayload({ config })

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type SubscribeRequestBody = {
  email?: unknown
  consent?: unknown
}

function isAlreadySubscribedError(error: unknown): boolean {
  if (!error) return false

  const candidate = error as {
    code?: unknown
    status?: unknown
    message?: unknown
    data?: { errors?: Array<{ message?: unknown }> }
  }

  if (candidate.code === 11000) return true

  const nestedMessages = Array.isArray(candidate.data?.errors)
    ? candidate.data?.errors.map((item) => String(item?.message || ''))
    : []

  const errorText = [String(candidate.message || ''), ...nestedMessages, JSON.stringify(error)]
    .join(' ')
    .toLowerCase()

  if (errorText.includes('e11000')) return true
  if (errorText.includes('duplicate key')) return true
  if (errorText.includes('already') && errorText.includes('exist')) return true
  if (errorText.includes('unique')) return true
  if (candidate.status === 409) return true

  return false
}

export async function POST(req: Request) {
  let body: SubscribeRequestBody

  try {
    body = (await req.json()) as SubscribeRequestBody
  } catch {
    return NextResponse.json({ message: 'Payload non valido.' }, { status: 400 })
  }

  const email = String(body?.email || '')
    .trim()
    .toLowerCase()
  const consent = body?.consent === true

  if (!consent) {
    return NextResponse.json({ message: 'Devi accettare per iscriverti' }, { status: 400 })
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ message: 'Email non valida.' }, { status: 400 })
  }

  try {
    const payload = await payloadPromise

    await payload.create({
      collection: 'newsletter-subscribers',
      data: {
        email,
        consent: true,
        subscribed: true,
      },
    })

    return NextResponse.json({
      ok: true,
      message: 'Iscrizione completata.',
    })
  } catch (error) {
    if (isAlreadySubscribedError(error)) {
      const payload = await payloadPromise
      const existing = await payload.find({
        collection: 'newsletter-subscribers',
        where: {
          email: {
            equals: email,
          },
        },
        limit: 1,
      })

      const existingDoc = existing.docs[0]
      if (existingDoc && existingDoc.subscribed !== true) {
        await payload.update({
          collection: 'newsletter-subscribers',
          id: existingDoc.id,
          data: {
            subscribed: true,
            consent: true,
          },
        })

        return NextResponse.json({
          ok: true,
          message: 'Iscrizione completata.',
        })
      }

      return NextResponse.json({
        ok: true,
        code: 'ALREADY_SUBSCRIBED',
        message: 'Sei gia iscritto.',
      })
    }

    return NextResponse.json(
      { message: "Impossibile completare l'iscrizione. Riprova piu tardi." },
      { status: 500 },
    )
  }
}
