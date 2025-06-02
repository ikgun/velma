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


      <div className="flex gap-2 w-90 sm:w-100 h-10 mb-6">
        <Link
          to="/products/new"
          className="bg-[#141414] text-sm sm:text-md text-white px-4 py-1 items-center justify-center flex rounded hover:bg-gray-700 transition-colors duration-200 w-full text-center"
        >
          + Add New Product
        </Link>

        
          <Link
            to="/products"
            className="flex items-center text-left justify-left px-4 py-1 rounded text-xs sm:text-sm font-medium text-[#141414] hover:bg-gray-200 transition-colors duration-200 block w-full"
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

}