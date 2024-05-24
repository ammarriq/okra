import { hc } from '../hono'

export const getFolders = async (req: { cookie?: string } = {}) => {
  const res = await hc.folders.$get(undefined, {
    headers: { cookie: req.cookie ?? '' },
  })

  const result = await res.json()

  if (!result.success) {
    const { error } = result
    throw new Error(error.message, { cause: error.code })
  }

  return result.data
}

export const getFolder = async (req: {
  cookie?: string
  where: { id: string }
}) => {
  const res = await hc.folders[':id'].$get(
    { param: req.where },
    { headers: { cookie: req.cookie ?? '' } },
  )

  const result = await res.json()

  if (!result.success) {
    const { error } = result
    throw new Error(error.message, { cause: error.code })
  }

  return result
}
