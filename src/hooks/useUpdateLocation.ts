import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLocation } from '../api';
import { LocationData } from '../types/types';

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: LocationData }) => updateLocation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
    onError: (error) => {
      console.error('Failed to update location:', error);
      alert('Could not update location');
    },
  });
};
