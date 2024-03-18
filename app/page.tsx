import Link from 'next/link'

export const runtime = 'edge'

const Page = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      Our App
      <Link href='/auth'>Login</Link>
    </main>
  )
}

export default Page
