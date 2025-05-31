import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { getLog } from '../../apis/logApi'

export function useGetLog(id: string) {
  const { getToken } = useAuth()
  return useQuery({
    queryKey: ['logs', id],
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error('No token found. User might not be authenticated.')
      }
      return getLog(id, token)
    }
  })
}
