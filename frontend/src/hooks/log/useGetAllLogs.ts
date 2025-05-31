import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { getAllLogs } from '../../apis/logApi'

export function useGetAllLogs() {
  const { getToken } = useAuth()
  return useQuery({
    queryKey: ['logs'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error('No token found. User might not be authenticated.')
      }
      return getAllLogs(token)
    }
  })
}
