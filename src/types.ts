export type DorianteTitleProps = {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  align?: 'left' | 'center' | 'right' | 'justify'
  color?: 'black' | 'white' | 'light' | 'gray' | 'dark'
  children: React.ReactNode
  className?: string
}

export type DorianteTextProps = {
  align?: 'left' | 'center' | 'right' | 'justify'
  color?: 'black' | 'white' | 'dark' | 'light' | 'gray'
  size?: '2xl' | 'xl' | 'lg' | 'base' | 'sm' | '3xl'
  inline?: boolean
  children: React.ReactNode
  weight?: 'normal' | 'bold' | 'semibold'
  className?: string
  style?: 'arial' | 'serif'
}
