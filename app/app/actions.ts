import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getRequestContext } from '@cloudflare/next-on-pages'

import { initLucia, validateRequest } from '@/auth'

export const logout = async (): Promise<ActionResult> => {
  'use server'

  const { env } = getRequestContext()
  const lucia = initLucia(env.db)

  const { session } = await validateRequest(env.db)
  if (!session) {
    return { error: 'Unauthorized' }
  }

  await lucia.invalidateSession(session.id)

  const cookie = lucia.createBlankSessionCookie()
  cookies().set(cookie.name, cookie.value, cookie.attributes)

  return redirect('/auth')
}

interface ActionResult {
  error: string | null
}
