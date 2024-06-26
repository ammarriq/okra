import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import { appRouter } from '@/app-server/_app'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.route('/', appRouter)

export const GET = handle(app)
export const POST = handle(app)
export const DELETE = handle(app)
