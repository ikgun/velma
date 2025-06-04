import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { SignedIn, useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'

import bgImage from '../../background.png'
import type { FormEvent, Key } from 'react'
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

  const [types, setTypes] = useState<Array<string>>([
    'Cleanser',
    'Serum',
    'Moisturizer',
  ])

  const [filteredTypes, setFilteredTypes] = useState<Array<string>>([])
  const [typeSearch, setTypeSearch] = useState('')
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter types on search term
  useEffect(() => {
    if (!dropdownVisible) {
      setFilteredTypes([])
      return
    }

    if (typeSearch.trim() === '') {
      setFilteredTypes(types)
    } else {
      const filtered = types.filter((t: string) =>
        t.toLowerCase().startsWith(typeSearch.toLowerCase()),
      )
      setFilteredTypes(filtered)
    }
  }, [typeSearch, types, dropdownVisible])

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

  const addType = (t: string) => {
    setType(t)
    setTypeSearch(t)
    setDropdownVisible(false)
  }

  const addTypeToArr = (t: string) => {
    if (!types.find((t1) => t1.toLowerCase() === t.toLowerCase())) {
      setTypes([...types, t])
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('New product created successfully!')
      setName('')
      setBrand('')
      setType('')
      setExpirationDate('')
    }
  }, [isSuccess])

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
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="bg-cover bg-center bg-opacity-80% min-h-screen  px-4 sm:px-6 py-10 font-old text-[#141414]"
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 shadow-lg p-6 rounded-lg  bg-[#F5F5F5]"
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

            {/* Types Used */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Type</h2>
              <div className="relative" ref={dropdownRef}>
                <input
                  ref={inputRef}
                  type="text"
                  value={typeSearch}
                  onFocus={() => setDropdownVisible(true)}
                  onChange={(e) => setTypeSearch(e.target.value)}
                  placeholder="Write to search and add types"
                  className="border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black w-full"
                  autoComplete="off"
                />
                {dropdownVisible && (
                  <ul className="absolute z-10 bg-white border rounded shadow max-h-48 overflow-y-auto w-full mt-1">
                    {filteredTypes.length > 0 ? (
                      filteredTypes.map((t1, index: Key) => (
                        <li
                          key={index}
                          className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => addType(t1)}
                        >
                          {t1}
                        </li>
                      ))
                    ) : (
                      <li
                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          addTypeToArr(typeSearch)
                          addType(typeSearch)
                        }}
                      >
                        + Use “{typeSearch}”
                      </li>
                    )}
                  </ul>
                )}
              </div>
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
              <p className="font-bold text-[#832035] text-sm">
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
                className="bg-[#351C24] hover:bg-[#502A36] text-white px-5 py-2 rounded hover:cursor-pointer transition-colors w-full sm:w-auto"
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
