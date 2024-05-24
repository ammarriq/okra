import { cookies, headers } from 'next/headers'
import { notFound } from 'next/navigation'

import { QueryClient } from '@tanstack/react-query'

import { getUser, redirectToLogin } from '@/lib/auth'
import { Folder as TFolder } from '@/lib/schemas/folder'
import { getFolder } from '@/app-server/queries/folders'

import Folder from './folder'

type Props = {
  params: { workspace: string; folder: string }
}

const Page = async ({ params }: Props) => {
  const user = await getUser()
  if (!user) return redirectToLogin()

  const folderCookie = cookies().get(params.folder)?.value ?? '""'
  const parsedFolder = JSON.parse(folderCookie) as TFolder

  if (parsedFolder) {
    return <Folder folder={parsedFolder} />
  }

  const queryClient = new QueryClient()
  const { data: folder } = await queryClient.fetchQuery({
    queryKey: ['folders', params.folder],
    queryFn: () => {
      return getFolder({
        cookie: headers().get('cookie') ?? '',
        where: { id: params.folder },
      })
    },
  })

  if (!folder) return notFound()
  return <Folder folder={folder} />
}

export default Page
