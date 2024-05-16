'use client'

import { useEffect } from 'react'

import { deleteCookie } from '@/lib/server/delete-cookie'

type Props = {
  name: string
  children?: React.ReactNode
}

const DeleteCookie = ({ name, children }: Props) => {
  useEffect(() => {
    console.log('running')

    deleteCookie(name)
  })

  return <>{children}</>
}

export default DeleteCookie
