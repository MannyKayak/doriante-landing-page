'use client'

import React from 'react'
import type { ActivityCardProps } from '@/types'
import DorianteImage from '@/components/ui/DorianteImage'
import DorianteTitle from '@/components/ui/DorianteTitle'
import DorianteText from '@/components/ui/DorianteText'

export const ActivityCard: React.FC<ActivityCardProps> = ({ item }) => {
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-white/10">
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <DorianteImage use="mini-card" src={item.imageUrl} alt={item.title} />
      </div>

      <div className="flex flex-col items-start gap-2 p-4 bg-gray">
        <DorianteTitle tag="h4" color="dark" className="line-clamp-2 min-h-[3em]">
          {item.title}
        </DorianteTitle>
        <DorianteText size="base" color="dark" align="left" inline>
          {item.description}
        </DorianteText>
      </div>
    </div>
  )
}
