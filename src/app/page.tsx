import Link from 'next/link'

export const runtime = 'edge'

const Page = async () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Our App
      <pre>{JSON.stringify({})}</pre>
      <Link href="/auth" className="rounded border px-4 py-1">
        Login
      </Link>
    </main>
  )
}

export default Page
