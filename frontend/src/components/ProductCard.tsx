export default function ProductCard(){
    return(
        <>
        <div className="bg-red-300">
            <p>product card</p>
        </div>
        </>
    )
import type { Product as ProductCardProps } from '@/types'
import type { FormEvent } from 'react'
import { useDeleteProduct } from '@/hooks/product/useDeleteProduct'

export default function ProductCard({
  id,
  name,
  brand,
  type,
  expirationDate,
}: ProductCardProps) {
  const mutation = useDeleteProduct()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    mutation.mutate(id)
  }
}