/* eslint-disable @typescript-eslint/no-unnecessary-condition */
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
      <div className="modal-box max-h-[90vh] bg-white rounded-lg shadow-lg relative">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        <h3 className="text-2xl  text-[#252422] text-center font-semibold mb-6">
          Edit Product
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <label
            htmlFor="name"
            className="flex flex-col text-gray-700 font-medium"
          >
            Name
            <input
              type="text"
              id="name"
              className="mt-1 border border-gray-300 rounded-md p-2  text-gray-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
              placeholder="Name"
              required
              value={newName}
              onChange={(e) => setNewname(e.target.value)}
            />
          </label>

          <label
            htmlFor="brand"
            className="flex flex-col text-gray-700 font-medium"
          >
            Brand
            <input
              type="text"
              id="brand"
              className="mt-1 border border-gray-300 rounded-md p-2  text-gray-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
              placeholder="Brand"
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
            />
          </label>

          <label
            htmlFor="type"
            className="flex flex-col text-gray-700 font-medium"
          >
            Type
            <input
              type="text"
              id="type"
              className="mt-1 border border-gray-300 rounded-md p-2  text-gray-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none"
              placeholder="Type"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            />
          </label>

          <label
            htmlFor="date"
            className="flex flex-col text-gray-700 font-medium"
          >
            Expiration date:
            <input
              type="date"
              name="date"
              id="date"
              value={newExpirationDate}
              onChange={(e) => setNewExpirationDate(e.target.value)}
            />
          </label>

          {(validationError || mutation.error) && (
            <p className="font-bold text-red-500 text-sm">
              {validationError
                ? validationError
                : mutation.error?.message === 'Failed to fetch'
                  ? 'Failed to update product'
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
