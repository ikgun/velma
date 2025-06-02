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
  const [productSearch, setProductSearch] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Array<Product>>([])
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter products on search term
  useEffect(() => {
    if (!dropdownVisible) {
      setFilteredProducts([])
      return
    }

    if (productSearch.trim() === '') {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((p: Product) =>
        p.name.toLowerCase().startsWith(productSearch.toLowerCase()),
      )
      setFilteredProducts(filtered)
    }
  }, [productSearch, products, dropdownVisible])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current !== event.target
      ) {
        setDropdownVisible(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const addProduct = (product: Product) => {
    if (!productsUsed.find((p) => p.id === product.id)) {
      setProductsUsed([...productsUsed, product])
    }
    setProductSearch('')
    setDropdownVisible(false)
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

            {/* Notes */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                placeholder="Write anything important about this log..."
              />
            </div>

            {/* Errors */}
            {(validationError || error) && (
              <p className="font-bold text-red-500 text-sm">
                {validationError ||
                  (error?.message === 'Failed to fetch'
                    ? 'Failed to fetch log form'
                    : error?.message)}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                className="bg-[#141414] text-white font-semibold px-5 py-2 rounded hover:bg-[#5c5c5c] transition-colors w-full sm:w-auto"
              >
                Save Log
              </button>
            </div>
          </form>
        </div>
      </div>
    </SignedIn>
  )
}
