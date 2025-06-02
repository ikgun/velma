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
}