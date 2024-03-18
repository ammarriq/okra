import { getRequestContext } from '@cloudflare/next-on-pages'

export const getContext = () => {
  const { DB } = getRequestContext().env

  return {
    db: DB,
  }
}
