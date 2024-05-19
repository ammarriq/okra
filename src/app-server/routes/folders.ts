import { Hono } from 'hono'

import { Folder } from '@/lib/schemas/folder'

import { HonoContext } from '../_app'

export const foldersRouter = new Hono<HonoContext>()
  .get('/:workspace_id', async (c) => {
    const db = process.env.DB
    const user = c.get('user')

    if (!user) {
      return c.json(null, 401)
    }

    const workspace_id = c.req.param('workspace_id')
    if (!workspace_id) throw Error('No Id found.')

    const folders = await db
      .prepare(
        `SELECT * FROM folders
        WHERE workspace_id=? AND created_by=?
        ORDER BY created_at DESC`,
      )
      .bind(workspace_id, user.id)
      .all<Folder>()
      .then((o) => o.results)

    console.log({ folders, workspace_id, id: user.id })

    return c.json({ folders })
  })
  .get('/:id', async (c) => {
    const db = process.env.DB
    const user = c.get('user')

    if (!user) {
      return c.json(null, 401)
    }

    const id = c.req.param('id')
    if (!id) throw Error('No Id found.')

    const folder = await db
      .prepare('SELECT * FROM folders WHERE id=? AND created_by=?')
      .bind(id, user.id)
      .first<Folder>()

    return c.json(folder)
  })
