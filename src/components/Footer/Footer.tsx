import React, { useState } from 'react'

export const Frame = (): JSX.Element => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Email submitted:', email)
  }

  return (
    <div className="bg-white w-full min-w-[1920px] min-h-[874px] relative">
      <div className="absolute top-0 left-0 w-[1920px] h-[874px] bg-[#eed9a4]" />

      <main className="relative">
        <header className="absolute top-[179px] left-[469px] w-[986px]">
          <h1 className="[font-family:'Ogg_TRIAL-Regular',Helvetica] font-normal text-[#001b31] text-[64px] text-center tracking-[0] leading-[64px]">
            <span className="leading-[43.2px]">
              Stay In Touch
              <br />
            </span>

            <span className="text-4xl">
              <br />
              Join our community of art lovers and receive curated updates about exhibitions,
              cultural events, and exclusive experiences at Doriante and around Lago d&#39;Orta.
            </span>
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="absolute top-[561px] left-[606px]">
          <div className="flex items-center gap-0">
            <label htmlFor="email-input" className="sr-only">
              Email address
            </label>
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              aria-required="true"
              className="w-[393px] h-[52px] bg-white px-4 [font-family:'Arial-Regular',Helvetica] font-normal text-[#001b31] text-base"
            />
            <button
              type="submit"
              className="w-[292px] h-[62px] bg-[#001b31] rounded-[10px] [font-family:'Arial-Regular',Helvetica] font-normal text-white text-2xl text-center tracking-[0] leading-[normal] whitespace-nowrap ml-[23px] cursor-pointer hover:bg-[#002a47] transition-colors"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </button>
          </div>

          <p className="w-[708px] [font-family:'Arial-Regular',Helvetica] font-normal text-[#001b31] text-2xl text-center tracking-[0] leading-[normal] mt-[101px]">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </main>
    </div>
  )
}
