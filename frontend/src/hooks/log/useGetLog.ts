import { useQuery } from '@tanstack/react-query'
import { getLog } from '../../apis/logApi'

export function useGetLog(id: string) {
  return useQuery({
    queryKey: ['logs', id],
    queryFn: () => getLog(id),
  })
}
