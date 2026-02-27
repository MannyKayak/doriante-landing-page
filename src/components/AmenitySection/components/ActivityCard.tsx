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
    <div className="w-full overflow-hidden sm:h-full h-[500px] rounded-3xl bg-gray mb-10">
      <div className="relative w-full sm:h-[380px] h-[280px] aspect-[352px/400px] overflow-hidden">
        <DorianteImage fill use="mini-card" src={getUrlFromMedia(image)} alt={cardtitle} />
      </div>

      <div className="flex flex-col items-start gap-2 p-6">
        <DorianteTitle tag="h4" color="dark" className="line-clamp-2 text-dark">
          {cardtitle}
        </DorianteTitle>
        <DorianteText size="base" color="dark" align="left" inline>
          {cardDescription}
        </DorianteText>
      </div>
    </div>
  )
}
