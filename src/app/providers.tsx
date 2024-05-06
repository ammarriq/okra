'use client'

import { useRouter } from 'next/navigation'
import { RouterProvider } from 'react-aria-components'

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

type Props = {
  children: React.ReactNode
}

export function ClientProviders({ children }: Props) {
  let router = useRouter()

  const routeProvider = (
    <RouterProvider navigate={router.push}>{children}</RouterProvider>
  )

  return routeProvider
}
