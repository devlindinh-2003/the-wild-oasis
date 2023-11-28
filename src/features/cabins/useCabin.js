import { getCabins } from '../../services/apiCabins';
import { useQuery } from '@tanstack/react-query';

export function useCabin() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ['cabin'],
    queryFn: getCabins,
  });
  return { isLoading, cabins };
}
