import type { D1Database } from '@cloudflare/workers-types'

import { D1Adapter } from '@lucia-auth/adapter-sqlite'
import { Google } from 'arctic'
import { Lucia } from 'lucia'

import { env } from '@/lib/env'

export const initLucia = (db: D1Database) => {
  const adapter = new D1Adapter(db, {
    session: 'sessions',
    user: 'users',
  })

  return new Lucia(adapter, {
    sessionCookie: {
      expires: false,
      attributes: {
        secure: process.env.NODE_ENV === 'production',
      },
    },
    getUserAttributes: (attributes) => {
      return {
        id: attributes.id,
        name: attributes.name,
        picture: attributes.picture,
        email: attributes.email,
      }
    },
  })
}

export const initGoogleAuth = () => {
  return new Google(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    env.GOOGLE_REDIRECT_URI
  )
}

export type User = {
  id: string
  name: string
  picture: string
  email: string
  provider: string
  provider_id: string
  updated_at: number
  created_at: number
}

// IMPORTANT!
declare module 'lucia' {
  interface Register {
    Lucia: ReturnType<typeof initLucia>
    DatabaseUserAttributes: User
  }
}
