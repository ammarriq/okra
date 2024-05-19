import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

import { QueryClient } from '@tanstack/react-query'

import { getUser, redirectToLogin } from '@/lib/auth'
import { Folder as TFolder } from '@/lib/schemas/folder'
import { getSessionCookie } from '@/lib/server/cookie'
import { createId } from '@/lib/utils/random'
import { getFolder } from '@/app-server/queries/folders'
import DeleteCookie from '@/components/delete-cookie'

import Folder from './folder'

type Props = {
  params: { workspace: string; folder: string }
}

const Page = async ({ params }: Props) => {
  const user = await getUser()
  if (!user) return redirectToLogin()

  const folder_id = cookies().get('folder_id')?.value

  if (folder_id) {
    const folder: TFolder = {
      id: createId(15),
      name: '',
      icon: '',
      workspace_id: params.workspace,
      updated_at: null,
      created_at: Date.now(),
      created_by: user.id,
    }

    return (
      <DeleteCookie name="folder_id">
        <Folder folder={folder} />
      </DeleteCookie>
    )
  }

  const queryClient = new QueryClient()
  const folder = await queryClient.fetchQuery({
    queryKey: ['folders', params.folder],
    queryFn: () => {
      return getFolder({
        cookie: getSessionCookie(),
        params: { id: params.folder },
      })
    },
  })

  if (!folder) {
    return notFound()
  }

  return <Folder folder={folder} />
}

export default Page
