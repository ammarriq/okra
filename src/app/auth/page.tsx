import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { validateRequest } from '@/lib/auth'
import { GoogleIcon } from '@/lib/icons'
import { Workspace } from '@/lib/schemas/workspace'
import { getEnv } from '@/lib/server/cf'

export const runtime = 'edge'

type Props = {
  searchParams?: { redirectTo?: string }
}

const Page = async ({ searchParams }: Props) => {
  const env = getEnv()
  const { user } = await validateRequest(env.db)

  if (user) {
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
      return redirect('/work/add')
    }

    return redirect(`/work/${workspace.id}/home`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-3.5 py-20">
      <p className="pb-4 text-4xl font-bold">Log in</p>
      <Link
        href={`/auth/google?redirectTo=${searchParams?.redirectTo ?? ''}`}
        className="flex w-full max-w-60 items-center justify-center gap-2
        rounded border py-2 text-sm font-medium hover:bg-gray-100"
      >
        <GoogleIcon />
        Continue with Google
      </Link>
    </main>
  )
}

export default Page
