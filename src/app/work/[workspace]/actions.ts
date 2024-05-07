'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { decode } from 'decode-formdata'
import { flatten, pick, safeParse } from 'valibot'

import { getUser, initLucia, validateRequest } from '@/lib/auth'
import { ProjectSchema } from '@/lib/schemas/project'
import { getEnv } from '@/lib/server/cf'
import { createId } from '@/lib/utils/random'

export const createProject = async (_: any, formData: FormData) => {
  const env = getEnv()
  const user = await getUser()

  const data = decode(formData)
  const schema = pick(ProjectSchema, ['workspace_id'])
  const result = safeParse(schema, data)

  if (!result.success) {
    return { errors: flatten<typeof schema>(result.issues).nested }
  }

  const projectId = createId(15)
  const { output } = result

  await env.db
    .prepare(
      `INSERT INTO projects
      (id, workspace_id, created_by, created_at)
      VALUES(?, ?, ?, ?)`,
    )
    .bind(projectId, output.workspace_id, user.id, Date.now())
    .run()

  revalidatePath(`/work/${output.workspace_id}`)

  // return redirect(`/work/${output.workspace_id}/${projectId}`)
}

export const logout = async (): Promise<ActionResult> => {
  const env = getEnv()
  const lucia = initLucia(env.db)

  const { session } = await validateRequest(env.db)
  if (!session) {
    return { error: 'Unauthorized' }
  }

  await lucia.invalidateSession(session.id)

  const cookie = lucia.createBlankSessionCookie()
  cookies().set(cookie.name, cookie.value, cookie.attributes)

  return redirect('/auth')
}

interface ActionResult {
  error: string | null
}
