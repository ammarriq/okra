'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Button,
  Dialog,
  Menu,
  MenuItem,
  MenuTrigger,
  Modal,
  ModalOverlay,
} from 'react-aria-components'
import { Popover } from 'react-aria-components'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { serializeCookie } from 'oslo/cookie'

import {
  DotsHorizontalIcon,
  ExternalLinkIcon,
  FolderIcon,
  LinkIcon,
  PlusIcon,
  TrashIcon,
} from '@/lib/icons'
import { Folder } from '@/lib/schemas/folder'
import { createId } from '@/lib/utils/random'
import { hc } from '@/app-server/hono'
import { getFolders } from '@/app-server/queries/folders'

import { deleteFolder } from '../[folder]/actions'

import Pathname from './active-pathname'

type Props = {
  userId: string
}

const Folders = ({ userId }: Props) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const params = useParams<{ workspace: string; folder?: string }>()

  const { data: folders } = useQuery({
    queryKey: ['folders', params.workspace],
    queryFn: () => {
      return getFolders({
        params: { workspace_id: params.workspace },
      })
    },
  })

  const createFolder = (): Folder => {
    return {
      id: createId(15),
      name: '',
      icon: '',
      workspace_id: params.workspace,
      updated_at: null,
      created_at: Date.now(),
      created_by: userId,
    }
  }

  const { mutate } = useMutation({
    mutationKey: ['createFolder'],
    mutationFn: async () => {
      const folder = createFolder()

      hc.workspaces.$post({
        json: { id: folder.id, workspace_id: folder.workspace_id },
      })

      queryClient.setQueryData(
        ['folders', params.workspace],
        (old: Folder[]) => [folder, ...old],
      )

      document.cookie = serializeCookie(folder.id, JSON.stringify(folder), {
        path: '/',
        secure: true,
      })

      router.push(`/work/${params.workspace}/${folder.id}`)
    },
  })

  return (
    <nav className="flex h-full flex-col gap-1 overflow-auto pt-4">
      <hgroup className="mb-2 flex items-center px-5 text-foreground/50 lg:px-6">
        <h3 className="text-sm font-semibold">Pages</h3>
        {/* <form action={() => mutate()} className="ml-auto">
          <input type="hidden" name="id" value={createId(15)} />
          <input type="hidden" name="workspace_id" value={params.workspace} /> */}

        <button type="button" className="ml-auto" onClick={() => mutate()}>
          <PlusIcon />
        </button>
        {/* </form> */}
      </hgroup>

      <ul className="overflow-auto px-3.5 lg:px-4">
        {folders?.map(({ id, name }) => (
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

            <FolderOptions
              deleteAction={async () => {
                if (params.folder === id) {
                  router.push(`/work/${params.workspace}/home`)
                }

                deleteFolder(id)
              }}
            />
          </Pathname>
        ))}
      </ul>
    </nav>
  )
}

const FolderOptions = ({
  deleteAction,
}: {
  deleteAction: () => Promise<void>
}) => {
  const [isDelete, setIsDelete] = useState(false)

  return (
    <>
      <MenuTrigger>
        <Button className="relative hidden rounded-lg px-1 py-0.5 group-hover:flex group-hover:bg-background">
          <DotsHorizontalIcon className="size-4" />
        </Button>

        <Popover
          placement="bottom left"
          className="mr-4 w-40 origin-top-right divide-x rounded-lg border border-border
          bg-white shadow fill-mode-forwards entering:animate-in entering:fade-in entering:zoom-in-95
          exiting:animate-out exiting:fade-out exiting:zoom-out-95 sm:w-48"
        >
          <Menu
            className="rounded-lg p-1 outline-none *:flex *:w-full *:cursor-pointer *:items-center
            *:rounded-md *:px-2 *:py-1.5 *:text-left *:text-sm *:outline-none hover:*:bg-background"
          >
            <MenuItem className="text-foreground/80">
              <ExternalLinkIcon className="mr-2 size-4" />
              <span>Share</span>
            </MenuItem>

            <MenuItem className="text-foreground/80">
              <LinkIcon className="mr-2 size-4" />
              <span>Copy link</span>
            </MenuItem>

            <MenuItem
              className="text-danger"
              onAction={() => setIsDelete(true)}
            >
              <TrashIcon className="mr-2 size-4" />
              <span>Delete</span>
            </MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>

      <ModalOverlay
        isOpen={isDelete}
        onOpenChange={setIsDelete}
        className={({ isEntering, isExiting }) => `
          fixed inset-0 z-50 flex min-h-full items-center justify-center overflow-y-auto bg-black/40 p-4 text-center
          ${isEntering ? 'duration-150 ease-out animate-in fade-in' : ''}
          ${isExiting ? 'duration-150 ease-in animate-out fade-out' : ''}
        `}
      >
        <Modal
          className={({ isEntering, isExiting }) => `
            w-full max-w-72 overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl
            ${isEntering ? 'duration-150 ease-out animate-in zoom-in-95' : ''}
            ${isExiting ? 'duration-150 ease-in animate-out zoom-out-95' : ''}
          `}
        >
          <Dialog
            aria-label="Delete folder"
            role="alertdialog"
            className="relative outline-none"
          >
            {({ close }) => (
              <>
                <p className="text-center text-foreground/80">
                  Are you sure you want to delete this page?
                </p>
                <div className="mt-6 space-y-2">
                  <Button
                    className="w-full rounded border border-danger bg-danger/10 px-4 py-1.5 text-sm text-danger"
                    onPress={() => deleteAction().then(close)}
                  >
                    Yes, Delete this page
                  </Button>
                  <Button
                    className="w-full rounded border border-border px-4 py-1.5 text-sm text-foreground"
                    onPress={close}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  )
}

export default Folders
