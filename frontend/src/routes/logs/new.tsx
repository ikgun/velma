import { createFileRoute } from '@tanstack/react-router'
import { SignedIn, useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Product } from '@/types'
import { useCreateLog } from '@/hooks/log/useCreateLog'
import { useGetAllProducts } from '@/hooks/product/useGetAllProducts'

export const Route = createFileRoute('/logs/new')({
  component: AddLogFormPage,
})

function AddLogFormPage() {
  const { isSignedIn, isLoaded } = useUser()
  const [dateTime, setDateTime] = useState('')
  const [routineType, setRoutineType] = useState('')
  const [productsUsed, setProductsUsed] = useState<Array<Product>>([])
  const [notes, setNotes] = useState('')
  const { mutate, isSuccess, error, isPending } = useCreateLog()
  const { data: products = [], isLoading } = useGetAllProducts()

  if (!isLoaded) {
    return <div className="p-4">Loading form...</div>
  }

  if (!isSignedIn) {
    return <div className="p-4">Sign in to view this page</div>
  }

  const toggleProduct = (selectedProduct: Product) => {
    setProductsUsed((existingProducts) =>
      existingProducts.includes(selectedProduct)
        ? existingProducts.filter((each) => each.id !== each.id)
        : [...existingProducts, selectedProduct],
    )
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    mutate({ dateTime, routineType, productsUsed, notes })

    if (isSuccess) {
      setDateTime('')
      setRoutineType('')
      setProductsUsed([])
      setNotes('')
    }

    if (error) {
      console.log(error.message)
    }
  }

  return (
    <SignedIn>
      <form onSubmit={handleSubmit}>
        <label>
          Date & Time:
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </label>
        <fieldset>
          <legend className="font-medium mb-2">Routine Type:</legend>
          <label className="mr-4">
            <input
              type="radio"
              name="routine"
              value="Morning"
              checked={routineType === 'Morning'}
              onChange={(e) => setRoutineType(e.target.value)}
            />
            <span className="ml-1">Morning</span>
          </label>
          <label className="mr-4">
            <input
              type="radio"
              name="routine"
              value="Evening"
              checked={routineType === 'Evening'}
              onChange={(e) => setRoutineType(e.target.value)}
            />
            <span className="ml-1">Evening</span>
          </label>
          <label>
            <input
              type="radio"
              name="routine"
              value="Unspecified"
              checked={routineType === 'Unspecified'}
              onChange={(e) => setRoutineType(e.target.value)}
            />
            <span className="ml-1">Unspecified</span>
          </label>
        </fieldset>
        <h2 className="text-lg font-bold">Select Products Used</h2>
        {isLoading ? (
          <p>Loading your products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-400">
            Create some products to add to your log!
          </p>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product: Product) => (
                <label
                  key={product.id}
                  className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={productsUsed.includes(product)}
                    onChange={() => toggleProduct(product)}
                  />
                  <span>
                    {product.name} – {product.brand}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <label>
          Notes:
          <input
            type="text"
            name="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
        <input type="submit" value="Send" />
      </form>
                disabled={isPending}
    </SignedIn>
  )
}
