import { object, parse, string } from 'valibot'

const ENVSchema = object({
  GOOGLE_CLIENT_ID: string(),
  GOOGLE_CLIENT_SECRET: string(),
  GOOGLE_REDIRECT_URI: string(),
})

export const env = parse(ENVSchema, {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
})
