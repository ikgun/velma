import { useEffect, useRef, useState } from 'react'
import type { Product } from '@/types'
import { useGetAllProducts } from '@/hooks/product/useGetAllProducts'

type FilterProps = {
  selectedProducts: Array<Product>
  setSelectedProducts: React.Dispatch<React.SetStateAction<Array<Product>>>
}

export default function ProductFilter({
  selectedProducts,
  setSelectedProducts,
}: FilterProps) {
  const { data: products } = useGetAllProducts()
  const [productSearch, setProductSearch] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Array<Product>>([])
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter products by search term when dropdown is visible
  useEffect(() => {
    if (!dropdownVisible) {
      setFilteredProducts([])
      return
    }
    if (productSearch.trim() === '') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(
        products.filter((p: Product) =>
          p.name.toLowerCase().startsWith(productSearch.toLowerCase()),
        ),
      )
    }
  }, [productSearch, products, dropdownVisible])

  // Close dropdown on outside click
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

  // Add product to filter if not already selected
  const addProduct = (product: Product) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.find((p) => p.id === product.id)) {
        return prevSelected // already selected, no change
      }
      return [...prevSelected, product]
    })
    setProductSearch('')
    setDropdownVisible(false)
  }

  // Remove product from filter
  const removeProduct = (productId: string) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.filter((p) => String(p.id) !== productId),
    )
  }

  return (
    <div className="pt-4 ">
      {/* Product Filter Input */}
      <label className="text-shadow-lg/10 block font-semibold">Filter by product</label>
      <div className="relative mb-6">
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedProducts.map((product) => (
            <span
              key={product.id}
              className="flex items-center bg-gray-100 rounded-full px-3 py-1 mt-1 text-sm"
            >
              {product.name}
              <button
                type="button"
                onClick={() => removeProduct(String(product.id))}
                className="ml-2 text-gray-600 hover:text-gray-900 hover:cursor-pointer focus:outline-none"
                aria-label={`Remove ${product.name}`}
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
          placeholder="Type a product to filter logs"
          className="shadow-md rounded px-3 py-2 bg-[#F5F5F5] focus:outline-none w-full sm:w-1/2 focus:ring-2 focus:ring-black "
          autoComplete="off"
        />
        {dropdownVisible && filteredProducts.length > 0 && (
          <div ref={dropdownRef}>
            <ul className="absolute z-10 bg-white border rounded shadow max-h-48 overflow-y-auto w-full sm:w-1/2 mt-1">
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => addProduct(product)}
                >
                  {product.name} – {product.brand || 'Brand unspecified'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
