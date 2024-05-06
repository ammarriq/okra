'use server'

import { redirect } from 'next/navigation'

import { getRequestContext } from '@cloudflare/next-on-pages'
import { decode } from 'decode-formdata'
import { flatten, pick, safeParse } from 'valibot'

import { redirectToLogin, validateRequest } from '@/lib/auth'
import { WorkspaceSchema } from '@/lib/schemas/workspace'
import { createId } from '@/lib/utils/random'

export const createWorkspace = async (_: any, formData: FormData) => {
  const { env } = getRequestContext()
  const { user } = await validateRequest(env.db)

  if (!user) {
    return redirectToLogin()
  }

  const data = decode(formData)
  const schema = pick(WorkspaceSchema, ['name'])
  const result = safeParse(schema, data)

  if (!result.success) {
    return { errors: flatten<typeof schema>(result.issues).nested }
  }

  const workspaceId = createId(15)
  const { output } = result

  await env.db
    .prepare(
      `INSERT INTO workspaces
      (id, name, created_by, created_at)
      VALUES(?, ?, ?, ?)`,
    )
    .bind(workspaceId, output.name, user.id, Date.now())
    .run()

  return redirect(`/work/${workspaceId}/home`)
}
