import { createFileRoute } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import LogsSection from '@/components/LogsSection'
import ProductsSection from '@/components/ProductsSection'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { isSignedIn, user, isLoaded } = useUser()
  if (!isLoaded) {
    return <div className="p-4">Loading...</div>
  }

  if (!isSignedIn) {
    return <div className="p-4">Sign in to view this page</div>
  }

  return (
    <>
      <div className="flex flex-col m-10">
        <p>Welcome {user.firstName}!</p>
        <LogsSection/>
        <ProductsSection/>
      </div>
    </>
  )
}
