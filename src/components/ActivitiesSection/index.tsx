'use client'

import type { ActivitySectionProps } from '@/types'
import { FC } from 'react'
import { ActivityCard } from './components/ActivityCard'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import DorianteSection from '../ui/DorianteSection'
import DorianteTitle from '../ui/DorianteTitle'

export const ActivitiesSection: FC<ActivitySectionProps> = ({ title, description, data }) => {
  if (!data?.length) return null

  return (
    <DorianteSection className="w-full px-4 py-16 md:px-8">
      {/* Header */}
      <header className="mx-auto mb-10 flex w-full max-w-6xl flex-col items-center gap-3 text-center">
        <DorianteTitle tag="h1" color="light">
          {title}
        </DorianteTitle>
        {description ? (
          <p className="max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
            {description}
          </p>
        ) : null}
      </header>

      {/* MOBILE: slider (1 card per view) */}
      <div className="w-full max-w-md md:hidden">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={16}
          pagination={{ clickable: true }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <ActivityCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* DESKTOP/TABLET: flex wrap, max 4 per row */}
      <div className="hidden w-full justify-center md:flex md:flex-wrap md:gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="
              flex w-full
              md:basis-[calc(50%-12px)]
              lg:basis-[calc(33.333%-16px)]
              xl:basis-[calc(25%-18px)]
            "
          >
            <ActivityCard item={item} />
          </div>
        ))}
      </div>
    </DorianteSection>
  )
}
