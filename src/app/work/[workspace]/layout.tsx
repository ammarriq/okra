import { getRequestContext } from '@cloudflare/next-on-pages'

import { redirectToLogin, validateRequest } from '@/lib/auth'

import Header from './-components/header'
import Sidebar from './-components/sidebar'

type Props = {
  params: { workspace: string }
  children: React.ReactNode
}

const Layout = async ({ params, children }: Props) => {
  const { env } = getRequestContext()
  const { user } = await validateRequest(env.db)

  if (!user) {
    return redirectToLogin()
  }

  return (
    <main className="mx-auto grid h-full grid-rows-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)]">
      <Sidebar user={user} workspaceId={params.workspace} />
      <Header user={user} workspaceId={params.workspace} />

      <div className="h-full overflow-y-auto px-4 pb-3">{children}</div>
    </main>
  )
}

export default Layout
