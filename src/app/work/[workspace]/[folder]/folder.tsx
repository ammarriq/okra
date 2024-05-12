import type { Folder } from '@/lib/schemas/folder'

import { getUser } from '@/lib/auth'
import { getEnv } from '@/lib/server/cf'

type Props = {
  params: { workspace: string; folder: string }
  newFolder?: Folder
}

const Folder = async ({ params, newFolder, ...rest }: Props) => {
  const env = getEnv()
  const user = await getUser()

  console.log({ newFolder, ...rest })

  if (!newFolder) {
    console.log('loading folder')

    const folder = await env.db
      .prepare(`SELECT * FROM folders WHERE id=? AND created_by=?`)
      .bind(params.folder, user.id)
      .first<Folder>()

    return (
      <>
        <pre>{JSON.stringify(folder, null, 2)}</pre>
      </>
    )
  }

  if (newFolder && newFolder.id === params.folder) {
    console.log('creating new folder')
    await env.db
      .prepare(
        `INSERT INTO folders
        (id, workspace_id, created_by, created_at)
        VALUES(?, ?, ?, ?)`,
      )
      .bind(newFolder.id, params.workspace, user.id, Date.now())
      .run()
  }

  // return notFound()
}

export default Folder
