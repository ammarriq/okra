import { hc } from '../hono'

export const getWorkspaces = async (req: { cookie?: string }) => {
  const res = await hc.workspaces.$get(undefined, {
    headers: { cookie: req.cookie ?? '' },
  })

  const data = await res.json()
  return data?.workspaces
}
