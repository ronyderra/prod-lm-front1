import { useQuery } from '@tanstack/react-query';
import { getLocations } from '../api/locationsApi';

export const useLocations = (page: number = 1) => {
  return useQuery({
    queryKey: ['locations', page],
    queryFn: () => getLocations(page),
  });
};
