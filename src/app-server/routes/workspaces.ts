import { decode } from 'decode-formdata'
import { Hono } from 'hono'
import { deleteCookie, setCookie } from 'hono/cookie'
import { flatten, pick, safeParse } from 'valibot'

import { Folder, FolderSchema } from '@/lib/schemas/folder'
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
  .post('/', async (c) => {
    const db = process.env.DB
    const user = c.get('user')

    if (!user) {
      return c.json(null, 401)
    }

    const json = await c.req.json()
    const schema = pick(FolderSchema, ['id', 'workspace_id'])
    const result = safeParse(schema, json)

    if (!result.success) {
      const errors = flatten<typeof schema>(result.issues).nested
      return c.json({ errors }, 400)
    }

    const { output } = result
    const folder: Folder = {
      ...output,
      name: '',
      icon: '',
      updated_at: null,
      created_at: Date.now(),
      created_by: user.id,
    }

    await db
      .prepare(
        `INSERT INTO folders
        (id, workspace_id, created_by, created_at)
        VALUES(?, ?, ?, ?)`,
      )
      .bind(folder.id, folder.workspace_id, folder.created_by, Date.now())
      .run()

    deleteCookie(c, output.id)

    return c.json(folder)
  })
