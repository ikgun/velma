import { createFileRoute } from '@tanstack/react-router'
import { SignedIn, useUser } from '@clerk/clerk-react'
import { useGetProduct } from '@/hooks/product/useGetProduct'

export const Route = createFileRoute('/products/$productId')({
  component: ProductPage,
})

function ProductPage() {
  const { productId } = useParams({ from: '/products/$productId' })
  const { isSignedIn, isLoaded } = useUser()
  const { data, isPending, error } = useGetProduct(productId)
  if (!isLoaded) {
    return <div className="p-4">Loading user...</div>
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
