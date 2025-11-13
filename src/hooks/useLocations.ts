import { useQuery } from '@tanstack/react-query';
import { getLocations } from '../api/locationsApi';

export const useLocations = () => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
  });
};
