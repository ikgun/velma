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
    return <div className="p-4">Loading user...</div>
  }

  if (!isSignedIn) {
    return <div className="p-4">Sign in to view this page</div>
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen px-4">
        <p className="text-lg text-gray-600 text-center">Loading product...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen px-4">
        <p className="text-lg text-red-500 text-center">
          Error: {error.message}
        </p>
      </div>
    )
  }

  return (
    <SignedIn>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#252422] mb-4">{data.name}</h1>

        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Brand</h2>
          <p className="text-gray-600 text-sm ">{!(data.brand) ? "Brand not specified" : data.brand}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Type</h2>
          <p className="text-gray-600 text-sm ">{!(data.type) ? "Type not specified" : data.type}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Expiration date
          </h2>
          <p className="text-gray-600 text-sm ">{!(data.expirationDate) ? "Expiration date not specified" : data.expirationDate}</p>
        </section>

        <button
          className="mt-6 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded-lg transition"
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
    </SignedIn>
  )
}
