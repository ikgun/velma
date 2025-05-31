import { Link, createFileRoute } from '@tanstack/react-router'
import { SignedIn, useUser } from '@clerk/clerk-react'
import type { Product } from '@/types'
import { useGetAllProducts } from '@/hooks/product/useGetAllProducts'
import ProductCard from '@/components/ProductCard'

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
})

function ProductsPage() {
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

        {isPending && (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500">
            <p className="text-lg mb-4">Loading products...</p>
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center text-red-500">
            <p className="text-lg">
              {error.message === 'Failed to fetch'
                ? 'Failed to fetch products.'
                : error.message}
            </p>
          </div>
        )}

        {!isPending && !error && data?.length === 0 && (
          <div className="text-center text-gray-400">No products found.</div>
        )}

      </div>
    </SignedIn>
  )
}
