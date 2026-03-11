import { NextResponse } from 'next/server'

import {
  isSupportedLocale,
  setLocaleCookie,
  type Locale,
} from '@/utils/i18n/locale'

type SetLocaleBody = {
  locale?: string
}

export async function POST(request: Request) {
  let body: SetLocaleBody

  try {
    body = (await request.json()) as SetLocaleBody
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body.', ok: false }, { status: 400 })
  }

  if (!isSupportedLocale(body.locale)) {
    return NextResponse.json({ message: 'Unsupported locale.', ok: false }, { status: 400 })
  }

  const locale: Locale = body.locale
  await setLocaleCookie(locale)

  return NextResponse.json({ ok: true, locale })
}
