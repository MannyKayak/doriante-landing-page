import React from 'react'

type OurStorySectionProps = {
  title?: string
  paragraphs?: string[]
  imageSrc: string
  imageAlt?: string
  className?: string

  /** Personalizzazione colori (hex o classi Tailwind arbitrarie) */
  bgColorClass?: string // es: "bg-[#041F33]"
  titleColorClass?: string // es: "text-[#D6B56B]"
  textColorClass?: string // es: "text-white/90"
}

export function OurStorySection({
  title = 'Our Story',
  paragraphs = [
    "Nestled in the picturesque hills of Tuscany, Villa Toscana was born from a passion for authentic Italian hospitality and a deep appreciation for the region's rich cultural heritage.",
    'Our family-owned estate has been lovingly restored to preserve its historic charm while offering modern comforts. The original stone walls, wooden beams, and terracotta floors tell the story of generations past, creating an atmosphere of timeless elegance.',
  ],
  imageSrc,
  imageAlt = 'Our story image',
  className = '',
  bgColorClass = 'bg-[#041F33]',
  titleColorClass = 'text-[#D6B56B]',
  textColorClass = 'text-white/90',
}: OurStorySectionProps) {
  return (
    <section className={`${bgColorClass} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* LEFT */}
          <div className="max-w-lg">
            <h2 className={`mb-8 font-serif text-4xl leading-tight md:text-5xl ${titleColorClass}`}>
              {title}
            </h2>

            <div className={`space-y-8 text-base leading-7 md:text-[15px] ${textColorClass}`}>
              {paragraphs.map((p, i) => (
                <p key={i} className="max-w-md">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:flex md:justify-end">
            <div
              className="w-full max-w-[560px] overflow-hidden bg-white/5"
              style={{
                // forma “blob” simile allo screenshot
                borderRadius: '36px 170px 170px 36px',
              }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-[360px] w-full object-cover md:h-[420px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
