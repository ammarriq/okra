import type { AppRouter } from '@/server/_app'

import { hc as honoClient } from 'hono/client'

export const hc = honoClient<AppRouter>('http://localhost:3000/api')
