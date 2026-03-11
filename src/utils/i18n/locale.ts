import { cookies } from 'next/headers'

export const SUPPORTED_LOCALES = ['it', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'it'
export const LOCALE_COOKIE_NAME = 'doriante-locale'
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export function isSupportedLocale(value: string | null | undefined): value is Locale {
  if (!value) return false
  return SUPPORTED_LOCALES.includes(value as Locale)
}

export function getPayloadLocale(value: string | null | undefined): Locale {
  return isSupportedLocale(value) ? value : DEFAULT_LOCALE
}

export async function getCurrentLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const localeFromCookie = cookieStore.get(LOCALE_COOKIE_NAME)?.value

  return getPayloadLocale(localeFromCookie)
}

export async function setLocaleCookie(locale: Locale): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.set({
    name: LOCALE_COOKIE_NAME,
    value: locale,
    path: '/',
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: 'lax',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
  })
}
