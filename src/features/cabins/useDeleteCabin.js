import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteCabin } from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deletingCabin } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabin'],
      });
      toast.success('Cabin delted successfully !');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return {
    isDeleting,
    deletingCabin,
  };
}
