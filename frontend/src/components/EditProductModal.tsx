import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import type { FormEvent } from 'react'
import { useUpdateProduct } from '@/hooks/product/useUpdateProduct'

interface EditProductModalProps {
  id: string
  oldName: string
  oldBrand: string
  oldType: string
  oldExpirationDate: string
  onClose: () => void
}

export default function EditProductModal({
  id,
  oldName,
  oldBrand,
  oldType,
  oldExpirationDate,
  onClose,
}: EditProductModalProps) {
  const [newName, setNewname] = useState(oldName)
  const [newBrand, setNewBrand] = useState(oldBrand)
  const [newType, setNewType] = useState(oldType)
  const [newExpirationDate, setNewExpirationDate] = useState(oldExpirationDate)
  const [validationError, setValidationError] = useState('')
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const mutation = useUpdateProduct()

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  useEffect(() => {
    if (mutation.isSuccess) {
      dialogRef.current?.close()
      onClose()
    }
  }, [mutation.isSuccess])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setValidationError('')

    if (!newName) {
      setValidationError('Please fill in name!')
      return
    }

    mutation.mutate(
      {
        id,
        requestBody: {
          name: newName,
          brand: newBrand,
          type: newType,
          expirationDate: newExpirationDate,
        },
      },
      {
        onSuccess: () => {
          toast.success('Product updated successfully!')
          dialogRef.current?.close()
          onClose()
        },
      },
    )

    if (mutation.error) {
      console.log(mutation.error.message)
    }
  }

  const handleCancel = () => {
    dialogRef.current?.close()
    onClose()
  }

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box max-h-[90vh] bg-white rounded-lg shadow-lg relative px-6 py-8 max-w-3xl mx-auto text-[#141414] font-old">
        {/* Close Button */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Edit Product
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2">Name</label>
            <input
              type="text"
              className="border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-600 w-full"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewname(e.target.value)}
              required
            />
          </div>

          {/* Brand */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2">Brand</label>
            <input
              type="text"
              className="border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-600 w-full"
              placeholder="Brand"
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
            />
          </div>

          {/* Type */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2">Type</label>
            <input
              type="text"
              className="border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-600 w-full"
              placeholder="Type"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            />
          </div>

          {/* Expiration Date */}
          <div className="flex flex-col relative">
            <label className="text-lg font-semibold mb-2">
              Expiration Date
            </label>
            <input
              type="date"
              className="border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-600 w-full"
              value={newExpirationDate}
              onChange={(e) => setNewExpirationDate(e.target.value)}
            />

            <svg
              className="absolute right-3 top-11.5 w-5 h-5 text-gray-400  pointer-events-none"
              fill="none"
              stroke="black"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>

          {/* Error */}
          {(validationError || mutation.error) && (
            <p className="font-bold text-red-500 text-sm">
              {validationError
                ? validationError
                : mutation.error?.message === 'Failed to fetch'
                  ? 'Failed to update product'
                  : mutation.error?.message}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end sm:gap-4 gap-2 mt-4">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-[#141414] text-white font-semibold px-5 py-2 rounded hover:bg-[#5c5c5c] hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 hover:cursor-pointer text-black font-semibold py-2 px-4 rounded transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
