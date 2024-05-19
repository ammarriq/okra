import { hc } from '../hono'

export const getFolders = async (req: {
  cookie?: string
  params: { workspace_id: string }
}) => {
  const res = await hc.folders.workspace[':workspace_id'].$get(
    { param: req.params },
    { headers: { cookie: req.cookie ?? '' } },
  )

  const data = await res.json()
  return data?.folders
}

export const getFolder = async (req: {
  cookie?: string
  params: { id: string }
}) => {
  const res = await hc.folders[':id'].$get(
    { param: req.params },
    { headers: { cookie: req.cookie ?? '' } },
  )

  const data = await res.json()
  return data
}
