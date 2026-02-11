import React from 'react'
import './styles.css'
import './globals.css'
import { Footer } from '@/components/Footer'
import { ogg } from '@/font/font'

export const metadata = {
  description:
    'Doriante è un progetto editoriale indipendente che nasce con l’obiettivo di esplorare e raccontare le connessioni tra cibo, cultura e società. Attraverso articoli, interviste e approfondimenti, Doriante si propone di offrire una prospettiva unica e stimolante sul mondo del cibo, andando oltre la semplice gastronomia per indagare le sue implicazioni culturali, sociali ed economiche.',
  title: 'DORIANTE',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${ogg.variable}  antialiased`}>
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
