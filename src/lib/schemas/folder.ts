import * as z from 'zod'

export const FolderSchema = z.object({
  id: z.string().length(15, 'Id is required'),
  name: z.string().min(1, 'Name is reuired').nullable(),
  icon: z.string(),
  created_by: z.string().length(15, 'User is required'),
  updated_at: z.number().nullable(),
  created_at: z.number(),
})

export type Folder = z.output<typeof FolderSchema>
