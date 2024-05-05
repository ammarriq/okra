'use client'

import { useRef } from 'react'
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  Separator,
} from 'react-aria-components'

import {
  ChevronDown,
  CircleFilledIcon,
  CircleIcon,
  PlusIcon,
} from '@/lib/icons'

export const Workspaces = () => {
  return (
    <MenuTrigger>
      <Button
        aria-label="Menu"
        className="flex items-center gap-2 rounded-xl border border-border bg-white p-1.5 outline-none"
      >
        <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-orange-500 text-white">
          {"Ammar Iqbal's Workspace".slice(0, 1)}
        </div>

        <p className="grid overflow-hidden text-left">
          <span className="text-xs font-medium text-foreground/40">
            Workspace
          </span>
          <span className="truncate text-sm font-medium">
            {"Ammar Iqbal's Workspace"}
          </span>
        </p>

        <ChevronDown className="ml-auto mr-0.5 size-4 shrink-0" />
      </Button>
      <Popover
        className="w-52 origin-top-left rounded-lg border-border bg-white p-1 shadow fill-mode-forwards
        entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95"
      >
        <Menu className="outline-none">
          <MenuItem
            href={`/app/${'id'}/home`}
            className="flex w-full cursor-pointer items-center rounded-md p-1 outline-none data-[focused]:bg-background"
          >
            <div className="grid size-6 shrink-0 place-items-center rounded bg-orange-500 text-xs text-white">
              {'Something'.slice(0, 1)}
            </div>

            <p className="ml-2 truncate whitespace-nowrap text-sm font-medium">
              {'Something'}
            </p>

            <label className="group ml-auto flex rounded-full bg-white">
              <input type="radio" className="peer" hidden defaultChecked />

              <CircleFilledIcon className="hidden size-[1.1rem] shrink-0 text-green-500 peer-checked:block" />
              <CircleIcon className="block size-[1.1rem] shrink-0 text-gray-300 peer-checked:hidden" />
            </label>
          </MenuItem>

          <Separator className="my-1 h-px w-full bg-border" />

          <MenuItem
            href="/app/workspace"
            className="flex w-full cursor-pointer items-center rounded-md p-1 outline-none data-[focused]:bg-background"
          >
            <PlusIcon className="size-3" />
            <span className="ml-2 text-sm font-medium">New Workspace</span>
          </MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}
