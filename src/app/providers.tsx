'use client'

import { useRouter } from 'next/navigation'
import { RouterProvider } from 'react-aria-components'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

let browserQueryClient: QueryClient | undefined = undefined

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}

const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  let router = useRouter()
  const queryClient = getQueryClient()

  const queryProvider = (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  const routeProvider = (
    <RouterProvider navigate={router.push}>{queryProvider}</RouterProvider>
  )

  return routeProvider
}

export default Providers
