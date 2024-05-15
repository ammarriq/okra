import Link from 'next/link'

// import { env } from '@/lib/env'

export const runtime = 'edge'

const Page = async () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Our App
      <pre>{JSON.stringify({})}</pre>
      <Link href="/auth">Login</Link>
    </main>
  )
}

export default Page
