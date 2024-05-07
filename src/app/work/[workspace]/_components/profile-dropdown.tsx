'use client'

import {
  Button,
  Header,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from 'react-aria-components'
import { Section } from 'react-aria-components'

import { User } from 'lucia'

import {
  ChatBubbleIcon,
  CircleFilledIcon,
  CircleIcon,
  FolderIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
} from '@/lib/icons'
import { Workspace } from '@/lib/schemas/workspace'
import Avatar from '@/components/avatar'

import { logout } from '../actions'

type Props = {
  user: User
  workspaces: Workspace[]
  currentWorkspace: Workspace
}

const UserProfile = ({ user, workspaces, currentWorkspace }: Props) => {
  return (
    <MenuTrigger>
      <Button className="ml-auto flex overflow-hidden rounded-full border border-border">
        <Avatar
          className="size-8 shrink-0 bg-background"
          src={user.picture}
          fallback={user.name.slice(0, 1)}
        />
      </Button>
      <Popover
        placement="top right"
        className="mr-4 w-11/12 origin-top-left divide-x rounded-lg border border-border
        bg-white shadow fill-mode-forwards entering:animate-in entering:fade-in entering:zoom-in-95
        exiting:animate-out exiting:fade-out exiting:zoom-out-95 sm:w-96"
      >
        <Menu className="grid grid-cols-2 outline-none">
          <Section className="flex flex-col border-r pt-2 font-medium">
            <Header className="mb-2 px-2.5 text-sm font-semibold">
              Workspaces
            </Header>

            {/* <Section className="flex flex-col truncate text-sm outline-none"> */}
            {workspaces.map((o) => (
              <MenuItem
                key={o.id}
                href={`/work/${o.id}/home`}
                className="flex w-full cursor-pointer items-center truncate px-2.5 py-2 outline-none data-[focused]:bg-background"
              >
                <div className="grid size-6 shrink-0 place-items-center rounded bg-orange-500 text-xs text-white">
                  {o.name.slice(0, 1)}
                </div>

                <p className="ml-2 truncate whitespace-nowrap text-sm font-medium">
                  {o.name}
                </p>

                <label className="group ml-auto flex rounded-full bg-white">
                  <input
                    type="radio"
                    className="peer"
                    defaultChecked={o.id === currentWorkspace.id}
                    hidden
                  />

                  <CircleFilledIcon className="hidden size-[1.1rem] shrink-0 text-green-500 peer-checked:block" />
                  <CircleIcon className="block size-[1.1rem] shrink-0 text-gray-300 peer-checked:hidden" />
                </label>
              </MenuItem>
            ))}

            <MenuItem
              href="/work/add"
              className="mt-auto flex w-full cursor-pointer items-center border-t border-border px-2.5 py-2 outline-none data-[focused]:bg-background"
            >
              <PlusIcon className="size-3" />
              <span className="ml-2 text-sm font-medium">New Workspace</span>
            </MenuItem>
            {/* </Section> */}
          </Section>

          <Section className="flex flex-col border-r pt-2 font-medium">
            <Header className="border-b px-2.5 pb-2 text-sm font-semibold">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-foreground/50">{user.email}</p>
            </Header>

            {/* <Section className="flex flex-col truncate text-sm outline-none"> */}
            {/* {workspaces.map((o) => (
              <MenuItem
                key={o.id}
                href={`/work/${o.id}/home`}
                className="flex w-full cursor-pointer items-center px-2.5 py-2 outline-none data-[focused]:bg-background"
              >
                <div className="grid size-6 shrink-0 place-items-center rounded bg-orange-500 text-xs text-white">
                  {o.name.slice(0, 1)}
                </div>

                <p className="ml-2 truncate whitespace-nowrap text-sm font-medium">
                  {o.name}
                </p>

                <label className="group ml-auto flex rounded-full bg-white">
                  <input
                    type="radio"
                    className="peer"
                    defaultChecked={o.id === currentWorkspace.id}
                    hidden
                  />

                  <CircleFilledIcon className="hidden size-[1.1rem] shrink-0 text-green-500 peer-checked:block" />
                  <CircleIcon className="block size-[1.1rem] shrink-0 text-gray-300 peer-checked:hidden" />
                </label>
              </MenuItem>
            ))} */}
            <MenuItem
              href="/work/add"
              className="flex w-full cursor-pointer items-center px-2.5 py-2 outline-none data-[focused]:bg-background"
              onAction={logout}
            >
              <HomeIcon className="size-4" />
              <span className="ml-2 text-sm font-medium">Home</span>
            </MenuItem>
            <MenuItem
              href="/work/add"
              className="flex w-full cursor-pointer items-center px-2.5 py-2 outline-none data-[focused]:bg-background"
              onAction={logout}
            >
              <ChatBubbleIcon className="size-4" />
              <span className="ml-2 text-sm font-medium">Chat</span>
            </MenuItem>
            <MenuItem
              href="/work/add"
              className="flex w-full cursor-pointer items-center px-2.5 py-2 outline-none data-[focused]:bg-background"
              onAction={logout}
            >
              <FolderIcon className="size-4" />
              <span className="ml-2 text-sm font-medium">Okra</span>
            </MenuItem>

            <MenuItem
              href="/work/add"
              className="mt-auto flex w-full cursor-pointer items-center border-t border-border px-2.5 py-2 outline-none data-[focused]:bg-background"
              onAction={logout}
            >
              <LogoutIcon className="size-4" />
              <span className="ml-2 text-sm font-medium">Logout</span>
            </MenuItem>
          </Section>
          {/* </Section> */}
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}

export default UserProfile