import { length, minLength, nullable, number, object, type Output, string } from 'valibot'

export const TaskSchema = object({
	id: string([length(15, 'Id is required')]),
	name: string([minLength(1, 'Name is required')]),
	description: nullable(string([minLength(1, 'Description is required')])),
	rank: string([minLength(1, 'Rank is required')]),
	due_date: nullable(number('Due date is required')),
	section_id: string([minLength(15, 'Section is required')]),
	created_by: string([length(15, 'User is required')]),
	updated_at: nullable(number()),
	created_at: number()
})

export type Task = Output<typeof TaskSchema>
