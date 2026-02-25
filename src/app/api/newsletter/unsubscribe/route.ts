import { NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

const payloadPromise = getPayload({ config })
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type UnsubscribeRequestBody = {
  email?: unknown
}

export async function POST(req: Request) {
  let body: UnsubscribeRequestBody

  try {
    body = (await req.json()) as UnsubscribeRequestBody
  } catch {
    return NextResponse.json({ message: 'Payload non valido.' }, { status: 400 })
  }

  const email = String(body?.email || '')
    .trim()
    .toLowerCase()

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ message: 'Email non valida.' }, { status: 400 })
  }

  try {
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
    if (!existingDoc) {
      return NextResponse.json({ message: 'Email non trovata.' }, { status: 404 })
    }

    if (existingDoc.subscribed === false) {
      return NextResponse.json({
        ok: true,
        code: 'ALREADY_UNSUBSCRIBED',
        message: 'Sei gia disiscritto.',
      })
    }

    await payload.update({
      collection: 'newsletter-subscribers',
      id: existingDoc.id,
      data: {
        subscribed: false,
      },
    })

    return NextResponse.json({
      ok: true,
      code: 'UNSUBSCRIBED',
      message: 'Disiscrizione completata.',
    })
  } catch {
    return NextResponse.json(
      { message: 'Impossibile completare la disiscrizione. Riprova.' },
      { status: 500 },
    )
  }
}
