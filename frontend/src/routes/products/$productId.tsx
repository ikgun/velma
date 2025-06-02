import { createFileRoute, useParams } from '@tanstack/react-router'
import { SignedIn, useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import { useGetProduct } from '@/hooks/product/useGetProduct'
import EditProductModal from '@/components/EditProductModal'

export const Route = createFileRoute('/products/$productId')({
  component: ProductPage,
})

function ProductPage() {
  const { productId } = useParams({ from: '/products/$productId' })
  const { isSignedIn, isLoaded } = useUser()
  const { data, isPending, error } = useGetProduct(productId)
  const [showEditProduct, setShowEditProduct] = useState(false)

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-screen  bg-[#FFFFFF] font-old text-[#141414] px-4 text-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen  bg-[#FFFFFF] font-old text-[#141414] px-4 text-center">
        <p className="text-lg mb-4">Sign in to view this page</p>
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen  bg-[#FFFFFF] font-old text-[#141414] px-4 text-center">
        Loading product {" "} <span className="loading loading-dots loading-xl"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen  bg-[#FFFFFF] font-old text-[#141414] px-4 text-center">
        <p className="text-lg">{error.message}</p>
      </div>
    )
  }

  return (
    <SignedIn>
       <div className="min-h-screen flex flex-col bg-[#FFFFFF] font-old text-[#141414]">
        <div className="m-10">
          <h1 className="text-2xl font-semibold mb-1">Product Details</h1>

          <p className="mb-8 text-gray-700 text-sm">
            This page shows more info about your saved product.
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Name</h2>
            <p className="text-gray-600 text-sm">{data.name}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Brand</h2>
            <p className="text-gray-600 text-sm">
              {data.brand || 'Brand not specified'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Type</h2>
            <p className="text-gray-600 text-sm">
              {data.type || 'Type not specified'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Expiration Date
            </h2>
            <p className="text-gray-600 text-sm">
              {data.expirationDate || 'Expiration date not specified'}
            </p>
          </section>

          <button
            className="bg-[#141414] text-white font-semibold px-5 py-2 rounded hover:bg-[#5c5c5c] transition-colors"
            onClick={() => setShowEditProduct(true)}
            type="button"
          >
            Edit product
          </button>

          {showEditProduct && (
            <EditProductModal
              id={productId}
              oldName={data.name}
              oldBrand={data.brand}
              oldType={data.type}
              oldExpirationDate={data.expirationDate}
              onClose={() => setShowEditProduct(false)}
            />
          )}
        </div>
      </div>
    </SignedIn>
  )
}
