import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLocation } from '../api';

export const useCreateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      queryClient.invalidateQueries({ queryKey: ['allLocations'] });
    },
    onError: (error) => {
      console.error('Failed to create location:', error);
      alert('Could not save location');
    },
  });
};
