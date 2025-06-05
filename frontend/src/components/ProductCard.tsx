import {  useState } from 'react'
import { Link } from '@tanstack/react-router'
import { toast } from 'react-toastify'
import type {FormEvent} from 'react';
import type { Product } from '@/types'
import { useDeleteProduct } from '@/hooks/product/useDeleteProduct'

export default function ProductCard(data: Product) {
  const mutation = useDeleteProduct()
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault()
    mutation.mutate(data.id, {
      onSuccess: () => {
        toast.success('Product removed successfully!')
        setShowConfirmModal(false)
      },
    })
  }

  return (
    <>
      {/* Product Card */}
      <div className="mx-auto bg-[#F5F5F5] text-black shadow-md rounded-xl p-4 sm:p-6 w-full transition duration-300 hover:shadow-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">{data.name}</h2>

        <div className="mb-4">
          <p className="text-sm sm:text-base font-medium">Expiration Date:</p>
          <p className="text-xs sm:text-sm text-gray-500">
            {data.expirationDate || 'Not specified'}
          </p>
        </div>

        <div className="mt-5 flex gap-3">
          <Link
            to={'/products/$productId'}
            params={{ productId: String(data.id) }}
            className="w-28 flex items-center justify-center text-white bg-[#B2A095] hover:bg-[#C3B5AC] py-2 px-4 rounded-md transition duration-200 ease-in-out"
          >
            See more
          </Link>

          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="cursor-pointer flex items-center justify-center bg-[#141414] hover:bg-[#5c5c5c] text-white font-semibold py-2 px-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M5.062 20h13.876c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.33 17c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-yellow-800">
                Confirm Deletion
              </h3>
            </div>
            <p className="text-sm text-gray-700">
              Are you sure you want to delete this product? Deleting it will
              also remove its usage from log entries.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 hover:cursor-pointer text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={mutation.isPending}
                className="px-4 py-2 text-sm rounded-md bg-[#A42843] hover:bg-red-700 hover:cursor-pointer text-white disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
