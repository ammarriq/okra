import { hc } from '@/lib/hono'

type Props = {
  params: { workspace: string; folder: string }
}

const Pages = async ({ params }: Props) => {
  const res = await hc.users.$get()
  const data = await res.json()

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
    // <LocalStorage params={params}>
    //   <Folder params={params} />
    // </LocalStorage>
  )
}

export default Pages
