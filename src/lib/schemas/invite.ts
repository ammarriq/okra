import { email, length, number, object, type Output, string } from 'valibot'

export const InviteSchema = object({
	id: string([length(15, 'Id is required')]),
	project_id: string([length(15, 'Project is required')]),
	email: string([email('Email is required')]),
	created_at: number()
})

export type Invite = Output<typeof InviteSchema>
