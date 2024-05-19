import { getUser, redirectToLogin } from '@/lib/auth/validate'

export const runtime = 'edge'

const Page = async () => {
  const user = await getUser()
  if (!user) return redirectToLogin()

  return <>{user.name}</>
}

export default Page
