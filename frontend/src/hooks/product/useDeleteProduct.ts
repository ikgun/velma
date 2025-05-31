import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '../../apis/productApi'

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    retry: 2,
  })
}
