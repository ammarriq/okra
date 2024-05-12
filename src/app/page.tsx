'use client'

import Link from 'next/link'

import { hc } from '@/lib/hono'

export const runtime = 'edge'

const Page = () => {
  hc.users
    .$get()
    .then((res) => res.json())
    .then(console.log)

  // console.log(res)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Our App
      <pre>{JSON.stringify({})}</pre>
      <Link href="/auth">Login</Link>
    </main>
  )
}

export default Page
