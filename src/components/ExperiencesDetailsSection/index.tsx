'use client'
import React, { FC, JSX } from 'react'
import DorianteText from '../ui/DorianteText'
import DorianteTitle from '../ui/DorianteTitle'
import DorianteSection from '../ui/DorianteSection'
import DorianteImage from '../ui/DorianteImage'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import './experiencesDetails.css'
import 'swiper/css'
import 'swiper/css/pagination'
import { ExperiencesDetailsSectionProp } from '@/types'

export const ExperiencesDetailsSection: FC<ExperiencesDetailsSectionProp> = ({
  contentData,
}): JSX.Element => {
  return (
    <DorianteSection className="flex flex-col pt-20 ">
      {contentData.map((content) => (
        <div key={content.id} className="flex flex-col justify-center items-center">
          {/* inserire uno slider */}
          <Swiper
            modules={[Pagination]}
            centeredSlides
            watchOverflow
            spaceBetween={5}
            slidesPerView={'auto'}
            pagination={{ clickable: true, type: 'bullets' }}
            className="doriante-swiper"
          >
            {content.images.map((image, index) => (
              <SwiperSlide key={content.id + index}>
                <div className="w-full h-full flex justify-center items-center">
                  <DorianteImage src={image} alt={`Experience image ${index + 1}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <DorianteTitle color="light" tag="h1">
            {content.title}
          </DorianteTitle>
          <div>
            {content.details.map((text, i) => (
              <DorianteText key={content.id + i} color="white" align="center" size="lg">
                {text}
              </DorianteText>
            ))}
          </div>
        </div>
      ))}
    </DorianteSection>
  )
}
