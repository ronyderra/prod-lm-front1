import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLocation } from '../api';
import { LocationFormData } from '../types/types';

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: LocationFormData }) => updateLocation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      queryClient.invalidateQueries({ queryKey: ['allLocations'] });
    },
    onError: (error) => {
      console.error('Failed to update location:', error);
      alert('Could not update location');
    },
  });
};
