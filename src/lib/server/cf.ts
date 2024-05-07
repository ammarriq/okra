import { getRequestContext } from '@cloudflare/next-on-pages'

export const getEnv = () => {
  const { env } = getRequestContext()

  return env
}
