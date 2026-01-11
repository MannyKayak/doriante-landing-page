import { DorianteTitleProps } from '@/types'
import './dorianteTitle.css'

const ALIGN_CLASS = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
} as const

const COLOR_CLASS = {
  black: 'text-black',
  white: 'text-white',
  light: 'text-[#eed9a4]', // usa il valore reale
  gray: 'text-[#e5e5e3]',
  dark: 'text-dark',
} as const

const SIZE_CLASS = {
  h1: 'text-4xl md:text-5xl',
  h2: 'text-3xl md:text-4xl',
  h3: 'text-2xl md:text-3xl',
  h4: 'text-xl md:text-2xl',
  h5: 'text-lg md:text-xl',
  h6: 'text-base md:text-lg',
} as const

export default function DorianteTitle({
  tag,
  as = tag,
  align = 'left',
  color = 'black',
  className = '',
  children,
}: DorianteTitleProps) {
  const Tag = tag
  return (
    <Tag
      className={[
        'doriante-title',
        ALIGN_CLASS[align],
        COLOR_CLASS[color],
        SIZE_CLASS[as],
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  )
}
