import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { initLucia, validateRequest } from '@/auth'
import { getContext } from '@/lib/utils'

export const logout = async (): Promise<ActionResult> => {
  'use server'

  const env = getContext()
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
