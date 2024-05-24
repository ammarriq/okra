import { Context } from 'hono'
import { BlankInput } from 'hono/types'
import { StatusCode } from 'hono/utils/http-status'

import { HonoContext } from '@/app-server/_app'

export const json = (c: Context<HonoContext, '/', BlankInput>) => ({
  success: <T extends unknown >(
    data: T,
    status?: StatusCode,
  ) => {
    return c.json({ success: true, data }, status)
  },

  auth_error: async () => {
    return c.json(
      {
        success: false,
        error: {
          code: 'AUTH_ERROR' as const,
          message: 'Authentication Failed',
        },
      },
      401,
    )
  },

  val_error: async <T extends unknown>(details: T) => {
    return c.json(
      {
        success: false,
        error: {
          code: 'VAL_ERROR' as const,
          message: 'Invalid Request',
          details,
        },
      },
      400,
    )
  },

  server_error: async () => {
    return c.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR' as const,
          message: 'Internal Server Error',
        },
      },
      500,
    )
  },
})
