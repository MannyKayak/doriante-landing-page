'use client'
import React from 'react'
import DorianteImage from '../../ui/DorianteImage'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import DorianteText from '../../ui/DorianteText'
import DorianteTitle from '../../ui/DorianteTitle'
import { getUrlFromMedia } from '@/utils/functions/getUrlFromMedia'
import { GalleryContentProps } from '@/payload-types'
import './galleryDetails.css'
import 'swiper/css'
import 'swiper/css/pagination'

const GalleryContent = ({
  sectionTitle: _sectionTitle,
  title,
  subtitle,
  description,
  images,
  reverse = false,
}: GalleryContentProps & { reverse?: boolean }) => {
  return (
    <div
      className={`flex flex-col justify-start ${reverse ? 'sm:flex-row-reverse justify-end' : 'sm:flex-row'} w-full`}
    >
      <div className="flex w-full sm:w-1/2 aspect-[559px/672px] ">
        <Swiper
          modules={[Pagination]}
          centeredSlides
          watchOverflow
          spaceBetween={5}
          slidesPerView={'auto'}
          pagination={{ clickable: true, type: 'bullets' }}
          className="doriante-swiper h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.id} className="h-full">
              <div className="relative aspect-[672/559] w-full min-w-[300px] h-full overflow-hidden ">
                <DorianteImage
                  fill
                  src={getUrlFromMedia(image.image)}
                  alt={`Experience image ${index + 1}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-col justify-center sm:mx-10 px-4">
        <div className="flex items-center gap-4 sm:pt-0 pt-8">
          <div className="bg-light w-18 h-[2px]" />
          <DorianteTitle tag="h2" className=" text-light section-title">
            {title}
          </DorianteTitle>
        </div>

        <DorianteTitle tag="h1" className="!text-[64px] text-light pt-4">
          {subtitle}
        </DorianteTitle>
        <div className="mt-8">
          <DorianteText className="text-white text-xl text-left doriante-text font-semibold mt-8">
            {description}
          </DorianteText>
        </div>
      </div>
    </div>
  )
}

export default GalleryContent
