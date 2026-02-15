import React, { FC } from 'react'
import Image from 'next/image'

type DorianteImageProps = {
  src: string
  alt: string
  fill?: boolean
  use?: 'mini-card' | 'base'
}

const DorianteImage: FC<DorianteImageProps> = ({ src, alt, fill = false, use = 'base' }) => {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={!fill ? 1678 : undefined}
        height={!fill ? 920 : undefined}
        fill={fill}
        className={
          use === 'mini-card' ? 'object-cover object-center' : 'object-cover object-center'
        }
      />
    </>
  )
}

export default DorianteImage
