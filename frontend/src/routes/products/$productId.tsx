import { createFileRoute, useParams } from '@tanstack/react-router'
import { SignedIn, useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import bgImage from '../../background.png'
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
        Loading product{' '}
        <span className="loading loading-dots loading-xl"></span>
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
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="bg-cover bg-center bg-opacity-80% min-h-screen flex flex-col font-old text-[#141414]"
      >
        <div className="m-10 max-w-3xl sm:min-w-xl mx-auto space-y-6 shadow-lg p-4 sm:p-6 rounded-lg bg-[#F5F5F5]">
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

          <div className="flex justify-end">
            <button
              className="bg-[#351C24] hover:bg-[#502A36] text-white px-5 py-2 rounded hover:cursor-pointer transition-colors"
              onClick={() => setShowEditProduct(true)}
              type="button"
            >
              Edit product
            </button>
          </div>

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
