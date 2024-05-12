'use client'

import type { Folder as TFolder } from '@/lib/schemas/folder'

import { Children, cloneElement, useEffect, useState } from 'react'

type Props = {
  params: { workspace: string; folder: string }
  children: React.ReactElement
}

const LocalStorage = ({ children }: Props) => {
  const [loading, setLoading] = useState(true)
  const [folder, setFolder] = useState<TFolder>()

  const getData = () => {
    const unParsedData = localStorage.getItem('folder')
    setLoading(false)

    if (!unParsedData) return

    const folder = JSON.parse(unParsedData)
    setFolder(folder)
  }

  console.log(!loading && folder)

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {loading ? <h1>Loading...</h1> : null}
      {!loading && folder ? (
        <>
          {Children.map(children, (child) => {
            return cloneElement(child, {
              ...child.props,
              newFolder: 'something weird',
            })
          })}
        </>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default LocalStorage
