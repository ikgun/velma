import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../../apis/productApi'

export function useGetAllProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })
}
