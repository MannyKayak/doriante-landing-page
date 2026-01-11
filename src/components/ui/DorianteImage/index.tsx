import React, { FC } from 'react'
import Image from 'next/image'

type DorianteImageProps = {
  src: string
  alt: string
  use?: 'mini-card' | 'base'
}

const DorianteImage: FC<DorianteImageProps> = ({ src, alt, use = 'base' }) => {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={1678}
        height={920}
        className={
          use === 'mini-card'
            ? 'rounded-2xl w-full'
            : 'rounded-b-[4rem] rounded-tl-[4rem] rounded-tr-[16rem]'
        }
      />
    </>
  )
}

export default DorianteImage
