import { User } from 'lucia'

import { CommandIcon, SearchIcon } from '@/lib/icons'

import Sidebar from './sidebar'
import SidebarToggle from './sidebar-toggle'
import UserProfile from './user-profile'

type Props = {
  user: User
  workspaceId: string
}

const Header = async ({ user, workspaceId }: Props) => {
  return (
    <header className="sticky top-0 flex bg-white px-4 py-3 lg:items-center">
      <SidebarToggle>
        <Sidebar dialog user={user} workspaceId={workspaceId} />
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

      <UserProfile name={user.name} picture={user.picture} />
    </header>
  )
}

export default Header
