import type { AppRouter } from '@/app-server/_app'

import { hc as honoClient } from 'hono/client'

import { env } from '../lib/env/public'

export const hc = honoClient<AppRouter>(`${env.NEXT_PUBLIC_BASE_API}/api`)
