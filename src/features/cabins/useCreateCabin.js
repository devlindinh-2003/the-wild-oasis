import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin() {
  const queryClinet = useQueryClient();
  //* Create cabin
  const { mutate: creatingCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('Cabin created successfully !');
      queryClinet.invalidateQueries({
        queryKey: ['cabin'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isCreating, creatingCabin };
}
