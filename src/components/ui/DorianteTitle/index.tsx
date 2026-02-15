import { DorianteTitleProps } from '@/types'
import './dorianteTitle.css'

export default function DorianteTitle({ tag, className = '', children }: DorianteTitleProps) {
  const Tag = tag
  return <Tag className={['doriante-title', className].join(' ')}>{children}</Tag>
}
