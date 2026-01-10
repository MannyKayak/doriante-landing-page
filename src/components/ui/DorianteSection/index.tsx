import React, { ReactNode } from 'react'

type DorianteSectionProps = {
  children: ReactNode
}

export default function DorianteSection({ children }: DorianteSectionProps) {
  return <section className=" min-h-screen w-full overflow-hidden px-20">{children}</section>
}
