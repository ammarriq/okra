import { getRequestContext } from '@cloudflare/next-on-pages'

import { redirectToLogin, validateRequest } from '@/lib/auth'

import Form from './form'

const Page = async () => {
  const { env } = getRequestContext()
  const { user } = await validateRequest(env.db)

  if (!user) {
    return redirectToLogin()
  }

  return (
    <main className="grid min-h-screen w-full place-items-center bg-background">
      <Form username={user.name} />
    </main>
  )
}

export default Page
