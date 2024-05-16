'use server'

import { getUser } from '@/lib/auth'
import { Folder } from '@/lib/schemas/folder'
import { getEnv } from '@/lib/server/cf'

export const createFolder = async (id: string, workspace_id: string) => {
  const env = getEnv()
  const user = await getUser()

  const folder: Folder = {
    id,
    name: null,
    icon: '',
    workspace_id,
    updated_at: null,
    created_at: Date.now(),
    created_by: user.id,
  }

  await env.db
    .prepare(
      `INSERT INTO folders
      (id, workspace_id, created_by, created_at)
      VALUES(?, ?, ?, ?)`,
    )
    .bind(folder.id, folder.workspace_id, folder.created_by, folder.created_at)
    .run()

  return folder
}
