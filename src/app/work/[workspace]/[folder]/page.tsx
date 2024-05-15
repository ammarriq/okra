import { cookies } from 'next/headers'

type Props = {
  params: { workspace: string; folder: string }
}

const Pages = ({ params }: Props) => {
  const folder_id = cookies().get('folder_id')?.value
  // const allCookies = cookies()
  //   .getAll()
  //   .map((cookie) => [cookie.name, cookie.value])

  // const res = await hc.users.$get(
  //   {},
  //   { headers: { Cookie: Object.fromEntries(allCookies) } },
  // )

  // try {
  //   const data = await res.json()
  //   console.log(data)
  // } catch (error) {
  //   console.log(error)
  // }

  return (
    <pre>{folder_id}</pre>
    // <LocalStorage params={params}>
    //   <Folder params={params} />
    // </LocalStorage>
  )
}

export default Pages
