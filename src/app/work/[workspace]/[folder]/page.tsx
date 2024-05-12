import { cookies } from 'next/headers'

import Folder from './folder'
import LocalStorage from './local-storage'

type Props = {
  params: { workspace: string; folder: string }
}

const Pages = async ({ params }: Props) => {
  const folder = JSON.stringify(cookies().get('folder_id'))
  return (
    <pre>{JSON.stringify(folder)}</pre>
    // <LocalStorage params={params}>
    //   <Folder params={params} />
    // </LocalStorage>
  )
}

export default Pages
