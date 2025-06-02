import { enUS } from 'date-fns/locale'
import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
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

  const [productSearch, setProductSearch] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Array<Product>>([])
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const mutation = useUpdateLog()
  const { data: products = [] } = useGetAllProducts()

  // Show modal on mount
  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  // Close modal on successful mutation
  useEffect(() => {
    if (mutation.isSuccess) {
      dialogRef.current?.close()
      onClose()
    }
  }, [mutation.isSuccess])

  // Filter products based on search & dropdown visibility
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setValidationError('')

    if (!newDateTime) {
      setValidationError('Please pick a date!')
      return
    }

    if (!newRoutineType) {
      const msg = 'Please pick a routine type!'
      setValidationError(msg)
      return
    }

    mutation.mutate(
      {
        id,
        requestBody: {
          dateTime: newDateTime,
          routineType: newRoutineType,
          productsUsed: newProductsUsed,
          notes: newNotes,
        },
      },
      {
        onSuccess: () => {
          toast.success('Log updated successfully!')
          dialogRef.current?.close()
          onClose()
        },
      }
    )
  }

  const handleCancel = () => {
    dialogRef.current?.close()
    onClose()
  }

  const addProduct = (product: Product) => {
    if (!newProductsUsed.find((p) => p.id === product.id)) {
      setNewProductsUsed([...newProductsUsed, product])
    }
    setProductSearch('')
    setDropdownVisible(false)
  }

  const removeProduct = (productId: string) => {
    setNewProductsUsed(
      newProductsUsed.filter((p) => String(p.id) !== productId),
    )
  }

  function formatCustomDate(dateStr: string) {
    const date = new Date(dateStr)
    return format(date, "EEEE, do 'of' MMMM 'at' HH:mm", { locale: enUS })
  }

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box max-h-[90vh] bg-white rounded-lg shadow-lg relative px-6 py-8 max-w-3xl mx-auto text-[#141414] font-old">
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Routine Type */}
          <fieldset>
            <legend className="text-lg font-semibold mb-2">Routine Type</legend>
            <div className="flex gap-6">
              {['Morning', 'Evening', 'Unspecified'].map((value) => (
                <label
                  key={value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="routine"
                    value={value}
                    checked={newRoutineType === value}
                    onChange={(e) => setNewRoutineType(e.target.value)}
                    className="cursor-pointer"
                  />
                  {value}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Products Used */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Products Used</h2>

            <div className="flex flex-wrap gap-2 mb-2">
              {newProductsUsed.map((product) => (
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

            <div className="relative" ref={dropdownRef}>
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
                <ul className="absolute z-10 bg-white border rounded shadow max-h-48 overflow-auto w-full mt-1">
                  {filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => addProduct(product)}
                    >
                      {product.name} – {product.brand}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2">Notes</label>
            <textarea
              rows={4}
              className="border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black resize-none"
              placeholder="Write anything important about this log..."
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
            />
          </div>

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
