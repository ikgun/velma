import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { createLog } from '../../apis/logApi'
import type { Log } from '../../types'

export function useCreateLog() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (requestBody : Log) => {
          const token = await getToken()
          if (!token) {
            throw new Error('No token found. User might not be authenticated.')
          }
          return createLog(requestBody, token)
        },
      const token = await getToken()
      if (!token) {
        throw new Error('No token found. User might not be authenticated.')
      }
      return createLog(requestBody, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] })
    },
    retry: 2,
  })
}
