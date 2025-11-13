import { useQuery } from '@tanstack/react-query';
import { getAllLocations } from '../api/locationsApi';

export const useAllLocations = () => {
  return useQuery({
    queryKey: ['allLocations'],
    queryFn: getAllLocations,
  });
};

