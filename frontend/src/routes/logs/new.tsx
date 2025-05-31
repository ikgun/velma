import { createFileRoute } from '@tanstack/react-router'
checimport { SignedIn, useUser } from '@clerk/clerk-react'

export const Route = createFileRoute('/logs/new')({
  component: AddLogFormPage,
})

function AddLogFormPage() {
   const { isSignedIn, isLoaded } = useUser()
  if (!isLoaded) {
    return <div className="p-4">Loading...</div>
  }

  if (!isSignedIn) {
    return <div className="p-4">Sign in to view this page</div>
  }
  return (
    <SignedIn>
      <div>this is where add log form will go</div>
    </SignedIn>
  )
}
