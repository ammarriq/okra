import { Hono } from 'hono'

import { HonoContext } from '../_app'

/** Fake database */
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Carlo' },
]

export const userRouter = new Hono<HonoContext>()
  .get('/', async (c) => {
    const user = c.get('user')

    if (!user) {
      c.status(401)
      return c.body(null, 401)
    }

    return c.json({ users })
  })
  .get('/:id', async (c) => {
    const id = c.req.param('id')

    if (!id) throw Error('No Id found.')

    let _id: number
    try {
      _id = parseInt(id)
    } catch (e) {
      throw Error('Invalid Id. Must be int.')
    }

    const user = users.find((u) => u.id === _id)

    if (!user) throw Error('User not found.')

    return c.json(user)
  })
