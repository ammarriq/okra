import { Hono } from 'hono'
import { deleteCookie } from 'hono/cookie'

import { Folder, FolderSchema } from '@/lib/schemas/folder'
import { json } from '@/lib/server/json'

import { HonoContext } from '../_app'
import * as z from 'zod'

export const foldersRouter = new Hono<HonoContext>()
  .get('/', async (c) => {
    const db = process.env.DB
    const user = c.get('user')

    if (!user) {
      return json(c).auth_error()
    }

    try {
      const folders = await db
        .prepare(
          `SELECT * FROM folders
          WHERE created_by=?
          ORDER BY created_at DESC`,
        )
        .bind(user.id)
        .all<Folder>()
        .then((o) => o.results)

      return json(c).success(folders)
    } catch (error) {
      return json(c).server_error()
    }
  })
  .get('/:id', async (c) => {
    const db = process.env.DB
    const user = c.get('user')

    if (!user) {
      return json(c).auth_error()
    }

    const id = c.req.param('id')
    if (!id) throw Error('No Id found.')

    try {
      const folder = await db
        .prepare('SELECT * FROM folders WHERE id=? AND created_by=?')
        .bind(id, user.id)
        .first<Folder>()

      return json(c).success(folder)
    } catch (error) {
      return json(c).server_error()
    }
  })
  .post('/', async (c) => {
    const db = process.env.DB
    const user = c.get('user')

    if (!user) {
      return json(c).auth_error()
    }

    const data = await c.req.json()
    const schema = FolderSchema.pick({ id: true })
    const result = schema.safeParse(data)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return json(c).val_error({ ...errors })
    }

    const { data: output } = result
    const folder: Folder = {
      ...output,
      name: '',
      icon: '',
      updated_at: null,
      created_at: Date.now(),
      created_by: user.id,
    }

    try {
      await db
        .prepare(
          `INSERT INTO folders
          (id, created_by, created_at)
          VALUES (?, ?, ?)`,
        )
        .bind(folder.id, folder.created_by, Date.now())
        .run()

      deleteCookie(c, output.id)
      return json(c).success(folder, 201)
    } catch (error) {
      return json(c).server_error()
    }
  })
  .delete('/:id', async (c) => {
    const db = process.env.DB
    const user = c.get('user')

    if (!user) {
      return json(c).auth_error()
    }

    const id = c.req.param('id')
    if (!id) throw Error('No Id found.')

    try {
      await db
        .prepare(`DELETE FROM folders WHERE id=? AND created_by=?`)
        .bind(id, user.id)
        .run()

      return json(c).success({ id })
    } catch (error) {
      return json(c).server_error()
    }
  })
