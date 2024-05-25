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

export const TaskSchema = object({
  id: pipe(
    string(), //
    length(15, 'Id is required'),
  ),
  name: pipe(
    string(), //
    minLength(1, 'Name is required'),
  ),
  description: nullable(
    pipe(
      string(), //
      minLength(1, 'Description is required'),
    ),
  ),
  rank: pipe(
    string(), //
    minLength(1, 'Rank is required'),
  ),
  due_date: nullable(number('Due date is required')),
  section_id: pipe(
    string(), //
    minLength(15, 'Section is required'),
  ),
  created_by: pipe(
    string(), //
    length(15, 'User is required'),
  ),
  updated_at: nullable(number()),
  created_at: number(),
})

export type Task = InferInput<typeof TaskSchema>
