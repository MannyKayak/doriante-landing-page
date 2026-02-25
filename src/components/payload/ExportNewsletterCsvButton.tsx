import Link from 'next/link'

export default function ExportNewsletterCsvButton() {
  return (
    <div style={{ marginBottom: '12px' }}>
      <Link
        href="/api/newsletter-subscribers/export-csv"
        style={{
          display: 'inline-block',
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid #d9d9d9',
          textDecoration: 'none',
          color: '#111111',
          backgroundColor: '#ffffff',
          fontSize: '14px',
          fontWeight: 600,
          marginLeft: '60px',
        }}
      >
        Export
      </Link>
    </div>
  )
}
