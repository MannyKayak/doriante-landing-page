import { NextResponse } from 'next/server'

import { subscribeToAudience } from '@/lib/mailchimp'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type SubscribeRequestBody = {
  email?: unknown
  consent?: unknown
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

  const result = await subscribeToAudience(email)

  if (result.ok) {
    if (result.code === 'ALREADY_SUBSCRIBED') {
      return NextResponse.json({
        ok: true,
        code: 'ALREADY_SUBSCRIBED',
        message: 'Questa email risulta gia iscritta.',
      })
    }

    if (result.code === 'ALREADY_PENDING') {
      return NextResponse.json({
        ok: true,
        code: 'ALREADY_PENDING',
        message: 'Hai gia una conferma in attesa. Controlla la tua email.',
      })
    }

    return NextResponse.json({
      ok: true,
      code: 'PENDING_CONFIRMATION',
      message: "Controlla la tua email per confermare l'iscrizione.",
    })
  }

  if (result.code === 'CONFIG_ERROR') {
    return NextResponse.json({ message: 'Servizio temporaneamente non disponibile.' }, { status: 500 })
  }

  if (result.code === 'INVALID_EMAIL') {
    return NextResponse.json({ message: 'Email non valida.' }, { status: 400 })
  }

  return NextResponse.json(
    { message: "Impossibile completare l'iscrizione. Riprova piu tardi." },
    { status: 502 },
  )
}

