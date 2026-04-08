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
    <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-gray">
      <div className="relative w-full aspect-[4/4.6] overflow-hidden sm:aspect-[4/5]">
        <DorianteImage fill use="mini-card" src={getUrlFromMedia(image)} alt={cardtitle} />
      </div>

      <div className="flex flex-1 flex-col items-start gap-2 p-3 sm:p-6">
        <DorianteTitle
          tag="h4"
          color="dark"
          className="line-clamp-2 text-dark !text-base sm:!text-xl"
        >
          {cardtitle}
        </DorianteTitle>
        <DorianteText
          size="base"
          color="dark"
          align="left"
          inline
          className="line-clamp-3 !text-xs text-dark sm:!text-base"
        >
          {cardDescription}
        </DorianteText>
      </div>
    </div>
  )
}
