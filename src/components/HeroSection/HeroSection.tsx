import React, { JSX } from 'react'
import Image from 'next/image'

export const HeroSection = (): JSX.Element => {
  return (
    <main className="w-480 h-270 flex flex-col gap-[277.4px] bg-[url(/pexels-olly-3764202-1.png)] bg-cover bg-position-[50%_50%]">
      <Image
        className="ml-61 w-[672.09px] h-[280.44px] mt-[251.2px]"
        alt="A serene retreat where elegance and art meet to create a slow living experience"
        width={672}
        height={280}
        src={'/assets/images/background_image.png'}
      />

      {/* <Image
        fill
        className="ml-[66px] w-[1788px] h-[271px] aspect-[6.58]"
        alt="Doriante positive logotype"
        src={'/assets/logo/doriante_logo.svg'}
      /> */}
    </main>
  )
}
