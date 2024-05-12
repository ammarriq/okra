import { Hono } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'
import { csrf } from 'hono/csrf'
import { User } from 'lucia'
import { Session } from 'lucia'

import { initLucia } from '@/lib/auth'

import { userRouter } from './routes/user-router'

const app = new Hono<{
  Bindings: { DB: import('@cloudflare/workers-types').D1Database }
  Variables: {
    user: User | null
    session: Session | null
  }
}>()

app.use(csrf())
app.use('*', async (c, next) => {
  const lucia = initLucia(c.env.DB)
  const sessionId = getCookie(c, lucia.sessionCookieName)

  if (!sessionId) {
    c.set('user', null)
    c.set('session', null)
    return next()
  }

  const { session, user } = await lucia.validateSession(sessionId)

  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id)
    setCookie(c, lucia.sessionCookieName, sessionCookie.serialize(), {
      ...sessionCookie.attributes,
      sameSite: 'Strict',
    })
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie()
    setCookie(c, lucia.sessionCookieName, sessionCookie.serialize(), {
      ...sessionCookie.attributes,
      sameSite: 'Strict',
    })
  }

  c.set('user', user)
  c.set('session', session)
  return next()
})

/**
 * The base router. Include all the routes here from `./routes/*`
 */
export const appRouter = app.route('/users', userRouter)

/** Exported type definition for the hono/client. */
export type AppRouter = typeof appRouter
