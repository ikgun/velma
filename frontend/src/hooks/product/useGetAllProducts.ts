import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { getAllProducts } from '@/apis/productApi'

export function useGetAllProducts() {
  const { getToken } = useAuth()
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error('No token found. User might not be authenticated.')
      }
      return getAllProducts(token)
    },
  })
}
