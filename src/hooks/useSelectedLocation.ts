import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useSelectedLocation = () => {
  const queryClient = useQueryClient();

  const { data: selected = null } = useQuery({
    queryKey: ['selectedLocation'],
    queryFn: () => queryClient.getQueryData(['selectedLocation']) || null,
    initialData: null,
    staleTime: Infinity,
  });

  const setSelected = (location: any | null) => {
    queryClient.setQueryData(['selectedLocation'], location);
  };

  return { selected, setSelected };
};
