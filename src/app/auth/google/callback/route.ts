import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { generateId } from 'lucia'

import { initGoogleAuth, initLucia, User } from '@/lib/auth'
import { getEnv } from '@/lib/server/cf'

export const runtime = 'edge'

const PROFILE_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'

export const GET = async (request: Request) => {
  const url = new URL(request.url)

  const env = getEnv()
  const lucia = initLucia(env.db)

  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')

  const storedState = cookies().get('google_state')?.value ?? ''
  const codeVerifier = cookies().get('google_code')?.value ?? ''

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, { status: 400 })
  }

  // try {
  const token = await initGoogleAuth().validateAuthorizationCode(
    code,
    codeVerifier,
  )
  const res = await fetch(`${PROFILE_URL}?access_token=${token.accessToken}`)
  const googleUser = (await res.json()) as GoogleUser

  const user = await env.db
    .prepare('SELECT * FROM users WHERE provider_id = ?')
    .bind(googleUser.sub)
    .first<User>()

  const user_id = user?.id ?? generateId(15)

  if (!user) {
    const newUser: Omit<User, 'updated_at'> = {
      id: user_id,
      name: googleUser.name,
      picture: googleUser.picture,
      email: googleUser.email,
      provider: 'google',
      provider_id: googleUser.sub,
      created_at: Date.now(),
    }

    await env.db
      .prepare(
        `INSERT INTO users
				(id, name, picture, email, provider, provider_id, created_at)
				VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(...Object.values(newUser))
      .run()
  }

  const session = await lucia.createSession(user_id, {})
  const cookie = lucia.createSessionCookie(session.id)

  cookies().set(cookie.name, cookie.value, {
    path: '/',
    ...cookie.attributes,
  })

  const redirectTo = cookies().get('redirectTo')?.value

  cookies().delete('redirectTo')

  return redirect(redirectTo || '/work/home')
  // } catch (e) {
  // 	if (
  // 		e instanceof OAuth2RequestError &&
  // 		e.message === 'bad_verification_code'
  // 	) {
  // 		return error(400)
  // 	}

  // 	return error(500)
  // }
}

type GoogleUser = {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}
