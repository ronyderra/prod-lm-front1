import { useQuery } from '@tanstack/react-query';
import { getLocations } from '../api';

export const useLocations = (page: number = 1, category?: string) => {
  return useQuery({
    queryKey: ['locations', page, category],
    queryFn: () => getLocations(page, category),
  });
};
