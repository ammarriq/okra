import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getRequestContext } from '@cloudflare/next-on-pages'

import { redirectToLogin, validateRequest } from '@/lib/auth'
import { Workspace } from '@/lib/schemas/workspace'

export const GET = async () => {
  const { env } = getRequestContext()
  const { user } = await validateRequest(env.db)

  if (!user) {
    return redirectToLogin()
  }

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
    .bind(user.id)
    .first<Workspace>()

  if (!workspace) {
    return redirect('/work/workspace')
  }

  return redirect(`/work/${workspace.id}/home`)
}
