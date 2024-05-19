import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

import { serializeCookie } from 'oslo/cookie'

import { getUser, initLucia } from '@/lib/auth'
import { Folder as TFolder } from '@/lib/schemas/folder'
import { getEnv } from '@/lib/server/cf'
import { hc } from '@/app-server/hono'
import DeleteCookie from '@/components/delete-cookie'

import { createFolder } from './actions'
import Folder from './folder'

type Props = {
  params: { workspace: string; folder: string }
}

const Page = async ({ params }: Props) => {
  const env = getEnv()
  const cookie = cookies().get(initLucia(env.db).sessionCookieName)
  if (!cookie?.name || !cookie.value) return <p>Something went wrong</p>

  const res = await hc.workspaces.$get(undefined, {
    headers: { Cookie: serializeCookie(cookie.name, cookie.value, {}) },
  })

  const data = await res.json()

  // const user = await getUser()
  // const folder_id = cookies().get('folder_id')?.value

  // if (folder_id) {
  //   const folder = await createFolder(folder_id, params.workspace)
  //   return (
  //     <DeleteCookie name="folder_id">
  //       <Folder folder={folder} />
  //     </DeleteCookie>
  //   )
  // }

  // const env = getEnv()
  // const folder = await env.db
  //   .prepare('SELECT * FROM folders WHERE id=? AND created_by=?')
  //   .bind(params.folder, user.id)
  //   .first<TFolder>()

  // if (!folder) {
  //   return notFound()
  // }

  // return <Folder folder={folder} />

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default Page
