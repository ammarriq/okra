import {
  InferInput,
  email,
  length,
  number,
  object,
  pipe,
  string,
} from 'valibot'

export const InviteSchema = object({
  id: pipe(
    string(), //
    length(15, 'Id is required'),
  ),
  folder_id: pipe(
    string(), //
    length(15, 'Folder is required'),
  ),
  email: pipe(
    string(), //
    email('Email is required'),
  ),
  created_at: number(),
})

export type Invite = InferInput<typeof InviteSchema>
