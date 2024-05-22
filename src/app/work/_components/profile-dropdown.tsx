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

import { ChatBubbleIcon, FolderIcon, HomeIcon, LogoutIcon } from '@/lib/icons'
import Avatar from '@/components/avatar'

import { logout } from '../actions'

type Props = {
  user: User
}

const ProfileDropdown = ({ user }: Props) => {
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
        className="origin-top-right rounded-lg border border-border bg-white shadow fill-mode-forwards entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95 sm:w-48"
      >
        <Menu className="outline-none">
          <Section className="flex flex-col truncate pt-2 font-medium">
            <Header className="border-b px-2.5 pb-2 text-sm font-semibold">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="truncate text-xs text-foreground/50">
                {user.email}
              </p>
            </Header>

            <MenuItem
              className="flex w-full cursor-pointer items-center px-2.5 py-2 outline-none data-[focused]:bg-background"
              onAction={logout}
            >
              <HomeIcon className="size-4" />
              <span className="ml-2 text-sm font-medium">Home</span>
            </MenuItem>

            <MenuItem
              className="flex w-full cursor-pointer items-center px-2.5 py-2 outline-none data-[focused]:bg-background"
              onAction={logout}
            >
              <ChatBubbleIcon className="size-4" />
              <span className="ml-2 text-sm font-medium">Chat</span>
            </MenuItem>

            <MenuItem
              className="flex w-full cursor-pointer items-center px-2.5 py-2 outline-none data-[focused]:bg-background"
              onAction={logout}
            >
              <FolderIcon className="size-4" />
              <span className="ml-2 text-sm font-medium">Okra</span>
            </MenuItem>

            <MenuItem
              className="mt-auto flex w-full cursor-pointer items-center border-t border-border px-2.5 py-2 outline-none data-[focused]:bg-background"
              onAction={logout}
            >
              <LogoutIcon className="size-4" />
              <span className="ml-2 text-sm font-medium">Logout</span>
            </MenuItem>
          </Section>
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}

export default ProfileDropdown
