// 'use client'

// import type { Workspace } from '@/lib/schemas/workspace'

// import {
//   Button,
//   Menu,
//   MenuItem,
//   Popover,
//   Separator,
//   SubmenuTrigger,
// } from 'react-aria-components'

// import {
//   CaretUpDownIcon,
//   CircleFilledIcon,
//   CircleIcon,
//   PlusIcon,
// } from '@/lib/icons'

// type Props = {
//   currentWorkspace: Workspace
//   workspaces: Workspace[]
// }

// export const Workspaces = ({ currentWorkspace, workspaces }: Props) => {
//   return (
//     <SubmenuTrigger>
//       <Button
//         aria-label="Menu"
//         className="flex items-center gap-2 rounded-xl border border-border bg-white p-1.5 outline-none"
//       >
//         <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-orange-500 text-white">
//           {currentWorkspace.name.slice(0, 1)}
//         </div>

//         <p className="grid overflow-hidden text-left">
//           <span className="text-xs font-medium text-foreground/40">
//             Workspace
//           </span>
//           <span className="truncate text-sm font-medium">
//             {currentWorkspace.name}
//           </span>
//         </p>

//         <CaretUpDownIcon className="ml-auto mr-0.5 size-4 shrink-0" />
//       </Button>
//       <Popover
//         className="w-[--trigger-width] origin-top-left overflow-hidden rounded-lg border-border bg-white shadow fill-mode-forwards
//         entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95"
//       >
//         <Menu className="p-1 outline-none">
//           {workspaces.map((o) => (
//             <MenuItem
//               key={o.id}
//               href={`/work/${o.id}/home`}
//               className="flex w-full cursor-pointer items-center rounded-md p-1 outline-none data-[focused]:bg-background"
//             >
//               <div className="grid size-6 shrink-0 place-items-center rounded bg-orange-500 text-xs text-white">
//                 {o.name.slice(0, 1)}
//               </div>

//               <p className="ml-2 truncate whitespace-nowrap text-sm font-medium">
//                 {o.name}
//               </p>

//               <label className="group ml-auto flex rounded-full bg-white">
//                 <input
//                   type="radio"
//                   className="peer"
//                   defaultChecked={o.id === currentWorkspace.id}
//                   hidden
//                 />

//                 <CircleFilledIcon className="hidden size-[1.1rem] shrink-0 text-green-500 peer-checked:block" />
//                 <CircleIcon className="block size-[1.1rem] shrink-0 text-gray-300 peer-checked:hidden" />
//               </label>
//             </MenuItem>
//           ))}

//           <Separator className="my-1 h-px w-full bg-border" />

//           <MenuItem
//             href="/work/add"
//             className="flex w-full cursor-pointer items-center rounded-md p-1 outline-none data-[focused]:bg-background"
//           >
//             <PlusIcon className="size-3" />
//             <span className="ml-2 text-sm font-medium">New Workspace</span>
//           </MenuItem>
//         </Menu>
//       </Popover>
//     </SubmenuTrigger>
//   )
// }
