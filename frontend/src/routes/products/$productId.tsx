import { createFileRoute } from '@tanstack/react-router'
import { SignedIn, useUser } from '@clerk/clerk-react'

export const Route = createFileRoute('/products/$productId')({
  component: ProductPage,
})

function ProductPage() {
  // const { productId } = useParams({ from: '/products/$productId'});
   const { isSignedIn, isLoaded } = useUser()
  const { productId } = useParams({ from: '/products/$productId' })
  if (!isLoaded) {
    return <div className="p-4">Loading...</div>
  }

  if (!isSignedIn) {
    return <div className="p-4">Sign in to view this page</div>
  }
  return (
    <SignedIn>
      <div>Hello "/products/$productId"!</div>
    </SignedIn>
  )
}
