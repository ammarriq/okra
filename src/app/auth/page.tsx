import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getRequestContext } from '@cloudflare/next-on-pages'

import { validateRequest } from '@/auth'
import { GoogleIcon } from '@/lib/icons'

export const runtime = 'edge'

const Page = async () => {
  const { env } = getRequestContext()
  const { user } = await validateRequest(env.db)

  if (user) {
    return redirect('/app')
  }

  return (
    <main className='flex items-center flex-col gap-3.5 py-20 min-h-screen'>
      <p className='text-4xl font-bold pb-4'>Log in</p>
      <Link
        href='/auth/google'
        className='flex items-center justify-center gap-2 py-2 text-sm
        font-medium border rounded w-full max-w-60 hover:bg-gray-100'
      >
        <GoogleIcon />
        Continue with Google
      </Link>
    </main>
  )
}

export default Page
