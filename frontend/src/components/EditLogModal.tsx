import { enUS } from 'date-fns/locale'
import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { Product } from '@/types'
import { useUpdateLog } from '@/hooks/log/useUpdateLog'
import { useGetAllProducts } from '@/hooks/product/useGetAllProducts'

interface EditLogModalProps {
  id: string
  oldDateTime: string
  oldRoutineType: string
  oldProductsUsed: Array<Product>
  oldNotes: string
  onClose: () => void
}

export default function EditLogModal({
  id,
  oldDateTime,
  oldRoutineType,
  oldProductsUsed,
  oldNotes,
  onClose,
}: EditLogModalProps) {
  const [newDateTime, setNewDateTime] = useState(oldDateTime)
  const [newRoutineType, setNewRoutineType] = useState(oldRoutineType)
  const [newProductsUsed, setNewProductsUsed] = useState(oldProductsUsed)
  const [newNotes, setNewNotes] = useState(oldNotes)
  const [validationError, setValidationError] = useState('')
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const mutation = useUpdateLog()
  const { data: products = [] } = useGetAllProducts()

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  useEffect(() => {
    if (mutation.isSuccess) {
      dialogRef.current?.close()
      onClose()
    }
  }, [mutation.isSuccess])

  useEffect(() => {
    if (!dropdownVisible) {
      setFilteredProducts([])
      return
    }

    if (productSearch.trim() === '') {
      // Show all products if search empty & dropdown open
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((p: Product) =>
        p.name.toLowerCase().startsWith(productSearch.toLowerCase()),
      )
      setFilteredProducts(filtered)
    }
  }, [productSearch, products, dropdownVisible])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setValidationError('')

    if (!newDateTime || !newRoutineType ) {
      setValidationError('Please fill in all fields')
      return
    }

    mutation.mutate({
      id,
      requestBody: {
        dateTime: newDateTime,
        routineType: newRoutineType,
        productsUsed: newProductsUsed,
        notes: newNotes,
      },
    })

    if (mutation.error) {
      console.log(mutation.error.message)
    }
  }

  const handleCancel = () => {
    dialogRef.current?.close()
    onClose()
  }

  const toggleProduct = (selectedProduct: Product) => {
    setNewProductsUsed((existingProducts) =>
      existingProducts.some((p) => p.id === selectedProduct.id)
        ? existingProducts.filter((p) => p.id !== selectedProduct.id)
        : [...existingProducts, selectedProduct],
    )
  }

  function formatCustomDate(dateStr: string) {
    const date = new Date(dateStr)
    return format(date, "EEEE, do 'of' MMMM 'at' HH:mm", { locale: enUS })
  }

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box max-h-[90vh] bg-white rounded-lg shadow-lg relative">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="mb-5">
          <h3 className="text-2xl font-semibold mb-6 text-center">Edit Log</h3>
          <p className="text-sm text-gray-500">
            Created at {formatCustomDate(oldDateTime)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <label
            htmlFor="title"
            className="flex flex-col text-gray-700 font-medium"
          >
            Date & Time
            <input
              type="datetime-local"
              id="title"
              className="mt-1 border border-gray-300 rounded-md p-2  text-gray-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
              placeholder="Title"
              value={newDateTime}
              onChange={(e) => setNewDateTime(e.target.value)}
            />
          </label>

          <fieldset>
            <legend className="font-medium mb-2">Routine Type:</legend>
            <label className="mr-4">
              <input
                type="radio"
                name="routine"
                value="Morning"
                checked={newRoutineType === 'Morning'}
                onChange={(e) => setNewRoutineType(e.target.value)}
              />
              <span className="ml-1">Morning</span>
            </label>
            <label className="mr-4">
              <input
                type="radio"
                name="routine"
                value="Evening"
                checked={newRoutineType === 'Evening'}
                onChange={(e) => setNewRoutineType(e.target.value)}
              />
              <span className="ml-1">Evening</span>
            </label>
            <label>
              <input
                type="radio"
                name="routine"
                value="Unspecified"
                checked={newRoutineType === 'Unspecified'}
                onChange={(e) => setNewRoutineType(e.target.value)}
              />
              <span className="ml-1">Unspecified</span>
            </label>
          </fieldset>

          <h2 className="text-lg font-bold">Select Products Used</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products && products.length > 0 ? (
              products.map((product: Product) => (
                <label
                  key={product.id}
                  className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={newProductsUsed.some((p) => p.id === product.id)}
                    onChange={() => toggleProduct(product)}
                  />
                  <span>
                    {product.name} – {product.brand}
                  </span>
                </label>
              ))
            ) : (
              <p className="text-gray-400 italic">No products to select.</p>
            )}
          </div>

          <label
            htmlFor="notes"
            className="flex flex-col text-gray-700 font-medium"
          >
            Notes
            <input
              type="text"
              id="notes"
              className="mt-1 border border-gray-300 rounded-md p-2 text-gray-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
              placeholder="notes"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
            />
          </label>

          {(validationError || mutation.error) && (
            <p className="font-bold text-red-500 text-sm">
              {validationError
                ? validationError
                : mutation.error?.message === 'Failed to fetch'
                  ? 'Failed to update log'
                  : mutation.error?.message}
            </p>
          )}

          <div className="flex flex-col sm:flex-row justify-end sm:gap-4 gap-2 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
