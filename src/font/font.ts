import localFont from 'next/font/local'

export const ogg = localFont({
  src: [
    {
      path: './Ogg/Webfonts/Ogg-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Ogg/Webfonts/Ogg-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    // {
    //   path: './OggFontFamily/Ogg-Medium.otf',
    //   weight: '500',
    //   style: 'normal',
    // },
    // {
    //   path: './OggFontFamily/Ogg-Bold.otf',
    //   weight: '700',
    //   style: 'normal',
    // },
  ],
  variable: '--font-ogg',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  display: 'swap',
})

// export const oggText = localFont({
//   src: [
//     // {
//     //   path: './OggFontFamily/OggText-Light.otf',
//     //   weight: '300',
//     //   style: 'normal',
//     // },
//     {
//       path: './OggFontFamily/OggText-Regular.otf',
//       weight: '400',
//       style: 'normal',
//     },
//     // {
//     //   path: './OggFontFamily/OggText-Medium.otf',
//     //   weight: '500',
//     //   style: 'normal',
//     // },
//     // {
//     //   path: './OggFontFamily/OggText-Bold.otf',
//     //   weight: '700',
//     //   style: 'normal',
//     // },
//   ],
//   variable: '--font-ogg-text',
//   display: 'swap',
// })
