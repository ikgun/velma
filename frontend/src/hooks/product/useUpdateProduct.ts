import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { updateProduct } from '../../apis/productApi'

export function useUpdateProduct() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      requestBody,
    }: {
      id: string
      requestBody: {name: string, brand: string, type: string, expirationDate: string}
    }) => {
      const token = await getToken()
      if (!token) {
        throw new Error('No token found. User might not be authenticated.')
      }
      return updateProduct(id, requestBody, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    retry: 2,
  })
}
