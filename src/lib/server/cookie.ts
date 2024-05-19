import { cookies } from 'next/headers'

import { serializeCookie } from 'oslo/cookie'

import { initLucia } from '@/lib/auth'
import { getEnv } from '@/lib/server/cf'

export const getSessionCookie = () => {
  const env = getEnv()
  const lucia = initLucia(env.db)
  const cookie = cookies().get(lucia.sessionCookieName)
  if (!cookie) return ''

  return serializeCookie(cookie.name, cookie.value, {})
}
