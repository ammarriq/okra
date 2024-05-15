import { cookies } from 'next/headers'

import { hc } from '@/app-server/hono'

type Props = {
  params: { workspace: string; folder: string }
}

const Pages = async ({ params }: Props) => {
  const folder_id = cookies().get('folder_id')?.value

  return (
    <pre>{folder_id}</pre>
    // <LocalStorage params={params}>
    //   <Folder params={params} />
    // </LocalStorage>
  )
}

export default Pages
