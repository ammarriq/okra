import { getUser } from '@/lib/auth/validate'

export const runtime = 'edge'

const Page = async () => {
  const user = await getUser()

  return <>{user.name}</>
}

export default Page
