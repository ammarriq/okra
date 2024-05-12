import { object, parse, string } from 'valibot'

const ENVSchema = object({
  NEXT_PUBLIC_BASE_API: string(),
})

export const env = parse(ENVSchema, {
  NEXT_PUBLIC_BASE_API: process.env.NEXT_PUBLIC_BASE_API,
})
