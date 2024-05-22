import {
  blob,
  length,
  maxSize,
  mimeType,
  minLength,
  nullable,
  number,
  object,
  type Output,
  string,
} from 'valibot'

export const FolderSchema = object({
  id: string([length(15, 'Id is required')]),
  name: nullable(string([minLength(1, 'Name is required')])),
  icon: blob([
    mimeType(['image/png', 'image/jpeg'], 'Only JPEG/PNG allowed'),
    maxSize(1024 * 1024 * 1, 'Icon should be less than 1MB'),
  ]),
  created_by: string([length(15, 'User is required')]),
  updated_at: nullable(number()),
  created_at: number(),
})

export type Folder = Omit<Output<typeof FolderSchema>, 'icon'> & {
  icon: string
}
