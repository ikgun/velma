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
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Products</h1>
          <Link to="/products/new" className="text-blue-600 hover:underline font-medium">
            Add new product
          </Link>
        </div>

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
