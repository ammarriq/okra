'use client'

import { useEffect, useState } from 'react'

import { Folder } from '@/lib/schemas/folder'

type Props = {
  children: React.ReactNode
}

const LocalStorage = ({ children }: Props) => {
  const [loading, setLoading] = useState(true)
  const [folder, setFolder] = useState<Folder>()

  const getData = () => {
    const unParsedData = localStorage.getItem('folder')
    setLoading(false)

    if (!unParsedData) return

    const folder = JSON.parse(unParsedData)
    setFolder(folder)
  }

  useEffect(() => {
    getData()
  })

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {folder ? (
            <pre>{JSON.stringify(folder, null, 2)}</pre>
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </>
  )
}

export default LocalStorage
