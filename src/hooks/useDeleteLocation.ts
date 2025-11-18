import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLocation } from '../api';

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLocation,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['locations'] });
      const previous = queryClient.getQueryData(['locations']);

      queryClient.setQueryData(['locations'], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          data: old.data.filter((loc: any) => loc._id !== id),
        };
      });
      console.log('useDeleteLocation useMutation - executed');
      
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['locations'], context.previous);
      }

      alert('Could not delete location');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });
};
