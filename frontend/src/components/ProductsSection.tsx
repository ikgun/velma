/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Link } from '@tanstack/react-router'
import ProductCard from './ProductCard'
import type { Product } from '@/types'

type ProductsSectionProps = {
  products: Array<Product>
}

export default function ProductsSection(){
    return(
        <>
        <div>
            <h1>Your products</h1>
            <button>click to add new product</button>
            <p>see more...</p>
            <ProductCard/>
        </div>
        </>
    )
export default function ProductsSection({ products }: ProductsSectionProps) {
  const hasProducts = products && products.length > 0
  const lastThree = hasProducts ? products.slice(-3).reverse() : []
}