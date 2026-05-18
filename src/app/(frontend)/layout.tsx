import React from 'react'
import Script from 'next/script'
import './styles.css'
import './globals.css'
import { Footer } from '@/components/Footer'
import { ogg } from '@/font/font'
import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'
import { getCurrentLocale } from '@/utils/i18n/locale'

export const metadata = {
  description:
    ' Doriante is a boutique retreat in Ameno, in the hills of Lake Orta: five charming suites blending art, design, nature, and refined hospitality.',
  title: 'DORIANTE',
  icon: '/assets/images/favicon.png',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const locale = await getCurrentLocale()
  const payload = await getPayload({ config: payloadConfig })
  const footer = await payload.findGlobal({
    slug: 'footer',
    locale,
    fallbackLocale: 'it',
  })
  return (
    <html lang={locale} className={`${ogg.variable}  antialiased`}>
      <head>
        <link rel="icon" href="/assets/images/favicon.png" type="image/png" />
        <Script
          src="https://embeds.iubenda.com/widgets/1a156bc6-a0e6-45de-a3aa-9abd299b3045.js"
          strategy="lazyOnload"
        />
        <Script
          id="iubenda-loader"
          strategy="afterInteractive"
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
