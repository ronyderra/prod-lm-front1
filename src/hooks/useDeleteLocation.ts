import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLocation } from '../api';

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
    onError: (error) => {
      console.error('Failed to delete location:', error);
      alert('Could not delete location');
    },
  });
};
