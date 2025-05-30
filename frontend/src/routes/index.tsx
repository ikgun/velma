import { createFileRoute } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import Dashboard from '@/components/Dashboard'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { isSignedIn, user, isLoaded } = useUser()
  if (!isLoaded) {
    return <div className="p-4">Loading...</div>
  }

  if (!isSignedIn) {
    return <div className="p-4">Youre viewing the unsigned version</div>
  }

  return (
    <>
      <Dashboard />
    </>
  )
}
