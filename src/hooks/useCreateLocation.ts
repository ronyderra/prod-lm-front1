import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLocation } from '../api/locationsApi';

export const useCreateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
    onError: (error) => {
      console.error('Failed to create location:', error);
      alert('Could not save location');
    },
  });
};
