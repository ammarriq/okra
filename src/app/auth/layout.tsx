import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { validateRequest } from '@/lib/auth'
import { Workspace } from '@/lib/schemas/workspace'
import { getEnv } from '@/lib/server/cf'

type Props = {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  const env = getEnv()
  const { user } = await validateRequest(env.db)

  if (!user) return <>{children}</>

  const workspaceId = cookies().get('workspaceId')

  if (workspaceId) {
    return redirect(`/work/${workspaceId}/home`)
  }

  const workspace = await env.db
    .prepare(
      `SELECT * FROM workspaces WHERE created_by=? ORDER BY created_at DESC`,
    )
    .bind(user.id)
    .first<Workspace>()

  if (!workspace) {
    return redirect('/work/add')
  }

  return redirect(`/work/${workspace.id}/home`)
}

export default Layout
