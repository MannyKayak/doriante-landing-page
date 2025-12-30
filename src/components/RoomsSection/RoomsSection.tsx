import React, { JSX } from 'react'
import Image from 'next/image'

export const RoomdSection = (): JSX.Element => {
  const contentData = {
    heading: 'Where Art Lives',
    paragraphs: [
      "Each room at Doriante is a carefully curated gallery space, featuring works by emerging and established artists. Wake up surrounded by beauty, with views of Lago d'Orta stretching beyond your windows.",
      'Our accommodations blend minimalist Italian design with contemporary comfort, creating spaces that inspire contemplation and connection with the artistic heritage of the region.',
      'Experience slow living at its finest - where every detail is designed to encourage mindfulness, creativity, and deep restoration.',
    ],
  }

  return (
    <main className="w-[1920px] h-[1776px] flex flex-col gap-[200px] bg-[#001b31]">
      <section className="ml-[121px] w-[1678px] h-[920px] mt-[141px]">
        <Image
          className="w-full h-full object-cover"
          alt="Doriante hotel room with art and lake view"
          src={'/aessets/images/room1.png'}
          fill
        />
      </section>

      <article className="ml-[247px] w-[1430px] h-[469px] [font-family:'Ogg_TRIAL-Regular',Helvetica] font-normal text-transparent text-[64px] text-center tracking-[0] leading-[64px]">
        <h1 className="text-[#eed9a4] leading-[43.2px] mb-[86.4px]">{contentData.heading}</h1>

        <div className="[font-family:'Arial-Regular',Helvetica] text-white text-[32px] leading-[43.2px] space-y-[86.4px]">
          {contentData.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  )
}
