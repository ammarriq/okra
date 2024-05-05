import {
  BarChartIcon,
  ChatBubbleIcon,
  ChecklistIcon,
  FolderIcon,
  HomeIcon,
  UsersGroupIcon,
} from '@/lib/icons'
import { cn } from '@/lib/utils/cn'

import { Workspaces } from './Workspaces'

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

const projects = [
  {
    created_at: 1714529628453,
    created_by: 'sgzwgyl0dh8wrr8',
    icon: null,
    id: 'vabbxbkue11wh4q',
    name: 'Cebr',
    updated_at: 1714529725082,
    workspace_id: '5i1scnedg4nbdy6',
  },
]

type Props = {
  dialog?: boolean
}

const Sidebar = ({ dialog }: Props) => {
  return (
    <aside
      className={cn(
        `fixed inset-0 z-20 row-span-2 grid h-screen w-full grid-rows-[auto_auto_auto_minmax(0,1fr)]
        gap-4 bg-background px-3.5 py-2 lg:sticky lg:top-0 lg:w-60 lg:px-4`,
        dialog ? '' : 'hidden lg:grid',
      )}
    >
      <a href="/app" className="max-w-max text-xl lg:mx-0 lg:text-xl">
        <div className="{props.class} font-bold">okra</div>
      </a>

      <Workspaces />

      <nav className="flex h-full flex-col gap-1">
        {menu.map(({ title, url, icon: Icon }) => (
          <a
            key={url}
            href={`/app/${'someId'}/${url}`}
            className={cn(
              'flex w-full items-center justify-start gap-2.5 rounded-lg p-1.5 lg:px-2.5 lg:py-2',
              true ? 'border border-transparent text-foreground/50' : '',
            )}
          >
            <Icon className="size-5" />
            <span className="text-sm font-medium capitalize">
              {title.replaceAll('-', ' ')}
            </span>
          </a>
        ))}
      </nav>

      <nav className="flex h-full flex-col gap-1 pt-4">
        <hgroup className="mb-2 flex items-center px-1.5 text-foreground/50 lg:px-2.5">
          <h3 className="text-sm font-semibold">Pages</h3>
          <form
            className="ml-auto"
            action="/app/{workspaceId}?/add_project"
            method="post"
          >
            <button type="submit" className="icon-[ph--plus-bold]"></button>
          </form>
        </hgroup>

        {projects.map((project) => (
          <div
            key={project.id}
            className={cn(
              'group relative flex w-full items-center justify-start gap-2.5 rounded-lg p-1.5 lg:px-2.5 lg:py-2',
              true ? 'border border-transparent text-foreground/50' : '',
            )}
          >
            <FolderIcon className="size-5" />

            <a
              href="#"
              className="w-0 grow truncate whitespace-nowrap text-sm font-medium after:absolute after:inset-0"
            >
              {project.name || 'Untitled'}
            </a>
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar

{
  /* <script lang="ts">
	import type { Project } from '$lib/schemas/project'
	import type { Workspace } from '$lib/schemas/workspace'

	import { enhance } from '$app/forms'
	import { page } from '$app/stores'

	import { menu } from '$lib/utils/menu'
	import Logo from '$components/logo.svelte'

	import ProjectActions from './project-actions.svelte'
	import Workspaces from './workspaces.svelte'

	interface Props {
		isShown: boolean
		workspaces: Workspace[]
		projects: Project[]
	}

	let { isShown = $bindable(), workspaces, projects }: Props = $props()

	const workspaceId = $derived($page.params.workspaceId)
</script>



<style lang="postcss">
	.inactive {
		@apply border border-transparent text-foreground/50;
	}

	.active {
		@apply border-border border bg-white text-foreground;
	}

	.anchor:hover {
		@apply border-border border bg-white text-foreground;
	}
</style> */
}
