import { useQuery } from '@tanstack/react-query'
import { getAllLogs } from '../../apis/logApi'

export function useGetAllLogs() {
  return useQuery({
    queryKey: ['logs'],
    queryFn: getAllLogs,
  })
}
