'use server'

import { redirect } from 'next/navigation'

import { decode } from 'decode-formdata'
import { flatten, pick, safeParse } from 'valibot'

import { getUser } from '@/lib/auth'
import { WorkspaceSchema } from '@/lib/schemas/workspace'
import { getEnv } from '@/lib/server/cf'
import { createId } from '@/lib/utils/random'

export const createWorkspace = async (_: any, formData: FormData) => {
  const user = await getUser()
  const env = getEnv()

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
