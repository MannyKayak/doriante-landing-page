import React, { FC } from 'react'
import Image from 'next/image'

type DorianteImageProps = {
  src: string
  alt: string
  fill?: boolean
  use?: 'mini-card' | 'base'
  customClass?: string
}

const DorianteImage: FC<DorianteImageProps> = ({
  src,
  alt,
  fill = false,
  use = 'base',
  customClass = '',
}) => {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={!fill ? 1678 : undefined}
        height={!fill ? 920 : undefined}
        fill={fill}
        className={
          use === 'mini-card'
            ? `object-cover object-center ${customClass}`
            : `object-cover object-center ${customClass}`
        }
      />
    </>
  )
}

export default DorianteImage
