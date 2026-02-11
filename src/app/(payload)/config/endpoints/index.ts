import type { Endpoint } from 'payload'

import { sendNewsletterEndpoint } from './newsletter/send'
import { unsubscribeNewsletterEndpoint } from './newsletter/unsubscribe'

export const endpoints: Endpoint[] = [sendNewsletterEndpoint, unsubscribeNewsletterEndpoint]
