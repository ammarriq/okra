import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { User } from 'lucia'

import { CommandIcon, SearchIcon } from '@/lib/icons'
import { getWorkspaces } from '@/app-server/queries/workspaces'

import ProfileDropdown from './profile-dropdown'
import Sidebar from './sidebar'
import SidebarToggle from './sidebar-toggle'

type Props = {
  params: { workspace: string }
  user: User
}

const Header = async ({ user, params }: Props) => {
  const queryClient = new QueryClient()
  const workspaces = await queryClient.fetchQuery({
    queryKey: ['workspaces'],
    queryFn: () => {
      return getWorkspaces({
        cookie: headers().get('cookie') ?? '',
      })
    },
  })

  const workspace = workspaces?.find((o) => o.id === params.workspace)

  if (!workspace) return notFound()

  return (
    <header className="sticky top-0 flex bg-white px-4 py-3 lg:items-center">
      <SidebarToggle>
        <Sidebar dialog user={user} params={params} />
      </SidebarToggle>

      <form method="get" className="relative w-full max-w-[14rem] md:max-w-xs">
        <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground/50" />

        <input
          type="text"
          name="search"
          className="block h-full w-full rounded-md bg-background pl-8 pr-4 text-sm
          placeholder:text-sm placeholder:font-medium placeholder:text-foreground/50 md:py-[0.4rem] md:pr-16"
          placeholder="Search anything"
        />

        <div className="absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-2 md:flex">
          <kbd className="grid size-5 place-items-center rounded bg-white text-sm text-foreground/50 shadow">
            <CommandIcon />
          </kbd>

          <kbd className="grid size-5 place-items-center rounded bg-white text-sm text-foreground/50 shadow">
            K
          </kbd>
        </div>
      </form>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfileDropdown user={user} currentWorkspace={workspace} />
      </HydrationBoundary>
    </header>
  )
}

export default Header
