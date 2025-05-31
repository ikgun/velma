import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { createProduct } from '../../apis/productApi'
import type { Product } from '../../types'

export function useCreateProduct() {
   const { getToken } = useAuth()
  const queryClient = useQueryClient()
 
  return useMutation({
    mutationFn: async (requestBody: Product) => {
      const token = await getToken()
      if (!token) {
        throw new Error('No token found. User might not be authenticated.')
      }
      return createProduct(requestBody, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    retry: 2,
  })
}
