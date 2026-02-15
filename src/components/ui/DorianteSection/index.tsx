import React from 'react'

type DorianteSectionProps = React.ComponentPropsWithoutRef<'section'>

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(' ')
}

export default function DorianteSection({ className, children, ...props }: DorianteSectionProps) {
  return (
    <section {...props} className={cn('w-full overflow-hidden sm:px-40 px-4', className)}>
      {children}
    </section>
  )
}
