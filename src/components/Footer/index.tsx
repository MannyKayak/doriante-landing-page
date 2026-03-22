import React from 'react'
import { DorinateLogo } from '../ui/DorianteLogo'
import DorianteText from '../ui/DorianteText'
import TikTokIcon from '@/assets/TikTokIcon'
import FbIcon from '@/assets/FbIcon'
import LinkedinIcon from '@/assets/LinkedinIcon'
import InstagramIcon from '@/assets/InstagramIcon'
import { Footer as FooterType } from '@/payload-types'
import Link from 'next/link'

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  facebook: FbIcon,
  linkedin: LinkedinIcon,
  tiktok: TikTokIcon,
} as const

type FooterProps = {
  className?: string
  data: FooterType
}

export const Footer: React.FC<FooterProps> = ({ className = '', data }) => {
  const footer = data.footer
  const socialItems =
    footer?.socials?.items?.filter(
      (item): item is NonNullable<typeof footer.socials.items>[number] =>
        Boolean(item?.platform && item?.url),
    ) ?? []

  if (!footer) return null

  return (
    <footer className={`bg-gray ${className}`}>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="sm:w-[40%] w-full pb-10">
          <DorinateLogo variant="dark" />
        </div>

        {/* Top grid */}
        <div className="grid gap-16 md:grid-cols-3">
          {/* BRAND */}
          <div className="">
            <DorianteText className="doriante-text text-dark arial sm:pt-0 pt-8 !font-normal">
              {footer.text}
            </DorianteText>

            <DorianteText className="doriante-text text-dark arial pt-8 ">
              {footer.address}
            </DorianteText>
          </div>

          {/* CONTACT */}
          <div>
            <DorianteText className="doriante-text  text-dark arial sm:pt-0 pt-4 ">
              {footer.contacts?.text}
            </DorianteText>

            <ul className="">
              {footer.contacts?.phone && (
                <li>
                  <DorianteText className="doriante-text text-dark arial pt-2 ">
                    <Link
                      href={`tel:${footer.contacts.phone}`}
                      className="hover:text-black transition"
                    >
                      {footer.contacts.phone}
                    </Link>
                  </DorianteText>
                </li>
              )}

              {footer.contacts?.email && (
                <li>
                  <DorianteText className="doriante-text text-dark arial pt-2 ">
                    <Link href={`mailto:${footer.contacts.email}`} className=" transition">
                      {footer.contacts.email}
                    </Link>
                  </DorianteText>
                </li>
              )}
              <li>
                <DorianteText className="text-dark arial pt-2 hover:text-black transition font-bold">
                  <Link href={'https://www.iubenda.com/privacy-policy/77331444'} target="_blank">
                    Privacy Policy
                  </Link>
                </DorianteText>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          {socialItems.length > 0 ? (
            <div>
              <DorianteText className="doriante-text text-dark arial sm:py-0 py-2">
                {footer.socials?.cta}
              </DorianteText>

              <div className="flex items-center gap-6 text-black pt-2">
                {socialItems.map((item) => {
                  const Icon = SOCIAL_ICONS[item.platform]

                  if (!Icon) return null

                  return (
                    <a
                      key={`${item.platform}-${item.url}`}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={item.platform}
                      className="transition-opacity hover:opacity-70"
                    >
                      <Icon />
                    </a>
                  )
                })}
              </div>
            </div>
          ) : null}
        </div>

        {/* Bottom */}
        <DorianteText className="doriante-text text-dark arial pt-10 !text-sm !font-light text-center">
          {footer.copyright}
        </DorianteText>
      </div>
    </footer>
  )
}
