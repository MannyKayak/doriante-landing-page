import 'server-only'
import { createHash } from 'node:crypto'

type MailchimpCode =
  | 'ALREADY_SUBSCRIBED'
  | 'ALREADY_PENDING'
  | 'INVALID_EMAIL'
  | 'RATE_LIMIT'
  | 'CONFIG_ERROR'
  | 'MAILCHIMP_ERROR'

type SubscribeResult = {
  ok: boolean
  code?: MailchimpCode
  message?: string
}

type LegacySyncResult = {
  ok: boolean
  skipped: boolean
  statusCode?: number
  message: string
}

const MAX_RETRIES = 3

function maskEmail(email: string): string {
  const [local, domain = ''] = email.split('@')
  if (!local || !domain) return 'invalid-email'
  return `${local.slice(0, 2)}***@${domain}`
}

function getMailchimpConfig() {
  const apiKey = process.env.MAILCHIMP_API_KEY?.trim()
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX?.trim()
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID?.trim()

  if (!apiKey || !serverPrefix || !audienceId) {
    return null
  }

  return { apiKey, serverPrefix, audienceId }
}

function subscriberHash(email: string): string {
  return createHash('md5').update(email.trim().toLowerCase()).digest('hex')
}

function basicAuthHeader(apiKey: string): string {
  return `Basic ${Buffer.from(`newsletter:${apiKey}`).toString('base64')}`
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

function classifyMailchimpError(status: number, title?: string, detail?: string): SubscribeResult {
  const haystack = `${title || ''} ${detail || ''}`.toLowerCase()

  if (status === 400 && haystack.includes('invalid') && haystack.includes('email')) {
    return { ok: false, code: 'INVALID_EMAIL', message: 'Email non valida.' }
  }

  if (status === 400 && (haystack.includes('member exists') || haystack.includes('already subscribed'))) {
    return { ok: true, code: 'ALREADY_SUBSCRIBED', message: 'Email gia iscritta.' }
  }

  if (status === 400 && haystack.includes('already') && haystack.includes('pending')) {
    return { ok: true, code: 'ALREADY_PENDING', message: 'Conferma gia in attesa.' }
  }

  if (status === 429) {
    return { ok: false, code: 'RATE_LIMIT', message: 'Rate limit Mailchimp.' }
  }

  return { ok: false, code: 'MAILCHIMP_ERROR', message: 'Errore Mailchimp.' }
}

export async function subscribeToAudience(email: string): Promise<SubscribeResult> {
  const config = getMailchimpConfig()
  if (!config) {
    return { ok: false, code: 'CONFIG_ERROR', message: 'Configurazione Mailchimp mancante.' }
  }

  const normalizedEmail = email.trim().toLowerCase()
  const hash = subscriberHash(normalizedEmail)
  const url = `https://${config.serverPrefix}.api.mailchimp.com/3.0/lists/${config.audienceId}/members/${hash}`

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: basicAuthHeader(config.apiKey),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: normalizedEmail,
        status_if_new: 'pending',
        status: 'pending',
      }),
    })

    let body: { title?: string; detail?: string; status?: string } | null = null
    try {
      body = (await res.json()) as { title?: string; detail?: string; status?: string }
    } catch {
      body = null
    }

    console.info('[mailchimp] subscribe', {
      action: 'subscribe',
      email: maskEmail(normalizedEmail),
      status: res.status,
    })

    if (res.ok) {
      if (body?.status === 'subscribed') {
        return { ok: true, code: 'ALREADY_SUBSCRIBED', message: 'Email gia iscritta.' }
      }

      return { ok: true }
    }

    const classified = classifyMailchimpError(res.status, body?.title, body?.detail)

    if (classified.code !== 'RATE_LIMIT' || attempt === MAX_RETRIES) {
      return classified
    }

    await sleep(300 * 2 ** (attempt - 1))
  }

  return { ok: false, code: 'MAILCHIMP_ERROR', message: 'Errore Mailchimp.' }
}

// Legacy wrappers kept temporarily to avoid breaking old imports during migration.
export async function upsertMemberSubscribed(email: string): Promise<LegacySyncResult> {
  const result = await subscribeToAudience(email)
  return {
    ok: result.ok,
    skipped: result.code === 'CONFIG_ERROR',
    message: result.message || (result.ok ? 'Mailchimp sync success' : 'Mailchimp sync failed'),
  }
}

export async function setMemberUnsubscribed(_email: string): Promise<LegacySyncResult> {
  return {
    ok: true,
    skipped: true,
    message: 'Legacy unsubscribe sync disabled in full-mailchimp mode.',
  }
}
