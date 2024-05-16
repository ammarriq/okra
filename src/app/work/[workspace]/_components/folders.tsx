'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from 'react-aria-components'

import { DotsHorizontalIcon, FolderIcon, PlusIcon } from '@/lib/icons'
import { Folder } from '@/lib/schemas/folder'
import { createId } from '@/lib/utils/random'

import Pathname from './active-pathname'

type Props = {
  params: { workspace: string }
  folders: Folder[]
  userId: string
}

const Folders = ({ folders, params, userId }: Props) => {
  const router = useRouter()
  const [folderList, setFolderList] = useState<Folder[]>(folders)

  const action = async (formData: FormData) => {
    const folder: Folder = {
      id: createId(15),
      name: '',
      icon: '',
      workspace_id: params.workspace,
      updated_at: null,
      created_at: Date.now(),
      created_by: userId,
    }

    setFolderList((prev) => [folder, ...prev])

    document.cookie = `folder_id=${folder.id}; path=/; secure`
    router.push(`/work/${params.workspace}/${folder.id}`)
  }

  return (
    <nav className="flex h-full flex-col gap-1 overflow-auto pt-4">
      <hgroup className="mb-2 flex items-center px-5 text-foreground/50 lg:px-6">
        <h3 className="text-sm font-semibold">Pages</h3>
        <form action={action} className="ml-auto">
          <input type="hidden" name="id" value={createId(15)} />
          <input type="hidden" name="workspace_id" value={params.workspace} />

          <button className="ml-auto">
            <PlusIcon />
          </button>
        </form>
      </hgroup>

      <ul className="overflow-auto px-3.5 lg:px-4">
        {folderList.map(({ id, name }) => (
          <Pathname
            key={`/work/${params.workspace}/${id}`}
            className="group relative flex w-full items-center gap-2.5 rounded-lg
            border border-transparent p-1.5 text-foreground/50 hover:border-border
            hover:bg-white hover:text-foreground lg:px-2.5 lg:py-2"
            activeClass="border-border bg-white text-foreground"
            includes={`/work/${params.workspace}/${id}`}
          >
            <FolderIcon className="size-5" />

            <Link
              href={`/work/${params.workspace}/${id}`}
              className="w-0 grow truncate whitespace-nowrap text-sm
            font-medium capitalize after:absolute after:inset-0"
            >
              {name || 'Untitled'}
            </Link>

            <Button className="relative hidden rounded-lg px-1 py-0.5 group-hover:flex group-hover:bg-background">
              <DotsHorizontalIcon className="size-4" />
            </Button>
          </Pathname>
        ))}
      </ul>
    </nav>
  )
}

export default Folders
