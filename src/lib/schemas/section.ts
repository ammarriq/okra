import {
  length,
  minLength,
  nullable,
  number,
  object,
  string,
  pipe,
  InferInput,
} from 'valibot'

export const SectionSchema = object({
  id: pipe(
    string(), //
    length(15, 'Id is required'),
  ),
  name: pipe(
    string(), //
    minLength(1, 'Name is required'),
  ),
  rank: pipe(
    string(), //
    minLength(1, 'Rank is required'),
  ),
  folder_id: pipe(
    string(), //
    length(15, 'Folder is required'),
  ),
  created_by: pipe(
    string(), //
    length(15, 'User is required'),
  ),
  updated_at: nullable(number()),
  created_at: number(),
})

export type Section = InferInput<typeof SectionSchema>
