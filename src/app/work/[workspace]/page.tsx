import { getRequestContext } from '@cloudflare/next-on-pages'

import { redirectToLogin, validateRequest } from '@/lib/auth/validate'

export const runtime = 'edge'

const Page = async () => {
  const { env } = getRequestContext()
  const { user } = await validateRequest(env.db)

  if (!user) {
    return redirectToLogin()
  }

  return <>Main page</>
}

export default Page
