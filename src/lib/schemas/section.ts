import { length, minLength, nullable, number, object, type Output, string } from 'valibot'

export const SectionSchema = object({
	id: string([length(15, 'Id is required')]),
	name: string([minLength(1, 'Name is required')]),
	rank: string([minLength(1, 'Rank is required')]),
	project_id: string([length(15, 'Project is required')]),
	created_by: string([length(15, 'User is required')]),
	updated_at: nullable(number()),
	created_at: number()
})

export type Section = Output<typeof SectionSchema>
