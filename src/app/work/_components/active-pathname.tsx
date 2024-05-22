'use client'

import { usePathname } from 'next/navigation'
import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils/cn'

type Props = HTMLAttributes<HTMLDivElement> & {
  includes: string
  activeClass: string
}

const Pathname = ({ className, includes, activeClass, ...rest }: Props) => {
  const pathname = usePathname()
  const isActive = pathname.includes(includes)

  return (
    <div {...rest} className={cn(className, isActive ? activeClass : '')} />
  )
}

export default Pathname
