import { DorianteTextProps } from '@/types'
import './dorianteText.css'
import parse from 'html-react-parser'

const ALIGN_CLASS = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
} as const

const COLOR_CLASS = {
  black: 'text-black',
  white: 'text-white',
  dark: 'text-[#001b31]',
  light: 'text-[#eed9a4]',
  gray: 'text-[#e5e5e3]',
} as const

const SIZE_CLASS = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
} as const

const WEIGHT_CLASS = {
  normal: 'font-normal',
  bold: 'font-bold',
  semibold: 'font-semibold',
} as const

export default function DorianteText({
  align = 'left',
  color = 'dark',
  size = '3xl',
  inline = false,
  weight = 'normal',
  children,
}: DorianteTextProps) {
  const is_html = typeof children === 'string' && /<\/?[a-z][\s\S]*>/i.test(children)

  const Tag = is_html ? 'div' : inline ? 'span' : 'p'
  const child = is_html ? parse(children) : children

  return (
    <Tag
      className={[
        'doriante-text',
        ALIGN_CLASS[align],
        COLOR_CLASS[color],
        SIZE_CLASS[size],
        WEIGHT_CLASS[weight],
      ].join(' ')}
    >
      {child}
    </Tag>
  )
}
