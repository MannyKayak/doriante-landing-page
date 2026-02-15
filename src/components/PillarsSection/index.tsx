'use client'
import React, { FC, JSX } from 'react'
import { ExperienceCard } from './Components/ExperienceCard'
import DorianteSection from '../ui/DorianteSection'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { PillarsSectionProps } from '@/payload-types'

export const PillarsSection: FC<PillarsSectionProps> = ({ items }): JSX.Element => {
  console.log(items)
  return (
    <DorianteSection className="py-10">
      {/* MOBILE: slider (1 card per view) */}
      <div className="w-full max-w-md md:hidden ">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={16}
          pagination={{ clickable: true, type: 'progressbar' }}
          className="pb-4  h-32 "
        >
          {items &&
            items.map((item) => (
              <SwiperSlide key={item.id}>
                <ExperienceCard key={item.id} title={item.title} description={item.subtitle} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="hidden md:flex justify-around gap-8">
        {items &&
          items.map((item) => (
            <ExperienceCard key={item.id} title={item.title} description={item.subtitle} />
          ))}
      </div>
    </DorianteSection>
  )
}
