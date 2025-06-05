import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ToastContainer } from 'react-toastify'
import Header from '../components/Header.tsx'
import ClerkProvider from '../integrations/clerk/provider.tsx'
import Footer from '@/components/Footer.tsx'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        aria-label="Notifications"
        className="!text-sm sm:!text-base"
        style={{ height: '100px' }}
      />

      <ClerkProvider>
        <Header />
        <Outlet />
        <Footer />
        <TanStackRouterDevtools />
      </ClerkProvider>
    </>
  )
}
