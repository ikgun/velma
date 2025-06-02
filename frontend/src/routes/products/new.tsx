import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { SignedIn, useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import type { FormEvent } from 'react'
import { useCreateProduct } from '@/hooks/product/useCreateProduct'

export const Route = createFileRoute('/products/new')({
  component: AddProductFormPage,
})

function AddProductFormPage() {
  const { isSignedIn, isLoaded } = useUser()
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [type, setType] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const { mutate, isSuccess, error, isPending } = useCreateProduct()
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    if (isSuccess) {
      toast.success('New product created successfully!')
      setName('')
      setBrand('')
      setType('')
      setExpirationDate('')
    }
  }, [isSuccess])

  if (!isLoaded)
    return <div className="p-4 text-[#141414]">Loading user...</div>
  if (!isSignedIn)
    return <div className="p-4 text-[#141414]">Sign in to view this page</div>

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setValidationError('')

    if (!name) {
      setValidationError('Please fill in name!')
      return
    }

    mutate({ name, brand, type, expirationDate })
  }

  return (
    <SignedIn>
      <div className="min-h-screen bg-white text-[#141414] font-old px-4 py-10 sm:px-6 font-old">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 shadow-md p-6 rounded-lg border bg-white"
          >
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Write name"
                required
                className="border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Write brand"
                className="border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Write type"
                className="border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black w-full"
              />
            </div>

            <div className="flex flex-col relative">
              <label className="text-lg font-semibold mb-2">
                Expiration Date
              </label>
              <input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black w-full"
              />
              <svg
                className="absolute right-3 top-11.5 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="black"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>

            {(validationError || error) && (
              <p className="font-bold text-red-500 text-sm">
                {validationError
                  ? validationError
                  : error?.message === 'Failed to fetch'
                    ? 'Failed to fetch product form'
                    : error?.message}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                className="bg-[#141414] text-white font-semibold px-5 py-2 rounded hover:bg-[#5c5c5c] hover:cursor-pointer transition-colors w-full sm:w-auto"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </SignedIn>
  )
}
