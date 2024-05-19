import { hc } from '../hono'

export const getFolders = async (req: {
  cookie?: string
  params: { workspace_id: string }
}) => {
  const res = await hc.folders[':workspace_id'].$get(
    { param: req.params },
    { headers: { cookie: req.cookie ?? '' } },
  )

  const data = await res.json()
  return data?.folders
}
