import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

import { getUser } from '@/lib/auth'
import { Folder as TFolder } from '@/lib/schemas/folder'
import { getEnv } from '@/lib/server/cf'
import DeleteCookie from '@/components/delete-cookie'

import { createFolder } from './actions'
import Folder from './folder'

type Props = {
  params: { workspace: string; folder: string }
}

const Page = async ({ params }: Props) => {
  const user = await getUser()
  const folder_id = cookies().get('folder_id')?.value

  if (folder_id) {
    const folder = await createFolder(folder_id, params.workspace)
    return (
      <DeleteCookie name="folder_id">
        <Folder folder={folder} />
      </DeleteCookie>
    )
  }

  const env = getEnv()
  const folder = await env.db
    .prepare('SELECT * FROM folders WHERE id=? AND created_by=?')
    .bind(params.folder, user.id)
    .first<TFolder>()

  if (!folder) {
    return notFound()
  }

  return <Folder folder={folder} />
}

export default Page
