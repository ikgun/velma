import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteLog } from '../../apis/logApi'

export function useDeleteLog() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] })
    },
    retry: 2,
  })
}
