import { redirect } from 'next/navigation'

import { validateRequest } from '@/auth/validate'
import { getContext } from '@/lib/utils'

import { logout } from './actions'

export const runtime = 'edge'

const Page = async () => {
  const env = getContext()
  const { user } = await validateRequest(env.db)

  if (!user) {
    return redirect('/auth')
  }

  return (
    <>
      <h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </h1>

      <form action={logout}>
        <button type='submit'>Logout</button>
      </form>
    </>
  )
}

export default Page
