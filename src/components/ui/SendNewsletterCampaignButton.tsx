'use client'

import React, { useMemo, useState } from 'react'
import type { BeforeDocumentControlsClientProps } from 'payload'
import { useDocumentInfo } from '@payloadcms/ui'

export function SendNewsletterCampaignButton(_props: BeforeDocumentControlsClientProps) {
  const { id, initialData } = useDocumentInfo()

  const [isSending, setIsSending] = useState(false)
  const [lastMsg, setLastMsg] = useState<string | null>(null)

  const status = (initialData as any)?.status as string | undefined

  const canSend = useMemo(() => {
    return Boolean(id) && status === 'draft' && !isSending
  }, [id, status, isSending])

  const handleSend = async () => {
    if (!id) return

    setIsSending(true)
    setLastMsg(null)

    try {
      const res = await fetch(`/api/newsletter-campaigns/${id}/send`, {
        method: 'POST',
        credentials: 'include',
      })

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        throw new Error(data?.error || `Send failed (${res.status})`)
      }

      setLastMsg(`✅ Sent to ${data?.sent ?? 'N/A'} recipients`)
      // opzionale: ricarica la pagina per vedere lo status aggiornato a "sent"
      window.location.reload()
    } catch (e: any) {
      setLastMsg(`❌ ${e?.message || 'Unknown error'}`)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginRight: 12 }}>
      <button
        type="button"
        onClick={handleSend}
        disabled={!canSend}
        style={{
          padding: '8px 12px',
          borderRadius: 8,
          border: '1px solid #ddd',
          background: canSend ? '#111' : '#f3f3f3',
          color: canSend ? '#fff' : '#888',
          cursor: canSend ? 'pointer' : 'not-allowed',
          fontSize: 14,
          fontWeight: 600,
        }}
        title={
          !id
            ? 'Save the document first'
            : status !== 'draft'
              ? 'Only draft campaigns can be sent'
              : ''
        }
      >
        {isSending ? 'Sending…' : 'Send campaign'}
      </button>

      {lastMsg && <span style={{ fontSize: 13, opacity: 0.8 }}>{lastMsg}</span>}
    </div>
  )
}
