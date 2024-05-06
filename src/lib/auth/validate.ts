import 'server-only'

import { cookies } from 'next/headers'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'

import { Session, User } from 'lucia'

import { initLucia } from './lucia'

type ValidateRequest = (
  db: D1Database,
) => Promise<{ user: User; session: Session } | { user: null; session: null }>

export const validateRequest = cache(async (db) => {
  const lucia = initLucia(db)
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null

  if (!sessionId) {
    return { user: null, session: null }
  }

  const result = await lucia.validateSession(sessionId)
  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session && result.session.fresh) {
      const cookie = lucia.createSessionCookie(result.session.id)
      cookies().set(cookie.name, cookie.value, cookie.attributes)
    }

    if (!result.session) {
      const cookie = lucia.createBlankSessionCookie()
      cookies().set(cookie.name, cookie.value, cookie.attributes)
    }
  } catch {}

  return result
}) satisfies ValidateRequest

export const redirectToLogin = () => {
  const pathname = headers().get('next-path')
  const url = pathname ? `/auth?redirectTo=${pathname}` : '/auth'

  return redirect(url)
}
