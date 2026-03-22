'use client'

import { FC } from 'react'
import { ActivityCard } from './components/ActivityCard'
import DorianteSection from '../ui/DorianteSection'
import DorianteTitle from '../ui/DorianteTitle'
import DorianteText from '../ui/DorianteText'
import { ActivitySectionProps } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import './amenitySection.css'

export const AmenitySection: FC<ActivitySectionProps> = ({
  title,
  description,
  cards,
  subtitle,
}) => {
  if (!cards?.length) return null

  return (
    <DorianteSection className="w-full px-4 pt-4 pb-8 md:px-6">
      {/* Header */}
      <header className="mx-auto mb-10 flex w-full max-w-6xl flex-col items-start gap-3 text-left md:items-center md:text-center">
        <div className="flex items-center w-full gap-4">
          <div className="bg-light w-18 h-[2px] " />
          <DorianteTitle tag="h2" className=" text-light section-title">
            {title}
          </DorianteTitle>
        </div>
        <DorianteTitle
          tag="h1"
          className="w-full text-left text-light sm:!text-[64px] md:text-center"
        >
          {subtitle}
        </DorianteTitle>
        <div className="mt-2">
          <DorianteText className="text-white sm:text-xl text-md text-left doriante-text font-semibold mt-8">
            {description}
          </DorianteText>
        </div>
      </header>

      <div className="md:hidden">
        <Swiper
          modules={[Pagination]}
          slidesPerView="auto"
          spaceBetween={16}
          pagination={{ clickable: true, type: 'bullets' }}
          className="doriante-swiper amenity-swiper"
        >
          {cards.map((item) => (
            <SwiperSlide key={item.id} className="!flex !h-auto !w-70">
              <ActivityCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden w-full flex-nowrap items-stretch gap-6 md:flex">
        {cards.map((item) => (
          <div
            key={item.id}
            className="flex md:min-w-40 lg:min-w-50 xl:min-w-60 aspect-[3/5] flex-1"
          >
            <ActivityCard {...item} />
          </div>
        ))}
      </div>
    </DorianteSection>
  )
}
