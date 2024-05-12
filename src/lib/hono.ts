import type { AppRouter } from '@/server/_app'

import { hc as honoClient } from 'hono/client'

import { env } from './env'

export const hc = honoClient<AppRouter>(`${env.PUBLIC_BASE_API}/api`)
