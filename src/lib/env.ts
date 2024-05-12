import { object, parse, string } from 'valibot'

const ENVSchema = object({
  GOOGLE_CLIENT_ID: string(),
  GOOGLE_CLIENT_SECRET: string(),
  GOOGLE_REDIRECT_URI: string(),
  PUBLIC_BASE_API: string(),
})

export const env = parse(ENVSchema, process.env)
