import { getRequestContext } from '@cloudflare/next-on-pages'

export const getEnv = () => {
  const bindings = getRequestContext().env

  const env = { db: bindings.DB }
  return env
}
