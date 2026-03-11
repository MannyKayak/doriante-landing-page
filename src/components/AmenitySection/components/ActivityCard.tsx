'use client'

import React from 'react'
import DorianteImage from '@/components/ui/DorianteImage'
import DorianteTitle from '@/components/ui/DorianteTitle'
import DorianteText from '@/components/ui/DorianteText'
import { Media } from '@/payload-types'
import { getUrlFromMedia } from '@/utils/functions/getUrlFromMedia'

export const ActivityCard: React.FC<{
  cardtitle: string
  cardDescription: string
  image: string | Media
}> = ({ cardtitle, cardDescription, image }) => {
  return (
    <div className="h-full w-full overflow-hidden rounded-3xl bg-gray">
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <DorianteImage fill use="mini-card" src={getUrlFromMedia(image)} alt={cardtitle} />
      </div>

      <div className="flex flex-col items-start gap-2 p-3 sm:p-6">
        <DorianteTitle tag="h4" color="dark" className="line-clamp-2 text-dark !text-base sm:!text-xl">
          {cardtitle}
        </DorianteTitle>
        <DorianteText size="base" color="dark" align="left" inline className="!text-xs sm:!text-base">
          {cardDescription}
        </DorianteText>
      </div>
    </div>
  )
}
