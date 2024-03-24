import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getRequestContext } from '@cloudflare/next-on-pages'

import { validateRequest } from '@/auth'

export const runtime = 'edge'

const Page = async () => {
  const { env } = getRequestContext()
  const { user } = await validateRequest(env.db)

  if (user) {
    return redirect('/app')
  }

  return (
    <div className='w-80 max-w-full mx-auto text-gray-500 flex flex-col text-center'>
      <p className='text-xl font-semibold pb-4'>Welcome to Cebr</p>
      <div className='w-full flex gap-3 items-center px-3 py-2.5 bg-gray-50 rounded-md'>
        <i className='icon-[logos--google-icon]'></i>
        <Link href='/auth/google' className='font-medium'>
          Log in with Google
        </Link>
      </div>
    </div>
  )
}

export default Page
