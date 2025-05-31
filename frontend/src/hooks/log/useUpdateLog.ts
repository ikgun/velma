import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { updateLog } from '../../apis/logApi'
import type { Product } from '../../types'

export function useUpdateLog() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      requestBody,
    }: {
      id: string
      requestBody: {
        dateTime: string
        routineType: string
        productsUsed: Array<Product>
        notes: string
      }
    }) => {
      const token = await getToken()
      if (!token) {
        throw new Error('No token found. User might not be authenticated.')
      }
      return updateLog(id, requestBody, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] })
    },
    retry: 2,
  })
}
