import { useQuery } from '@tanstack/react-query'
import { getProduct } from '../../apis/productApi'

export function useGetProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
  })
}
