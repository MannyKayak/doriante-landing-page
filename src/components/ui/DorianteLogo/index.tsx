import React, { FC } from 'react'
import Image from 'next/image'

type DoriantaLogoProps = {
  variant: 'dark' | 'light'
}

export const DorinateLogo: FC<DoriantaLogoProps> = ({ variant }) => {
  return (
    <>
      <Image
        src={`/assets/svg/doriante_logo${variant === 'light' ? '_light.svg' : '.svg'}`}
        alt="Logo"
        width={1400}
        height={300}
        className="w-full"
        draggable={false}
      />
    </>
  )
}
