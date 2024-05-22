import { hc } from '../hono'

export const getFolders = async (req: { cookie?: string } = {}) => {
  const res = await hc.folders.$get(undefined, {
    headers: { cookie: req.cookie ?? '' },
  })

  const data = await res.json()
  if (!data.success) {
    throw new Error(data.error.message)
  }

  return data.data.folders
}

export const getFolder = async (req: {
  cookie?: string
  where: { id: string }
}) => {
  const res = await hc.folders[':id'].$get(
    { param: req.where },
    { headers: { cookie: req.cookie ?? '' } },
  )

  const data = await res.json()
  if (!data.success) {
    throw new Error(data.error.message)
  }

  return data
}
