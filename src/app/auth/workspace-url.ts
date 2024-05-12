import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Workspace } from '@/lib/schemas/workspace'
import { getEnv } from '@/lib/server/cf'

export const workspaceUrl = async (userId: string) => {
  const env = getEnv()
  const workspaceId = cookies().get('workspaceId')

  if (workspaceId) {
    return redirect(`/work/${workspaceId}/home`)
  }

  const workspace = await env.db
    .prepare(
      `SELECT * FROM workspaces
      WHERE created_by=?
      ORDER BY created_at DESC`,
    )
    .bind(userId)
    .first<Workspace>()

  if (!workspace) {
    return '/work/add'
  }

  return `/work/${workspace.id}/home`
}
