'use client'

import { useEffect } from 'react'

import { deleteCookie } from '@/lib/server/cookie'

type Props = {
  name: string
  children?: React.ReactNode
}

const DeleteCookie = ({ name, children }: Props) => {
  useEffect(() => {
    deleteCookie(name)
  })

  return <>{children}</>
}

export default DeleteCookie
