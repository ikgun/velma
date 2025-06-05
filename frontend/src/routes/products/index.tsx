import { Link, createFileRoute } from '@tanstack/react-router'
import { SignedIn, useUser } from '@clerk/clerk-react'
import bgImage from '../../background.png'
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
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#FFFFFF] font-old text-[#141414] px-4 text-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#FFFFFF] font-old text-[#141414] px-4 text-center">
        <p className="text-lg mb-4">Sign in to view this page</p>
      </div>
    )
  }

  return (
    <SignedIn>
      <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="bg-cover bg-center bg-opacity-80% min-h-screen flex flex-col font-old text-[#141414]"
    >
        <div className="m-10">
          <h1 className="text-shadow-lg/15 text-3xl font-semibold mb-5">Your Products</h1>

          {isPending && (
            <div className="flex gap-2 items-center justify-center text-center min-h-[300px]">
              <p className="text-lg">Loading products</p>
              <span className="loading loading-dots loading-xl"></span>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
              <p className="text-lg">
                {error.message === 'Failed to fetch'
                  ? 'Failed to load products'
                  : error.message}
              </p>
            </div>
          )}

          {/* Show Add button only when there's no error or loading */}
          {!error && !isPending && (
            <div className="mb-5">
              <Link
                to="/products/new"
                className="bg-[#351C24]
                    hover:bg-[#502A36] text-white px-4 py-3 rounded transition-colors duration-200"
              >
                + Add New Product
              </Link>
            </div>
          )}

          {/* Empty state message */}
          {!error && !isPending && data?.length === 0 && (
            <p className="text-lg flex items-center justify-center text-center min-h-[300px] text-gray-900">
              You have no products yet. Add some to track your skincare items.
            </p>
          )}

          {/* Product list */}
          {!error && !isPending && data?.length > 0 && (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5">
              {data.map((product: Product) => (
                <div key={product.id} className="h-full flex">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    brand={product.brand}
                    type={product.type}
                    expirationDate={product.expirationDate}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SignedIn>
  )
}
