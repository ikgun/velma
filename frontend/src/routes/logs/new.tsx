import { createFileRoute } from '@tanstack/react-router'
import { SignedIn, useUser } from '@clerk/clerk-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import bgImage from '../../background.png'
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
  const [validationError, setValidationError] = useState('')
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

  const removeProduct = (productId: string) => {
    setProductsUsed(productsUsed.filter((p) => String(p.id) !== productId))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setValidationError('')

    if (!dateTime) {
      setValidationError('Please pick a date!')
      return
    }

    if (!routineType) {
      setValidationError('Please pick a routine type!')
      return
    }

    mutate({ dateTime, routineType, productsUsed, notes })
  }

  // Effect to react to mutation success or error
  useEffect(() => {
    if (isSuccess) {
      toast.success('New log created successfully!')
      setDateTime('')
      setRoutineType('')
      setProductsUsed([])
      setNotes('')
      setValidationError('')
    }
    if (error) {
      toast.error(error.message || 'Failed to create log.')
    }
  }, [isSuccess, error])

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

  return (
    <SignedIn>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="bg-cover bg-center bg-opacity-80% min-h-screen  px-4 sm:px-6 py-10 font-old text-[#141414]"
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Add New Log Entry</h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 shadow-lg p-4 sm:p-6 rounded-lg bg-[#F5F5F5]"
          >
            {/* Date & Time */}
            <div className="flex flex-col relative">
              <label className="text-lg font-semibold mb-2">Date & Time</label>
              <input
                type="datetime-local"
                value={dateTime}
                required
                onChange={(e) => setDateTime(e.target.value)}
                className="border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black w-full"
              />
              <svg
                className="absolute right-3 top-11.5  w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="black"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>

            {/* Routine Type */}
            <fieldset>
              <legend className="text-lg font-semibold mb-2">
                Routine Type
              </legend>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {['Morning', 'Evening', 'Unspecified'].map((value) => (
                  <label
                    key={value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="routine"
                      value={value}
                      checked={routineType === value}
                      onChange={(e) => setRoutineType(e.target.value)}
                    />
                    {value}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Products Used */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Products Used</h2>
              {isLoading ? (
                <p className="text-gray-500">Loading your products...</p>
              ) : products.length === 0 ? (
                <p className="text-gray-500">
                  Create some products to add to your log!
                </p>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {productsUsed.map((product) => (
                      <span
                        key={product.id}
                        className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
                      >
                        {product.name}
                        <button
                          type="button"
                          onClick={() => removeProduct(String(product.id))}
                          className="ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={productSearch}
                    onFocus={() => setDropdownVisible(true)}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Type to search and add products"
                    className="border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black w-full"
                    autoComplete="off"
                  />
                  {dropdownVisible && filteredProducts.length > 0 && (
                    <ul className="absolute z-10 bg-white border rounded shadow max-h-48 overflow-y-auto w-full mt-1">
                      {filteredProducts.map((product) => (
                        <li
                          key={product.id}
                          className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => addProduct(product)}
                        >
                          {product.name} –{' '}
                          {product.brand || 'Brand unspecified'}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

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
              <p className="font-bold text-[#832035] text-sm text-right">
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
                className="bg-[#351C24] hover:bg-[#502A36] text-white  px-5 py-2 rounded hover:cursor-pointer transition-colors w-full sm:w-auto"
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
