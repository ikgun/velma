import { Link } from '@tanstack/react-router'
import { toast } from 'react-toastify'
import type { Product } from '@/types'
import type { FormEvent } from 'react'
import { useDeleteProduct } from '@/hooks/product/useDeleteProduct'

export default function ProductCard(data: Product) {
  const mutation = useDeleteProduct()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate(data.id, {
      onSuccess: () => {
        toast.success('Product removed successfully!')
      },
    })
  }

  return (
    <div className="bg-red-300 p-4 rounded-md">
      <p className="font-bold">Product Card</p>
      <p>Name: {name}</p>
      <p>Brand: {!brand ? "Brand not specified" : brand}</p>
      <p>Type: {!type ? "Type not specified" : type}</p>
      <p>Expiration date: {!expirationDate ? "Expiration date not specified" : expirationDate}</p>
      <h2 className="text-lg sm:text-xl font-semibold mb-2">{data.name}</h2>
          {data.expirationDate || 'Not specified'}
      <form
        onSubmit={handleSubmit}
        className="pt-2 flex flex-col sm:flex-row gap-2 justify-center"
      >
        <Link
          to={'/products/$productId'}
          params={{ productId: String(id) }}
          className="text-center bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded-lg transition"
          params={{ productId: String(data.id) }}
        >
          See more
        </Link>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="cursor-pointer flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
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
      </form>
    </div>
  )
}
