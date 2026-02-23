import { createHash } from 'node:crypto'
import 'dotenv/config'

const [emailArg] = process.argv.slice(2)
const testEmail = String(emailArg || `mailchimp-smoke-${Date.now()}@example.com`)
  .trim()
  .toLowerCase()

const apiKey = process.env.MAILCHIMP_API_KEY?.trim()
const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX?.trim()
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID?.trim()

if (!apiKey || !serverPrefix || !audienceId) {
  console.error('[mailchimp-smoke] Missing MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX or MAILCHIMP_AUDIENCE_ID')
  process.exit(1)
}

const subscriberHash = createHash('md5').update(testEmail).digest('hex')
const endpoint = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`
const auth = Buffer.from(`payload:${apiKey}`).toString('base64')

async function putMember(body) {
  const res = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  let payload = null
  try {
    payload = await res.json()
  } catch {
    payload = null
  }

  return { ok: res.ok, status: res.status, payload }
}

async function run() {
  console.log(`[mailchimp-smoke] Test email: ${testEmail}`)

  const subscribe = await putMember({
    email_address: testEmail,
    status_if_new: 'subscribed',
    status: 'subscribed',
  })
  console.log('[mailchimp-smoke] subscribe result:', {
    ok: subscribe.ok,
    status: subscribe.status,
    title: subscribe.payload?.title,
    detail: subscribe.payload?.detail,
  })

  const unsubscribe = await putMember({
    email_address: testEmail,
    status: 'unsubscribed',
  })
  console.log('[mailchimp-smoke] unsubscribe result:', {
    ok: unsubscribe.ok,
    status: unsubscribe.status,
    title: unsubscribe.payload?.title,
    detail: unsubscribe.payload?.detail,
  })

  if (!subscribe.ok || !unsubscribe.ok) {
    process.exit(1)
  }
}

run().catch((error) => {
  console.error('[mailchimp-smoke] Unexpected error:', error?.message || error)
  process.exit(1)
})

