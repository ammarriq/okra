import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { generateCodeVerifier, generateState } from 'arctic'

import { initGoogleAuth } from '@/auth'

export const GET = async () => {
  const state = generateState()
  const codeVerifier = generateCodeVerifier()

  const googleURL = await initGoogleAuth().createAuthorizationURL(
    state,
    codeVerifier,
    {
      scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
    }
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

  return redirect(googleURL.toString())
}
