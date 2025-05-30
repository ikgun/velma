import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from '../components/Header.tsx'

import ClerkProvider from '../integrations/clerk/provider.tsx'

export const Route = createRootRoute({
  component: Root
})

function Root(){
  return (
    <>
      <ClerkProvider>
        <Header />
        <Outlet />
        <TanStackRouterDevtools />
      </ClerkProvider>
    </>
  )
}
