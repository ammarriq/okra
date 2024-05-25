import * as z from 'zod'

export const SectionSchema = z.object({
  id: z.string().length(15, 'Id is required'),
  name: z.string().min(1, 'Name is required'),
  rank: z.string().min(1, 'Rank is required'),
  folder_id: z.string().length(15, 'Folder is required'),
  created_by: z.string().length(15, 'User is required'),
  updated_at: z.number().nullable(),
  created_at: z.number(),
})

export type Section = z.output<typeof SectionSchema>
