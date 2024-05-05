'use client'

import ImageCmp from 'next/image'
import { type ImgHTMLAttributes, useEffect, useState } from 'react'

import { cn } from '@/lib/utils/cn'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  fallback?: string
}

const Avatar = (props: Props) => {
  const { className, src, fallback, ...rest }: Props = props

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (src) {
      const img = new Image()
      img.src = src
      img.onload = () => setIsMounted(true)
    }
  })

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isMounted ? (
        <ImageCmp src={src ?? ''} objectFit="cover" fill alt="" />
      ) : (
        <div className="grid size-full place-items-center bg-transparent">
          {fallback}
        </div>
      )}
    </div>
  )
}

export default Avatar
