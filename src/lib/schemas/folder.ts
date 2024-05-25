import {
  blob,
  length,
  maxSize,
  mimeType,
  minLength,
  nullable,
  number,
  object,
  string,
  pipe,
  InferInput,
} from 'valibot'

export const FolderSchema = object({
  id: pipe(
    string(), //
    length(15, 'Id is required'),
  ),
  name: nullable(
    pipe(
      string(), //
      minLength(1, 'Name is required'),
    ),
  ),
  icon: pipe(
    blob(),
    mimeType(['image/png', 'image/jpeg'], 'Only JPEG/PNG allowed'),
    maxSize(1024 * 1024 * 1, 'Icon should be less than 1MB'),
  ),
  created_by: pipe(
    string(), //
    length(15, 'User is required'),
  ),
  updated_at: nullable(number()),
  created_at: number(),
})

export type Folder = Omit<InferInput<typeof FolderSchema>, 'icon'> & {
  icon: string
}
