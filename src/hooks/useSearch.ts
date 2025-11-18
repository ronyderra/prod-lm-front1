import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useSearch = () => {
  const queryClient = useQueryClient();

  const { data: search = '' } = useQuery({
    queryKey: ['search'],
    queryFn: () => queryClient.getQueryData(['search']) || '',
    initialData: '',
    staleTime: Infinity,
  });

  const setSearch = (value: string) => {
    queryClient.setQueryData(['search'], value);
  };

  return { search, setSearch };
};
