'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { initLucia, validateRequest } from '@/lib/auth'
import { getEnv } from '@/lib/server/cf'

export const logout = async (): Promise<ActionResult> => {
  const env = getEnv()
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
