import { createFileRoute, useParams } from '@tanstack/react-router'
import { SignedIn, useUser } from '@clerk/clerk-react'

export const Route = createFileRoute('/logs/$logId')({
  component: LogPage,
})

function LogPage() {
  const { logId } = useParams({ from: '/logs/$logId' })
  const { isSignedIn, isLoaded } = useUser()
  if (!isLoaded) {
    return <div className="p-4">Loading...</div>
  }

  if (!isSignedIn) {
    return <div className="p-4">Sign in to view this page</div>
  }
  return (
    <SignedIn>
      <div>Hello "/logs/$logId"!</div>
    </SignedIn>
  )
}
