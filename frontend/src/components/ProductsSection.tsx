/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Link } from '@tanstack/react-router'
import ProductCard from './ProductCard'
import type { Product } from '@/types'

type ProductsSectionProps = {
  products: Array<Product>
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  const hasProducts = products && products.length > 0
  const lastThree = hasProducts ? products.slice(-3).reverse() : []

  return (
    <div className="py-5">
      <h1 className="text-shadow-lg/10 text-xl sm:text-2xl font-semibold mb-4">
        Your latest added products
      </h1>

      <div className="flex gap-2 w-90 sm:w-100 h-10 mb-6">
        <Link
          to="/products/new"
          className="bg-[#351C24] text-sm sm:text-md text-white px-4 py-1 items-center justify-center flex rounded hover:bg-[#502A36] transition-colors duration-200 w-full text-center"
        >
          + Add New Product
        </Link>

        
          <Link
            to="/products"
            className="text-shadow-lg/20 flex items-center text-left justify-left px-4 py-1 rounded text-xs sm:text-sm font-medium text-[#141414] hover:bg-gray-100 transition-colors duration-200 block w-full"
          >
            See all of your products
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        
      </div>

      {/* Products Grid / Scroll */}
      {hasProducts ? (
        <div className="mt-5">
          {/* Horizontal scroll for mobile */}
          <div className="flex gap-4 overflow-x-auto sm:hidden pb-2">
            {lastThree.map((product) => (
              <div key={product.id} className="min-w-[280px] flex-shrink-0">
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {/* Grid layout for sm+ screens */}
          <div className="hidden sm:grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {lastThree.map((product) => (
              <div key={product.id} className="h-full flex">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-900 mb-4">
          You haven’t added any products yet. Start adding your skincare products!
        </p>
      )}
    </div>
  )
}
