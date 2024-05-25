import * as z from 'zod'

export const TaskSchema = z.object({
  id: z.string().length(15, 'Id is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required').nullable(),
  rank: z.string().min(1, 'Rank is required'),
  due_date: z.number().nullable(),
  section_id: z.string().min(15, 'Section is required'),
  created_by: z.string().length(15, 'User is required'),
  updated_at: z.number().nullable(),
  created_at: z.number(),
})

export type Task = z.output<typeof TaskSchema>
