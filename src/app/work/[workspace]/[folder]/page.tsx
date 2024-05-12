'use client'
import { hc } from '@/lib/hono'

type Props = {
  params: { workspace: string; folder: string }
}

const Pages = ({ params }: Props) => {
  const folder = hc.users.$get()
  return (
    <pre>{JSON.stringify(folder)}</pre>
    // <LocalStorage params={params}>
    //   <Folder params={params} />
    // </LocalStorage>
  )
}

export default Pages
