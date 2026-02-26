import React from 'react'
import './styles.css'
import './globals.css'
import { Footer } from '@/components/Footer'
import { ogg } from '@/font/font'
import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'
import { Script } from 'vm'

export const metadata = {
  description:
    'Doriante è un progetto editoriale indipendente che nasce con l’obiettivo di esplorare e raccontare le connessioni tra cibo, cultura e società. Attraverso articoli, interviste e approfondimenti, Doriante si propone di offrire una prospettiva unica e stimolante sul mondo del cibo, andando oltre la semplice gastronomia per indagare le sue implicazioni culturali, sociali ed economiche.',
  title: 'DORIANTE',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config: payloadConfig })
  const footer = await payload.findGlobal({
    slug: 'footer',
    locale: 'it',
    fallbackLocale: 'it',
  })
  return (
    <html lang="en" className={`${ogg.variable}  antialiased`}>
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function (w,d) {
                var loader = function () {
                  var s = d.createElement("script"),
                      tag = d.getElementsByTagName("script")[0];
                  s.src="https://cdn.iubenda.com/iubenda.js";
                  tag.parentNode.insertBefore(s,tag);
                };
                if(w.addEventListener){
                  w.addEventListener("load", loader, false);
                } else if(w.attachEvent){
                  w.attachEvent("onload", loader);
                } else {
                  w.onload = loader;
                }
              })(window, document);
            `,
          }}
        />
      </head>
      <body>
        <main>{children}</main>
        <Footer data={footer} />
      </body>
    </html>
  )
}
