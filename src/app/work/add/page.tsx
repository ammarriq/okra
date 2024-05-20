import { getUser, redirectToLogin } from '@/lib/auth'

import Form from './form'

const Page = async () => {
  const user = await getUser()
  if (!user) return redirectToLogin()

  return (
    <main className="grid min-h-screen w-full place-items-center bg-background">
      <Form username={user.name} />
    </main>
  )
}

export default Page
