'use client'

import { useEffect } from 'react'

import { deleteCookie } from '@/lib/server/delete-cookie'

type Props = {
  name: string
  children?: React.ReactNode
}

const DeleteCookie = ({ name, children }: Props) => {
  useEffect(() => {
    deleteCookie(name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}

export default DeleteCookie
