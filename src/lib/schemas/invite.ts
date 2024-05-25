import * as z from 'zod'

export const InviteSchema = z.object({
  id: z.string().length(15, 'Id is required'),
  folder_id: z.string().length(15, 'Folder is required'),
  email: z.string().email('Email is required'),
  created_at: z.number(),
})

export type Invite = z.output<typeof InviteSchema>
