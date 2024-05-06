import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { generateCodeVerifier, generateState } from 'arctic'

import { initGoogleAuth } from '@/lib/auth'

export const runtime = 'edge'

export const GET = async (request: Request) => {
  const url = new URL(request.url)

  const state = generateState()
  const codeVerifier = generateCodeVerifier()

  const googleURL = await initGoogleAuth().createAuthorizationURL(
    state,
    codeVerifier,
    { scopes: ['email', 'profile'] },
  )

  cookies().set('google_state', state, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  })

  cookies().set('google_code', codeVerifier, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  })

  const redirectTo = url.searchParams.get('redirectTo') ?? ''
  cookies().set('redirectTo', redirectTo, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  })

  return redirect(googleURL.toString())
}
