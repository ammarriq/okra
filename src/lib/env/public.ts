import * as z from 'zod'

const EnvSchema = z.object({
  NEXT_PUBLIC_BASE_API: z.string(),
})

export const env = EnvSchema.parse({
  NEXT_PUBLIC_BASE_API: process.env.NEXT_PUBLIC_BASE_API,
})
