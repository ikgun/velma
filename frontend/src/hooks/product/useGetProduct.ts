import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { getProduct } from '@/apis/productApi'

export function useGetProduct(id: string) {
  const { getToken } = useAuth()
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error('No token found. User might not be authenticated.')
      }
      return getProduct(id, token)
    }
  })
}
