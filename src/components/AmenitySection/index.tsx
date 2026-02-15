'use client'

import { FC } from 'react'
import { ActivityCard } from './components/ActivityCard'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import DorianteSection from '../ui/DorianteSection'
import DorianteTitle from '../ui/DorianteTitle'
import DorianteText from '../ui/DorianteText'
import { ActivitySectionProps } from '@/payload-types'
import './amenitySection.css'

export const AmenitySection: FC<ActivitySectionProps> = ({
  title,
  description,
  cards,
  subtitle,
}) => {
  if (!cards?.length) return null

  return (
    <DorianteSection className="w-full px-4 py-16 md:px-8">
      {/* Header */}
      <header className="mx-auto mb-10 flex w-full max-w-6xl flex-col items-center gap-3 text-center">
        <div className="flex items-center w-full gap-4 ">
          <div className="bg-light w-18 h-[2px]" />
          <DorianteTitle tag="h2" className=" text-light section-title">
            {title}
          </DorianteTitle>
        </div>
        <DorianteTitle tag="h1" className="!text-[64px] text-light ">
          {subtitle}
        </DorianteTitle>
        <div className="mt-2">
          <DorianteText className="text-white text-left doriante-text font-semibold mt-8">
            {description}
          </DorianteText>
        </div>
      </header>

      {/* MOBILE: slider (1 card per view) */}
      <div className="w-full max-w-md md:hidden">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={16}
          pagination={{ clickable: true }}
        >
          {cards.map((item) => (
            <SwiperSlide key={item.id}>
              <ActivityCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* DESKTOP/TABLET: flex wrap, max 4 per row */}
      <div className="hidden w-full justify-center md:flex md:flex-wrap md:gap-6">
        {cards.map((item) => (
          <div
            key={item.id}
            className="
              flex w-full
              max-w-70
            "
          >
            <ActivityCard {...item} />
          </div>
        ))}
      </div>
    </DorianteSection>
  )
}
