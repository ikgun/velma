import { Link, createFileRoute } from '@tanstack/react-router'
import { SignedIn, useUser } from '@clerk/clerk-react'

export const Route = createFileRoute('/logs/')({
  component: LogsPage,
})

function LogsPage() {
   const { isSignedIn, isLoaded } = useUser()
  if (!isLoaded) {
    return <div className="p-4">Loading...</div>
  }

  if (!isSignedIn) {
    return <div className="p-4">Sign in to view this page</div>
  }
  return (
    <SignedIn>
      <div>this is where the log history is</div>
      <div className="px-2 font-bold">
        <Link to="/logs/new">Add new log</Link>
      </div>
    </SignedIn>
  )
}
