import { Hono } from 'hono'

import { Workspace } from '@/lib/schemas/workspace'

import { HonoContext } from '../_app'

export const workspacesRouter = new Hono<HonoContext>()
  .get('/', async (c) => {
    const db = process.env.DB
    const user = c.get('user')

    if (!user) {
      return c.json(null, 401)
    }

    const workspaces = await db
      .prepare('SELECT * FROM workspaces WHERE created_by=?')
      .bind(user.id)
      .all<Workspace>()
      .then((o) => o.results)

    return c.json({ workspaces })
  })
  .get('/:id', async (c) => {
    const db = process.env.DB
    const user = c.get('user')

    if (!user) {
      return c.json(null, 401)
    }

    const id = c.req.param('id')
    if (!id) throw Error('No Id found.')

    const workspace = await db
      .prepare('SELECT * FROM workspaces WHERE id=? AND created_by=?')
      .bind(id, user.id)
      .first<Workspace>()

    return c.json(workspace)
  })
