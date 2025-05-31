import { Link, createFileRoute } from '@tanstack/react-router'
import { SignedIn, useUser } from '@clerk/clerk-react'
import { useGetAllProducts } from '@/hooks/product/useGetAllProducts'

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
})

function ProductsPage() {
   const { isSignedIn, isLoaded } = useUser()
  const { isSignedIn, isLoaded } = useUser()
  const { isSignedIn, isLoaded } = useUser()
  const { data, isPending, error } = useGetAllProducts()

  if (!isLoaded) {
    return <div className="p-4">Loading user...</div>
  }

  if (!isSignedIn) {
    return <div className="p-4">Sign in to view this page</div>
  }

  return (
    <SignedIn>
      <div>this is where all products are</div>
      <div className="px-2 font-bold">
        <Link to="/products/new">Add new product</Link>
      </div>
    </SignedIn>
  )
}
