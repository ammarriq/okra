import { email, length, number, object, type Output, string } from 'valibot'

export const InviteSchema = object({
	id: string([length(15, 'Id is required')]),
	folder_id: string([length(15, 'Folder is required')]),
	email: string([email('Email is required')]),
	created_at: number()
})

export type Invite = Output<typeof InviteSchema>
