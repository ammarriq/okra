'use client'

import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from 'react-aria-components'

import { LogoutIcon } from '@/lib/icons'
import Avatar from '@/components/avatar'

type Props = {
  name: string
  picture: string
}

const UserProfile = ({ name, picture }: Props) => {
  return (
    <MenuTrigger>
      <Button className="ml-auto flex overflow-hidden rounded-full border border-border">
        <Avatar
          className="size-8 shrink-0 bg-background"
          src={picture}
          fallback={name.slice(0, 1)}
        />
      </Button>
      <Popover
        className="w-44 origin-top-left rounded-lg border-border bg-white p-1 shadow fill-mode-forwards
        entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95"
      >
        <Menu className="outline-none">
          <MenuItem
            href={`/app/${'id'}/home`}
            className="flex w-full cursor-pointer items-center rounded-md px-2 py-1 text-sm outline-none data-[focused]:bg-background"
          >
            <LogoutIcon className="mr-2 size-4" />
            Logout
          </MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}

export default UserProfile
