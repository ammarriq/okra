'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { decode } from 'decode-formdata'
import { flatten, pick, safeParse } from 'valibot'

import { getUser, initLucia, validateRequest } from '@/lib/auth'
import { FolderSchema } from '@/lib/schemas/folder'
import { getEnv } from '@/lib/server/cf'

export const createFolder = async (formData: FormData) => {
  await getUser()

  const data = decode(formData)
  const schema = pick(FolderSchema, ['id', 'workspace_id'])
  const result = safeParse(schema, data)

  cookies().set('folder', JSON.stringify(result.output))

  // if (!result.success) {
  //   return { errors: flatten<typeof schema>(result.issues).nested }
  // }

  // const { output } = result

  // env.db
  //   .prepare(
  //     `INSERT INTO folders
  //     (id, workspace_id, created_by, created_at)
  //     VALUES(?, ?, ?, ?)`,
  //   )
  //   .bind(output.id, output.workspace_id, user.id, Date.now())
  //   .run()

  // revalidatePath(`/work/${output.workspace_id}`)

  // return redirect(`/work/${output.workspace_id}/${output.id}`)
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
