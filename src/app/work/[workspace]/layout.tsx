import { getUser } from '@/lib/auth'

import Header from './_components/header'
import Sidebar from './_components/sidebar'

type Props = {
  params: { workspace: string }
  children: React.ReactNode
}

const Layout = async ({ params, children }: Props) => {
  const user = await getUser()

  return (
    <main className="mx-auto grid h-full grid-rows-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)]">
      <Sidebar params={params} user={user} />
      <Header params={params} user={user} />

      <div className="h-full overflow-y-auto px-4 pb-3">{children}</div>
    </main>
  )
}

export default Layout
