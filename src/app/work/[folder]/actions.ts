'use server'

import { redirect } from 'next/navigation'

import { getUser, redirectToLogin } from '@/lib/auth'
import { Folder } from '@/lib/schemas/folder'
import { getEnv } from '@/lib/server/cf'

// export const createFolder = async (id: string) => {
//   const env = getEnv()

//   const user = await getUser()
//   if (!user) return redirectToLogin()

//   const folder: Folder = {
//     id,
//     name: null,
//     icon: '',
//     updated_at: null,
//     created_at: Date.now(),
//     created_by: user.id,
//   }

//   await env.db
//     .prepare(
//       `INSERT INTO folders
//       (id, created_by, created_at)
//       VALUES(?, ?, ?)`,
//     )
//     .bind(folder.id, folder.created_by, folder.created_at)
//     .run()

//   return redirect(`/work/${folder.id}`)
// }

// export const deleteFolder = async (id: string) => {
//   const env = getEnv()

//   const user = await getUser()
//   if (!user) return redirectToLogin()

//   await env.db
//     .prepare(
//       `DELETE FROM folders
//       WHERE id=? AND created_by=?`,
//     )
//     .bind(id, user.id)
//     .run()
// }
