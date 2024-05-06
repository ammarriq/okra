'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnchorHTMLAttributes } from 'react'

import { cn } from '@/lib/utils/cn'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  includes: string
  activeClass: string
}

const SidebarLink = ({ className, includes, activeClass, ...rest }: Props) => {
  const pathname = usePathname()
  const isActive = pathname.includes(includes)

  return (
    <Link {...rest} className={cn(className, isActive ? activeClass : '')} />
  )
}

export default SidebarLink
