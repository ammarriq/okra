import Link from 'next/link'
import { notFound } from 'next/navigation'

import { QueryClient } from '@tanstack/react-query'
import { User } from 'lucia'

import {
  BarChartIcon,
  ChatBubbleIcon,
  ChecklistIcon,
  HomeIcon,
  UsersGroupIcon,
} from '@/lib/icons'
import { Folder } from '@/lib/schemas/folder'
import { getEnv } from '@/lib/server/cf'
import { getSessionCookie } from '@/lib/server/cookie'
import { cn } from '@/lib/utils/cn'
import { getFolders } from '@/app-server/queries/folders'

import Pathname from './active-pathname'
import Folders from './folders'

const menu = [
  {
    icon: HomeIcon,
    title: 'home',
    url: 'home',
  },
  {
    icon: ChecklistIcon,
    title: 'tasks',
    url: 'tasks',
  },
  {
    icon: ChatBubbleIcon,
    title: 'chat',
    url: 'chat',
  },
  {
    icon: UsersGroupIcon,
    title: 'user-management',
    url: 'user-management',
  },
  {
    icon: BarChartIcon,
    title: 'analytics',
    url: 'analytics',
  },
]

type Props = {
  params: { workspace: string; folder?: string }
  user: User
  dialog?: boolean
}

const Sidebar = async ({ dialog, user, params }: Props) => {
  const queryClient = new QueryClient()
  const folders = await queryClient.fetchQuery({
    queryKey: ['folders', params.workspace],
    queryFn: () => {
      return getFolders({
        cookie: getSessionCookie(),
        params: { workspace_id: params.workspace },
      })
    },
  })

  if (!folders) return notFound()

  return (
    <aside
      className={cn(
        `fixed inset-0 z-20 row-span-2 grid h-screen w-full grid-rows-[auto_auto_auto_minmax(0,1fr)]
        gap-4 bg-background py-2 lg:sticky lg:top-0 lg:w-60`,
        dialog ? '' : 'hidden lg:grid',
      )}
    >
      <Link
        href={`/work/${params.workspace}`}
        className="max-w-max px-3.5 text-xl lg:mx-0 lg:px-4 lg:text-xl"
      >
        <div className="{props.class} font-bold">okra</div>
      </Link>

      <nav className="grid h-full gap-1 px-3.5 lg:px-4">
        {menu.map(({ title, url, icon: Icon }) => (
          <Pathname
            key={url}
            className="relative flex w-full items-center gap-2.5 rounded-lg
            border border-transparent p-1.5 text-foreground/50 lg:px-2.5 lg:py-2"
            activeClass="border-border bg-white text-foreground"
            includes={url}
          >
            <Icon className="size-5" />

            <Link
              href={`/work/${params.workspace}/${url}`}
              className="w-0 grow truncate whitespace-nowrap text-sm
              font-medium capitalize after:absolute after:inset-0"
            >
              {title.replaceAll('-', ' ')}
            </Link>
          </Pathname>
        ))}
      </nav>

      <Folders folders={folders} userId={user.id} />
    </aside>
  )
}

export default Sidebar
